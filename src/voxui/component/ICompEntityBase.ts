import IColor4 from "../../vox/material/IColor4";
import { IUIEntityContainer } from "../entity/IUIEntityContainer";

interface ICompEntityBase extends IUIEntityContainer {

	uuid: string;
	/**
	 * @param type a number type value, it is a event type,for example: MouseEvent.MOUSE_UP
	 * @param listener a listener instance
	 * @param func a listener fcuntion
	 * @param captureEnabled the default value is true
	 * @param bubbleEnabled the default value is false
	 */
	addEventListener(type: number, listener: any, func: (evt: any) => void, captureEnabled?: boolean, bubbleEnabled?: boolean): void;
	/**
	 * @param type a number type value, it is a event type,for example: MouseEvent.MOUSE_UP
	 * @param listener a listener instance
	 * @param func a listener fcuntion
	 */
	removeEventListener(type: number, listener: any, func: (evt: any) => void): void;

	getNameWidth(): number;
	setFontColor(fontColor: IColor4, bgColor: IColor4): void;
	setBGColors(colors: IColor4[]): void;

	destroy(): void;
}
export { ICompEntityBase };
