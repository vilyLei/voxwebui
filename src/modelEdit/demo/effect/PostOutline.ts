import IRenderEntity from "../../../vox/render/IRenderEntity";
import IRendererScene from "../../../vox/scene/IRendererScene";
import IRenderNode from "../../../vox/scene/IRenderNode";
import IOcclusionPostOutline from "../../../renderingtoy/mcase/outline/IOcclusionPostOutline";
import { ModuleLoader } from "../../../cospace/modules/loaders/ModuleLoader";

import { IOccPostOutlineModule } from "../../../cospace/renderEffect/outline/IOccPostOutlineModule";
import { CoModuleVersion, CoModuleLoader } from "../../../cospace/app/utils/CoModuleLoader";
declare var OccPostOutlineModule: IOccPostOutlineModule;

class PostOutline implements IRenderNode {

	private m_rscene: IRendererScene;
	private m_postOutline: IOcclusionPostOutline;

	constructor(rscene: IRendererScene, verTool: CoModuleVersion = null) {

		this.m_rscene = rscene;

		let url = "static/cospace/renderEffect/occPostOutline/OccPostOutlineModule.umd.js";

		new CoModuleLoader(1, null, verTool)
			.setCallback((): void => {

				this.m_postOutline = OccPostOutlineModule.create();
				this.initOutline();

				this.m_rscene.appendRenderNode( this );
			})
			.load(url);
	}

	private initOutline(): void {

		this.m_postOutline.initialize(this.m_rscene, 0, [0]);
		this.m_postOutline.setFBOSizeScaleRatio(0.5);
		this.m_postOutline.setRGB3f(0.0, 1.0, 0.0);
		this.m_postOutline.setOutlineDensity(2.0);
		this.m_postOutline.setOcclusionDensity(0.2);
	}
	select(targets: IRenderEntity[]): void {
		if (this.m_postOutline != null) {
			this.m_postOutline.setTargetList(targets);
		}
	}
	deselect(): void {
		if (this.m_postOutline != null) {
			this.m_postOutline.setTargetList(null);
		}
		console.log("post outline deselect() ...");
	}
	render(): void {

		if (this.m_postOutline != null) {
			// console.log("post outline getTargetList(): ",this.m_postOutline.getTargetList());
			this.m_postOutline.drawBegin();
			this.m_postOutline.draw();
			this.m_postOutline.drawEnd();
		}
	}
}

export { PostOutline }
