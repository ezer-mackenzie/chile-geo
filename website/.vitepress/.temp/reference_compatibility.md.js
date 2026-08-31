import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/reference/compatibility.md
var __pageData = JSON.parse("{\"title\":\"Compatibility and versioning\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"reference/compatibility.md\",\"filePath\":\"reference/compatibility.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "reference/compatibility.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="compatibility-and-versioning" tabindex="-1">Compatibility and versioning <a class="header-anchor" href="#compatibility-and-versioning" aria-label="Permalink to “Compatibility and versioning”">​</a></h1><p>Chile Geo follows Semantic Versioning.</p><ul><li>Breaking constructor, option, callback, identifier, or lifecycle changes require a major release.</li><li>Additive options and capabilities require a minor release.</li><li>Bug fixes, documentation corrections, and geometry corrections that do not change administrative identity use patch releases.</li><li>Administrative boundary updates or identifier additions require a minor release and a data-source note.</li><li>Deprecated APIs remain available for at least one minor release before removal in a major release.</li></ul><p>The <code>/2d</code> and <code>/3d</code> entry points are stable package contracts. The filenames inside <code>dist/</code>, mesh implementation details, generated color values, and simplified coordinate sequences are not public API.</p><p>UMD remains a distribution artifact for direct browser delivery. ESM subpath imports are the supported package-manager interface.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/compatibility.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var compatibility_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, compatibility_default as default };
