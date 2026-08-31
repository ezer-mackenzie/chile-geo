# Lifecycle and accessibility

Create one map per host and retain the instance. Update it rather than recreating it. Call `destroy()` during component or route cleanup; repeated calls are safe.

Each renderer exposes a focusable element with an accessible label. Arrow keys move through regions, and Enter or Space invokes `onRegionClick`. Pointer hover and click remain available. Place changing selection text in an application-owned `aria-live` region when screen-reader announcements are required.

Framework pattern:

```ts
onMounted(() => { map = new Chile2DMap({ container: host }); });
onBeforeUnmount(() => map.destroy());
```
