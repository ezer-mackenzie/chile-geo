import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/guide/lifecycle.md
var __pageData = JSON.parse("{\"title\":\"Lifecycle and accessibility\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/lifecycle.md\",\"filePath\":\"guide/lifecycle.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/lifecycle.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="lifecycle-and-accessibility" tabindex="-1">Lifecycle and accessibility <a class="header-anchor" href="#lifecycle-and-accessibility" aria-label="Permalink to “Lifecycle and accessibility”">​</a></h1><p>Create one map per host and retain the instance. Update it rather than recreating it. Call <code>destroy()</code> during component or route cleanup; repeated calls are safe.</p><p>Each renderer exposes a focusable element with an accessible label. Arrow keys move through regions, and Enter or Space invokes <code>onRegionClick</code>. Pointer hover and click remain available. Place changing selection text in an application-owned <code>aria-live</code> region when screen-reader announcements are required.</p><p>Framework pattern:</p><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">onMounted</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(() </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> { map </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> new</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> Chile2DMap</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">({ container: host }); });</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">onBeforeUnmount</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(() </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> map.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">destroy</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">());</span></span></code></pre></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/lifecycle.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var lifecycle_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, lifecycle_default as default };
