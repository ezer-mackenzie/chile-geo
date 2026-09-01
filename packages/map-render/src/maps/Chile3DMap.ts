import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import topography from '../assets/chile-topography.json';
import type { Map3DOptions, PolygonCoordinates, RegionData, RegionFeatureCollection } from '../types/index.js';
import { finitePositiveOption, prepareDataSeries } from './data.js';
import { getBounds, metricColor, normalizedValue, polygonsOf } from './geometry.js';

const geography = topography as RegionFeatureCollection;
const bounds = getBounds(geography);
const centerX = (bounds.minX + bounds.maxX) / 2;
const centerY = (bounds.minY + bounds.maxY) / 2;

interface RegionGroup extends THREE.Group { userData: { regionId: string; regionName: string; metric?: RegionData } }

export class Chile3DMap {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  readonly renderer: THREE.WebGLRenderer;
  readonly mainGroup = new THREE.Group();
  private readonly options: Map3DOptions;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly regions = new Map<string, RegionGroup>();
  private readonly data = new Map<string, RegionData>();
  private readonly resizeObserver: ResizeObserver;
  private readonly controls?: OrbitControls;
  private readonly continuous: boolean;
  private animationFrame: number | undefined;
  private focusedIndex = 0;
  private hoveredId: string | undefined;
  private selectedId: string | undefined;
  private destroyed = false;

