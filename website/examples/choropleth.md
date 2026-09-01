# Choropleth example

Use normalized values for a generated blue-to-red spectrum or pass explicit colors when the application owns its legend.

```ts
map.updateData([
  { id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 92 },
  { id: 'CL-VS', name: 'Valparaíso Region', value: 67, color: '#7c3aed' },
]);
```

<ClientOnly><Map2DDemo /></ClientOnly>

Use `colorScale` when the application owns the complete palette:

```ts
const map = new Chile2DMap({
  container,
  colorScale: ({ value, maximum }) => {
    const ratio = maximum === 0 ? 0 : value / maximum;
    return ratio > 0.75 ? '#7f1d1d' : ratio > 0.4 ? '#f97316' : '#fef3c7';
  },
});
```
