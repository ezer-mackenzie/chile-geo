# 3D Extrusion example

Render dynamic 3D extruded maps using Three.js with lighting, raycasting, and orbit controls.

3D depth is calculated as `value / maximum * maxExtrusionDepth`. Zero values retain a minimal visible base.

```ts
import { Chile3DMap } from '@chile-geo/maps/3d';

const map = new Chile3DMap({
  container: document.querySelector<HTMLElement>('#map')!,
  enableControls: true,
  maxExtrusionDepth: 4,
  onRegionClick: (regionName, data) => {
    console.log('Clicked region:', regionName, data);
  },
});

map.updateData([
  { id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 95 },
  { id: 'CL-VS', name: 'Valparaíso Region', value: 70 },
  { id: 'CL-MA', name: 'Magallanes Region', value: 65, color: '#059669' },
]);
```

<ClientOnly><Map3DDemo /></ClientOnly>

## Custom Animation & Controls

Use `animationMode` to configure rendering behavior when manipulating Three.js controls or camera positions:

```ts
const map = new Chile3DMap({
  container,
  enableControls: true,
  animationMode: 'auto', // 'auto' | 'continuous' | 'on-demand'
  maxExtrusionDepth: 5,
});

// Programmatically update camera or scene:
map.camera.position.set(0, 0, 100);
map.requestRender();
```
