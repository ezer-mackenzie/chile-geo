import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/reference/troubleshooting.md
var __pageData = JSON.parse("{\"title\":\"Troubleshooting\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"reference/troubleshooting.md\",\"filePath\":\"reference/troubleshooting.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "reference/troubleshooting.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="troubleshooting" tabindex="-1">Troubleshooting <a class="header-anchor" href="#troubleshooting" aria-label="Permalink to “Troubleshooting”">​</a></h1><h2 id="the-map-is-blank" tabindex="-1">The map is blank <a class="header-anchor" href="#the-map-is-blank" aria-label="Permalink to “The map is blank”">​</a></h2><p>Give the host element an explicit height and width. A percentage height works only when its ancestors have measurable heights.</p><h2 id="three-js-cannot-be-resolved" tabindex="-1">Three.js cannot be resolved <a class="header-anchor" href="#three-js-cannot-be-resolved" aria-label="Permalink to “Three.js cannot be resolved”">​</a></h2><p>Install <code>three</code> and import the 3D subpath. Canvas-only applications should import <code>/2d</code> and do not need Three.js.</p><h2 id="webgl-construction-fails" tabindex="-1">WebGL construction fails <a class="header-anchor" href="#webgl-construction-fails" aria-label="Permalink to “WebGL construction fails”">​</a></h2><p>The browser, driver, security policy, or test environment may disable WebGL. Catch the constructor error and fall back to <code>Chile2DMap</code> when appropriate.</p><h2 id="a-region-does-not-receive-data" tabindex="-1">A region does not receive data <a class="header-anchor" href="#a-region-does-not-receive-data" aria-label="Permalink to “A region does not receive data”">​</a></h2><p>Match by a documented <code>CL-*</code> identifier. Unknown IDs are ignored with a console warning. Names are labels, not keys.</p><h2 id="memory-grows-after-navigation" tabindex="-1">Memory grows after navigation <a class="header-anchor" href="#memory-grows-after-navigation" aria-label="Permalink to “Memory grows after navigation”">​</a></h2><p>Call <code>destroy()</code> during unmount. It removes events and observers and disposes rendering resources.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/troubleshooting.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var troubleshooting_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, troubleshooting_default as default };
