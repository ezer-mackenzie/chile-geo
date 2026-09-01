<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Chile3DMap } from '../../../packages/maps/src/3d';

const host = ref<HTMLElement>();
let map: Chile3DMap | undefined;
onMounted(async () => {
    const { Chile3DMap } = await import('../../../packages/maps/src/3d');
  map = new Chile3DMap({ container: host.value!, enableControls: true, maxExtrusionDepth: 3 });
  map.updateData([
    { id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 90 },
    { id: 'CL-MA', name: 'Magallanes and Chilean Antarctica Region', value: 65 },
  ]);
});
onBeforeUnmount(() => map?.destroy());
</script>
<template><div ref="host" class="map-demo" /></template>
