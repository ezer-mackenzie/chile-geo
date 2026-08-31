import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { createVNode, resolveComponent, useSSRContext, withCtx } from "vue";
//#region website/guide/canvas-2d.md
var __pageData = JSON.parse("{\"title\":\"Canvas 2D\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/canvas-2d.md\",\"filePath\":\"guide/canvas-2d.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/canvas-2d.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ClientOnly = resolveComponent("ClientOnly");
	const _component_Map2DDemo = resolveComponent("Map2DDemo");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="canvas-2d" tabindex="-1">Canvas 2D <a class="header-anchor" href="#canvas-2d" aria-label="Permalink to “Canvas 2D”">​</a></h1><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">import</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> { Chile2DMap } </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">from</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> &#39;@chile-geo/maps/2d&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">const</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> map</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> new</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> Chile2DMap</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  container: document.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">querySelector</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">&lt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">HTMLElement</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">&gt;(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;#map&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">!</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  defaultColor: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;#94a3b8&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  strokeColor: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;#fff&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">  onRegionClick</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">: (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">name</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">data</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> console.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">log</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(name, data),</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">});</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">map.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">updateData</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">([{ id: </span><span style="${ssrRenderStyle({
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
	})}">80</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> }]);</span></span></code></pre></div><p>The renderer observes its container and redraws without replacing its canvas. <code>pixelRatio</code> is clamped to <code>3</code> to limit memory use. Call <code>destroy()</code> when the owning view unmounts.</p>`);
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/canvas-2d.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var canvas_2d_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, canvas_2d_default as default };
