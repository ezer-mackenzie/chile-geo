import { createApp, onBeforeUnmount, onMounted, ref } from 'vue';
import { Chile2DMap } from '@chile-geo/maps/2d';
import './style.css';

createApp({
  setup() {
    const host = ref<HTMLElement>();
    let map: Chile2DMap | undefined;
    onMounted(() => {
      map = new Chile2DMap({ container: host.value! });
      map.updateData([{ id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 90 }]);
    });
    onBeforeUnmount(() => map?.destroy());
    return { host };
  },
  template: '<main><h1>Chile Geo Vue lifecycle</h1><div ref="host" class="map"></div></main>',
}).mount('#app');
