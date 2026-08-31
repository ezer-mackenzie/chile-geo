import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/reference/browser-support.md
var __pageData = JSON.parse("{\"title\":\"Browser support\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"reference/browser-support.md\",\"filePath\":\"reference/browser-support.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "reference/browser-support.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="browser-support" tabindex="-1">Browser support <a class="header-anchor" href="#browser-support" aria-label="Permalink to “Browser support”">​</a></h1><p>The release gate runs Playwright tests against current Chromium, Firefox, and WebKit. The public baseline requires ES2022 modules, Canvas 2D, <code>ResizeObserver</code>, Pointer Events, and keyboard events. The 3D entry additionally requires WebGL.</p><p>Internet Explorer and legacy browsers without those APIs are not supported. WebKit testing runs in CI because the local development host may require platform-specific libraries.</p><p>Three.js compatibility is tested at both ends of the declared <code>&gt;=0.180.0 &lt;0.186.0</code> peer range. Applications should keep Three.js within that range and deduplicate it in their lockfile.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/browser-support.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var browser_support_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, browser_support_default as default };
