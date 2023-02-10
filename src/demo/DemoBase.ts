import IRendererScene from "../vox/scene/IRendererScene";
import { ICoRenderer } from "../cospace/voxengine/ICoRenderer";
import { ICoRScene } from "../cospace/voxengine/ICoRScene";

declare var CoRenderer: ICoRenderer;
declare var CoRScene: ICoRScene;

export class DemoBase {
  
	private m_rscene: IRendererScene = null;
	initialize(): void {
		console.log("DemoBase::initialize() ...");
    }
    run(): void {
        
    }
}

export default DemoBase;