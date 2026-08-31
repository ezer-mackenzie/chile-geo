import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/api/chile-2d-map.md
var __pageData = JSON.parse("{\"title\":\"Chile2DMap\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"api/chile-2d-map.md\",\"filePath\":\"api/chile-2d-map.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "api/chile-2d-map.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="chile2dmap" tabindex="-1"><code>Chile2DMap</code> <a class="header-anchor" href="#chile2dmap" aria-label="Permalink to “Chile2DMap”">​</a></h1><p>Constructor: <code>new Chile2DMap(options: Map2DOptions)</code>.</p><p>Public API:</p><ul><li><code>readonly canvas: HTMLCanvasElement</code></li><li><code>updateData(dataSeries: RegionData[]): void</code></li><li><code>destroy(): void</code></li></ul><p>The constructor throws when the container is missing, Canvas 2D is unavailable, or a numeric option is invalid. Default color is <code>#94a3b8</code>, stroke color is white, stroke width is <code>0.75</code>, and pixel ratio defaults to the device ratio with a maximum of <code>3</code>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/chile-2d-map.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var chile_2d_map_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, chile_2d_map_default as default };
