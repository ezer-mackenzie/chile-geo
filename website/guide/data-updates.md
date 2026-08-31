# Data updates

Both renderers expose `updateData(dataSeries)`. The call replaces the current metric snapshot while retaining the rendering context. Values are normalized against the largest valid value.

- Unknown IDs are ignored with a warning.
- For duplicate IDs, the last record wins.
- Negative and non-finite values become zero.
- An empty array resets every region to the default visual state.
- A record-level `color` overrides the generated spectrum.

Use Chilean subdivision identifiers such as `CL-RM`, not array position or localized name, as stable keys.
