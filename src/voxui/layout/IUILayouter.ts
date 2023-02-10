import {IUIEntity} from "../entity/IUIEntity";
import IAABB2D from "../../vox/geom/IAABB2D";

interface IUILayouter {
	
	addUIEntity(entity: IUIEntity): void;
	initLayout(rect: IAABB2D): void;
	update(rect: IAABB2D): void;
	destroy(): void;
}
export { IUILayouter };
