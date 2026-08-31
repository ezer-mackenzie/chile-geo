import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import Map2DDemo from './Map2DDemo.vue';
import Map3DDemo from './Map3DDemo.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Map2DDemo', Map2DDemo);
    app.component('Map3DDemo', Map3DDemo);
  },
} satisfies Theme;
