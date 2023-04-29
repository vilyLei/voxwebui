import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import IColor4 from "../../vox/material/IColor4";
import { Button } from "../button/Button";
import { ClipColorLabel } from "../entity/ClipColorLabel";
import { ClipLabel } from "../entity/ClipLabel";
import { UIEntityContainer } from "../entity/UIEntityContainer";
import { IVoxUIScene } from "../scene/IVoxUIScene";
import IEvtDispatcher from "../../vox/event/IEvtDispatcher";
import { VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { ICompEntityBase } from "./ICompEntityBase";

class ButtonItem {

	button: Button;
	label: ClipLabel;
	bgLabel: ClipColorLabel;

	constructor(pbutton: Button, plabel: ClipLabel, pBgLabel: ClipColorLabel) {
		this.button = pbutton;
		this.label = plabel;
		this.bgLabel = pBgLabel;
	}
	destroy(): void {
		if (this.button != null) {
			this.button.destroy();
			this.button = null;
		}
		if (this.bgLabel != null) {
			this.bgLabel.destroy();
			this.bgLabel = null;
		}
		if (this.label != null) {
			this.label.destroy();
			this.label = null;
		}
	}
}
class CompEntityBase extends UIEntityContainer implements ICompEntityBase {

	protected m_enabled = true;
	protected m_dispatcher: IEvtDispatcher = null;
	protected m_fontColor: IColor4 = null;
	protected m_fontBgColor: IColor4 = null;
	protected m_bgColors: IColor4[] = null;

	uuid = "CompEntityBase";
	constructor() { super(); }

	
	enable(): void {
		this.m_enabled = true;
	}
	disable(): void {
		this.m_enabled = false;
	}
	open(): void {
		this.setVisible(true);
	}
	close(): void {
		this.setVisible(false);
	}
	isOpen(): boolean {
		return this.isVisible();
	}
	isClosed(): boolean {
		return !this.isVisible();
	}

	getNameWidth(): number {
		return 0.0;
	}
	addEventListener(type: number, listener: any, func: (evt: any) => void, captureEnabled: boolean = true, bubbleEnabled: boolean = false): void {
		this.m_dispatcher.addEventListener(type, listener, func, captureEnabled, bubbleEnabled);
	}
	removeEventListener(type: number, listener: any, func: (evt: any) => void): void {
		this.m_dispatcher.removeEventListener(type, listener, func);
	}
	setFontColor(fontColor: IColor4, bgColor: IColor4): void {
		this.m_fontColor = fontColor;
		this.m_fontBgColor = bgColor;
	}
	setBGColors(colors: IColor4[]): void {
		if (colors == null) {
			throw Error("colors == null !!!");
		}
		if (colors.length < 4) {
			throw Error("colors.length < 4 !!!");
		}
		this.m_bgColors = colors;
	}

	setFontColorWithARGBUint32(fontColor: number, bgColor: number): void {
		this.m_fontColor = VoxRScene.createColor4().setARGBUint32(fontColor);
		this.m_fontBgColor = VoxRScene.createColor4().setARGBUint32(bgColor);
	}
	setBGColorsWithARGBUint32(colors: number[]): void {
		if (colors == null) {
			throw Error("colors == null !!!");
		}
		if (colors.length < 4) {
			throw Error("colors.length < 4 !!!");
		}
		this.m_bgColors = [];
		for(let i = 0; i < colors.length; ++i) {
			this.m_bgColors.push(VoxRScene.createColor4().setARGBUint32(colors[i]));
		}
	}
	destroy(): void {

		super.destroy();

		this.m_fontColor = null;
		this.m_fontBgColor = null;
		this.m_bgColors = null;
	}
	protected createBgLabel(pw: number, ph: number, intensity: number = 1.0): ClipColorLabel {

		let bgLabel = new ClipColorLabel();
		bgLabel.initializeWithoutTex(pw, ph, 4);
		let sls = this.m_bgColors;
		let dcls = bgLabel.getColors();
		if (sls == null) {
			bgLabel.getColorAt(0).setRGB3f(0.2, 0.2, 0.2);
			bgLabel.getColorAt(1).setRGB3f(0.3, 0.3, 0.3);
			bgLabel.getColorAt(2).setRGB3f(0.2, 0.6, 1.0);
			bgLabel.getColorAt(3).setRGB3f(0.3, 0.3, 0.3);
		} else {
			for (let i = 0; i < dcls.length; ++i) {
				dcls[i].copyFrom(sls[i]);
			}
		}
		for (let i = 0; i < dcls.length; ++i) {
			const c = dcls[i];
			c.r *= intensity;
			c.g *= intensity;
			c.b *= intensity;
		}
		bgLabel.setClipIndex(0);
		return bgLabel;
	}
	protected createBtn(uuid: string, uisc: IVoxUIScene, urls: string[], fontSize: number, pw: number, ph: number, intensity: number = 1.0): ButtonItem {

		let img: HTMLCanvasElement;
		let tta = uisc.transparentTexAtlas;


		let nameLabel: ClipLabel = null;

		let fontColor = this.m_fontColor != null ? this.m_fontColor : VoxMaterial.createColor4(1, 1, 1, 1);
		let bgColor = this.m_fontBgColor != null ? this.m_fontBgColor : VoxMaterial.createColor4(1, 1, 1, 0);

		if (urls != null && urls.length > 0) {

			for (let i = 0; i < urls.length; ++i) {
				// img = tta.createCharsCanvasFixSize(pw, ph, urls[i], fontSize, fontColor, bgColor);
				img = tta.createCharsCanvasWithSize(pw, ph, 6, 4, urls[i], fontSize, fontColor, bgColor);
				tta.addImageToAtlas(urls[i], img);
			}

			nameLabel = new ClipLabel();
			nameLabel.transparent = true;
			nameLabel.premultiplyAlpha = true;
			nameLabel.initialize(tta, urls);
			nameLabel.update();
			pw = nameLabel.getWidth();
		}

		let bgLabel = this.createBgLabel(pw, ph, intensity);
		let btn = new Button();
		if (uuid != "") btn.uuid = uuid;
		if (urls != null && urls.length > 0) {
			btn.syncLabelClip = false;
			btn.addLabel(nameLabel);
		}

		btn.initializeWithLable(bgLabel);
		btn.update();
		return new ButtonItem(btn, nameLabel, bgLabel);
	}
}
export { ButtonItem, CompEntityBase };
