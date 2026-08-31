import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region website/reference/data.md
var __pageData = JSON.parse("{\"title\":\"Geographic data\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"reference/data.md\",\"filePath\":\"reference/data.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "reference/data.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="geographic-data" tabindex="-1">Geographic data <a class="header-anchor" href="#geographic-data" aria-label="Permalink to “Geographic data”">​</a></h1><p>The package bundles 16 simplified regional boundaries derived from Biblioteca del Congreso Nacional de Chile vector data. Coordinates use WGS84 and at most four decimal places. Only identifiers and standardized English names are retained.</p><p>This data is suitable for dashboards and thematic visualization. It is not suitable for surveying, cadastral work, navigation, or legal boundary decisions. The generated metadata records the source snapshot date, coordinate precision, feature count, and SHA-256 checksum.</p><table tabindex="0"><thead><tr><th>ID</th><th>English label</th></tr></thead><tbody><tr><td><code>CL-AI</code></td><td>Aysén Region</td></tr><tr><td><code>CL-AN</code></td><td>Antofagasta Region</td></tr><tr><td><code>CL-AP</code></td><td>Arica and Parinacota Region</td></tr><tr><td><code>CL-AR</code></td><td>Araucanía Region</td></tr><tr><td><code>CL-AT</code></td><td>Atacama Region</td></tr><tr><td><code>CL-BI</code></td><td>Biobío Region</td></tr><tr><td><code>CL-CO</code></td><td>Coquimbo Region</td></tr><tr><td><code>CL-LI</code></td><td>O&#39;Higgins Region</td></tr><tr><td><code>CL-LL</code></td><td>Los Lagos Region</td></tr><tr><td><code>CL-LR</code></td><td>Los Ríos Region</td></tr><tr><td><code>CL-MA</code></td><td>Magallanes and Chilean Antarctica Region</td></tr><tr><td><code>CL-ML</code></td><td>Maule Region</td></tr><tr><td><code>CL-NB</code></td><td>Ñuble Region</td></tr><tr><td><code>CL-RM</code></td><td>Santiago Metropolitan Region</td></tr><tr><td><code>CL-TA</code></td><td>Tarapacá Region</td></tr><tr><td><code>CL-VS</code></td><td>Valparaíso Region</td></tr></tbody></table></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/data.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var data_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, data_default as default };
