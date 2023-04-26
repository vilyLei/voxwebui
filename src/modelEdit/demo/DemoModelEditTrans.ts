import IVector3D from "../../vox/math/IVector3D";
import { IVoxUIScene } from "../../voxui/scene/IVoxUIScene";

import { ModuleLoader } from "../../cospace/modules/loaders/ModuleLoader";
import IRenderTexture from "../../vox/render/texture/IRenderTexture";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import { CoGeomDataType, CoDataFormat, CoGeomDataUnit } from "../../cospace/app/CoSpaceAppData";

import IRendererScene from "../../vox/scene/IRendererScene";
import { IRendererSceneAccessor } from "../../vox/scene/IRendererSceneAccessor";
import IRendererSceneGraph from "../../vox/scene/IRendererSceneGraph";
import { TransformController } from "../transform/TransformController";
import { UserEditEvent } from "../event/UserEditEvent";
import { IButton } from "../../voxui/button/IButton";
import { PostOutline } from "./effect/PostOutline";
import { UIRectLine } from "./edit/UIRectLine";
import { RectFrameQuery } from "./edit/RectFrameQuery";
import IRenderEntity from "../../vox/render/IRenderEntity";
import { ICoTransformRecorder } from "../recorde/ICoTransformRecorder";
import { CoTransformRecorder } from "../recorde/CoTransformRecorder";
import { KeyboardEvent, Keyboard, MouseEvent, RendererDevice, EventBase, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../../cospace/voxengine/ui/VoxUIInteraction";
import { ISelectButtonGroup } from "../../voxui/button/ISelectButtonGroup";
import { VoxUI } from "../../voxui/VoxUI";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import { IClipColorLabel } from "../../voxui/entity/IClipColorLabel";
import { Vector3D, VoxMath } from "../../cospace/math/VoxMath";
import { VoxEntity } from "../../cospace/voxentity/VoxEntity";
import IDataMesh from "../../vox/mesh/IDataMesh";
import { ICoKeyboardInteraction } from "../../cospace/voxengine/ui/ICoKeyboardInteraction";
import RenderStatusDisplay from "../../vox/scene/RenderStatusDisplay";
import { CoModelTeamLoader } from "../../cospace/app/common/CoModelTeamLoader";
import { CoEntityLayouter } from "../../cospace/app/common/CoEntityLayouter";

// declare var CoMath: ICoMath;


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
export class DemoModelEditTrans {
    private m_teamLoader = new CoModelTeamLoader();
	private m_edit3DUIRScene: IRendererScene = null;
	private m_outline: PostOutline;
	private m_scale = 20.0;

	constructor() { }

	initialize(): void {


		document.oncontextmenu = function (e) {
			e.preventDefault();
		}

		console.log("DemoModelEditTrans::initialize() ...");

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
		let url5 = "static/cospace/comesh/CoMesh.umd.js";
		let url6 = "static/cospace/coentity/CoEntity.umd.js";
		let url7 = "static/cospace/particle/CoParticle.umd.js";
		let url8 = "static/cospace/coMaterial/CoMaterial.umd.js";
		let url9 = " static/cospace/cotexture/CoTexture.umd.js";
        let url10 = "static/cospace/ui/Lib_VoxUI.umd.js";

		new ModuleLoader(2, (): void => {
			if (VoxRScene.isEnabled()) {
				console.log("engine modules loaded ...");

				new ModuleLoader(3, (): void => {

					console.log("math module loaded ...");

					new ModuleLoader(5, (): void => {
						console.log("ageom module loaded ...");

						VoxRScene.initialize();
						VoxMath.initialize();

						this.initRenderer();
						this.initMouseInteract();
						this.createEditEntity();
						this.initUIScene();

					}).load(url3).load(url6).load(url7).load(url9).load(url10);

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
		const mi = VoxUIInteraction.createMouseInteraction();
		mi.initialize(this.m_rscene, 2).setAutoRunning(true);
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

		this.m_edit3DUIRScene = subScene;
		graph.addScene(this.m_edit3DUIRScene);
		this.m_outline = new PostOutline(this.m_rscene);

		new RenderStatusDisplay(this.m_rscene, true);

		this.init3DScene();
	}
	private initUIScene(): void {

		let uisc = this.m_uiScene = VoxUI.createUIScene(this.m_graph);
		uisc.texAtlasNearestFilter = true;

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
		rscene.addEventListener(KeyboardEvent.KEY_DOWN, this, this.keyDown);
		rscene.addEventListener(MouseEvent.MOUSE_BG_CLICK, this, this.mouseClickListener);
		rscene.addEventListener(MouseEvent.MOUSE_UP, this, this.mouseUpListener, true, true);
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
		if (selectKey) {
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

		this.loadModels();
		return;
		const rsc = this.m_rscene;

		let material = VoxRScene.createDefaultMaterial(true);
		material.setRGB3f(0.7, 0.7, 0.7);
		material.setTextureList([ this.createTexByUrl()]);

		let sph = VoxEntity.createCube(100, material);
		let mesh = sph.getMesh() as IDataMesh;
		let uvsList = [mesh.getUVS()];
		let entity = this.createEntity({indices: mesh.getIVS(), vertices: mesh.getVS(), uvsList: uvsList});
		// entity.setXYZ(200,0,100);
		// entity = this.createEntity({indices: mesh.getIVS(), vertices: mesh.getVS(), uvsList: uvsList});
	}

	private m_transCtr: TransformController = null;
	private m_selectFrame: UIRectLine = null;
	private m_keyInterac: ICoKeyboardInteraction;
	private m_recoder: ICoTransformRecorder;
	private createEditEntity(): void {

		let edit3dsc = this.m_edit3DUIRScene;

		this.m_transCtr = new TransformController();
		this.m_transCtr.initialize(edit3dsc);
		this.m_transCtr.addEventListener(UserEditEvent.EDIT_BEGIN, this, this.trans3DEditBegin);
		this.m_transCtr.addEventListener(UserEditEvent.EDIT_END, this, this.trans3DEditEnd);
		this.m_prevPos = VoxMath.createVec3();
		this.m_currPos = VoxMath.createVec3();

		this.m_keyInterac = VoxUIInteraction.createKeyboardInteraction();
		this.m_keyInterac.initialize(this.m_rscene);

		let Key = Keyboard;
		let type = this.m_keyInterac.createKeysEventType([Key.CTRL, Key.Y]);
		this.m_keyInterac.addKeysDownListener(type, this, this.keyCtrlYDown);
		type = this.m_keyInterac.createKeysEventType([Key.CTRL, Key.Z]);
		this.m_keyInterac.addKeysDownListener(type, this, this.keyCtrlZDown);

		this.m_recoder = new CoTransformRecorder();
	}

	private keyCtrlZDown(evt: any): void {

		console.log("DemoModelEditTrans::keyCtrlZDown() ..., evt.keyCode: ", evt.keyCode);
		this.m_recoder.undo();
		let list = this.m_recoder.getCurrList();
		this.selectEntities(list);
	}
	private keyCtrlYDown(evt: any): void {

		console.log("DemoModelEditTrans::keyCtrlYDown() ..., evt.keyCode: ", evt.keyCode);
		this.m_recoder.redo();
		let list = this.m_recoder.getCurrList();
		this.selectEntities(list);
	}
	private m_prevPos: IVector3D;
	private m_currPos: IVector3D;
	private trans3DEditBegin(evt: any): void {
		console.log("XXXXXXXX Edit begin...");
		let list = evt.currentTarget.getTargetEntities();
		let st = this.m_rscene.getStage3D();
		this.m_prevPos.setXYZ(st.mouseX, st.mouseY, 0);
		this.m_recoder.saveBegin(list);
		this.m_selectFrame.disable();
	}
	private trans3DEditEnd(evt: any): void {
		console.log("XXXXXXXX Edit end...", this.m_prevPos, this.m_currPos);
		let st = this.m_rscene.getStage3D();
		this.m_currPos.setXYZ(st.mouseX, st.mouseY, 0);
		if (Vector3D.Distance(this.m_prevPos, this.m_currPos) > 0.5) {

			console.log("XXXXXXXX Edit transforming success ...");
			let list = evt.currentTarget.getTargetEntities();
			console.log("XXXXXXXX Edit transforming entity list: ", list);
			this.m_recoder.saveEnd(list);

		} else {
			this.m_recoder.saveEnd(null);
		}
		this.m_selectFrame.enable();
	}
	private uiMouseDownListener(evt: any): void {
		console.log("DemoModelEditTrans::uiMouseDownListener(), evt: ", evt);
		this.m_selectFrame.begin(evt.mouseX, evt.mouseY);
	}
	private uiMouseUpListener(evt: any): void {
		console.log("DemoModelEditTrans::uiMouseUpListener(), evt: ", evt);
		// console.log("ui up (x, y): ", evt.mouseX, evt.mouseY);
		if (this.m_selectFrame.isSelectEnabled()) {
			let b = this.m_selectFrame.bounds;
			console.log("DemoModelEditTrans::uiMouseUpListener(), b: ", b);
			let list = this.m_entityQuery.getEntities(b.min, b.max);
			console.log("list: ", list);
			this.selectEntities(list);
		}
		this.m_selectFrame.end(evt.mouseX, evt.mouseY);
	}
	private uiMouseMoveListener(evt: any): void {
		// console.log("DemoModelEditTrans::uiMouseMoveListener(), evt: ", evt);
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

		console.log("DemoModelEditTrans::keyDown() ..., evt.keyCode: ", evt.keyCode);

		let KEY = Keyboard;
		switch (evt.keyCode) {
			case KEY.W:
				this.m_transCtr.toTranslation();
				break;
			case KEY.E:
				this.m_transCtr.toScale();
				break;
			case KEY.R:
				this.m_transCtr.toRotation();
				break;
			default:
				break;
		}
	}
	private m_layouter = new CoEntityLayouter();
	private loadModels(): void {

		let baseUrl: string = "static/private/obj/";
		let url = baseUrl + "base.obj";
		url = baseUrl + "base4.obj";
		console.log("loadModels() init...");

		let loader = this.m_teamLoader;
        loader.load([url], (models: CoGeomDataType[], transforms: Float32Array[]): void => {

            this.m_layouter.layoutReset();
            for (let i = 0; i < models.length; ++i) {
                this.createEntity(models[i], transforms != null ? transforms[i] : null, 1.0);
            }
            this.m_layouter.layoutUpdate(300, VoxMath.createVec3(-400, 0, 0));
        });
	}
	private m_entityQuery: RectFrameQuery = null;
	private m_entities: ITransformEntity[] = [];
	private createEntity(model: CoGeomDataType, transform: Float32Array = null, index: number = 1.0): ITransformEntity {

		console.log("XXX XXXX model: ", model);
		let material = VoxRScene.createDefaultMaterial(true);
		// material.initializeByCodeBuf(false);
		material.setRGB3f(0.7, 0.7, 0.7);
		material.setTextureList([ this.createTexByUrl()]);
		material.initializeByCodeBuf( true );

		let mesh = VoxRScene.createDataMeshFromModel(model, material);
		let entity = VoxRScene.createMouseEventEntity();
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

		this.m_layouter.layoutAppendItem(entity, VoxRScene.createMat4(transform));

		return entity;
	}

	private mouseOverTargetListener(evt: any): void {
		// console.log("mouseOverTargetListener()..., evt.target: ", evt.target);
	}
	private mouseOutTargetListener(evt: any): void {
		// console.log("mouseOutTargetListener()..., evt.target: ", evt.target);
	}
	private mouseDownTargetListener(evt: any): void {
		console.log("mouseDownTargetListener()..., evt: ", evt);
		let entity = evt.target as ITransformEntity;
		this.selectEntities([entity], evt.wpos);
	}
	private selectEntities(list: IRenderEntity[], hitPV: IVector3D = null): void {

		if (list && list.length > 0) {
			let transCtr = this.m_transCtr;

			let pos = VoxMath.createVec3();

			for (let i = 0; i < list.length; ++i) {
				pos.addBy(list[i].getGlobalBounds().center);
			}
			pos.scaleBy(1.0 / list.length);

			if (transCtr) {
				// if(list.length == 1) {
				// 	hitPV = list[0].getGlobalBounds().center;
				// }
				// let boo = list.length == 1 && hitPV != null;
				// pos = boo ? hitPV : pos;
				transCtr.select(list as ITransformEntity[], pos);
				this.m_outline.select(list);
			}
		}
	}
	private mouseUpTargetListener(evt: any): void {
		console.log("mouseUpTargetListener() mouse up...");
	}
	private mouseUpListener(evt: any): void {

		if (this.m_transCtr) {
			this.m_transCtr.decontrol();
		}
	}
	private mouseClickListener(evt: any): void {

		if (this.m_transCtr) {
			this.m_transCtr.disable();
		}
		this.m_outline.deselect();
	}

	run(): void {
		if (this.m_graph) {
			if (this.m_transCtr) {
				this.m_transCtr.run();
			}
			this.m_graph.run();
		}
	}
}

export default DemoModelEditTrans;
