# Choropleth example

Use normalized values for a generated blue-to-red spectrum or pass explicit colors when the application owns its legend.

```ts
map.updateData([
  { id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 92 },
  { id: 'CL-VS', name: 'Valparaíso Region', value: 67, color: '#7c3aed' },
]);
```

<ClientOnly><Map2DDemo /></ClientOnly>
