import { Chile2DMap, type RegionColorScale } from '../../../packages/map-render/src/2d';
import { Chile3DMap, type Map3DOptions } from '../../../packages/map-render/src/3d';

declare global { interface Window { chileMap: Chile2DMap | Chile3DMap; colorScaleCalls: number; colorScaleMaximum: number; updateMetrics(): void; destroyMap(): void } }

const container = document.querySelector<HTMLElement>('#map')!;
const output = document.querySelector<HTMLOutputElement>('#event')!;
container.style.cssText = 'width:480px;height:640px';
const callback = (name: string): void => { output.value = name; output.textContent = name; };
const metrics = [
  { id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 80 },
  { id: 'CL-VS', name: 'Valparaíso Region', value: 45 },
];
const search = new URLSearchParams(location.search);
const mode = search.get('mode');
const animationMode = (search.get('animation') ?? undefined) as Map3DOptions['animationMode'];
window.colorScaleCalls = 0;
window.colorScaleMaximum = 0;
const colorScale: RegionColorScale | undefined = search.get('palette') === 'custom'
  ? ({ value, maximum }) => {
      window.colorScaleCalls++;
      window.colorScaleMaximum = maximum;
      return value > maximum / 2 ? '#7f1d1d' : '#fef3c7';
    }
  : undefined;
if (mode === 'webgl-off') {
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, contextId: string, ...args: unknown[]) {
    if (contextId.startsWith('webgl')) return null;
    return original.call(this, contextId as '2d', ...args as []) as RenderingContext | null;
  } as typeof original;
}
try {
  window.chileMap = mode === '3d' || mode === 'webgl-off'
    ? new Chile3DMap({ container, maxExtrusionDepth: 3, enableControls: search.get('controls') === 'true', animationMode, colorScale, onRegionClick: callback, onRegionHover: callback })
    : new Chile2DMap({ container, pixelRatio: 2, colorScale, onRegionClick: callback, onRegionHover: callback });
} catch (error) {
  output.value = error instanceof Error ? error.message : String(error);
  output.textContent = output.value;
  throw error;
}
window.chileMap.updateData(metrics);
window.updateMetrics = () => window.chileMap.updateData(metrics.map((item) => ({ ...item, value: item.value + 10 })));
window.destroyMap = () => window.chileMap.destroy();
