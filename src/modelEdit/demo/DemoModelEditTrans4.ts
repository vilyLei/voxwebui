import IVector3D from "../../vox/math/IVector3D";
import { IVoxUIScene } from "../../voxui/scene/IVoxUIScene";

import { CoModuleVersion, CoModuleLoader } from "../../cospace/app/utils/CoModuleLoader";
import IRenderTexture from "../../vox/render/texture/IRenderTexture";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import { CoGeomDataType } from "../../cospace/app/CoSpaceAppData";

import IRendererScene from "../../vox/scene/IRendererScene";
import { IRendererSceneAccessor } from "../../vox/scene/IRendererSceneAccessor";
import IRendererSceneGraph from "../../vox/scene/IRendererSceneGraph";

import { UserEditEvent } from "../event/UserEditEvent";
import { IButton } from "../../voxui/button/IButton";
import { PostOutline } from "./effect/PostOutline";
import IRenderEntity from "../../vox/render/IRenderEntity";
import { ICoTransformRecorder } from "../recorde/ICoTransformRecorder";
import { SelectionEvent, KeyboardEvent, Keyboard, MouseEvent, RendererDevice, VoxRScene } from "../../cospace/voxengine/VoxRScene";

import { VoxUIInteraction } from "../../cospace/voxengine/ui/VoxUIInteraction";
import { ISelectButtonGroup } from "../../voxui/button/ISelectButtonGroup";
import { VoxUI } from "../../voxui/VoxUI";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import { Vector3D, VoxMath } from "../../cospace/math/VoxMath";
import { VoxEntity } from "../../cospace/voxentity/VoxEntity";
import IDataMesh from "../../vox/mesh/IDataMesh";
import { ICoKeyboardInteraction } from "../../cospace/voxengine/ui/ICoKeyboardInteraction";
import { IRectFrameQuery, ITransformController, IUIRectLine, VoxModelEdit } from "../VoxModelEdit";

import { CoModelTeamLoader } from "../../cospace/app/common/CoModelTeamLoader";
import { CoEntityLayouter } from "../../cospace/app/common/CoEntityLayouter";
import RenderStatusDisplay from "../../vox/scene/RenderStatusDisplay";
import { ICtrlValueFilter } from "../base/ICtrlValueFilter";
import { ISelectionEntity } from "../../voxui/component/ISelectionEntity";
import ISelectionEvent from "../../vox/event/ISelectionEvent";
import URLFilter from "../../cospace/app/utils/URLFilter";
import { HttpFileLoader } from "../../cospace/modules/loaders/HttpFileLoader";

// declare var CoMath: ICoMath;

class SceneAccessor implements IRendererSceneAccessor {
	constructor() {}
	renderBegin(rendererScene: IRendererScene): void {
		let p = rendererScene.getRenderProxy();
		p.clearDepth(1.0);
	}
	renderEnd(rendererScene: IRendererScene): void {}
}
/**
 * cospace renderer
 */
export class DemoModelEditTrans4 {
	private m_verTool: CoModuleVersion = null;
	private m_teamLoader = new CoModelTeamLoader();
	private m_edit3DUIRScene: IRendererScene = null;
	private m_outline: PostOutline;

	constructor() {}

