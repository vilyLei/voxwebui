import IRendererScene from "../vox/scene/IRendererScene";
import { ICoRenderer } from "../cospace/voxengine/ICoRenderer";
import { ICoRScene } from "../cospace/voxengine/ICoRScene";
import { ICoUIInteraction } from "../cospace/voxengine/ui/ICoUIInteraction";
import { IMouseInteraction } from "../cospace/voxengine/ui/IMouseInteraction";
import { IVoxUI } from "../voxui/IVoxUI";

import { ModuleLoader } from "../common/loaders/ModuleLoader";

declare var CoRenderer: ICoRenderer;
declare var CoRScene: ICoRScene;
declare var CoUIInteraction: ICoUIInteraction;

export class DemoBase {

    private m_rscene: IRendererScene = null;
	private m_interact: IMouseInteraction = null;

    initialize(): void {
        console.log("DemoBase::initialize() ...");
        
		document.oncontextmenu = function (e) {
			e.preventDefault();
		}
        this.initEngineModule();
    }

    private initEngineModule(): void {

        let url = "static/cospace/engine/uiInteract/CoUIInteraction.umd.js";
        let mouseInteractML = new ModuleLoader(2, (): void => {
        	this.initUserInteract();
        });

        let url0 = "static/cospace/engine/renderer/CoRenderer.umd.js";
        let url1 = "static/cospace/engine/rscene/CoRScene.umd.js";
        let url2 = "static/cospace/math/CoMath.umd.js";
        let url3 = "static/cospace/ageom/CoAGeom.umd.js";
        let url4 = "static/cospace/coMaterial/CoMaterial.umd.js";
        let url5 = "static/cospace/comesh/CoMesh.umd.js";
        let url6 = "static/cospace/cotexture/CoTexture.umd.js";
        let url7 = "static/cospace/coentity/CoEntity.umd.js";
        let url8 = "static/cospace/coui/CoUI.umd.js";

        new ModuleLoader(2, (): void => {
            if (this.isEngineEnabled()) {
                console.log("ready to build render ...");

                this.initRenderer();
                this.init3DScene();

                new ModuleLoader(1, (): void => {
                    console.log("math module loaded ...");

                    new ModuleLoader(1, (): void => {
                        console.log("ageom module loaded ...");

                        new ModuleLoader(1, (): void => {
                            console.log("CoMaterial module loaded ...");

                            new ModuleLoader(1, (): void => {
                                console.log("CoMesh module loaded ...");

                                new ModuleLoader(1, (): void => {
                                    console.log("CoTexture module loaded ...");

                                    new ModuleLoader(1, (): void => {
                                        console.log("CoEntity module loaded ...");
                                        new ModuleLoader(1, (): void => {
                                            console.log("ready to build ui ...");
                                            // this.initUIScene();
                                            // this.initUISC();
                                        }).load(url8);
                                    }).load(url7);
                                }).load(url6);
                            }).load(url5);
                        }).load(url4);
                    }).load(url3);
                }).load(url2);

                // this.m_vcoapp = new ViewerCoSApp();
                // this.m_vcoapp.initialize((): void => {
                // 	this.loadOBJ();
                // });
            }
        })
            .addLoader(mouseInteractML)
            .load(url0)
            .load(url1);

        mouseInteractML.load(url);
    }

	private initUserInteract(): void {

		let r = this.m_rscene;
		if (r != null && this.m_interact == null && typeof CoUIInteraction !== "undefined") {

			this.m_interact = CoUIInteraction.createMouseInteraction();
			this.m_interact.initialize(this.m_rscene, 0, true);
			this.m_interact.setSyncLookAtEnabled(true);            
		}
	}
	private initRenderer(): void {
		if (this.m_rscene == null) {
			let RendererDevice = CoRScene.RendererDevice;
			RendererDevice.SHADERCODE_TRACE_ENABLED = false;
			RendererDevice.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;
			RendererDevice.SetWebBodyColor("#888888");

			let rparam = CoRScene.createRendererSceneParam();
			rparam.setAttriAntialias(!RendererDevice.IsMobileWeb());
			rparam.setCamPosition(1000.0, 1000.0, 1000.0);
			rparam.setCamProject(45, 20.0, 9000.0);
			this.m_rscene = CoRScene.createRendererScene(rparam, 3);
			this.m_rscene.setClearUint24Color(0x888888);
		}
	}
    
	private init3DScene(): void {
        let axis = CoRScene.createAxis3DEntity();
		this.m_rscene.addEntity(axis);
	}
    isEngineEnabled(): boolean {
        return typeof CoRenderer !== "undefined" && typeof CoRScene !== "undefined";
    }
    run(): void {
        if (this.m_rscene != null) {
			if (this.m_interact != null) {
				this.m_interact.setLookAtPosition(null);
				this.m_interact.run();
			}
			this.m_rscene.run();
			// if (this.m_uiScene != null) {
			// 	this.m_uiScene.run();
			// }
		}
    }
}

export default DemoBase;