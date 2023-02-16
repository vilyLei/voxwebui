import { IClipLabel } from "./entity/IClipLabel";
import { IClipColorLabel } from "./entity/IClipColorLabel";
import { IColorClipLabel } from "./entity/IColorClipLabel";
import { ITextLabel } from "./entity/ITextLabel";
import { IColorLabel } from "./entity/IColorLabel";
import { IButton } from "./button/IButton";
import { IFlagButton } from "./button/IFlagButton";
import { ISelectButtonGroup } from "./button/ISelectButtonGroup";
import { IVoxUIScene } from "./scene/IVoxUIScene";
import { IRectTextTip } from "./entity/IRectTextTip";
import { ITipInfo } from "./base/ITipInfo";
import { IUILayout } from "./layout/IUILayout";
import { IUIPanel } from "./panel/IUIPanel";
import { IPromptPanel } from "./panel/IPromptPanel";
import ICanvasTexAtlas from "../cospace/voxtexture/atlas/ICanvasTexAtlas";
import IColor4 from "../vox/material/IColor4";
import { IUIConfig } from "./system/IUIConfig";
import IRendererScene from "../vox/scene/IRendererScene";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";
import { IParamCtrlPanel } from "./panel/IParamCtrlPanel";

interface ITextParam {

	text: string;
	textColor: IColor4;
	fontSize: number;
	font: string;
}
interface ILib_VoxUI {
	
	createColorLabel(): IColorLabel;
	createUILayout(): IUILayout;
	createTipInfo(): ITipInfo;
	createRectTextTip(): IRectTextTip;
	createClipLabel(): IClipLabel;
	createClipColorLabel(): IClipColorLabel;
	createColorClipLabel(): IColorClipLabel;
	createTextLabel(): ITextLabel;
	
	createButton(): IButton;
	createFlagButton(): IFlagButton;
	createSelectButtonGroup(): ISelectButtonGroup;
	createTextButton(width: number, height: number, idns: string, texAtlas: ICanvasTexAtlas, textParam: ITextParam, colors: IColor4[]): IButton;

	createUIPanel(): IUIPanel;
	createPromptPanel(): IPromptPanel;
	createParamCtrlPanel(): IParamCtrlPanel;
	/**
	 * @param crscene IRendererSceneGraph instance
	 * @param uiConfig IUIConfig instance, its default value is null
	 * @param atlasSize the default value is 512
	 * @param renderProcessesTotal the default value is 3
	 */
	createUIScene(graph: IRendererSceneGraph, uiConfig?: IUIConfig, atlasSize?: number, renderProcessesTotal?: number): IVoxUIScene;
}
export { ITextParam, ILib_VoxUI };