	initialize(): void {
		document.oncontextmenu = function(e) {
			e.preventDefault();
		};

		console.log("DemoModelEditTrans4::initialize() ...");

		// this.initEngineModule();
		this.loadInfo();
	}
	private loadInfo(): void {

		let url = "static/cospace/info.json";
		url = URLFilter.filterUrl(url);
		let httpLoader = new HttpFileLoader();
		httpLoader.load(url, (data: object, url: string): void => {
			console.log("loadInfo loaded data: ", data);
			this.m_verTool = new CoModuleVersion( data );
			this.initEngineModule();
		},
		null,
		null,
		"json"
		);
	}
	private initEngineModule(): void {

		let url = "static/cospace/engine/uiInteract/CoUIInteraction.umd.js";
		let uiInteractML = new CoModuleLoader(2, (): void => {});

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
		let url11 = "static/cospace/modelEdit/Lib_VoxModelEdit.umd.js";

		new CoModuleLoader(2, (): void => {

			if (VoxRScene.isEnabled()) {

				new CoModuleLoader(3, (): void => {

					new CoModuleLoader(6, (): void => {
						console.log("modules loaded ...");

						VoxRScene.initialize();
						VoxMath.initialize();
						VoxModelEdit.initialize();

						this.initRenderer();
						this.initMouseInteract();
						this.createEditEntity();
						this.initUIScene();

					})
						.load(url3)
						.load(url6)
						.load(url7)
						.load(url9)
						.load(url10)
						.load(url11);
				})
					.load(url2)
					.load(url5)
					.load(url8);
			}
		})
			.addLoader(uiInteractML)
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

		let graph = (this.m_graph = VoxRScene.createRendererSceneGraph());

		let rparam = graph.createRendererSceneParam();
		rparam.setAttriAntialias(true);
		rparam.setCamPosition(1000.0, 1000.0, 1000.0);
		rparam.setCamProject(45, 20.0, 9000.0);

		this.m_rscene = graph.createScene(rparam);
		this.m_rscene.enableMouseEvent(true);
		VoxRScene.setRendererScene(this.m_rscene);

		new RenderStatusDisplay(this.m_rscene, true);

		let subScene = this.m_rscene.createSubScene(rparam, 3, false);
		subScene.enableMouseEvent(true);
		subScene.setAccessor(new SceneAccessor());

		this.m_edit3DUIRScene = subScene;
		graph.addScene(this.m_edit3DUIRScene);
		this.m_outline = new PostOutline(this.m_rscene);

		this.init3DScene();
	}
	private initUIScene(): void {
		let uisc = (this.m_uiScene = VoxUI.createUIScene(this.m_graph));
		uisc.texAtlasNearestFilter = true;

		uisc.rscene.addEventListener(MouseEvent.MOUSE_BG_DOWN, this, this.uiMouseDownListener);
		uisc.rscene.addEventListener(MouseEvent.MOUSE_UP, this, this.uiMouseUpListener);
		uisc.rscene.addEventListener(MouseEvent.MOUSE_MOVE, this, this.uiMouseMoveListener);

		this.initUIEntities();

		this.m_entityQuery = VoxModelEdit.createRectFrameQuery()
		this.m_entityQuery.initialize(this.m_rscene);

		if (this.m_selectFrame == null) {
			this.m_selectFrame = VoxModelEdit.createUIRectLine();
			this.m_selectFrame.initialize(uisc.rscene);
			this.m_selectFrame.enable();
		}

		let rscene = this.m_rscene;
		// rscene.addEventListener(CoRScene.MouseEvent.MOUSE_BG_DOWN, this, this.mouseBgDownListener);
		rscene.addEventListener(KeyboardEvent.KEY_DOWN, this, this.keyDown);
		rscene.addEventListener(MouseEvent.MOUSE_BG_CLICK, this, this.mouseClickListener);
		rscene.addEventListener(MouseEvent.MOUSE_UP, this, this.mouseUpListener, true, true);
	}

	private m_btnGroup0: ISelectButtonGroup;
	private m_btnGroup1: ISelectButtonGroup;
	private m_btnGroup2: ISelectButtonGroup;

	private createBtn(uuid: string, text: string, px: number, py: number, group: ISelectButtonGroup): IButton {
		let textColor = VoxMaterial.createColor4(1, 1, 1, 1);

		let btn = VoxUI.createTextLabelButton(uuid, text, 170, 50, textColor);
		btn.setXY(px, py);
		this.m_uiScene.addEntity(btn);
		btn.addEventListener(MouseEvent.MOUSE_UP, this, this.btnMouseUpListener);
		group.addButton(btn);
		return btn;
	}
	
