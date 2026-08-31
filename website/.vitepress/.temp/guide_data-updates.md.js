import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/guide/data-updates.md
var __pageData = JSON.parse("{\"title\":\"Data updates\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/data-updates.md\",\"filePath\":\"guide/data-updates.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/data-updates.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="data-updates" tabindex="-1">Data updates <a class="header-anchor" href="#data-updates" aria-label="Permalink to “Data updates”">​</a></h1><p>Both renderers expose <code>updateData(dataSeries)</code>. The call replaces the current metric snapshot while retaining the rendering context. Values are normalized against the largest valid value.</p><ul><li>Unknown IDs are ignored with a warning.</li><li>For duplicate IDs, the last record wins.</li><li>Negative and non-finite values become zero.</li><li>An empty array resets every region to the default visual state.</li><li>A record-level <code>color</code> overrides the generated spectrum.</li></ul><p>Use Chilean subdivision identifiers such as <code>CL-RM</code>, not array position or localized name, as stable keys.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/data-updates.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var data_updates_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, data_updates_default as default };
