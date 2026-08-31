import { a as polygonsOf, c as finitePositiveOption, i as normalizedValue, l as prepareDataSeries, n as getBounds, r as metricColor, u as chile_topography_default } from "./geometry.8EWrGvos.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//#region packages/map-render/src/maps/Chile3DMap.ts
var geography = chile_topography_default;
var bounds = getBounds(geography);
var centerX = (bounds.minX + bounds.maxX) / 2;
var centerY = (bounds.minY + bounds.maxY) / 2;
var Chile3DMap = class {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(42, 1, .1, 200);
	renderer;
	mainGroup = new THREE.Group();
	options;
	raycaster = new THREE.Raycaster();
	pointer = new THREE.Vector2();
	regions = /* @__PURE__ */ new Map();
	data = /* @__PURE__ */ new Map();
	resizeObserver;
	controls;
	animationFrame = 0;
	focusedIndex = 0;
	hoveredId;
	destroyed = false;
	constructor(options) {
		if (!options.container) throw new TypeError("Chile3DMap requires a container element.");
		this.options = {
			...options,
			maxExtrusionDepth: finitePositiveOption(options.maxExtrusionDepth, 3, "maxExtrusionDepth")
		};
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		this.renderer.domElement.setAttribute("aria-label", "Interactive 3D map of Chile");
		this.renderer.domElement.setAttribute("role", "img");
		this.renderer.domElement.tabIndex = 0;
		this.renderer.domElement.style.cssText = "display:block;width:100%;height:100%;touch-action:none";
		options.container.append(this.renderer.domElement);
		this.mainGroup.name = "ChileMainGroup";
		this.scene.add(this.mainGroup);
		this.scene.add(new THREE.HemisphereLight(16777215, 3359061, 2.2));
		const directional = new THREE.DirectionalLight(16777215, 2.5);
		directional.position.set(12, -8, 30);
		this.scene.add(directional);
		this.camera.position.set(0, -3, 53);
		this.camera.lookAt(0, 0, 0);
		if (options.enableControls) {
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.controls.enableDamping = true;
			this.controls.addEventListener("change", this.render);
			this.controls.target.set(0, 0, 0);
		}
		this.createRegions();
		this.resizeObserver = new ResizeObserver(this.resize);
		this.resizeObserver.observe(options.container);
		this.renderer.domElement.addEventListener("pointermove", this.handlePointerMove);
		this.renderer.domElement.addEventListener("pointerleave", this.handlePointerLeave);
		this.renderer.domElement.addEventListener("click", this.handleClick);
		this.renderer.domElement.addEventListener("keydown", this.handleKeyDown);
		this.resize();
		if (this.controls) this.animate();
		else this.render();
	}
	updateData(dataSeries) {
		const prepared = prepareDataSeries(dataSeries, geography);
		this.data.clear();
		for (const [id, item] of prepared.byId) this.data.set(id, item);
		const maximum = prepared.maximum;
		for (const [id, group] of this.regions) {
			const item = this.data.get(id);
			group.userData.metric = item;
			const depth = Math.max(.04, normalizedValue(item?.value ?? 0, maximum) * (this.options.maxExtrusionDepth ?? 3));
			for (const child of group.children) {
				const mesh = child;
				mesh.userData = item ? {
					...item,
					regionId: id,
					regionName: group.userData.regionName
				} : {
					regionId: id,
					regionName: group.userData.regionName
				};
				mesh.scale.z = depth;
				mesh.material.color.set(item?.color ?? metricColor(item?.value ?? 0, maximum, this.options.defaultColor ?? "#94a3b8"));
			}
		}
		this.render();
	}
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		cancelAnimationFrame(this.animationFrame);
		this.resizeObserver.disconnect();
		this.controls?.dispose();
		this.controls?.removeEventListener("change", this.render);
		this.renderer.domElement.removeEventListener("pointermove", this.handlePointerMove);
		this.renderer.domElement.removeEventListener("pointerleave", this.handlePointerLeave);
		this.renderer.domElement.removeEventListener("click", this.handleClick);
		this.renderer.domElement.removeEventListener("keydown", this.handleKeyDown);
		this.mainGroup.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				object.geometry.dispose();
				object.material.dispose();
			}
		});
		this.renderer.dispose();
		this.renderer.domElement.remove();
	}
	createRegions() {
		for (const feature of geography.features) {
			const group = new THREE.Group();
			group.name = feature.properties.name;
			group.userData = {
				regionId: feature.properties.id,
				regionName: feature.properties.name
			};
			for (const polygon of polygonsOf(feature)) {
				const shape = this.createShape(polygon);
				const geometry = new THREE.ExtrudeGeometry(shape, {
					depth: 1,
					bevelEnabled: false,
					curveSegments: 1
				});
				const material = new THREE.MeshStandardMaterial({
					color: this.options.defaultColor ?? "#94a3b8",
					roughness: .72,
					metalness: .04
				});
				const mesh = new THREE.Mesh(geometry, material);
				mesh.userData = {
					regionId: feature.properties.id,
					regionName: feature.properties.name
				};
				group.add(mesh);
			}
			this.regions.set(feature.properties.id, group);
			this.mainGroup.add(group);
		}
	}
	createShape(polygon) {
		const outer = polygon[0] ?? [];
		const shape = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2(x - centerX, y - centerY)));
		for (const ring of polygon.slice(1)) shape.holes.push(new THREE.Path(ring.map(([x, y]) => new THREE.Vector2(x - centerX, y - centerY))));
		return shape;
	}
	resize = () => {
		const { width, height } = this.options.container.getBoundingClientRect();
		const safeWidth = Math.max(1, width), safeHeight = Math.max(1, height);
		this.camera.aspect = safeWidth / safeHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
		this.renderer.setSize(safeWidth, safeHeight, false);
		this.render();
	};
	render = () => {
		if (!this.destroyed) this.renderer.render(this.scene, this.camera);
	};
	animate = () => {
		if (this.destroyed) return;
		this.animationFrame = requestAnimationFrame(this.animate);
		this.controls?.update();
		this.render();
	};
	intersect(event) {
		const rect = this.renderer.domElement.getBoundingClientRect();
		this.pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
		this.raycaster.setFromCamera(this.pointer, this.camera);
		return this.raycaster.intersectObjects(this.mainGroup.children, true)[0]?.object;
	}
	handlePointerMove = (event) => {
		const id = this.intersect(event)?.userData["regionId"];
		this.renderer.domElement.style.cursor = id ? "pointer" : "default";
		if (!id || id === this.hoveredId) return;
		this.hoveredId = id;
		const region = this.regions.get(id);
		if (region) this.options.onRegionHover?.(region.userData.regionName, this.data.get(id));
	};
	handlePointerLeave = () => {
		this.hoveredId = void 0;
		this.renderer.domElement.style.cursor = "default";
	};
	handleClick = (event) => {
		const id = this.intersect(event)?.userData["regionId"];
		const region = id ? this.regions.get(id) : void 0;
		if (id && region) this.options.onRegionClick?.(region.userData.regionName, this.data.get(id));
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
			this.renderer.domElement.setAttribute("aria-label", `Interactive 3D map of Chile. Selected: ${feature.properties.name}`);
			this.options.onRegionHover?.(feature.properties.name, this.data.get(feature.properties.id));
		}
	};
};
//#endregion
export { Chile3DMap };
