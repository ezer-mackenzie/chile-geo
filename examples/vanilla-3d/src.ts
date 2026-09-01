import { CHILE_REGIONS, Chile3DMap } from '@chile-geo/maps/3d';
import './style.css';

const map = new Chile3DMap({
  container: document.querySelector<HTMLElement>('#map')!,
  enableControls: true,
  maxExtrusionDepth: 4,
});
map.updateData(CHILE_REGIONS.map((region, index) => ({ ...region, value: (index + 1) ** 2 })));
window.addEventListener('pagehide', () => map.destroy(), { once: true });
