import IRendererScene from "../vox/scene/IRendererScene";
import { IMouseInteraction } from "../cospace/voxengine/ui/IMouseInteraction";
import { IVoxUIScene } from "../voxui/scene/IVoxUIScene";
import { VoxUIScene } from "../voxui/scene/VoxUIScene";;
import VoxRuntime from "../common/VoxRuntime";
import { ProgressDataEvent, SelectionEvent, VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../cospace/voxengine/ui/VoxUIInteraction";
import {CtrlInfo, ParamCtrlUI} from "../voxui/case/ParamCtrlUI";
import { PanelSystem } from "../voxui/system/PanelSystem";

export class DemoParamUI {

    private m_rscene: IRendererScene = null;
	private m_interact: IMouseInteraction = null;
	private m_paramUI = new ParamCtrlUI();
	constructor(){}

    initialize(): void {
        console.log("DemoParamUI::initialize() ...");
        
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
        
		let uisc = new VoxUIScene();
		uisc.texAtlasNearestFilter = true;
		this.m_uiScene = uisc;
		uisc.initialize(this.m_rscene, 1024);

        let panel = new PanelSystem();
        panel.initialize(uisc);
        uisc.panel = panel;
	}
    private initUIObjs(): void {

        this.m_paramUI.initialize(this.m_uiScene, true);

		let ui = this.m_paramUI;

        // let ls = this.m_entities;
        // let entity0 = ls[0];
        // let entity1 = ls[1];
        // entity0.getScaleXYZ(this.m_sv);

        console.log("initUI --------------------------------------");
		//*
        ui.addStatusItem("显示-A", "visible-a", "Yes", "No", true, (info: CtrlInfo): void => {
            console.log("显示-A", info.flag);
            // entity0.setVisible(info.flag);
        });
        ui.addStatusItem("显示-B", "visible-b", "Yes", "No", true, (info: CtrlInfo): void => {
            console.log("显示-B", info.flag);
            // entity1.setVisible(info.flag);
        });

        ui.addProgressItem("缩放-A", "scale", 1.0, (info: CtrlInfo): void => {
			console.log("缩放-A", info.values[0]);
            // this.m_currSV.copyFrom(this.m_sv);
            // let s = info.values[0];
            // console.log("xxx s: ", s);
            // this.m_currSV.scaleBy(s);
            // entity0.setScale3(this.m_currSV);
            // entity0.update();
        });
        ui.addValueItem("Y轴移动-B", "move-b", 0, -300, 300, (info: CtrlInfo): void => {

            console.log("Y轴移动-B", info.values[0]);
			
            // let pv = new Vector3D();
            // entity1.getPosition(pv);
            // pv.y = info.values[0];
            // entity1.setPosition(pv);
            // entity1.update();
        });
		//*/
        ui.addValueItem("颜色-A", "color-a", 0.8, 0.0, 10, (info: CtrlInfo): void => {
            let values = info.values;
            console.log("颜色-A, color-a values: ", values, ", colorPick: ", info.colorPick);
            // let material = entity0.getMaterial() as EffectMaterial;
            // material.setRGB3f(values[0], values[1], values[2]);
        }, true);
		/*
        ui.addValueItem("颜色-B", "color-b", 0.6, 0.0, 2.0, (info: CtrlInfo): void => {
            let values = info.values;
            console.log("color-b, values: ", values, ", colorPick: ", info.colorPick);
            // let material = entity1.getMaterial() as EffectMaterial;
            // material.setRGB3f(values[0], values[1], values[2]);
        }, true);
        //*/
        ui.updateLayout(true);
    }
    
	private initUserInteract(): void {

		let r = this.m_rscene;
		if (r != null && this.m_interact == null && typeof VoxUIInteraction !== "undefined") {

			this.m_interact = VoxUIInteraction.createMouseInteraction();
			this.m_interact.initialize(this.m_rscene, 0, true);
			this.m_interact.setSyncLookAtEnabled(true);            
		}
	}
	private initRenderer(): void {
		if (this.m_rscene == null) {
			
			let RD = VoxRScene.RendererDevice;
			RD.SHADERCODE_TRACE_ENABLED = false;
			RD.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;
			RD.SetWebBodyColor("#888888");

			let rparam = VoxRScene.createRendererSceneParam();
			rparam.setAttriAntialias(!RD.IsMobileWeb());
			rparam.setCamPosition(1000.0, 1000.0, 1000.0);
			rparam.setCamProject(45, 20.0, 9000.0);
			this.m_rscene = VoxRScene.createRendererScene(rparam, 3);
			this.m_rscene.setClearUint24Color(0x888888);
		}
	}
    
	private init3DScene(): void {
        let axis = VoxRScene.createAxis3DEntity();
		this.m_rscene.addEntity(axis);
	}
    run(): void {
        if (this.m_rscene != null) {
			if (this.m_interact != null) {
				this.m_interact.setLookAtPosition(null);
				this.m_interact.run();
			}
			this.m_rscene.run();
			if (this.m_uiScene != null) {
				this.m_uiScene.run();
			}
		}
    }
}

export default DemoParamUI;