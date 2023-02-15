import IRendererScene from "../vox/scene/IRendererScene";
import { IMouseInteraction } from "../cospace/voxengine/ui/IMouseInteraction";
import { IVoxUIScene } from "../voxui/scene/IVoxUIScene";
import { VoxUIScene } from "../voxui/scene/VoxUIScene";
import { ClipLabel } from "../voxui/entity/ClipLabel";

import VoxRuntime from "../common/VoxRuntime";

import { RendererDevice, VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../cospace/voxengine/ui/VoxUIInteraction";
import { VoxMaterial } from "../cospace/voxmaterial/VoxMaterial";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";

export class DemoBase {

    private m_graph: IRendererSceneGraph = null;
    private m_rscene: IRendererScene = null;
	private m_interact: IMouseInteraction = null;

    initialize(): void {
        console.log("DemoBase::initialize() ...");
        
		document.oncontextmenu = function (e) {
			e.preventDefault();
		}
		this.initSysModule();
    }

    private initSysModule(): void {
        let rt = new VoxRuntime();
        rt.initialize(
            (): void => {
                this.initUserInteract();
            },
            (): void => {
                this.initRenderer();
                this.init3DScene();
            },
            (): void => {
				this.initUIScene();
				this.initUIObjs();
			}
        );
    }
	private m_uiScene: IVoxUIScene = null;
	private initUIScene(): void {
		
		console.log("create the VoxUIScene instance...");
		let uisc = new VoxUIScene();
		uisc.texAtlasNearestFilter = true;
		this.m_uiScene = uisc;
		uisc.initialize(this.m_graph);
		console.log("uisc: ", uisc);
		console.log("uisc.rscene: ", uisc.rscene);

		//this.testUIEntity(uisc);
	}
    private initUIObjs(): void {
        this.test01();
    }
    
	private test01(): void {
		console.log("test01()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		///*
		let fontColor = VoxMaterial.createColor4(0,1,0,1);
		let bgColor = VoxMaterial.createColor4(1,1,1,0);
		urls = ["BBB-0", "BBB-1", "BBB-2", "BBB-3"];
		img = tta.createCharsCanvasFixSize(90, 40, urls[0], 30, fontColor,bgColor);
		tta.addImageToAtlas(urls[0], img);
		img = tta.createCharsCanvasFixSize(90, 40, urls[1], 30, fontColor,bgColor);
		tta.addImageToAtlas(urls[1], img);
		
		let iconLable = new ClipLabel();
		iconLable.transparent = true;
		iconLable.premultiplyAlpha = true;
		iconLable.initialize(tta, [urls[1]]);
		iconLable.setClipIndex(1);
		iconLable.setXY(500, 70);
		// iconLable.setScaleXY(1.5, 1.5);
		// iconLable.update();
		this.m_uiScene.addEntity(iconLable);
		//*/
	}	
	private initUserInteract(): void {

		let r = this.m_rscene;
		if (r != null && this.m_interact == null && VoxUIInteraction.isEnabled()) {

			this.m_interact = VoxUIInteraction.createMouseInteraction();
			this.m_interact.initialize(this.m_rscene, 0, true);
			this.m_interact.setSyncLookAtEnabled(true);            
		}
	}
	private initRenderer(): void {
		if (this.m_graph == null) {
			
			let RD = VoxRScene.RendererDevice;
			RD.SHADERCODE_TRACE_ENABLED = false;
			RD.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;
			RD.SetWebBodyColor("#888888");

            let graph = this.m_graph = VoxRScene.createRendererSceneGraph();
			let rparam = graph.createRendererSceneParam();
			rparam.setAttriAntialias(!RD.IsMobileWeb());
			rparam.setCamPosition(1000.0, 1000.0, 1000.0);
			rparam.setCamProject(45, 20.0, 9000.0);
			this.m_rscene = graph.createScene(rparam, 3);
			this.m_rscene.setClearUint24Color(0x888888);
		}
	}
    
	private init3DScene(): void {
        let axis = VoxRScene.createAxis3DEntity();
		this.m_rscene.addEntity(axis);
	}
    run(): void {
        if (this.m_graph != null) {
			if (this.m_interact != null) {
				this.m_interact.setLookAtPosition(null);
				this.m_interact.run();
			}
			this.m_graph.run();
		}
    }
}

export default DemoBase;