    private createSelectBtn(px: number, py: number, ns: string, uuid: string, selectNS: string, deselectNS: string, flag: boolean): ISelectionEntity {

        let selectBar = VoxUI.createSelectionEntity();
        selectBar.uuid = uuid;
		let colors = [0xff5dbea3, 0xff33b249, 0xff5adbb5, 0xFF33b249];
		selectBar.setBGColorsWithARGBUint32( colors );
        selectBar.initialize(this.m_uiScene, ns, selectNS, deselectNS, 30);
        selectBar.addEventListener(SelectionEvent.SELECT, this, this.selectChange);
        if (flag) {
            selectBar.select(false);
        }
        else {
            selectBar.deselect(false);
        }
		selectBar.setXY(px, py);
        this.m_uiScene.addEntity(selectBar);
        return selectBar;
    }
	private selectChange(evt: ISelectionEvent): void {
		console.log("selectChange(), evt.flag: ", evt.flag);
		this.m_valueFilter.setAbsorbing(evt.flag);
	}
	private initUIEntities(): void {

		this.m_btnGroup0 = VoxUI.createSelectButtonGroup();
		this.m_btnGroup1 = VoxUI.createSelectButtonGroup();
		this.m_btnGroup2 = VoxUI.createSelectButtonGroup();

		let tx = 100;
		let ty = 110;
		let absorbBtn = this.createSelectBtn(tx, ty + 30 + 520, "吸附","absorb", "ON", "OFF", false);

		let localBtn = this.createBtn("local", "局部坐标", tx, ty + 30 + 450, this.m_btnGroup0);
		let globalBtn = this.createBtn("global", "全局坐标", tx, ty + 30 + 380, this.m_btnGroup0);
		ty += 50;
		let moveBtn = this.createBtn("move", "移动", tx, ty + 240, this.m_btnGroup1);
		let rotateBtn = this.createBtn("rotate", "旋转", tx, ty + 170, this.m_btnGroup1);
		let scaleBtn = this.createBtn("scale", "缩放", tx, ty + 100, this.m_btnGroup1);
		ty -= 50;
		let redoBtn = this.createBtn("redo", "重做", tx, ty + 30, this.m_btnGroup2);
		let undoBtn = this.createBtn("undo", "撤销", tx, ty - 40, this.m_btnGroup2);


		this.m_btnGroup0.selectButton(globalBtn);
		this.m_btnGroup1.selectButton(moveBtn);
		// this.m_btnGroup2.selectButton(moveBtn);
	}
	private m_entity: IRenderEntity = null;
	private init3DScene(): void {
		this.loadModels();
		return;
		// const rsc = this.m_rscene;

		// let material = VoxRScene.createDefaultMaterial(true);
		// material.setRGB3f(0.7, 0.7, 0.7);
		// material.setTextureList([this.createTexByUrl()]);

		// // let sentity = VoxEntity.createCube(100, material);
		// let sentity = VoxEntity.createCylinder(50, 130, 20, material);
		// let mesh = sentity.getMesh() as IDataMesh;
		// let uvsList = [mesh.getUVS()];
		// let entity = this.createEntity({ indices: mesh.getIVS(), vertices: mesh.getVS(), uvsList: uvsList });
		// this.m_entity = entity;
		// // entity.setXYZ(200,0,100);
		// // entity = this.createEntity({indices: mesh.getIVS(), vertices: mesh.getVS(), uvsList: uvsList});
	}

	private m_transCtr: ITransformController = null;
	private m_selectFrame: IUIRectLine = null;
	private m_keyInterac: ICoKeyboardInteraction;
	private m_recoder: ICoTransformRecorder;
	private m_valueFilter = new VecValueFilter();
	private createEditEntity(): void {

		let edit3dsc = this.m_edit3DUIRScene;

		this.m_transCtr = VoxModelEdit.createTransformController();
		const tc = this.m_transCtr;
		tc.initialize(edit3dsc);
		tc.addEventListener(UserEditEvent.EDIT_BEGIN, this, this.trans3DEditBegin);
		tc.addEventListener(UserEditEvent.EDIT_END, this, this.trans3DEditEnd);
		this.m_transCtr.setCtrlValueFilter( this.m_valueFilter );
		this.m_prevPos = VoxMath.createVec3();
		this.m_currPos = VoxMath.createVec3();

		this.m_keyInterac = VoxUIInteraction.createKeyboardInteraction();
		const ki = this.m_keyInterac;
		ki.initialize(this.m_rscene);

		let Key = Keyboard;
		let type = ki.createKeysEventType([Key.CTRL, Key.Y]);
		ki.addKeysDownListener(type, this, this.keyCtrlYDown);
		type = ki.createKeysEventType([Key.CTRL, Key.Z]);
		ki.addKeysDownListener(type, this, this.keyCtrlZDown);

		this.m_recoder = VoxModelEdit.createTransformRecorder();
	}

