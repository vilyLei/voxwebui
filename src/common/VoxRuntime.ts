
import { ModuleLoader } from "../common/loaders/ModuleLoader";
import { ICoRenderer } from "../cospace/voxengine/ICoRenderer";
import { ICoRScene } from "../cospace/voxengine/ICoRScene";

declare var CoRenderer: ICoRenderer;
declare var CoRScene: ICoRScene;

export default class VoxRuntime {
    constructor() { }

    initialize(interactCallback: () => void, rendererCallback: () => void, uiCallback: () => void = null): void {

        let mouseInteractML: ModuleLoader = null;
        let url = "";
        if (interactCallback) {
            url = "static/cospace/engine/uiInteract/CoUIInteraction.umd.js";
            mouseInteractML = new ModuleLoader(2, (): void => {
                // this.initUserInteract();
                // if(interactCallback) {
                interactCallback();
                // }
            });
        }

        let url0 = "static/cospace/engine/renderer/CoRenderer.umd.js";
        let url1 = "static/cospace/engine/rscene/CoRScene.umd.js";
        let url2 = "static/cospace/math/CoMath.umd.js";
        let url3 = "static/cospace/ageom/CoAGeom.umd.js";
        let url4 = "static/cospace/coMaterial/CoMaterial.umd.js";
        let url5 = "static/cospace/comesh/CoMesh.umd.js";
        let url6 = "static/cospace/cotexture/CoTexture.umd.js";
        let url7 = "static/cospace/coentity/CoEntity.umd.js";
        let url8 = "static/cospace/coui/CoUI.umd.js";

        let loader = new ModuleLoader(2, (): void => {
            if (this.isEngineEnabled()) {
                console.log("ready to build render ...");
                if (rendererCallback) {
                    rendererCallback();

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
                                                if (uiCallback) {
                                                    uiCallback();
                                                }
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
            }
        });
        
        if (interactCallback) {
            loader.addLoader(mouseInteractML).load(url0).load(url1);

            mouseInteractML.load(url);
        } else {
            loader.load(url0).load(url1);
        }
    }
    isEngineEnabled(): boolean {
        return typeof CoRenderer !== "undefined" && typeof CoRScene !== "undefined";
    }
}