import IRendererScene from "../../vox/scene/IRendererScene";
import IRenderTexture from "../../vox/render/texture/IRenderTexture";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IDataMesh from "../../vox/mesh/IDataMesh";

import IRenderMaterial from "../../vox/render/IRenderMaterial";
import { ShaderCode } from "./ShaderCode";
import { CoEntityLayouter } from "../../cospace/app/common/CoEntityLayouter";
import { CoGeomDataType, CoDataFormat, CoGeomModelLoader } from "../../cospace/app/common/CoGeomModelLoader";
import VoxRuntime from "../../common/VoxRuntime";
import { VoxEntity } from "../../cospace/voxentity/VoxEntity";
import { VoxAGeom } from "../../cospace/ageom/VoxAgeom";
import { VoxMesh } from "../../cospace/voxmesh/VoxMesh";
import { RendererDevice, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import { VoxUIInteraction } from "../../cospace/voxengine/ui/VoxUIInteraction";
import IRendererSceneGraph from "../../vox/scene/IRendererSceneGraph";
import { IVoxUIScene } from "../../voxui/scene/IVoxUIScene";
import { VoxUIScene } from "../../voxui/scene/VoxUIScene";
import { PanelSystem } from "../../voxui/system/PanelSystem";
import { CtrlInfo, ParamCtrlPanel } from "../../voxui/panel/ParamCtrlPanel";
import IVector3D from "../../vox/math/IVector3D";
import { VoxMath } from "../../cospace/math/VoxMath";

export class DemoShaderMaterial {

	private m_graph: IRendererSceneGraph = null;
	private m_rscene: IRendererScene = null;
	private m_modelLoader = new CoGeomModelLoader();
	private m_layouter = new CoEntityLayouter();
	private m_entities: ITransformEntity[] = [];
	constructor() { }

	initialize(): void {

		console.log("DemoShaderMaterial::initialize()......");
		let rt = new VoxRuntime();
		rt.initialize(
			(): void => { this.initUserInteract(); },
			(): void => { this.initRenderer(); },
			(): void => { this.initModel(); }
		);
	}

	private createMesh(model: CoGeomDataType, material: IRenderMaterial): IDataMesh {
		let vs = model.vertices;
		let uvs = model.uvsList[0];
		let ivs = model.indices;
		let nvs = model.normals;

		let mesh = VoxMesh.createDataMesh();
		mesh.vbWholeDataEnabled = false;
		mesh.setVS(vs);
		mesh.setUVS(uvs);
		mesh.setNVS(nvs);
		mesh.setIVS(ivs);
		mesh.setVtxBufRenderData(material);

		mesh.initialize();
		return mesh
	}
	private createEntityWithMaterial(material: IRenderMaterial, model: CoGeomDataType, transform: Float32Array = null): ITransformEntity {

		material.initializeByCodeBuf(true);

		let nvs = model.normals;
		if (nvs == null) {
			let vs = model.vertices;
			let ivs = model.indices;
			let trisNumber = ivs.length / 3;
			VoxAGeom.SurfaceNormal.ClacTrisNormal(vs, vs.length, trisNumber, ivs, nvs);
		}

		let mesh = this.createMesh(model, material);

		let matrix4 = VoxRScene.createMat4(transform);

		let entity = VoxEntity.createDisplayEntity();
		entity.setRenderState(VoxRScene.RendererState.NONE_CULLFACE_NORMAL_STATE);
		entity.setMesh(mesh);
		entity.setMaterial(material);
		entity.getTransform().setParentMatrix(matrix4);
		return entity;
	}
	private m_dataList: Float32Array[] = [];
	protected createEntity(model: CoGeomDataType, transform: Float32Array = null, index: number = 0): void {

		if (model != null) {

			console.log("createEntity(), model: ", model);

			let fs = new Float32Array([1.0, 1.0, 1.0, 1.0]);

			let material = VoxMaterial.createShaderMaterial("model_shd");
			material.setFragShaderCode(ShaderCode.frag_body);
			material.setVertShaderCode(ShaderCode.vert_body);
			material.addUniformDataAt("u_color", fs);
			material.setTextureList([
				this.getTexByUrl("static/assets/metal_01.png")
			]);

			this.m_dataList.push(fs);

			let entity = this.createEntityWithMaterial(material, model, transform);
			this.m_entities.push(entity);
			this.m_rscene.addEntity(entity);

			this.m_layouter.layoutAppendItem(entity, VoxRScene.createMat4(transform));
		}
	}
	private initModel(): void {

		this.m_modelLoader.setListener(
			(models: CoGeomDataType[], transforms: Float32Array[], format: CoDataFormat): void => {
				console.log("loaded some models.");
				for (let i = 0; i < models.length; ++i) {
					this.createEntity(models[i], transforms != null ? transforms[i] : null);
				}
			},
			(total): void => {
				console.log("loaded model all.");
				this.m_layouter.layoutUpdate();

				this.initUIScene();
			});

		let baseUrl = "static/private/";
		let url = baseUrl + "fbx/base4.fbx";
		// url = baseUrl + "fbx/hat_ok.fbx";
		// url = baseUrl + "obj/apple_01.obj";
		url = baseUrl + "obj/base.obj";
		// url = baseUrl + "ctm/errorNormal.ctm";

		this.loadModels([url]);
	}
	private loadModels(urls: string[], typeNS: string = ""): void {
		this.m_modelLoader.load(urls);
	}

	private m_uiScene: IVoxUIScene = null;
	private initUIScene(): void {

		let uisc = new VoxUIScene();
		uisc.texAtlasNearestFilter = true;
		this.m_uiScene = uisc;
		uisc.initialize(this.m_graph);
		let panel = new PanelSystem();
		panel.initialize(uisc);
		uisc.panel = panel;

		this.initUIObjs();
	}
	private m_sv: IVector3D = null;
	private m_currSV: IVector3D = null;
	private initUIObjs(): void {

		let uisc = this.m_uiScene;
		let panel = new ParamCtrlPanel();
		panel.initialize(uisc, 1);
		panel.setXY(100, 100);

		this.m_sv = VoxMath.createVec3();
		this.m_currSV = VoxMath.createVec3();

		let ls = this.m_entities;
		let entity0 = ls[0];
		let entity1 = ls[1];
		entity0.getScaleXYZ(this.m_sv);
		let ui = panel;
		ui.setBGColor(VoxMaterial.createColor4(0.4, 0.4, 0.4));
		console.log("initUI --------------------------------------");
		///*
		ui.addStatusItem("显示-A", "visible-a", "Yes", "No", true, (info: CtrlInfo): void => {
			console.log("显示-A", info.flag);
			entity0.setVisible(info.flag);
		});
		ui.addStatusItem("显示-B", "visible-b", "Yes", "No", true, (info: CtrlInfo): void => {
			console.log("显示-B", info.flag);
			entity1.setVisible(info.flag);
		});
		//*/
		///*
		ui.addProgressItem("缩放-A", "scale", 1.0, (info: CtrlInfo): void => {
			console.log("缩放-A", info.values[0]);
			this.m_currSV.copyFrom(this.m_sv);
			let s = info.values[0];
			console.log("xxx s: ", s);
			this.m_currSV.scaleBy(s);
			entity0.setScale3(this.m_currSV);
			entity0.update();
		});
		ui.addValueItem("Y轴移动-B", "move-b", 0, -300, 300, (info: CtrlInfo): void => {

			console.log("Y轴移动-B", info.values[0]);

			let pv = VoxMath.createVec3();
			entity1.getPosition(pv);
			pv.y = info.values[0];
			entity1.setPosition(pv);
			entity1.update();
		});
		//*/
		///*
		ui.addValueItem("颜色-A", "color-a", 0.8, 0.0, 10, (info: CtrlInfo): void => {
			let values = info.values;
			console.log("颜色-A, color-a values: ", values, ", colorPick: ", info.colorPick);
			let fs = this.m_dataList[0];
			fs[0] = values[0]; fs[1] = values[1]; fs[2] = values[2];
		}, true);
		ui.addValueItem("颜色-B", "color-b", 0.6, 0.0, 2.0, (info: CtrlInfo): void => {
			let values = info.values;
			console.log("color-b, values: ", values, ", colorPick: ", info.colorPick);
			let fs = this.m_dataList[1];
			fs[0] = values[0]; fs[1] = values[1]; fs[2] = values[2];
		}, true);
		//*/
		ui.layoutItem();
		ui.open();
	}
	private initUserInteract(): void {
		VoxUIInteraction.createMouseInteraction().initialize(this.m_rscene, 0, true).setAutoRunning(true);
	}

	private getTexByUrl(url: string = ""): IRenderTexture {
		let sc = this.m_rscene;

		let tex = sc.textureBlock.createImageTex2D();
		let img = new Image();
		img.onload = (evt: any): void => { tex.setDataFromImage(img); };
		img.src = url;
		return tex;
	}
	private initRenderer(): void {
		if (this.m_graph == null) {

			let RD = VoxRScene.RendererDevice;
			RD.SHADERCODE_TRACE_ENABLED = false;
			RD.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;
			let graph = this.m_graph = VoxRScene.createRendererSceneGraph();
			let rparam = graph.createRendererSceneParam();
			rparam.setAttriAntialias(!RD.IsMobileWeb());
			rparam.setCamPosition(1000.0, 1000.0, 1000.0);
			rparam.setCamProject(45, 20.0, 9000.0);
			this.m_rscene = graph.createScene(rparam, 3);
			this.m_rscene.setClearUint24Color(0x888888);
			this.m_graph.setAutoRunning(true);
		}
	}
}

export default DemoShaderMaterial;
