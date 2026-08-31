import { a as polygonsOf, c as finitePositiveOption, l as prepareDataSeries, n as getBounds, o as project, r as metricColor, s as finiteNonNegativeOption, t as createViewportTransform, u as chile_topography_default } from "./geometry.8EWrGvos.js";
//#region packages/map-render/src/maps/Chile2DMap.ts
var geography = chile_topography_default;
var Chile2DMap = class {
	canvas;
	context;
	options;
	data = /* @__PURE__ */ new Map();
	paths = /* @__PURE__ */ new Map();
	resizeObserver;
	frame;
	hovered;
	focusedIndex = 0;
	destroyed = false;
	constructor(options) {
		if (!options.container) throw new TypeError("Chile2DMap requires a container element.");
		this.options = {
			...options,
			pixelRatio: Math.min(finitePositiveOption(options.pixelRatio, window.devicePixelRatio || 1, "pixelRatio"), 3),
			strokeWidth: finiteNonNegativeOption(options.strokeWidth, .75, "strokeWidth")
		};
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute("aria-label", "Interactive map of Chile");
		this.canvas.setAttribute("role", "img");
		this.canvas.tabIndex = 0;
		this.canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:none";
		const context = this.canvas.getContext("2d");
		if (!context) throw new Error("Canvas 2D is not supported by this browser.");
		this.context = context;
		options.container.append(this.canvas);
		this.resizeObserver = new ResizeObserver(() => this.scheduleDraw());
		this.resizeObserver.observe(options.container);
		this.canvas.addEventListener("pointermove", this.handlePointerMove);
		this.canvas.addEventListener("pointerleave", this.handlePointerLeave);
		this.canvas.addEventListener("click", this.handleClick);
		this.canvas.addEventListener("keydown", this.handleKeyDown);
		this.scheduleDraw();
	}
	updateData(dataSeries) {
		const prepared = prepareDataSeries(dataSeries, geography);
		this.data.clear();
		for (const [id, item] of prepared.byId) this.data.set(id, item);
		this.scheduleDraw();
	}
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		this.resizeObserver.disconnect();
		if (this.frame !== void 0) cancelAnimationFrame(this.frame);
		this.canvas.removeEventListener("pointermove", this.handlePointerMove);
		this.canvas.removeEventListener("pointerleave", this.handlePointerLeave);
		this.canvas.removeEventListener("click", this.handleClick);
		this.canvas.removeEventListener("keydown", this.handleKeyDown);
		this.canvas.remove();
	}
	scheduleDraw() {
		if (this.destroyed || this.frame !== void 0) return;
		this.frame = requestAnimationFrame(() => {
			this.frame = void 0;
			this.draw();
		});
	}
	draw() {
		const rect = this.options.container.getBoundingClientRect();
		const width = Math.max(1, rect.width);
		const height = Math.max(1, rect.height);
		const ratio = this.options.pixelRatio ?? 1;
		this.canvas.width = Math.round(width * ratio);
		this.canvas.height = Math.round(height * ratio);
		this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
		this.context.clearRect(0, 0, width, height);
		const transform = createViewportTransform(getBounds(geography), width, height);
		const maximum = Math.max(0, ...[...this.data.values()].map((item) => item.value));
		this.paths.clear();
		for (const feature of geography.features) {
			const path = new Path2D();
			for (const polygon of polygonsOf(feature)) for (const ring of polygon) {
				ring.forEach((position, index) => {
					const [x, y] = project(position, transform);
					if (index === 0) path.moveTo(x, y);
					else path.lineTo(x, y);
				});
				path.closePath();
			}
			const item = this.data.get(feature.properties.id);
			this.context.fillStyle = item?.color ?? metricColor(item?.value ?? 0, maximum, this.options.defaultColor ?? "#94a3b8");
			this.context.fill(path, "evenodd");
			this.context.strokeStyle = this.options.strokeColor ?? "#ffffff";
			this.context.lineWidth = this.options.strokeWidth ?? .75;
			this.context.stroke(path);
			this.paths.set(feature, path);
		}
	}
	featureAt(event) {
		const rect = this.canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		return [...this.paths].reverse().find(([, path]) => this.context.isPointInPath(path, x, y, "evenodd"))?.[0];
	}
	handlePointerMove = (event) => {
		const feature = this.featureAt(event);
		this.canvas.style.cursor = feature ? "pointer" : "default";
		if (feature === this.hovered) return;
		this.hovered = feature;
		if (feature) this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
	};
	handlePointerLeave = () => {
		this.hovered = void 0;
		this.canvas.style.cursor = "default";
	};
	handleClick = (event) => {
		const feature = this.featureAt(event);
		if (feature) this.options.onRegionClick?.(feature.properties.name, this.data.get(feature.properties.id));
	};
	handleKeyDown = (event) => {
		if (![
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"Enter",
			" "
		].includes(event.key)) return;
		event.preventDefault();
		if (event.key === "Enter" || event.key === " ") {
			const feature = geography.features[this.focusedIndex];
			if (feature) this.options.onRegionClick?.(feature.properties.name, this.data.get(feature.properties.id));
			return;
		}
		const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
		this.focusedIndex = (this.focusedIndex + direction + geography.features.length) % geography.features.length;
		const feature = geography.features[this.focusedIndex];
		if (feature) {
			this.canvas.setAttribute("aria-label", `Interactive map of Chile. Selected: ${feature.properties.name}`);
			this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
		}
	};
};
//#endregion
export { Chile2DMap };
