# Canvas 2D

```ts
import { Chile2DMap } from '@chile-geo/maps/2d';

const map = new Chile2DMap({
  container: document.querySelector<HTMLElement>('#map')!,
  defaultColor: '#94a3b8',
  strokeColor: '#fff',
  onRegionClick: (name, data) => console.log(name, data),
});
map.updateData([{ id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 80 }]);
```

The renderer observes its container and redraws without replacing its canvas. `pixelRatio` is clamped to `3` to limit memory use. Call `destroy()` when the owning view unmounts.

<ClientOnly><Map2DDemo /></ClientOnly>
