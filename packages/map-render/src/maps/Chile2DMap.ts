import topography from '../assets/chile-topography.json';
import type { Map2DOptions, RegionData, RegionFeature, RegionFeatureCollection } from '../types/index.js';
import { finiteNonNegativeOption, finitePositiveOption, prepareDataSeries } from './data.js';
import { createViewportTransform, getBounds, metricColor, polygonsOf, project } from './geometry.js';

const geography = topography as RegionFeatureCollection;

export class Chile2DMap {
  readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly options: Map2DOptions;
  private readonly data = new Map<string, RegionData>();
  private readonly paths = new Map<RegionFeature, Path2D>();
  private readonly resizeObserver: ResizeObserver;
  private frame: number | undefined;
  private hovered: RegionFeature | undefined;
  private selectedId: string | undefined;
  private focusedIndex = 0;
  private destroyed = false;

  constructor(options: Map2DOptions) {
    if (!options.container) throw new TypeError('Chile2DMap requires a container element.');

    this.options = {
      ...options,
      pixelRatio: Math.min(finitePositiveOption(options.pixelRatio, window.devicePixelRatio || 1, 'pixelRatio'), 3),
      strokeWidth: finiteNonNegativeOption(options.strokeWidth, 0.75, 'strokeWidth'),
    };

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-label', 'Interactive map of Chile');
    this.canvas.setAttribute('role', 'img');
    this.canvas.tabIndex = 0;
    this.canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none';

    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D is not supported by this browser.');
    this.context = context;

    options.container.append(this.canvas);
    this.resizeObserver = new ResizeObserver(() => this.scheduleDraw());
    this.resizeObserver.observe(options.container);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.addEventListener('click', this.handleClick);
    this.canvas.addEventListener('keydown', this.handleKeyDown);
    this.scheduleDraw();
  }

  /**
   * Updates the map with a new series of region data. The data is prepared and stored internally, and a redraw of the map is scheduled to reflect the changes.
   */
  updateData(dataSeries: RegionData[]): void {
    const prepared = prepareDataSeries(dataSeries, geography);
    this.data.clear();
    for (const [id, item] of prepared.byId) this.data.set(id, item);
    this.scheduleDraw();
  }

  /** Selects a region by its public identifier without emitting callbacks. */
  selectRegion(regionId: string): boolean {
    if (this.destroyed) return false;
    const index = geography.features.findIndex((feature) => feature.properties.id === regionId);
    if (index < 0) return false;
    this.selectedId = regionId;
    this.focusedIndex = index;
    const feature = geography.features[index];
    if (feature) this.canvas.setAttribute('aria-label', `Interactive map of Chile. Selected: ${feature.properties.name}`);
    this.scheduleDraw();
    return true;
  }

  /** Clears the current region selection. */
  clearSelection(): void {
    if (this.destroyed || this.selectedId === undefined) return;
    this.selectedId = undefined;
    this.canvas.setAttribute('aria-label', 'Interactive map of Chile');
    this.scheduleDraw();
  }

  /** Returns the selected public region identifier, if any. */
  get selectedRegionId(): string | undefined { return this.selectedId; }

  /**
   * Destroys the Chile2DMap instance, removing event listeners, disconnecting the resize observer, canceling any scheduled draw frames, and removing the canvas from the DOM. After calling this method, the instance should not be used again.
   */
  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.resizeObserver.disconnect();
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.removeEventListener('keydown', this.handleKeyDown);
    this.canvas.remove();
  }

  private scheduleDraw(): void {
    if (this.destroyed || this.frame !== undefined) return;
    this.frame = requestAnimationFrame(() => { this.frame = undefined; this.draw(); });
  }

  /**
   * Draws the map on the canvas, scaling it according to the container size and pixel ratio. It clears the canvas, calculates the viewport transform, and iterates through each region feature to draw its path with the appropriate fill and stroke styles based on the data values.
   */
  private draw(): void {
    const rect = this.options.container.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const ratio = this.options.pixelRatio ?? 1;

    this.canvas.width = Math.round(width * ratio);
    this.canvas.height = Math.round(height * ratio);
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.context.clearRect(0, 0, width, height);

    const transform = createViewportTransform(getBounds(geography), width, height);
    const maximum = Math.max(0, ...[...this.data.values()].map((item) => item.value));

    this.paths.clear();
    for (const feature of geography.features) {
      const path = new Path2D();
      for (const polygon of polygonsOf(feature)) for (const ring of polygon) {
        ring.forEach((position, index) => {
          const [x, y] = project(position, transform);
          if (index === 0) path.moveTo(x, y); else path.lineTo(x, y);
        });
        path.closePath();
      }
      const item = this.data.get(feature.properties.id);
      const value = item?.value ?? 0;
      this.context.fillStyle = item?.color ?? this.options.colorScale?.({
        id: feature.properties.id,
        name: feature.properties.name,
        value,
        maximum,
        data: item,
      }) ?? metricColor(value, maximum, this.options.defaultColor ?? '#94a3b8');
      this.context.fill(path, 'evenodd');
      this.context.strokeStyle = this.options.strokeColor ?? '#ffffff';
      this.context.lineWidth = this.options.strokeWidth ?? 0.75;
      this.context.stroke(path);
      this.paths.set(feature, path);

      if (feature.properties.id === this.selectedId) {
        this.context.strokeStyle = this.options.selectedColor ?? '#0f172a';
        this.context.lineWidth = Math.max(2, (this.options.strokeWidth ?? 0.75) * 2);
        this.context.stroke(path);
      }
    }
  }

  /**
   * Finds the region feature at the given pointer or mouse event coordinates. Returns the corresponding RegionFeature if found, otherwise returns undefined.
   */
  private featureAt(event: PointerEvent | MouseEvent): RegionFeature | undefined {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [...this.paths].reverse().find(([, path]) => this.context.isPointInPath(path, x, y, 'evenodd'))?.[0];
  }

  /**
   * Handles pointer movement over the map. Changes the cursor to a pointer when hovering over a region and triggers the onRegionHover callback if the hovered region changes.
   */
  private readonly handlePointerMove = (event: PointerEvent): void => {
    const feature = this.featureAt(event);
    this.canvas.style.cursor = feature ? 'pointer' : 'default';
    if (feature === this.hovered) return;
    this.hovered = feature;
    if (feature) this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
  };

  /**
   * Handles pointer leaving the map area. Resets the hovered region and cursor style to default.
   */
  private readonly handlePointerLeave = (): void => { this.hovered = undefined; this.canvas.style.cursor = 'default'; };

  /**
   * Handles click events on the map. If a region is clicked, it triggers the onRegionClick callback with the region's name and associated data.
   */
  private readonly handleClick = (event: MouseEvent): void => {
    const feature = this.featureAt(event);
    if (feature) {
      this.selectRegion(feature.properties.id);
      this.options.onRegionClick?.(feature.properties.name, this.data.get(feature.properties.id));
    }
  };

  /**
   * Handles keyboard navigation for the map. Arrow keys move the focus between regions, and Enter or Space triggers a click event on the focused region.
  */
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
      this.canvas.setAttribute('aria-label', `Interactive map of Chile. Selected: ${feature.properties.name}`);
      this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
    }
  };
}
