import IVector3D from "../vox/math/IVector3D";
import { IVoxUIScene } from "../voxui/scene/IVoxUIScene";

import { ModuleLoader } from "../cospace/modules/loaders/ModuleLoader";
import IRenderTexture from "../vox/render/texture/IRenderTexture";
import ITransformEntity from "../vox/entity/ITransformEntity";
import { CoGeomDataType, CoDataFormat, CoGeomDataUnit } from "../cospace/app/CoSpaceAppData";

import IRendererScene from "../vox/scene/IRendererScene";
import { IRendererSceneAccessor } from "../vox/scene/IRendererSceneAccessor";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";
import { IButton } from "../voxui/button/IButton";
import IRenderEntity from "../vox/render/IRenderEntity";
import { KeyboardEvent, Keyboard, MouseEvent, RendererDevice, EventBase, VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../cospace/voxengine/ui/VoxUIInteraction";
import { ISelectButtonGroup } from "../voxui/button/ISelectButtonGroup";
import { VoxUI } from "../voxui/VoxUI";
import { VoxMaterial } from "../cospace/voxmaterial/VoxMaterial";
import { IClipColorLabel } from "../voxui/entity/IClipColorLabel";
import { Vector3D, VoxMath } from "../cospace/math/VoxMath";
import { VoxEntity } from "../cospace/voxentity/VoxEntity";
import IDataMesh from "../vox/mesh/IDataMesh";
import { ICoKeyboardInteraction } from "../cospace/voxengine/ui/ICoKeyboardInteraction";
import RenderStatusDisplay from "../vox/scene/RenderStatusDisplay";
import { CoModelTeamLoader } from "../cospace/app/common/CoModelTeamLoader";
import { CoEntityLayouter } from "../cospace/app/common/CoEntityLayouter";

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
export class DemoBtnGroup {
	private m_teamLoader = new CoModelTeamLoader();
	private m_edit3DUIRScene: IRendererScene = null;

	constructor() {}

	initialize(): void {
		document.oncontextmenu = function(e) {
			e.preventDefault();
		};

		console.log("DemoBtnGroup::initialize() ...");

		this.initEngineModule();
	}
	private initEngineModule(): void {
		let url = "static/cospace/engine/uiInteract/CoUIInteraction.umd.js";
		let uiInteractML = new ModuleLoader(2, (): void => {});

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
						this.initUIScene();
					})
						.load(url3)
						.load(url6)
						.load(url7)
						.load(url9)
						.load(url10);
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
		// graph.setAutoRunning(true);
		VoxRScene.setRendererScene(this.m_rscene);

		let subScene = this.m_rscene.createSubScene(rparam, 3, false);
		subScene.enableMouseEvent(true);
		subScene.setAccessor(new SceneAccessor());

		this.m_edit3DUIRScene = subScene;
		graph.addScene(this.m_edit3DUIRScene);

		new RenderStatusDisplay(this.m_rscene, true);

		this.init3DScene();
	}
	private initUIScene(): void {
		let uisc = (this.m_uiScene = VoxUI.createUIScene(this.m_graph));
		uisc.texAtlasNearestFilter = true;
		this.initUIEntities();

	}

	private m_btnGroup0: ISelectButtonGroup;
	private m_btnGroup1: ISelectButtonGroup;

	private createBtn(uuid: string, text: string, px: number, py: number, group: ISelectButtonGroup): IButton {
		let textColor = VoxMaterial.createColor4(1, 1, 1, 1);
		let btn = VoxUI.createTextLabelButton(uuid, text, 170, 50, textColor);
		btn.setXY(px, py);
		this.m_uiScene.addEntity(btn);
		btn.addEventListener(MouseEvent.MOUSE_UP, this, this.btnMouseUpListener);
		group.addButton(btn);
		return btn;
	}
	private initUIEntities(): void {

		this.m_btnGroup0 = VoxUI.createSelectButtonGroup();
		this.m_btnGroup0.setSelectColors([0xaa00aa, 0x00aa00, 0x00aaaa]);
		this.m_btnGroup1 = VoxUI.createSelectButtonGroup();

		let ty = 60;
		let localBtn = this.createBtn("local", "局部坐标", 200, ty + 30 + 450, this.m_btnGroup0);
		let globalBtn = this.createBtn("global", "全局坐标", 200, ty + 30 + 380, this.m_btnGroup0);

		let moveBtn = this.createBtn("move", "移动", 200, ty + 240, this.m_btnGroup1);
		let rotateBtn = this.createBtn("rotate", "旋转", 200, ty + 170, this.m_btnGroup1);
		let scaleBtn = this.createBtn("scale", "缩放", 200, ty + 100, this.m_btnGroup1);


		this.m_btnGroup0.selectButton(globalBtn);
		this.m_btnGroup1.selectButton(moveBtn);
	}
	private m_entity: IRenderEntity = null;
	private init3DScene(): void {
		// this.loadModels();
		// return;
		const rsc = this.m_rscene;

		let material = VoxRScene.createDefaultMaterial(true);
		material.setRGB3f(0.7, 0.7, 0.7);
		material.setTextureList([this.createTexByUrl()]);

		// let sentity = VoxEntity.createCube(100, material);
		let sentity = VoxEntity.createCylinder(50, 130, 20, material);
		let mesh = sentity.getMesh() as IDataMesh;
		let uvsList = [mesh.getUVS()];
		let entity = this.createEntity({ indices: mesh.getIVS(), vertices: mesh.getVS(), uvsList: uvsList });
		this.m_entity = entity;
		// entity.setXYZ(200,0,100);
		// entity = this.createEntity({indices: mesh.getIVS(), vertices: mesh.getVS(), uvsList: uvsList});
	}

	private btnMouseUpListener(evt: any): void {
		console.log("btnMouseUpListener(), evt.uuid: ", evt.uuid);
		let uuid = evt.uuid;


		switch (uuid) {
			case "local":
				break;
			case "global":
				break;
			case "move":
				break;
			case "scale":
				break;
			case "rotate":
				this;
				break;
			case "reset":
				break;
			case "select":
				break;
			default:
				break;
		}
	}
	private createTexByUrl(url: string = ""): IRenderTexture {
		let tex = this.m_rscene.textureBlock.createImageTex2D(64, 64, false);
		let img = new Image();
		img.onload = (evt: any): void => {
			tex.setDataFromImage(img, 0, 0, 0, false);
		};
		img.src = url != "" ? url : "static/assets/box.jpg";
		return tex;
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

		this.m_entities.push(entity);

		this.m_layouter.layoutAppendItem(entity, VoxRScene.createMat4(transform));

		return entity;
	}

	run(): void {
		if (this.m_graph) {
			this.m_graph.run();
		}
	}
}

export default DemoBtnGroup;