	private keyCtrlZDown(evt: any): void {
		this.m_recoder.undo();
		let list = this.m_recoder.getCurrList();
		this.selectEntities(list);
	}
	private keyCtrlYDown(evt: any): void {
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

		console.log("DemoModelEditTrans4::uiMouseDownListener(), evt: ", evt);
		this.m_selectFrame.begin(evt.mouseX, evt.mouseY);
	}
	private uiMouseUpListener(evt: any): void {

		console.log("DemoModelEditTrans4::uiMouseUpListener(), evt: ", evt);
		if (this.m_selectFrame.isSelectEnabled()) {
			let b = this.m_selectFrame.bounds;
			console.log("DemoModelEditTrans4::uiMouseUpListener(), b: ", b);
			let list = this.m_entityQuery.getEntities(b.min, b.max);
			console.log("list: ", list);
			this.selectEntities(list);
		}
		this.m_selectFrame.end(evt.mouseX, evt.mouseY);
	}
	private uiMouseMoveListener(evt: any): void {
		// console.log("DemoModelEditTrans4::uiMouseMoveListener(), evt: ", evt);
		// console.log("ui move (x, y): ", evt.mouseX, evt.mouseY);
		this.m_selectFrame.move(evt.mouseX, evt.mouseY);
	}
	private btnMouseUpListener(evt: any): void {
		console.log("btnMouseUpListener(), evt.uuid: ", evt.uuid);
		let uuid = evt.uuid;

		switch (uuid) {
			case "local":
				this.m_transCtr.toLocal();
				break;
			case "global":
				this.m_transCtr.toGlobal();
				break;
			case "move":
				this.m_transCtr.toTranslation();
				break;
			case "scale":
				this.m_transCtr.toScale();
				break;
			case "rotate":
				this.m_transCtr.toRotation();
				this;
				break;
			case "redo":
				this.keyCtrlYDown(null);
				break;
			case "undo":
				this.keyCtrlZDown(null);
				break;
			default:
				break;
		}
	}
	private createTexByUrl(url: string = ""): IRenderTexture {
		let tex = this.m_rscene.textureBlock.createImageTex2D();
		let img = new Image();
		img.onload = (evt: any): void => {
			tex.setDataFromImage(img, 0, 0, 0, false);
		};
		img.src = url != "" ? url : "static/assets/box.jpg";
		return tex;
	}

	private keyDown(evt: any): void {
		console.log("DemoModelEditTrans4::keyDown() ..., evt.keyCode: ", evt.keyCode);

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
		let baseUrl: string = "static/private/";
		let url = baseUrl + "obj/base.obj";
		url = baseUrl + "fbx/base4.fbx";
		url = "static/assets/fbx/base4.fbx";
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
	private m_entityQuery: IRectFrameQuery = null;
	private m_entities: ITransformEntity[] = [];
	private createEntity(model: CoGeomDataType, transform: Float32Array = null, index: number = 1.0): ITransformEntity {
		console.log("XXX XXXX model: ", model);
		let material = VoxRScene.createDefaultMaterial(true);
		// material.initializeByCodeBuf(false);
		material.setRGB3f(0.7, 0.7, 0.7);
		material.setTextureList([this.createTexByUrl()]);
		material.initializeByCodeBuf(true);

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
	}
	private selectEntities(list: IRenderEntity[], hitPV: IVector3D = null): void {
		if (list && list.length > 0) {
			let transCtr = this.m_transCtr;

			let pos = VoxMath.createVec3();

			for (let i = 0; i < list.length; ++i) {
				pos.addBy(list[i].getGlobalBounds().center);
			}
			pos.scaleBy(1.0 / list.length);

			if (transCtr && list.length > 0) {
				transCtr.select(list as ITransformEntity[], pos);
				this.m_outline.select(list);
			}
		}
	}
	private mouseUpTargetListener(evt: any): void {
		console.log("mouseUpTargetListener() mouse up...");
		let entity = evt.target as ITransformEntity;
		this.selectEntities([entity], evt.wpos);
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

class VecValueFilter implements ICtrlValueFilter {
	private m_absorb = false;
	constructor(){}
	private filterScale(s: number): number {
		if(Math.abs(s) < 1.0) {
			if(s < 0) {
				s = -1;
			}else if(s > 0){
				s = 1;
			}
		}else {
			console.log(s.toFixed(2), "Math.floor(s): ", Math.floor(s));
			s = Math.floor(s);
		}
		return s;
	}
	setAbsorbing(absorb: boolean): void {
		this.m_absorb = absorb;
	}
	ctrlValueFilter(type: number, pv: IVector3D): void {

		console.log("VecValueFilter, A pv: ", pv);
		if(this.m_absorb) {
			switch(type) {
				case 0:
					pv.x = Math.round(pv.x / 10.0) * 10.0;
					pv.y = Math.round(pv.y / 10.0) * 10.0;
					pv.z = Math.round(pv.z / 10.0) * 10.0;
					break;
				case 1:
					pv.x = this.filterScale(pv.x);
					pv.y = this.filterScale(pv.y);
					pv.z = this.filterScale(pv.z);
					break;
				case 2:
					pv.x = Math.round(pv.x / 5.0) * 5.0;
					pv.y = Math.round(pv.y / 5.0) * 5.0;
					pv.z = Math.round(pv.z / 5.0) * 5.0;
					break;
				default:
					break;
			}
		}
		console.log("VecValueFilter, B pv: ", pv);
	}
}
export default DemoModelEditTrans4;
