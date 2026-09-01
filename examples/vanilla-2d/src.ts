import { CHILE_REGIONS, Chile2DMap } from '@chile-geo/maps/2d';
import './style.css';

const selection = document.querySelector<HTMLOutputElement>('#selection')!;
const map = new Chile2DMap({
  container: document.querySelector<HTMLElement>('#map')!,
  onRegionClick: (name, data) => { selection.value = `${name}: ${data?.value ?? 'No value'}`; },
});
map.updateData(CHILE_REGIONS.map((region, index) => ({ ...region, value: index + 1 })));
window.addEventListener('pagehide', () => map.destroy(), { once: true });
