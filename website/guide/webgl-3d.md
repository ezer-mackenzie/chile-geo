# WebGL 3D

```ts
import { Chile3DMap } from '@chile-geo/maps/3d';

const map = new Chile3DMap({
  container: document.querySelector<HTMLElement>('#map')!,
  enableControls: true,
  maxExtrusionDepth: 3,
});
map.updateData([{ id: 'CL-MA', name: 'Magallanes and Chilean Antarctica Region', value: 70 }]);
```

Three.js is an optional peer dependency. Without controls, the renderer draws on demand after construction, resize, and data updates. With controls enabled, it renders continuously for damped interaction. Construction throws when WebGL is unavailable; applications that require a fallback should catch that error and create `Chile2DMap`.

<ClientOnly><Map3DDemo /></ClientOnly>
