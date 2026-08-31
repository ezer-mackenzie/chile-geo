import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { createVNode, resolveComponent, useSSRContext, withCtx } from "vue";
//#region website/examples/choropleth.md
var __pageData = JSON.parse("{\"title\":\"Choropleth example\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"examples/choropleth.md\",\"filePath\":\"examples/choropleth.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "examples/choropleth.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ClientOnly = resolveComponent("ClientOnly");
	const _component_Map2DDemo = resolveComponent("Map2DDemo");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="choropleth-example" tabindex="-1">Choropleth example <a class="header-anchor" href="#choropleth-example" aria-label="Permalink to “Choropleth example”">​</a></h1><p>Use normalized values for a generated blue-to-red spectrum or pass explicit colors when the application owns its legend.</p><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">map.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">updateData</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">([</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  { id: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;CL-RM&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, name: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;Santiago Metropolitan Region&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, value: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">92</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  { id: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;CL-VS&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, name: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;Valparaíso Region&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, value: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">67</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, color: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;#7c3aed&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">]);</span></span></code></pre></div>`);
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("examples/choropleth.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var choropleth_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, choropleth_default as default };
