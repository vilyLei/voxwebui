import { IMouseInteraction } from "../../cospace/voxengine/ui/IMouseInteraction";
import { ICoRenderer } from "../../cospace/voxengine/ICoRenderer";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoTexture } from "../../cospace/voxtexture/ICoTexture";
import { IVoxUIScene } from "../../voxui/scene/IVoxUIScene";
import { VoxUIScene } from "../../voxui/scene/VoxUIScene";
import { CoMaterialContextParam, ICoRScene } from "../../cospace/voxengine/ICoRScene";

import { ICoUIInteraction } from "../../cospace/voxengine/ui/ICoUIInteraction";
import { ModuleLoader } from "../../cospace/modules/loaders/ModuleLoader";
import IRenderTexture from "../../vox/render/texture/IRenderTexture";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import { CoGeomDataType, CoDataFormat, CoGeomDataUnit } from "../../cospace/app/CoSpaceAppData";
import IVector3D from "../../vox/math/IVector3D";
import IRendererScene from "../../vox/scene/IRendererScene";
import { IRendererSceneAccessor } from "../../vox/scene/IRendererSceneAccessor";
import IRendererSceneGraph from "../../vox/scene/IRendererSceneGraph";
import { TransformController } from "../transform/TransformController";
import { UserEditEvent } from "../event/UserEditEvent";
import { IButton } from "../../voxui/button/IButton";
import { IClipLabel } from "../../voxui/entity/IClipLabel";
import { PostOutline } from "./effect/PostOutline";
import { UIRectLine } from "./edit/UIRectLine";;
import { IColorClipLabel } from "../../voxui/entity/IColorClipLabel";
import { RectFrameQuery } from "./edit/RectFrameQuery";
import IRenderEntity from "../../vox/render/IRenderEntity";
import { ICoTransformRecorder } from "../recorde/ICoTransformRecorder";
import { CoTransformRecorder } from "../recorde/CoTransformRecorder";
import { MouseEvent, RendererDevice, EventBase, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../../cospace/voxengine/ui/VoxUIInteraction";
import { ISelectButtonGroup } from "../../voxui/button/ISelectButtonGroup";
import { VoxUI } from "../../voxui/VoxUI";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import { IClipColorLabel } from "../../voxui/entity/IClipColorLabel";
import IMouseEvent from "../../vox/event/IMouseEvent";
import { VoxMath } from "../../cospace/math/VoxMath";
import { VoxEntity } from "../../cospace/voxentity/VoxEntity";
import IDataMesh from "../../vox/mesh/IDataMesh";

declare var CoRenderer: ICoRenderer;
declare var CoRScene: ICoRScene;
declare var CoUIInteraction: ICoUIInteraction;
declare var CoMath: ICoMath;


class SceneAccessor implements IRendererSceneAccessor {
	constructor() { }
	renderBegin(rendererScene: IRendererScene): void {
		let p = rendererScene.getRenderProxy();
		p.clearDepth(1.0);
	}
	renderEnd(rendererScene: IRendererScene): void {
	}
}
/**
 * cospace renderer
 */
export class DemoEditTrans {
	// private m_renderer: IRendererScene = null;
	private m_editUIRenderer: IRendererScene = null;
	private m_uiRenderer: IRendererScene = null;
	private m_coUIScene: IVoxUIScene = null;
	private m_interact: IMouseInteraction = null;

	private m_outline: PostOutline;
	private m_scale = 20.0;

	constructor() { }

	initialize(): void {


		document.oncontextmenu = function (e) {
			e.preventDefault();
		}

		console.log("DemoEditTrans::initialize() ...");

		this.initEngineModule();
	}
	private initEngineModule(): void {

		// let url = "static/cospace/engine/mouseInteract/CoMouseInteraction.umd.js";
		let url = "static/cospace/engine/uiInteract/CoUIInteraction.umd.js";
		let uiInteractML = new ModuleLoader(2, (): void => {
		});

		let url0 = "static/cospace/engine/renderer/CoRenderer.umd.js";
		let url1 = "static/cospace/engine/rscene/CoRScene.umd.js";
		let url2 = "static/cospace/math/CoMath.umd.js";
		let url3 = "static/cospace/ageom/CoAGeom.umd.js";
		let url4 = "static/cospace/coedit/CoEdit.umd.js";
		let url5 = "static/cospace/comesh/CoMesh.umd.js";
		let url6 = "static/cospace/coentity/CoEntity.umd.js";
		let url7 = "static/cospace/particle/CoParticle.umd.js";
		let url8 = "static/cospace/coMaterial/CoMaterial.umd.js";
		let url9 = " static/cospace/cotexture/CoTexture.umd.js";
        let url10 = "static/cospace/ui/Lib_VoxUI.umd.js";

		new ModuleLoader(2, (): void => {
			if (VoxRScene.isEnabled()) {
				console.log("engine modules loaded ...");
				// this.initRenderer();

				// this.initScene();
				new ModuleLoader(3, (): void => {

					console.log("math module loaded ...");

					new ModuleLoader(6, (): void => {
						console.log("ageom module loaded ...");
						// this.createEditEntity();
						// this.initUI();

						VoxRScene.initialize();
						VoxMath.initialize();

						this.initRenderer();
						this.initMouseInteract();
						this.createEditEntity();
						this.initUIScene();

					}).load(url3).load(url4).load(url6).load(url7).load(url9).load(url10);

				}).load(url2).load(url5).load(url8);


			}
		}).addLoader(uiInteractML)
			.load(url0)
			.load(url1);

		uiInteractML.load(url);
	}

	private m_graph: IRendererSceneGraph = null;
	private m_rscene: IRendererScene = null;
	private m_uiScene: IVoxUIScene = null;
	private initMouseInteract(): void {
		// const mi = VoxUIInteraction.createMouseInteraction();
		// mi.initialize(this.m_rscene).setAutoRunning(true);
	}
	private initRenderer(): void {

		document.body.style.overflow = "hidden";

		let RD = RendererDevice;
		/**
		 * 开启打印输出shader构建的相关信息
		 */
		RD.SHADERCODE_TRACE_ENABLED = false;
		RD.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;

		let graph = this.m_graph = VoxRScene.createRendererSceneGraph();

		let rparam = graph.createRendererSceneParam();
		rparam.setAttriAntialias(true);
		rparam.setCamPosition(1000.0, 1000.0, 1000.0);
		rparam.setCamProject(45, 20.0, 9000.0);
		this.m_rscene = graph.createScene(rparam);
		this.m_rscene.enableMouseEvent(true);
		// graph.setAutoRunning(true);
		VoxRScene.setRendererScene( this.m_rscene );

		let subScene = this.m_rscene.createSubScene(rparam, 3, false);
		subScene.enableMouseEvent(true);
		subScene.setAccessor(new SceneAccessor());

		this.m_editUIRenderer = subScene;
		graph.addScene(this.m_editUIRenderer);
		this.m_outline = new PostOutline(this.m_rscene);


		this.init3DScene();
	}
	private initUIScene(): void {

		let uisc = (this.m_uiScene = VoxUI.createUIScene(this.m_graph));
		uisc.texAtlasNearestFilter = true;
		// uisc.initialize(this.m_graph);

		uisc.rscene.addEventListener(MouseEvent.MOUSE_BG_DOWN, this, this.uiMouseDownListener);
		uisc.rscene.addEventListener(MouseEvent.MOUSE_UP, this, this.uiMouseUpListener);
		uisc.rscene.addEventListener(MouseEvent.MOUSE_MOVE, this, this.uiMouseMoveListener);

		this.initUIEntities();


		this.m_entityQuery = new RectFrameQuery();
		this.m_entityQuery.initialize(this.m_rscene);

		if (this.m_selectFrame == null) {
			this.m_selectFrame = new UIRectLine();
			this.m_selectFrame.initialize(uisc.rscene);
			this.m_selectFrame.enable();
		}

		this.m_transCtr.toTranslation();

		let rscene = this.m_rscene;
		// rscene.addEventListener(CoRScene.MouseEvent.MOUSE_BG_DOWN, this, this.mouseBgDownListener);
		rscene.addEventListener(CoRScene.KeyboardEvent.KEY_DOWN, this, this.keyDown);
		rscene.addEventListener(CoRScene.MouseEvent.MOUSE_BG_CLICK, this, this.mouseClickListener);
		rscene.addEventListener(CoRScene.MouseEvent.MOUSE_UP, this, this.mouseUpListener, true, true);
	}

	private m_btnGroup: ISelectButtonGroup;

	private createBtn(uuid: string, text: string, px: number, py: number): IButton {

		let textColor = VoxMaterial.createColor4(1, 1, 1, 1);

		let btn = VoxUI.createTextLabelButton(uuid, text, 170, 50, textColor);
		btn.setXY(px, py);
		this.m_uiScene.addEntity(btn);
		btn.addEventListener(MouseEvent.MOUSE_UP, this, this.btnMouseUpListener);
		this.applyDeselectColors(btn);
		this.m_btnGroup.addButton(btn);
		return btn;
	}
	private initUIEntities(): void {

		this.m_btnGroup = VoxUI.createSelectButtonGroup();

		let selectBtn = this.createBtn("select", "框选", 200, 310);
		let moveBtn = this.createBtn("move", "移动", 200, 240);
		let rotateBtn = this.createBtn("rotate", "旋转", 200, 170);
		let scaleBtn = this.createBtn("scale", "缩放", 200, 100);

		this.m_btnGroup.setSelectedFunction(
			(btn: IButton): void => {
				this.applySelectColors(btn);
			},
			(btn: IButton): void => {
				this.applyDeselectColors(btn);
			}
		);
		let selectKey = moveBtn.uuid;
		if (selectKey != "") {
			this.m_btnGroup.select(selectKey);
		}
	}
	private applySelectColors(btn: IButton): void {
		let colorHexList = [0x4caf50, 0xaaac6a, 0x6ccf70];

		let label = btn.getLable() as IClipColorLabel;
		label.setColorsWithHex(colorHexList);
	}
	private applyDeselectColors(btn: IButton): void {
		let colorHexList = [0x5dbea3, 0x33b249, 0x5adbb5];
		let label = btn.getLable() as IClipColorLabel;
		label.setColorsWithHex(colorHexList);
	}
	private init3DScene(): void {
		const rsc = this.m_rscene;
		// let axis = VoxEntity.createAxis3DEntity(300);
		// rsc.addEntity(axis);
		// let sph = VoxEntity.createSphere(50, 20, 20);

		let sph = VoxEntity.createCube(100);
		let mesh = sph.getMesh() as IDataMesh;
		// rsc.addEntity(sph);
		let entity = this.createEntity({indices: mesh.getIVS(), vertices: mesh.getVS()});
		entity.setXYZ(200,0,100);
		entity = this.createEntity({indices: mesh.getIVS(), vertices: mesh.getVS()});
	}

	private m_transCtr: TransformController = null;
	private m_selectFrame: UIRectLine = null;
	// private m_keyInterac: ICoKeyboardInteraction;
	private m_recoder: ICoTransformRecorder;
	private createEditEntity(): void {

		let editsc = this.m_editUIRenderer;

		this.m_transCtr = new TransformController();
		this.m_transCtr.initialize(editsc);
		this.m_transCtr.addEventListener(UserEditEvent.EDIT_BEGIN, this, this.editBegin);
		this.m_transCtr.addEventListener(UserEditEvent.EDIT_END, this, this.editEnd);
		this.m_prevPos = CoMath.createVec3();
		this.m_currPos = CoMath.createVec3();

		// this.m_keyInterac = new CoKeyboardInteraction();
		// this.m_keyInterac.initialize(this.m_renderer);

		// let Key = CoRScene.Keyboard;
		// let type = this.m_keyInterac.createKeysEventType([Key.CTRL, Key.Y]);
		// this.m_keyInterac.addKeysDownListener(type, this, this.keyCtrlYDown);
		// type = this.m_keyInterac.createKeysEventType([Key.CTRL, Key.Z]);
		// this.m_keyInterac.addKeysDownListener(type, this, this.keyCtrlZDown);

		this.m_recoder = new CoTransformRecorder();
	}

	private keyCtrlZDown(evt: any): void {

		console.log("DemoEditTrans::keyCtrlZDown() ..., evt.keyCode: ", evt.keyCode);
		this.m_recoder.undo();
		let list = this.m_recoder.getCurrList();
		this.selectEntities(list);
	}
	private keyCtrlYDown(evt: any): void {

		console.log("DemoEditTrans::keyCtrlYDown() ..., evt.keyCode: ", evt.keyCode);
		this.m_recoder.redo();
		let list = this.m_recoder.getCurrList();
		this.selectEntities(list);
	}
	private m_prevPos: IVector3D;
	private m_currPos: IVector3D;
	private editBegin(evt: any): void {
		// this.m_transCtr
		console.log("XXXXXXXX Edit begin...");
		let list = evt.currentTarget.getTargetEntities();
		let st = this.m_rscene.getStage3D();
		this.m_prevPos.setXYZ(st.mouseX, st.mouseY, 0);
		this.m_recoder.saveBegin(list);
	}
	private editEnd(evt: any): void {
		console.log("XXXXXXXX Edit end...", this.m_prevPos, this.m_currPos);
		let st = this.m_rscene.getStage3D();
		this.m_currPos.setXYZ(st.mouseX, st.mouseY, 0);
		if (CoMath.Vector3D.Distance(this.m_prevPos, this.m_currPos) > 0.5) {

			console.log("XXXXXXXX Edit transforming success ...");
			let list = evt.currentTarget.getTargetEntities();
			// let list = tar.getTargets();
			console.log("XXXXXXXX Edit transforming entity list: ", list);
			this.m_recoder.saveEnd(list);

		} else {
			this.m_recoder.saveEnd(null);
		}
	}
	private uiMouseDownListener(evt: any): void {
		console.log("DemoEditTrans::uiMouseDownListener(), evt: ", evt);
		this.m_selectFrame.begin(evt.mouseX, evt.mouseY);
	}
	private uiMouseUpListener(evt: any): void {
		console.log("DemoEditTrans::uiMouseUpListener(), evt: ", evt);
		// console.log("ui up (x, y): ", evt.mouseX, evt.mouseY);
		if (this.m_selectFrame.isSelectEnabled()) {
			let b = this.m_selectFrame.bounds;
			let list = this.m_entityQuery.getEntities(b.min, b.max);
			console.log("list: ", list);
			this.selectEntities(list);
		}
		this.m_selectFrame.end(evt.mouseX, evt.mouseY);
	}
	private uiMouseMoveListener(evt: any): void {
		// console.log("DemoEditTrans::uiMouseMoveListener(), evt: ", evt);
		// console.log("ui move (x, y): ", evt.mouseX, evt.mouseY);
		this.m_selectFrame.move(evt.mouseX, evt.mouseY);
	}
	private btnMouseUpListener(evt: any): void {

		console.log("btnMouseUpListener(), evt.uuid: ", evt.uuid);
		let uuid = evt.uuid;
		switch (uuid) {
			case "move":
				this.m_transCtr.toTranslation();
				break;
			case "scale":
				this.m_transCtr.toScale();
				break;
			case "rotate":
				this.m_transCtr.toRotation();
				this
				break;

			case "select":

				// this.m_selectFrame.enable();
				break;
			default:
				break;
		}
		// this.selectBtn(evt.currentTarget as IButton);
	}
	private createTexByUrl(url: string = ""): IRenderTexture {

		let tex = this.m_rscene.textureBlock.createImageTex2D(64, 64, false);

		// this.m_plane = new Plane3DEntity();
		// this.m_plane.initializeXOZ(-400.0, -400.0, 800.0, 800.0, [tex]);
		// this.m_renderer.addEntity(this.m_plane);

		let img = new Image();
		img.onload = (evt: any): void => {
			tex.setDataFromImage(img, 0, 0, 0, false);
		}
		img.src = url != "" ? url : "static/assets/box.jpg";
		return tex;
	}

	private keyDown(evt: any): void {

		console.log("DemoEditTrans::keyDown() ..., evt.keyCode: ", evt.keyCode);

		let KEY = CoRScene.Keyboard;
		switch (evt.keyCode) {
			case KEY.W:
				// this.selectBtn(this.m_transBtns[0]);
				this.m_transCtr.toTranslation();
				break;
			case KEY.E:
				// this.selectBtn(this.m_transBtns[1]);
				this.m_transCtr.toScale();
				break;
			case KEY.R:
				// this.selectBtn(this.m_transBtns[2]);
				this.m_transCtr.toRotation();
				break;
			default:
				break;
		}
	}
	private loadOBJ(): void {
		let baseUrl: string = "static/private/obj/";
		let url = baseUrl + "base.obj";
		url = baseUrl + "base4.obj";
		console.log("loadOBJ() init...");
		this.loadGeomModel(url, CoDataFormat.OBJ);
	}

	loadGeomModel(url: string, format: CoDataFormat): void {

	}
	private createEntityFromUnit(unit: CoGeomDataUnit, status: number = 0): void {

		let len = unit.data.models.length;
		let m_scale = this.m_scale;
		for (let i = 0; i < len; ++i) {
			let entity = this.createEntity(unit.data.models[i]);
			entity.setScaleXYZ(m_scale, m_scale, m_scale);
		}

		// this.m_recoder.save( this.m_entities );
	}
	private m_entityQuery: RectFrameQuery = null;
	private m_entities: ITransformEntity[] = [];
	private createEntity(model: CoGeomDataType): ITransformEntity {
		// let rst = CoRenderer.RendererState;

		const MouseEvent = CoRScene.MouseEvent;
		// let material = new CoNormalMaterial().build().material;
		let material = CoRScene.createDefaultMaterial(true);
		material.initializeByCodeBuf(false);
		material.setRGB3f(0.7, 0.7, 0.7);

		let mesh = CoRScene.createDataMeshFromModel(model, material);
		let entity = CoRScene.createMouseEventEntity();
		entity.setMaterial(material);
		entity.setMesh(mesh);
		// entity.setPosition(cv);
		// entity.setRenderState(rst.NONE_CULLFACE_NORMAL_STATE);
		this.m_rscene.addEntity(entity);

		entity.addEventListener(MouseEvent.MOUSE_OVER, this, this.mouseOverTargetListener);
		entity.addEventListener(MouseEvent.MOUSE_OUT, this, this.mouseOutTargetListener);
		entity.addEventListener(MouseEvent.MOUSE_DOWN, this, this.mouseDownTargetListener);
		entity.addEventListener(MouseEvent.MOUSE_UP, this, this.mouseUpTargetListener);

		this.m_entities.push(entity);
		return entity;
	}

	private mouseOverTargetListener(evt: any): void {
		console.log("mouseOverTargetListener()..., evt.target: ", evt.target);
	}
	private mouseOutTargetListener(evt: any): void {
		console.log("mouseOutTargetListener()..., evt.target: ", evt.target);
	}
	private mouseDownTargetListener(evt: any): void {
		console.log("mouseDownTargetListener()..., evt.target: ", evt.target);
		let entity = evt.target as ITransformEntity;
		this.selectEntities([entity]);
	}
	private selectEntities(list: IRenderEntity[]): void {

		if (list != null && list.length > 0) {
			let transCtr = this.m_transCtr;

			let pos = CoMath.createVec3();
			let pv = CoMath.createVec3();

			for (let i = 0; i < list.length; ++i) {
				pos.addBy(list[i].getPosition(pv));
			}
			pos.scaleBy(1.0 / list.length);

			if (transCtr != null) {
				transCtr.select(list as ITransformEntity[], pos);
				this.m_outline.select(list);
			}
		}
	}
	private mouseUpTargetListener(evt: any): void {
		console.log("mouseUpTargetListener() mouse up...");
	}
	private mouseUpListener(evt: any): void {

		console.log("OOO XXXXX DemoEditTrans::mouseUpListener() ...");
		if (this.m_transCtr != null) {
			this.m_transCtr.decontrol();
		}
	}
	private mouseClickListener(evt: any): void {

		if (this.m_transCtr != null) {
			this.m_transCtr.disable();
		}
		this.m_outline.deselect();
	}

	run(): void {
		if (this.m_graph) {
			if (this.m_transCtr != null) {
				this.m_transCtr.run();
			}
			this.m_graph.run();
		}
	}
}

export default DemoEditTrans;
