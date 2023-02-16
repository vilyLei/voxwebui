import { IClipLabel } from "./entity/IClipLabel";
import { ClipLabel } from "./entity/ClipLabel";
import { IClipColorLabel } from "./entity/IClipColorLabel";
import { ClipColorLabel } from "./entity/ClipColorLabel";
import { ColorClipLabel } from "./entity/ColorClipLabel";
import { ColorLabel } from "./entity/ColorLabel";
import { TextLabel } from "./entity/TextLabel";

import { IButton } from "./button/IButton";
import { Button } from "./button/Button";
import { FlagButton } from "./button/FlagButton";
import { ITextParam, ButtonBuilder } from "./button/ButtonBuilder";
import { SelectButtonGroup } from "./button/SelectButtonGroup";

import { IVoxUIScene } from "./scene/IVoxUIScene";
import { VoxUIScene } from "./scene/VoxUIScene";
import { RectTextTip } from "./entity/RectTextTip";
import { TipInfo } from "./base/TipInfo";
import { UILayout } from "./layout/UILayout";
import { PromptPanel } from "./panel/PromptPanel";
import { UIPanel } from "./panel/UIPanel";
import ICanvasTexAtlas from "../cospace/voxtexture/atlas/ICanvasTexAtlas";
import IColor4 from "../vox/material/IColor4";

import { ICoMaterial } from "../cospace/voxmaterial/ICoMaterial";
import { PromptSystem } from "./system/PromptSystem";
import { TipsSystem } from "./system/TipsSystem";
import { IUIConfig } from "./system/IUIConfig";
import IRendererScene from "../vox/scene/IRendererScene";
import { PanelSystem } from "./system/PanelSystem";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";
import { ParamCtrlPanel } from "./panel/ParamCtrlPanel";
declare var CoMaterial: ICoMaterial;

function createColorLabel(): ColorLabel {
	return new ColorLabel();
}
function createRectTextTip(): RectTextTip {
	return new RectTextTip();
}
function createClipLabel(): IClipLabel {
	return new ClipLabel();
}
function createClipColorLabel(): IClipColorLabel {
	return new ClipColorLabel();
}
function createColorClipLabel(): ColorClipLabel {
	return new ColorClipLabel();
}
function createTextLabel(): TextLabel {
	return new TextLabel();
}

function createButton(): IButton {
	return new Button();
}
function createFlagButton(): FlagButton {
	return new FlagButton();
}

function createSelectButtonGroup(): SelectButtonGroup {
	return new SelectButtonGroup();
}

function createTextButton(width: number, height: number, idns: string, texAtlas: ICanvasTexAtlas, textParam: ITextParam, colors: IColor4[]): Button {
	return ButtonBuilder.createTextButton(width, height, idns, texAtlas, textParam, colors);
}


function createUIPanel(): UIPanel {
	return new UIPanel();
}
function createPromptPanel(): PromptPanel {
	return new PromptPanel();
}
function createParamCtrlPanel(): ParamCtrlPanel {
	return new ParamCtrlPanel();
}
function createUIScene(graph: IRendererSceneGraph, uiConfig: IUIConfig = null, atlasSize: number = 512, renderProcessesTotal: number = 3): IVoxUIScene {
	let uisc = new VoxUIScene();
	if(graph != null) {
		uisc.initialize(graph, atlasSize, renderProcessesTotal);
	}
	uisc.uiConfig = uiConfig;
	if (uiConfig != null) {
		let promptSys = new PromptSystem();
		promptSys.initialize(uisc);
		uisc.prompt = promptSys;
		let tipsSys = new TipsSystem();
		tipsSys.initialize(uisc);
		uisc.tips = tipsSys;
		let panelSys = new PanelSystem();
		panelSys.initialize(uisc);
		uisc.panel = panelSys;
	}
	return uisc;
}
function createTipInfo(): TipInfo {
	return new TipInfo();
}
function createUILayout(): UILayout {
	return new UILayout();
}

export {

	createColorLabel,
	createUILayout,
	createTipInfo,
	createRectTextTip,
	createClipLabel,
	createClipColorLabel,
	createColorClipLabel,
	createTextLabel,
	createButton,
	createFlagButton,
	createSelectButtonGroup,
	createTextButton,

	createUIPanel,
	createPromptPanel,
	createParamCtrlPanel,
	createUIScene
};
