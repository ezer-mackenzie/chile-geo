# Installation

Install the map package with Bun:

```bash
bun add @chile-geo/maps
```

For 3D maps, also install the optional peer dependency:

```bash
bun add three
```

Use `@chile-geo/maps/2d` for Canvas applications and `@chile-geo/maps/3d` for WebGL applications. The combined root export is convenient for tools, but subpath imports provide the clearest dependency boundary.

The host element must have a non-zero width and height. The library targets modern browsers and does not fetch geographic data at runtime.
