import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/api/types.md
var __pageData = JSON.parse("{\"title\":\"Public types\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"api/types.md\",\"filePath\":\"api/types.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "api/types.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="public-types" tabindex="-1">Public types <a class="header-anchor" href="#public-types" aria-label="Permalink to “Public types”">​</a></h1><h2 id="regiondata" tabindex="-1"><code>RegionData</code> <a class="header-anchor" href="#regiondata" aria-label="Permalink to “RegionData”">​</a></h2><table tabindex="0"><thead><tr><th>Field</th><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td><code>id</code></td><td><code>string</code></td><td>Stable <code>CL-*</code> region identifier</td></tr><tr><td><code>name</code></td><td><code>string</code></td><td>English metric label supplied by the consumer</td></tr><tr><td><code>value</code></td><td><code>number</code></td><td>Value used for normalization</td></tr><tr><td><code>color</code></td><td><code>string?</code></td><td>Optional CSS color override</td></tr></tbody></table><p><code>BaseMapOptions</code> requires <code>container</code> and optionally accepts <code>defaultColor</code>, <code>onRegionClick</code>, and <code>onRegionHover</code>. <code>Map2DOptions</code> adds <code>pixelRatio</code>, <code>strokeColor</code>, and <code>strokeWidth</code>. <code>Map3DOptions</code> adds <code>maxExtrusionDepth</code> and <code>enableControls</code>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/types.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var types_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, types_default as default };
