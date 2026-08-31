# Browser support

The release gate runs Playwright tests against current Chromium, Firefox, and WebKit. The public baseline requires ES2022 modules, Canvas 2D, `ResizeObserver`, Pointer Events, and keyboard events. The 3D entry additionally requires WebGL.

Internet Explorer and legacy browsers without those APIs are not supported. WebKit testing runs in CI because the local development host may require platform-specific libraries.

Three.js compatibility is tested at both ends of the declared `>=0.180.0 <0.186.0` peer range. Applications should keep Three.js within that range and deduplicate it in their lockfile.
