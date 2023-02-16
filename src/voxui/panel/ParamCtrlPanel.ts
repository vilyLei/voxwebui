import { IVoxUIScene } from "../scene/IVoxUIScene";
import { UIPanel } from "./UIPanel";
import { IParamCtrlPanel } from "./IParamCtrlPanel";
import { CtrlInfo, ItemCallback, CtrlItemParam, CtrlItemObj } from "./item/CtrlItemObj";
import { SelectionEvent, ProgressDataEvent, RendererDevice, MouseEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { Vector3D, MathConst, VoxMath } from "../../cospace/math/VoxMath";


import { SelectionEntity } from "../component/SelectionEntity";
import { ProgressEntity } from "../component/ProgressEntity";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IVector3D from "../../vox/math/IVector3D";

// import { VoxEntity } from "../../cospace/voxentity/VoxEntity";
// import { VoxMesh } from "../../cospace/voxmesh/VoxMesh";
// import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";

class ParamCtrlPanel extends UIPanel implements IParamCtrlPanel {

	/**
	 * 边距留白尺寸
	 */
	private m_marginWidth = 15;

	constructor() { super(); }

	initialize(scene: IVoxUIScene, rpi: number, panelW: number = 300, panelH: number = 350, marginWidth: number = 3): void {
		if (this.isIniting()) {
			this.init();

			this.m_marginWidth = marginWidth;
			this.m_scene = scene;
			this.m_rpi = rpi;

			this.m_panelW = panelW;
			this.m_panelH = panelH;
		}
	}
	destroy(): void {
		super.destroy();

	}
	protected buildPanel(pw: number, ph: number): void {

		this.buildItems();
	}
	private m_initing: boolean = true;
	protected buildItems(): void {
		if (this.m_initing) {
			this.m_initing = false;
			let sc = this.getScene();

			// let cplUrl = "static/assets/colors.png";

			// let dis = this.m_marginWidth;
			// let pw = this.m_panelW - 2.0 * dis;
			// let ph = this.m_panelH - 2.0 * dis;
			// let tex = this.createTexByUrl(cplUrl);
			// let texLabel = new TextureLabel()
			// texLabel.initialize(sc, tex, pw, ph);
			// texLabel.setXY(dis, dis);
			// this.addEntity(texLabel);
		}
	}
	
	protected openThis(): void {
		let sc = this.getScene();
		// sc.addEventListener(MouseEvent.MOUSE_BG_DOWN, this, this.mouseBgDown);
	}
	protected closeThis(): void {

	}
	protected layout(): void {
	}
    // private mouseBgDown(evt: any): void {
    //     if (this.rgbPanel != null) this.rgbPanel.close();
    // }
}
export { ParamCtrlPanel };
