# Project Specification: @chile-geo Suite (Dual 2D/3D Analytics Mapping Library)

## 1. Project Overview & Objective
The goal of this project is to build an un-opinionated, ultra-lightweight, and fully-typed JavaScript/TypeScript library called `@chile-geo`. This suite will allow developers to dynamically render the geographical boundaries of Chile (Regions, Provinces, and Communes) to display statistical metrics and dashboard analytics.

The library **MUST** support two independent rendering engines using a modular approach to enable optimal tree-shaking:
1. **2D Engine (`Chile2DMap`)**: Uses the native HTML5 Canvas API (No heavy external dependencies).
2. **3D Engine (`Chile3DMap`)**: Uses WebGL via **Three.js** to handle dynamic extrusion depths based on statistical metrics, lighting, and raycasting.

All source code, APIs, interfaces, and documentation **MUST** be written in **English**.

---

## 2. Technical Stack & Constraints
- **Runtime & Package Manager**: Bun (`bun install`, `bun run build`)
- **Language**: TypeScript (Strict typing enabled)
- **Bundler/Compiler**: Vite (Configured in Library Mode to output ESM and UMD formats)
- **Typing Export**: `vite-plugin-dts` must generate native `.d.ts` declaration files inside the `dist/` directory.
- **External Dependencies**: 
  - `three` (Declared strictly as a `peerDependency` in `package.json` to keep the core bundle tiny).
- **Data Policy**: No external network fetches for geographic coordinates. The library must bundle a highly compressed, pre-simplified local GeoJSON file parsed directly from the official **BCN (Biblioteca del Congreso Nacional de Chile)** vector datasets.

---

## 3. Directory Architecture
Maintain the following monorepo-ready or clean modular structure:

```text
chile-geo/
├── src/
│   ├── assets/
│   │   └── chile-topography.json  <-- Highly compressed GeoJSON/TopoJSON boundary data
│   ├── maps/
│   │   ├── Chile2DMap.ts          <-- Native Canvas 2D engine
│   │   └── Chile3DMap.ts          <-- WebGL + Three.js engine
│   ├── types/
│   │   └── index.ts               <-- Shared public interfaces
│   └── index.ts                   <-- Main entry point exporting maps and types
├── package.json                   <-- Configured with exports, types, and peerDependencies
├── tsconfig.json                  <-- Configured with resolveJsonModule: true
└── vite.config.ts                 <-- Configured for library target bundling
```

---

## 4. Shared Type Contracts (`src/types/index.ts`)
The agent must implement and enforce these core interfaces:

```typescript
export interface RegionData {
  id: string;          // ISO/Standard code (e.g., "CL-RM", "CL-VS")
  name: string;        // English/Standardized name of the territory
  value: number;       // Normalized metric score or value for calculations
  color?: string;      // Optional hex string override (e.g., "#3498db")
}

export interface BaseMapOptions {
  container: HTMLElement;
  defaultColor?: string;
  onRegionClick?: (regionName: string, data?: RegionData) => void;
  onRegionHover?: (regionName: string, data?: RegionData) => void;
}

export interface Map3DOptions extends BaseMapOptions {
  maxExtrusionDepth?: number; // Caps the max height of the Z-axis deformation
  enableControls?: boolean;   // Toggles OrbitControls interaction
}
```

---

## 5. Implementation Blueprints

### A. Core Engine Architecture Goals
- Both `Chile2DMap` and `Chile3DMap` must expose a uniform public method: `public updateData(dataSeries: RegionData[]): void`.
- Calling `updateData` should wipe the current visual states or dynamically scale existing objects without triggering full page/context re-initialization.

### B. Specifics for 2D Engine (`src/maps/Chile2DMap.ts`)
- Use a single `<canvas>` element appended to the provided `container`.
- Implement responsive canvas resizing using a bounding client rect layout loop.
- Loop over the bundled JSON features, draw shapes using `ctx.beginPath()`, `ctx.lineTo()`, and fill them using either the calculated statistical color spectrum or the specific `RegionData.color` option.

### C. Specifics for 3D Engine (`src/maps/Chile3DMap.ts`)
- Initialize a `THREE.Scene`, `THREE.PerspectiveCamera`, and a `THREE.WebGLRenderer` inside the specified DOM container.
- Create a root `THREE.Group` named `ChileMainGroup`. Every region component must be a child `THREE.Group` or discrete `THREE.Mesh` instance inside it.
- Store transactional metrics inside the native mesh allocation dictionary: `mesh.userData = dataSeriesItem`.
- **Dynamic Extrusion Lógica**: Map coordinates into a `THREE.Shape`. Pass it through `THREE.ExtrudeGeometry` where the `depth` setting is bound to the metric value `value * structuralModifier`. Cap this depth utilizing `options.maxExtrusionDepth`.
- Implement interaction hooks via a clean `THREE.Raycaster` routine listening to local mouse vectors. Trigger `onRegionClick` or `onRegionHover` callbacks accordingly.

---

## 6. Compression & Optimization Instructions for the Agent
- When reading or processing the raw shapefiles/GeoJSON files downloaded from BCN:
  1. Strip all redundant fields from `properties` (e.g., population indices, superficial hectares, redundant internal codes). Retain only `{ "id": "CL-XX", "name": "..." }`.
  2. The agent must assume coordinates have been pre-simplified to **4 decimal places** max (precision constraint ~11 meters). Do not process coordinates with 15 decimal fractions to safeguard frame-rates.
- Leverage Tree-Shaking: Ensure `export { Chile2DMap }` and `export { Chile3DMap }` are detached in the main bundle tree so that Web clients requiring purely flat 2D maps do not load the `three` runtime into production bundles.
