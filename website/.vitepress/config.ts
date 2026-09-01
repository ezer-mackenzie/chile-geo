import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Chile Geo',
  description: 'Typed 2D and 3D geographic visualization for Chile',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'API', link: '/api/types' },
      { text: 'Examples', link: '/examples/choropleth' },
      { text: 'Reference', link: '/reference/browser-support' },
    ],
    sidebar: [
      { text: 'Guide', items: [
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Canvas 2D', link: '/guide/canvas-2d' },
        { text: 'WebGL 3D', link: '/guide/webgl-3d' },
        { text: 'Data updates', link: '/guide/data-updates' },
        { text: 'Lifecycle and accessibility', link: '/guide/lifecycle' },
      ] },
      { text: 'API', items: [
        { text: 'Types', link: '/api/types' },
        { text: 'Chile2DMap', link: '/api/chile-2d-map' },
        { text: 'Chile3DMap', link: '/api/chile-3d-map' },
      ] },
      { text: 'Examples', items: [
        { text: 'Choropleth', link: '/examples/choropleth' },
        { text: 'Extrusion', link: '/examples/extrusion' },
      ] },
      { text: 'Reference', items: [
        { text: 'Browser support', link: '/reference/browser-support' },
        { text: 'Geographic data', link: '/reference/data' },
        { text: 'Compatibility', link: '/reference/compatibility' },
        { text: 'Migration', link: '/reference/migration' },
        { text: 'Troubleshooting', link: '/reference/troubleshooting' },
      ] },
    ],
    socialLinks: [],
    footer: { message: 'Released under the MIT License.', copyright: 'Copyright © 2026 Chile Geo contributors' },
  },
});
