import IRendererScene from "../vox/scene/IRendererScene";
import { ICoRenderer } from "../cospace/voxengine/ICoRenderer";
import { ICoRScene } from "../cospace/voxengine/ICoRScene";
import { ModuleLoader } from "../common/loaders/ModuleLoader";

declare var CoRenderer: ICoRenderer;
declare var CoRScene: ICoRScene;

export class DemoBase {

    private m_rscene: IRendererScene = null;
    initialize(): void {
        console.log("DemoBase::initialize() ...");
        this.initEngineModule();
    }

    private initEngineModule(): void {

        // let url = "static/cospace/engine/uiInteract/CoUIInteraction.umd.js";
        // let mouseInteractML = new ModuleLoader(2, (): void => {
        // 	this.initInteract();
        // });

        let url0 = "static/cospace/engine/renderer/CoRenderer.umd.js";
        let url1 = "static/cospace/engine/rscene/CoRScene.umd.js";
        let url2 = "static/cospace/math/CoMath.umd.js";
        let url3 = "static/cospace/ageom/CoAGeom.umd.js";
        let url4 = "static/cospace/coMaterial/CoMaterial.umd.js";
        let url5 = "static/cospace/comesh/CoMesh.umd.js";
        let url6 = " static/cospace/cotexture/CoTexture.umd.js";
        let url7 = "static/cospace/coentity/CoEntity.umd.js";
        let url8 = "static/cospace/coui/CoUI.umd.js";

        new ModuleLoader(2, (): void => {
            if (this.isEngineEnabled()) {
                console.log("engine modules loaded ...");

                // this.initRenderer();
                // this.initScene();

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
            // .addLoader(mouseInteractML)
            .load(url0)
            .load(url1);

        // mouseInteractML.load(url);
    }

    isEngineEnabled(): boolean {
        return typeof CoRenderer !== "undefined" && typeof CoRScene !== "undefined";
    }
    run(): void {

    }
}

export default DemoBase;