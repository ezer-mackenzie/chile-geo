import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { createVNode, resolveComponent, useSSRContext, withCtx } from "vue";
//#region website/guide/webgl-3d.md
var __pageData = JSON.parse("{\"title\":\"WebGL 3D\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/webgl-3d.md\",\"filePath\":\"guide/webgl-3d.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/webgl-3d.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ClientOnly = resolveComponent("ClientOnly");
	const _component_Map3DDemo = resolveComponent("Map3DDemo");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="webgl-3d" tabindex="-1">WebGL 3D <a class="header-anchor" href="#webgl-3d" aria-label="Permalink to “WebGL 3D”">​</a></h1><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> { Chile3DMap } </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">from</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> &#39;@chile-geo/maps/3d&#39;</span><span style="${ssrRenderStyle({
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
	})}"> Chile3DMap</span><span style="${ssrRenderStyle({
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
	})}">  enableControls: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">true</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  maxExtrusionDepth: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
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
	})}">&#39;CL-MA&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, name: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;Magallanes and Chilean Antarctica Region&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, value: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">70</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> }]);</span></span></code></pre></div><p>Three.js is an optional peer dependency. Without controls, the renderer draws on demand after construction, resize, and data updates. With controls enabled, it renders continuously for damped interaction. Construction throws when WebGL is unavailable; applications that require a fallback should catch that error and create <code>Chile2DMap</code>.</p>`);
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/webgl-3d.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var webgl_3d_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, webgl_3d_default as default };
