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

import { PromptSystem } from "./system/PromptSystem";
import { TipsSystem } from "./system/TipsSystem";
import { IUIConfig } from "./system/IUIConfig";
import { PanelSystem } from "./system/PanelSystem";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";
import { ParamCtrlPanel } from "./panel/ParamCtrlPanel";
import { VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxMath } from "../cospace/math/VoxMath";
import { VoxMaterial } from "../cospace/voxmaterial/VoxMaterial";
import { VoxEntity } from "../cospace/voxentity/VoxEntity";
import { VoxMesh } from "../cospace/voxmesh/VoxMesh";
import { VoxRenderer } from "../cospace/voxengine/VoxRenderer";
import { UIEntityContainer } from "./entity/UIEntityContainer";
import { SelectionEntity } from "./component/SelectionEntity";
let __$$__init = true;
function initialize(): void {
	if(__$$__init) {
		__$$__init = false;
		if(VoxRScene.isEnabled()) {
			VoxRScene.initialize();
			if(VoxMesh.isEnabled())VoxMesh.initialize();
			if(VoxMath.isEnabled())VoxMath.initialize();
			if(VoxMaterial.isEnabled())VoxMaterial.initialize();
			if(VoxEntity.isEnabled())VoxEntity.initialize();
		}
	}
}
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

function createUIContainer(): UIEntityContainer {
	return new UIEntityContainer(true);
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
let __$$$currUISCene: VoxUIScene = null;
function createUIScene(graph: IRendererSceneGraph, uiConfig: IUIConfig = null, atlasSize: number = 512, renderProcessesTotal: number = 3): IVoxUIScene {
	initialize();
	let uisc = new VoxUIScene();
	__$$$currUISCene = uisc;
	if(graph) {
		uisc.initialize(graph, atlasSize, renderProcessesTotal);
	}
	uisc.uiConfig = uiConfig;
	if (uiConfig) {
		let promptSys = new PromptSystem();
		promptSys.initialize(uisc);
		uisc.prompt = promptSys;
		let tipsSys = new TipsSystem();
		tipsSys.initialize(uisc);
		uisc.tips = tipsSys;
	}

	let panelSys = new PanelSystem();
	panelSys.initialize(uisc);
	uisc.panel = panelSys;

	return uisc;
}
function createTipInfo(): TipInfo {
	return new TipInfo();
}
function createUILayout(): UILayout {
	return new UILayout();
}

function createTextLabelButton(uuid: string, text: string, width: number = 90, height: number = 50, textColor: IColor4 = null, fontSize: number = 30, fontName: string = ""): Button {

	if(text == "" || __$$$currUISCene == null) return null;

	let uisc = __$$$currUISCene;
	let tta = uisc.transparentTexAtlas;
	return ButtonBuilder.createTextLabelButton(tta, uuid,text,width, height, textColor, fontSize, fontName);

	// let uisc = __$$$currUISCene;
	// let tta = uisc.transparentTexAtlas;
	// let fontColor = textColor != null ? textColor : VoxMaterial.createColor4(0, 0, 0, 1.0);
	// let bgColor = VoxMaterial.createColor4(1, 1, 1, 0.0);
	// if(fontName != "") {
	// 	tta.setFontName( fontName );
	// }
	// let img = tta.createCharsCanvasFixSize(width, height, text, fontSize, fontColor, bgColor);
	// tta.addImageToAtlas(text, img);

	// let colorLabel = new ClipColorLabel();
	// colorLabel.initializeWithoutTex(width, height, 4);
	// colorLabel.getColorAt(0).setRGB3f(0.5, 0.5, 0.5);
	// colorLabel.getColorAt(1).setRGB3f(0.7, 0.7, 0.7);
	// colorLabel.getColorAt(2).setRGB3f(0.6, 0.6, 0.6);
	// colorLabel.getColorAt(3).copyFrom(colorLabel.getColorAt(1));

	// let iconLable = new ClipLabel();
	// iconLable.transparent = true;
	// iconLable.premultiplyAlpha = true;
	// iconLable.initialize(tta, [text]);

	// let btn = new Button();
	// btn.uuid = uuid;
	// btn.addLabel(iconLable);
	// btn.initializeWithLable(colorLabel);
	// this.m_uiScene.addEntity(btn);
	// return btn;
}
function createSelectionEntity(): SelectionEntity {
	return new SelectionEntity();
}
export {

	initialize,
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
	createTextLabelButton,

	createUIContainer,
	createUIPanel,
	createPromptPanel,
	createParamCtrlPanel,
	createUIScene,
	
	createSelectionEntity
};
