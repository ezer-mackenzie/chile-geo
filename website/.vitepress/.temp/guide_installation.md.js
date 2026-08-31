import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/guide/installation.md
var __pageData = JSON.parse("{\"title\":\"Installation\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/installation.md\",\"filePath\":\"guide/installation.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/installation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to “Installation”">​</a></h1><p>Install the map package with Bun:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">bun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> add</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> @chile-geo/maps</span></span></code></pre></div><p>For 3D maps, also install the optional peer dependency:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">bun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> add</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> three</span></span></code></pre></div><p>Use <code>@chile-geo/maps/2d</code> for Canvas applications and <code>@chile-geo/maps/3d</code> for WebGL applications. The combined root export is convenient for tools, but subpath imports provide the clearest dependency boundary.</p><p>The host element must have a non-zero width and height. The library targets modern browsers and does not fetch geographic data at runtime.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/installation.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var installation_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, installation_default as default };
