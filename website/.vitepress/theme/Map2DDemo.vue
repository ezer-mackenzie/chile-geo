<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Chile2DMap } from '../../../packages/map-render/src/2d';

const host = ref<HTMLElement>();
const selected = ref('Use the pointer or keyboard to select a region.');
let map: Chile2DMap | undefined;
onMounted(async () => {
  const { Chile2DMap } = await import('../../../packages/map-render/src/2d');
  map = new Chile2DMap({ container: host.value!, onRegionClick: (name) => { selected.value = name; } });
  map.updateData([
    { id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 95 },
    { id: 'CL-VS', name: 'Valparaíso Region', value: 70 },
    { id: 'CL-BI', name: 'Biobío Region', value: 55 },
  ]);
});
onBeforeUnmount(() => map?.destroy());
</script>
<template><div ref="host" class="map-demo" /><p aria-live="polite">{{ selected }}</p></template>
