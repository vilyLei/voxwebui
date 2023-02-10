import IColor4 from "../../vox/material/IColor4";
import { ICoUIScene } from "../../voxui/scene/ICoUIScene";

import { IUIEntity } from "./IUIEntity";

interface ITextLabel extends IUIEntity {

	/**
	 * @param text text content
	 * @param uiScene ICoUIScene instance
	 * @param fontSize the default value is 24
	 */
	initialize(text: string, uiScene: ICoUIScene, fontSize?: number): void;
	setText(text: string): void;
	getText(): string;

	setColor(c: IColor4): ITextLabel;
	getColor(): IColor4;
}

export { ITextLabel }
