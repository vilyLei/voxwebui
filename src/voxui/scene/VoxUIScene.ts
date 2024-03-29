
import IRenderStage3D from "../../vox/render/IRenderStage3D";
import IRendererScene from "../../vox/scene/IRendererScene";
import ICanvasTexAtlas from "../../cospace/voxtexture/atlas/ICanvasTexAtlas";

import { IUIEntity } from "../entity/IUIEntity";
import { IVoxUIScene } from "./IVoxUIScene";
import { IPromptSystem } from "../system/IPromptSystem";
import { ITipsSystem } from "../system/ITipsSystem";
import {IUIConfig} from "../system/IUIConfig";
import { ICoKeyboardInteraction } from "../../cospace/voxengine/ui/ICoKeyboardInteraction";

import { ICoRScene } from "../../cospace/voxengine/ICoRScene";
declare var CoRScene: ICoRScene;
import { ICoMath } from "../../cospace/math/ICoMath";
declare var CoMath: ICoMath;

import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
declare var CoMaterial: ICoMaterial;
import { ICoTexture } from "../../cospace/voxtexture/ICoTexture";
import { UILayout } from "../layout/UILayout";
import IAABB2D from "../../vox/geom/IAABB2D";
import { IPanelSystem } from "../system/IPanelSystem";
import IRendererSceneGraph from "../../vox/scene/IRendererSceneGraph";
declare var CoTexture: ICoTexture;

class VoxUIScene implements IVoxUIScene {

	private m_graph: IRendererSceneGraph = null;
	private m_rstage: IRenderStage3D;
	private m_stageRect: IAABB2D;
	
	readonly rscene: IRendererScene;
	readonly texAtlas: ICanvasTexAtlas = null;
	readonly transparentTexAtlas: ICanvasTexAtlas = null;
	readonly layout = new UILayout();

	prompt: IPromptSystem = null;
	tips: ITipsSystem = null;
	panel: IPanelSystem = null;
	uiConfig: IUIConfig = null;
	keyboardInteraction: ICoKeyboardInteraction = null;

	texAtlasNearestFilter = true;
	constructor() {
	}
	private resizeHandle(evt: any): void {
		this.resize();
	}
	/**
	 * @param graph the value is a IRendererSceneGraph instance
	 * @param atlasSize the default value is 1024
	 * @param renderProcessesTotal the default value is 3
	 */
	initialize(graph: IRendererSceneGraph, atlasSize: number = 1024, renderProcessesTotal: number = 3): void {
		if (this.m_graph == null) {
			
			this.m_graph = graph;
			let crscene = graph.getSceneAt( 0 );
			let stage = crscene.getStage3D();

			crscene.addEventListener(CoRScene.EventBase.RESIZE, this, this.resizeHandle);
			let rparam = graph.createRendererSceneParam();
			rparam.cameraPerspectiveEnabled = false;
			rparam.setAttriAlpha(false);
			rparam.setCamProject(45.0, 0.1, 3000.0);
			rparam.setCamPosition(0.0, 0.0, 1500.0);

			let subScene = graph.createSubScene( rparam, renderProcessesTotal, true );
			subScene.enableMouseEvent(true);
			let t: any = this;
			t.rscene = subScene;
			let t0 = t.texAtlas = CoTexture.createCanvasTexAtlas();
			let t1 = t.transparentTexAtlas = CoTexture.createCanvasTexAtlas();

			t0.initialize(crscene, atlasSize, atlasSize, CoMaterial.createColor4(1.0, 1.0, 1.0, 1.0), false, this.texAtlasNearestFilter);
			t0.getTexture().premultiplyAlpha = false;
			t1.initialize(crscene, atlasSize, atlasSize, CoMaterial.createColor4(1.0, 1.0, 1.0, 0.0), true, this.texAtlasNearestFilter);
			t1.getTexture().premultiplyAlpha = true;

			this.m_rstage = stage;
			let uicamera = this.rscene.getCamera();
			uicamera.translationXYZ(stage.stageHalfWidth, stage.stageHalfHeight, 1500.0);
			uicamera.update();
			let st = this.getStage();
			this.m_stageRect = CoMath.createAABB2D(0, 0, st.stageWidth, st.stageHeight);
			this.layout.initialize(this.m_stageRect);
		}
	}
	
	addEventListener(type: number, listener: any, func: (evt: any) => void, captureEnabled: boolean = true, bubbleEnabled: boolean = false): IVoxUIScene {
		this.m_rstage.addEventListener(type, listener, func, captureEnabled, bubbleEnabled);
		return this;
	}
	removeEventListener(type: number, listener: any, func: (evt: any) => void): IVoxUIScene {
		this.m_rstage.removeEventListener(type, listener, func);
		return this;
	}
	getStage(): IRenderStage3D {
		return this.rscene.getStage3D();
	}
	addEntity(entity: IUIEntity, processid: number = 0): void {
		if (entity != null) {
			
			entity.__$setScene( this );
			entity.update();
			let container = entity.getRContainer();
			if (container != null) {
				this.rscene.addContainer(container, processid);
			}

			let ls = entity.getREntities();
			for (let i = 0; i < ls.length; ++i) {
				this.rscene.addEntity(ls[i], processid, true);
			}
		}
	}
	removeEntity(entity: IUIEntity): void {
		if (entity != null) {
			let sc = this.rscene;
			let container = entity.getRContainer();
			if (container != null) {
				sc.removeContainer(container);
			}
			let ls = entity.getREntities();
			for (let i = 0; i < ls.length; ++i) {
				sc.removeEntity(ls[i]);
			}
			entity.__$setScene( null );
		}
	}
	getRect(): IAABB2D {
		return this.m_stageRect;
	}
	resize(): void {
		
		let st = this.m_rstage;
		let uicamera = this.rscene.getCamera();
		uicamera.translationXYZ(st.stageHalfWidth, st.stageHalfHeight, 1500.0);
		uicamera.update();

		this.m_stageRect.setTo(0, 0, st.stageWidth, st.stageHeight);
		this.updateLayout();
	}
	updateLayout(): void {		
		this.layout.update( this.m_stageRect );
	}
	run(): void {
		const sc = this.rscene;
		if (sc != null) {
			sc.run();
		}
	}
}

export { VoxUIScene };
