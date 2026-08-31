import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { createVNode, resolveComponent, useSSRContext, withCtx } from "vue";
//#region website/examples/extrusion.md
var __pageData = JSON.parse("{\"title\":\"Extrusion example\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"examples/extrusion.md\",\"filePath\":\"examples/extrusion.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "examples/extrusion.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ClientOnly = resolveComponent("ClientOnly");
	const _component_Map3DDemo = resolveComponent("Map3DDemo");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="extrusion-example" tabindex="-1">Extrusion example <a class="header-anchor" href="#extrusion-example" aria-label="Permalink to “Extrusion example”">​</a></h1><p>3D depth is calculated as <code>value / maximum * maxExtrusionDepth</code>. Zero values retain a minimal visible base.</p>`);
	_push(ssrRenderComponent(_component_ClientOnly, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_Map3DDemo, null, null, _parent, _scopeId));
			else return [createVNode(_component_Map3DDemo)];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("examples/extrusion.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var extrusion_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, extrusion_default as default };
