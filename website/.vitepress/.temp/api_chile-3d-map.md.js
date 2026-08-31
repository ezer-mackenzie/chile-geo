import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/api/chile-3d-map.md
var __pageData = JSON.parse("{\"title\":\"Chile3DMap\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"api/chile-3d-map.md\",\"filePath\":\"api/chile-3d-map.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "api/chile-3d-map.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="chile3dmap" tabindex="-1"><code>Chile3DMap</code> <a class="header-anchor" href="#chile3dmap" aria-label="Permalink to “Chile3DMap”">​</a></h1><p>Constructor: <code>new Chile3DMap(options: Map3DOptions)</code>.</p><p>Public API:</p><ul><li><code>readonly scene: THREE.Scene</code></li><li><code>readonly camera: THREE.PerspectiveCamera</code></li><li><code>readonly renderer: THREE.WebGLRenderer</code></li><li><code>readonly mainGroup: THREE.Group</code></li><li><code>updateData(dataSeries: RegionData[]): void</code></li><li><code>destroy(): void</code></li></ul><p><code>mainGroup</code> is named <code>ChileMainGroup</code> and contains one group per region. Intersectable meshes store <code>regionId</code>, <code>regionName</code>, and metric fields in <code>userData</code>. Default maximum extrusion depth is <code>3</code>; controls are disabled by default.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/chile-3d-map.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var chile_3d_map_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, chile_3d_map_default as default };
