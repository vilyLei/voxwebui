import IRendererScene from "../vox/scene/IRendererScene";
import IRenderTexture from "../vox/render/texture/IRenderTexture";
import ITransformEntity from "../vox/entity/ITransformEntity";
import IDataMesh from "../vox/mesh/IDataMesh";

import IRenderMaterial from "../vox/render/IRenderMaterial";
import { ShaderCode } from "./shaderExample/ShaderCode";
import { CoEntityLayouter } from "../cospace/app/common/CoEntityLayouter";
import VoxRuntime from "../common/VoxRuntime";
import { VoxEntity } from "../cospace/voxentity/VoxEntity";
import { VoxAGeom } from "../cospace/ageom/VoxAgeom";
import { VoxMesh } from "../cospace/voxmesh/VoxMesh";
import { RendererDevice, VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxMaterial } from "../cospace/voxmaterial/VoxMaterial";
import { VoxUIInteraction } from "../cospace/voxengine/ui/VoxUIInteraction";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";
import { CoGeomDataType, CoModelTeamLoader } from "../cospace/app/common/CoModelTeamLoader";
import { VoxMath } from "../cospace/math/VoxMath";

export class DemoModelLoad {

    private m_teamLoader = new CoModelTeamLoader();
	private m_graph: IRendererSceneGraph = null;
	private m_rscene: IRendererScene = null;
	private m_layouter = new CoEntityLayouter();
	private m_entities: ITransformEntity[] = [];
	constructor() { }

	initialize(): void {

		document.body.style.overflow = "hidden";
		console.log("DemoModelLoad::initialize()......");
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
		let baseUrl = "static/private/";
		let url = baseUrl + "fbx/base4.fbx";
		// url = baseUrl + "fbx/hat_ok.fbx";
		url = baseUrl + "obj/apple_01.obj";
		// url = baseUrl + "obj/base.obj";

		let loader = this.m_teamLoader;
        loader.load([url], (models: CoGeomDataType[], transforms: Float32Array[]): void => {

            this.m_layouter.layoutReset();
            for (let i = 0; i < models.length; ++i) {
                this.createEntity(models[i], transforms != null ? transforms[i] : null, 1.0);
            }
            this.m_layouter.layoutUpdate(300, VoxMath.createVec3(-400, 0, 0));
        });
	}
	private initUserInteract(): void {
		const mi = VoxUIInteraction.createMouseInteraction();
		mi.initialize(this.m_rscene, 0, true).setAutoRunning(true);
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

export default DemoModelLoad;
