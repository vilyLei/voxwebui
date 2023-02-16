import { IUIPanel } from "../panel/IUIPanel";
import IColor4 from "../../vox/material/IColor4";
import { IVoxUIScene } from "../scene/IVoxUIScene";

interface IParamCtrlPanel extends IUIPanel {
	/**
	 * @param scene IVoxUIScene instance
	 * @param rpi renderer process id
	 * @param panelW the default value 300
	 * @param panelH the default value 350
	 * @param marginWidth the default value 3
	 */
	initialize(scene: IVoxUIScene, rpi: number, panelW?: number, panelH?: number, marginWidth?: number): void;

}
export { IParamCtrlPanel };