  constructor(options: Map3DOptions) {
    if (!options.container) throw new TypeError('Chile3DMap requires a container element.');
    this.options = { ...options, maxExtrusionDepth: finitePositiveOption(options.maxExtrusionDepth, 3, 'maxExtrusionDepth') };
    const animationMode = options.animationMode ?? 'auto';
    if (!['auto', 'continuous', 'on-demand'].includes(animationMode)) throw new TypeError('animationMode must be auto, continuous, or on-demand.');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    this.continuous = animationMode === 'continuous' || (animationMode === 'auto' && Boolean(options.enableControls) && !reducedMotion);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.domElement.setAttribute('aria-label', 'Interactive 3D map of Chile');
    this.renderer.domElement.setAttribute('role', 'img');
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none';
    options.container.append(this.renderer.domElement);
    this.mainGroup.name = 'ChileMainGroup';
    this.scene.add(this.mainGroup);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2.2));
    const directional = new THREE.DirectionalLight(0xffffff, 2.5);
    directional.position.set(12, -8, 30);
    this.scene.add(directional);
    this.camera.position.set(0, -3, 53);
    this.camera.lookAt(0, 0, 0);
    if (options.enableControls) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = this.continuous;
      this.controls.addEventListener('change', this.requestRender);
      this.controls.target.set(0, 0, 0);
    }
    this.createRegions();
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(options.container);
    this.renderer.domElement.addEventListener('pointermove', this.handlePointerMove);
    this.renderer.domElement.addEventListener('pointerleave', this.handlePointerLeave);
    this.renderer.domElement.addEventListener('click', this.handleClick);
    this.renderer.domElement.addEventListener('keydown', this.handleKeyDown);
    this.resize();
    if (this.continuous) this.animate(); else this.requestRender();
  }

  updateData(dataSeries: RegionData[]): void {
    const prepared = prepareDataSeries(dataSeries, geography);
    this.data.clear();
    for (const [id, item] of prepared.byId) this.data.set(id, item);
    const maximum = prepared.maximum;
    for (const [id, group] of this.regions) {
      const item = this.data.get(id);
      group.userData.metric = item;
      const depth = Math.max(0.04, normalizedValue(item?.value ?? 0, maximum) * (this.options.maxExtrusionDepth ?? 3));
      for (const child of group.children) {
        const mesh = child as THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial>;
        mesh.userData = item ? { ...item, regionId: id, regionName: group.userData.regionName } : { regionId: id, regionName: group.userData.regionName };
        mesh.scale.z = depth;
        const value = item?.value ?? 0;
        mesh.material.color.set(item?.color ?? this.options.colorScale?.({
          id,
          name: group.userData.regionName,
          value,
          maximum,
          data: item,
        }) ?? metricColor(value, maximum, this.options.defaultColor ?? '#94a3b8'));
        this.applySelectionStyle(mesh, id === this.selectedId);
      }
    }
    this.requestRender();
  }

  /** Selects a region by its public identifier without emitting callbacks. */
  selectRegion(regionId: string): boolean {
    if (this.destroyed) return false;
    const region = this.regions.get(regionId);
    if (!region) return false;
    this.selectedId = regionId;
    this.focusedIndex = geography.features.findIndex((feature) => feature.properties.id === regionId);
    this.renderer.domElement.setAttribute('aria-label', `Interactive 3D map of Chile. Selected: ${region.userData.regionName}`);
    this.refreshSelectionStyles();
    this.requestRender();
    return true;
  }

  /** Clears the current region selection. */
  clearSelection(): void {
    if (this.destroyed || this.selectedId === undefined) return;
    this.selectedId = undefined;
    this.renderer.domElement.setAttribute('aria-label', 'Interactive 3D map of Chile');
    this.refreshSelectionStyles();
    this.requestRender();
  }

  /** Returns the selected public region identifier, if any. */
  get selectedRegionId(): string | undefined { return this.selectedId; }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
    this.resizeObserver.disconnect();
    this.controls?.dispose();
    this.controls?.removeEventListener('change', this.requestRender);
    this.renderer.domElement.removeEventListener('pointermove', this.handlePointerMove);
    this.renderer.domElement.removeEventListener('pointerleave', this.handlePointerLeave);
    this.renderer.domElement.removeEventListener('click', this.handleClick);
    this.renderer.domElement.removeEventListener('keydown', this.handleKeyDown);
    this.mainGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) { object.geometry.dispose(); (object.material as THREE.Material).dispose(); }
    });
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private createRegions(): void {
    for (const feature of geography.features) {
      const group = new THREE.Group() as RegionGroup;
      group.name = feature.properties.name;
      group.userData = { regionId: feature.properties.id, regionName: feature.properties.name };
      for (const polygon of polygonsOf(feature)) {
        const shape = this.createShape(polygon);
        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, curveSegments: 1 });
        const material = new THREE.MeshStandardMaterial({ color: this.options.defaultColor ?? '#94a3b8', roughness: 0.72, metalness: 0.04 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { regionId: feature.properties.id, regionName: feature.properties.name };
        group.add(mesh);
      }
      this.regions.set(feature.properties.id, group);
      this.mainGroup.add(group);
    }
  }

  private createShape(polygon: PolygonCoordinates): THREE.Shape {
    const outer = polygon[0] ?? [];
    const shape = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2(x - centerX, y - centerY)));
    for (const ring of polygon.slice(1)) shape.holes.push(new THREE.Path(ring.map(([x, y]) => new THREE.Vector2(x - centerX, y - centerY))));
    return shape;
  }

  private applySelectionStyle(mesh: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial>, selected: boolean): void {
    mesh.material.emissive.set(selected ? (this.options.selectedColor ?? '#334155') : '#000000');
    mesh.material.emissiveIntensity = selected ? 0.65 : 0;
  }

  private refreshSelectionStyles(): void {
    for (const [id, group] of this.regions) for (const child of group.children) {
      this.applySelectionStyle(child as THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial>, id === this.selectedId);
    }
  }

  private readonly resize = (): void => {
    const { width, height } = this.options.container.getBoundingClientRect();
    const safeWidth = Math.max(1, width), safeHeight = Math.max(1, height);
    this.camera.aspect = safeWidth / safeHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    this.renderer.setSize(safeWidth, safeHeight, false);
    this.requestRender();
  };

  /** Schedules one render for application changes to the public scene or camera. */
  readonly requestRender = (): void => {
    if (this.destroyed || this.continuous || this.animationFrame !== undefined) return;
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = undefined;
      this.draw();
    });
  };

  private draw(): void { if (!this.destroyed) this.renderer.render(this.scene, this.camera); }

  private animate = (): void => {
    if (this.destroyed) return;
    this.animationFrame = requestAnimationFrame(this.animate);
    this.controls?.update();
    this.draw();
  };

  private intersect(event: PointerEvent | MouseEvent): THREE.Object3D | undefined {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    return this.raycaster.intersectObjects(this.mainGroup.children, true)[0]?.object;
  }

  private readonly handlePointerMove = (event: PointerEvent): void => {
    const hit = this.intersect(event);
    const id = hit?.userData['regionId'] as string | undefined;
    this.renderer.domElement.style.cursor = id ? 'pointer' : 'default';
    if (!id || id === this.hoveredId) return;
    this.hoveredId = id;
    const region = this.regions.get(id);
    if (region) this.options.onRegionHover?.(region.userData.regionName, this.data.get(id));
  };
  private readonly handlePointerLeave = (): void => { this.hoveredId = undefined; this.renderer.domElement.style.cursor = 'default'; };
  private readonly handleClick = (event: MouseEvent): void => {
    const id = this.intersect(event)?.userData['regionId'] as string | undefined;
    const region = id ? this.regions.get(id) : undefined;
    if (id && region) {
      this.selectRegion(id);
      this.options.onRegionClick?.(region.userData.regionName, this.data.get(id));
    }
  };
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (!['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      const feature = geography.features[this.focusedIndex];
      if (feature) {
        this.selectRegion(feature.properties.id);
        this.options.onRegionClick?.(feature.properties.name, this.data.get(feature.properties.id));
      }
      return;
    }
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    this.focusedIndex = (this.focusedIndex + direction + geography.features.length) % geography.features.length;
    const feature = geography.features[this.focusedIndex];
    if (feature) {
      this.renderer.domElement.setAttribute('aria-label', `Interactive 3D map of Chile. Selected: ${feature.properties.name}`);
      this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
    }
  };
}
