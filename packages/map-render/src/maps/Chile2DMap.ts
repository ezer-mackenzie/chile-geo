import topography from '../assets/chile-topography.json';
import type { Map2DOptions, RegionData, RegionFeature, RegionFeatureCollection } from '../types';
import { createViewportTransform, getBounds, metricColor, polygonsOf, project } from './geometry';

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
  private destroyed = false;

  constructor(options: Map2DOptions) {
    if (!options.container) throw new TypeError('Chile2DMap requires a container element.');
    this.options = options;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-label', 'Interactive map of Chile');
    this.canvas.setAttribute('role', 'img');
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
    this.scheduleDraw();
  }

  updateData(dataSeries: RegionData[]): void {
    this.data.clear();
    for (const item of dataSeries) this.data.set(item.id, { ...item });
    this.scheduleDraw();
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.resizeObserver.disconnect();
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.remove();
  }

  private scheduleDraw(): void {
    if (this.destroyed || this.frame !== undefined) return;
    this.frame = requestAnimationFrame(() => { this.frame = undefined; this.draw(); });
  }

  private draw(): void {
    const rect = this.options.container.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const ratio = this.options.pixelRatio ?? window.devicePixelRatio ?? 1;
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
      this.context.fillStyle = item?.color ?? metricColor(item?.value ?? 0, maximum, this.options.defaultColor ?? '#94a3b8');
      this.context.fill(path, 'evenodd');
      this.context.strokeStyle = this.options.strokeColor ?? '#ffffff';
      this.context.lineWidth = this.options.strokeWidth ?? 0.75;
      this.context.stroke(path);
      this.paths.set(feature, path);
    }
  }

  private featureAt(event: PointerEvent | MouseEvent): RegionFeature | undefined {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [...this.paths].reverse().find(([, path]) => this.context.isPointInPath(path, x, y, 'evenodd'))?.[0];
  }

  private readonly handlePointerMove = (event: PointerEvent): void => {
    const feature = this.featureAt(event);
    this.canvas.style.cursor = feature ? 'pointer' : 'default';
    if (feature === this.hovered) return;
    this.hovered = feature;
    if (feature) this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
  };
  private readonly handlePointerLeave = (): void => { this.hovered = undefined; this.canvas.style.cursor = 'default'; };
  private readonly handleClick = (event: MouseEvent): void => {
    const feature = this.featureAt(event);
    if (feature) this.options.onRegionClick?.(feature.properties.name, this.data.get(feature.properties.id));
  };
}
