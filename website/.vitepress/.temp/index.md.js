import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { createVNode, resolveComponent, useSSRContext, withCtx } from "vue";
//#region website/index.md
var __pageData = JSON.parse("{\"title\":\"\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\",\"hero\":{\"name\":\"Chile Geo\",\"text\":\"Typed geographic visualization for Chile\",\"tagline\":\"Responsive Canvas 2D and Three.js 3D maps with bundled offline boundaries.\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Get started\",\"link\":\"/guide/installation\"},{\"theme\":\"alt\",\"text\":\"API reference\",\"link\":\"/api/types\"}]},\"features\":[{\"title\":\"Lightweight 2D\",\"details\":\"Import the Canvas-only entry without loading Three.js.\"},{\"title\":\"Metric-driven 3D\",\"details\":\"Extrude regions with lighting, orbit controls, and raycasting.\"},{\"title\":\"Offline and typed\",\"details\":\"Use bundled BCN-derived boundaries and strict TypeScript declarations.\"}]},\"headers\":[],\"relativePath\":\"index.md\",\"filePath\":\"index.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ClientOnly = resolveComponent("ClientOnly");
	const _component_Map2DDemo = resolveComponent("Map2DDemo");
	_push(`<div${ssrRenderAttrs(_attrs)}><h2 id="live-canvas-example" tabindex="-1">Live Canvas example <a class="header-anchor" href="#live-canvas-example" aria-label="Permalink to “Live Canvas example”">​</a></h2>`);
	_push(ssrRenderComponent(_component_ClientOnly, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_Map2DDemo, null, null, _parent, _scopeId));
			else return [createVNode(_component_Map2DDemo)];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var website_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, website_default as default };
