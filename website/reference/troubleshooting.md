# Troubleshooting

## The map is blank

Give the host element an explicit height and width. A percentage height works only when its ancestors have measurable heights.

## Three.js cannot be resolved

Install `three` and import the 3D subpath. Canvas-only applications should import `/2d` and do not need Three.js.

## WebGL construction fails

The browser, driver, security policy, or test environment may disable WebGL. Catch the constructor error and fall back to `Chile2DMap` when appropriate.

## A region does not receive data

Match by a documented `CL-*` identifier. Unknown IDs are ignored with a console warning. Names are labels, not keys.

## Memory grows after navigation

Call `destroy()` during unmount. It removes events and observers and disposes rendering resources.
