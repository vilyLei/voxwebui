import { ClipLabel } from "../entity/ClipLabel";
import { ClipColorLabel } from "../entity/ClipColorLabel";
import { Button } from "./Button";
import ICanvasTexAtlas from "../../cospace/voxtexture/atlas/ICanvasTexAtlas";
import IColor4 from "../../vox/material/IColor4";

import { IButton } from "./IButton";
import { IVoxUIScene } from "../scene/IVoxUIScene";
import { IUIPanelConfig } from "../system/uiconfig/IUIPanelConfig";

import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";

import { ILib_VoxUI } from "../ILib_VoxUI";
declare var Lib_VoxUI: ILib_VoxUI;

interface ITextParam {

	text: string;
	textColor: IColor4;
	fontSize: number;
	font: string;
}

class ButtonBuilder {

	static createCurrTextBtn(pw: number, ph: number, idns: string, texAtlas: ICanvasTexAtlas, textParam: ITextParam, colors: IColor4[] = null): Button {

		if (textParam.text !== null && textParam.text != "") {
	
			let colorClipLabel = new ClipColorLabel();
			colorClipLabel.initializeWithoutTex(pw, ph, 4);
			colorClipLabel.setColors( colors );
	
			let iconLable = new ClipLabel();
			iconLable.depthTest = true;
			iconLable.transparent = true;
			iconLable.premultiplyAlpha = true;
			iconLable.initialize(texAtlas, [textParam.text]);
			iconLable.setColor(textParam.textColor);
	
			let btn = new Button();
			btn.uuid = idns;
			btn.addLabel(iconLable);
			btn.initializeWithLable(colorClipLabel);
	
			return btn;
		}
		return null;
	}
	
static createTextLabelButton(texAtlas: ICanvasTexAtlas, uuid: string, text: string, width: number = 90, height: number = 50, textColor: IColor4 = null, fontSize: number = 30, fontName: string = ""): Button {

	if(text == "" || texAtlas == null) return null;

	// let uisc = __$$$currUISCene;
	let tta = texAtlas;
	let fontColor = textColor != null ? textColor : VoxMaterial.createColor4(0, 0, 0, 1.0);
	let bgColor = VoxMaterial.createColor4(1, 1, 1, 0.0);
	if(fontName != "") {
		tta.setFontName( fontName );
	}
	let img = tta.createCharsCanvasFixSize(width, height, text, fontSize, fontColor, bgColor);
	tta.addImageToAtlas(text, img);

	let colorLabel = new ClipColorLabel();
	colorLabel.initializeWithoutTex(width, height, 4);
	colorLabel.getColorAt(0).setRGB3f(0.5, 0.5, 0.5);
	colorLabel.getColorAt(1).setRGB3f(0.7, 0.7, 0.7);
	colorLabel.getColorAt(2).setRGB3f(0.6, 0.6, 0.6);
	colorLabel.getColorAt(3).copyFrom(colorLabel.getColorAt(1));

	let iconLable = new ClipLabel();
	iconLable.transparent = true;
	iconLable.premultiplyAlpha = true;
	iconLable.initialize(tta, [text]);

	let btn = new Button();
	btn.uuid = uuid;
	btn.addLabel(iconLable);
	btn.initializeWithLable(colorLabel);
	return btn;
}
	static createTextButton(width: number, height: number, idns: string, texAtlas: ICanvasTexAtlas, textParam: ITextParam, colors: IColor4[]): Button {
	
		let tp = textParam;
		let img = texAtlas.createCharsCanvasFixSize(width, height, tp.text, tp.fontSize, VoxMaterial.createColor4(), VoxMaterial.createColor4(1.0, 1.0, 1.0, 0.0));
		texAtlas.addImageToAtlas(tp.text, img);
		
		return ButtonBuilder.createCurrTextBtn(width, height, idns, texAtlas, textParam, colors);
	}
	static createPanelBtnWithCfg(couiScene: IVoxUIScene, px: number, py: number, btnIndex: number, uiConfig: IUIPanelConfig): IButton {
		
		let tta = couiScene.transparentTexAtlas;
		let cfg = couiScene.uiConfig;
		let btnSize = uiConfig.btnSize;
		let pw = btnSize[0];
		let ph = btnSize[1];

		let names = uiConfig.btnNames;
		let keys = uiConfig.btnKeys;
		let tips = uiConfig.btnTips;

		let fontFormat = uiConfig.btnTextFontFormat;
		tta.setFontName(fontFormat.font);
		let fontColor = VoxMaterial.createColor4();
		fontColor.fromBytesArray3(cfg.getUIGlobalColor().text);
		let bgColor = VoxMaterial.createColor4(1, 1, 1, 0);
		let img = tta.createCharsCanvasFixSize(pw, ph, names[btnIndex], fontFormat.fontSize, fontColor, bgColor);
		tta.addImageToAtlas(names[btnIndex], img);

		let label = Lib_VoxUI.createClipColorLabel();
		label.initializeWithoutTex(pw, ph, 4);

		let iconLable = Lib_VoxUI.createClipLabel();
		iconLable.transparent = true;
		iconLable.premultiplyAlpha = true;
		iconLable.initialize(tta, [names[btnIndex]]);

		let btn = Lib_VoxUI.createButton();
		btn.uuid = keys[btnIndex];
		btn.addLabel(iconLable);
		btn.initializeWithLable(label);

		let tipsAlign = "right";
		let btnStyle = uiConfig.buttonStyle;		
		if (btnStyle != undefined) {
			if (btnStyle.globalColor != undefined) {
				tipsAlign = btnStyle.tipsAlign;
				cfg.applyButtonGlobalColor(btn, btnStyle.globalColor);
			}
		}
		if (tips.length > btnIndex) {
			couiScene.tips.addTipsTarget(btn);
			let tipInfo = Lib_VoxUI.createTipInfo().setContent(tips[btnIndex]);
			switch(tipsAlign) {
				case "top":
					btn.info = tipInfo.alignTop();
					break;
				case "bottom":
					btn.info = tipInfo.alignBottom();
					break;
				default:
					btn.info = tipInfo.alignRight();
					break;
			}
		}

		btn.setXY(px, py);
		return btn;
	}
}

export {
	ITextParam,
	ButtonBuilder
};
