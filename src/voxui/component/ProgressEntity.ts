
import { MathConst, VoxMath } from "../../cospace/math/VoxMath";
import { MouseEvent, EventBase, ProgressDataEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IEventBase from "../../vox/event/IEventBase";
import IEvtDispatcher from "../../vox/event/IEvtDispatcher";
import IProgressDataEvent from "../../vox/event/IProgressDataEvent";
import IColor4 from "../../vox/material/IColor4";
import { Button } from "../button/Button";
import { ClipColorLabel } from "../entity/ClipColorLabel";
import { ClipLabel } from "../entity/ClipLabel";
import { UIEntityContainer } from "../entity/UIEntityContainer";
import { IVoxUIScene } from "../scene/IVoxUIScene";

// type ButtonItem = { button: Button, label: ClipLabel, bgLabel: ClipColorLabel };
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
		if(this.button != null) {
			this.button.destroy();
			this.button = null;
		}
		if(this.bgLabel != null) {
			this.bgLabel.destroy();
			this.bgLabel = null;
		}
		if(this.label != null) {
			this.label.destroy();
			this.label = null;
		}
	}
}
class ProgressEntity extends UIEntityContainer {

	private m_dispatcher: IEvtDispatcher = null;
	private m_currEvent: IProgressDataEvent = null;

	private m_nameItem: ButtonItem = null;
	private m_addItem: ButtonItem = null;
	private m_subItem: ButtonItem = null;
	private m_bgBarItem: ButtonItem = null;
	private m_barPlane: ClipColorLabel = null;

	private m_barInitLength = 1.0;
	private m_barLength = 1.0;
	private m_barBgX = 1.0;
	private m_preProgress = -1.0;
	private m_progress = 0.0;

	private m_nameWidth = 0.0;
	private m_value = 0.0;
	private m_ruisc: IVoxUIScene = null;

	private m_enabled = true;

	private m_fontColor: IColor4 = null;
	private m_fontBgColor: IColor4 = null;
	private m_bgColors: IColor4[] = null;

	private m_minValue = 0.0;
	private m_maxValue = 1.0;
	step = 0.1;
	uuid = "ProgressEntity";

	constructor() { super(); }
	setFontColor(fontColor: IColor4, bgColor: IColor4): void {
		this.m_fontColor = fontColor;
		this.m_fontBgColor = bgColor;
		// if (this.m_fontColor == null) this.m_fontColor = VoxMaterial.createColor4();
		// if (this.m_fontBgColor == null) this.m_fontBgColor = VoxMaterial.createColor4();
		// if (fontColor) {
		// 	this.m_fontColor.copyFrom(fontColor);
		// }
		// if (bgColor) {
		// 	this.m_fontBgColor.copyFrom(bgColor);
		// }
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

	addEventListener(type: number, listener: any, func: (evt: any) => void, captureEnabled: boolean = true, bubbleEnabled: boolean = false): void {
		this.m_dispatcher.addEventListener(type, listener, func, captureEnabled, bubbleEnabled);
	}
	removeEventListener(type: number, listener: any, func: (evt: any) => void): void {
		this.m_dispatcher.removeEventListener(type, listener, func);
	}

	destroy(): void {
		super.destroy();
		if(this.m_barPlane != null) {

			this.m_dispatcher.destroy();
			this.m_dispatcher = null;
			this.m_nameItem.destroy();
			this.m_nameItem = null;
			this.m_subItem.destroy();
			this.m_subItem = null;
			this.m_addItem.destroy();
			this.m_addItem = null;
			this.m_bgBarItem.destroy();
			this.m_bgBarItem = null;

			
			this.m_barPlane.destroy();
			this.m_barPlane = null;
			this.m_ruisc = null;
		}
	}
	getNameWidth(): number {
		return this.m_nameWidth;
	}
	initialize(uisc: IVoxUIScene, barName: string = "prog", fontSize: number = 30.0, nameWidth: number = 90, progLength: number = 200, height: number = 50): void {

		if (this.isIniting()) {
			this.init();

			this.m_ruisc = uisc;
			this.m_barInitLength = progLength;
			this.m_dispatcher = VoxRScene.createEventBaseDispatcher();
			this.m_currEvent = VoxRScene.createProgressDataEvent();

			let dis = 2.0;
			let px = 0;

			if (barName != "") {
				this.m_nameWidth = nameWidth;
				let nameItem = this.createBtn("name",uisc, [barName], fontSize, nameWidth, height);
				this.addEntity(nameItem.button);
				this.m_nameItem = nameItem;
				nameItem.button.addEventListener(MouseEvent.MOUSE_DOWN, this, this.nameBtnMouseDown);
				px += dis + nameWidth;
			}
			let subItem = this.createBtn("subProg",uisc, ["-"], fontSize, height, height);
			let addItem = this.createBtn("addProg",uisc, ["+"], fontSize, height, height);
			
			subItem.button.setX(px);
			this.addEntity(subItem.button);

			px += subItem.button.getWidth();
			addItem.button.setX(this.m_barInitLength + px);
			this.addEntity(addItem.button);

			subItem.button.addEventListener(MouseEvent.MOUSE_DOWN, this, this.btnMouseDown);
			addItem.button.addEventListener(MouseEvent.MOUSE_DOWN, this, this.btnMouseDown);
			this.m_subItem = subItem;
			this.m_addItem = addItem;

			this.initProg(uisc, px, this.m_barInitLength, height);

			this.setProgressV(this.m_progress);
		}
	}
	private initProg(uisc: IVoxUIScene, posX: number, barLength: number, height: number): void {

		let bgItem = this.createBtn("progBarBg",uisc, [], 0, barLength, height, 0.8);
		this.m_bgBarItem = bgItem;
		let bgButon = bgItem.button;
		bgButon.setX(posX);
		this.addEntity(bgButon);
		let bgLabel = bgItem.bgLabel;
		bgLabel.getColorAt(2).copyFrom(bgLabel.getColorAt(1));

		bgButon.addEventListener(MouseEvent.MOUSE_DOWN, this, this.barMouseDown);
		this.m_ruisc.addEventListener(MouseEvent.MOUSE_UP, this, this.barMouseUp, true, false);
		bgButon.addEventListener(MouseEvent.MOUSE_OVER, this, this.barMouseOver);
		bgButon.addEventListener(MouseEvent.MOUSE_OUT, this, this.barMouseOut);

		let barBgLabel = this.createBgLabel(1, height, 1.2);
		barBgLabel.setX(posX);
		barBgLabel.setZ(0.05);
		this.addEntity(barBgLabel);
		this.m_barPlane = barBgLabel;
	}
	private createBgLabel(pw: number, ph: number, intensity: number = 1.0): ClipColorLabel {

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
	private createBtn(uuid: string, uisc: IVoxUIScene, urls: string[], fontSize: number, pw: number, ph: number, intensity: number = 1.0): ButtonItem {

		let img: HTMLCanvasElement;
		let tta = uisc.transparentTexAtlas;

		let bgLabel = this.createBgLabel(pw, ph, intensity);

		let nameLabel: ClipLabel = null;

		let fontColor = this.m_fontColor != null ? this.m_fontColor : VoxMaterial.createColor4(1, 1, 1, 1);
		let bgColor = this.m_fontBgColor != null ? this.m_fontBgColor : VoxMaterial.createColor4(1, 1, 1, 0);

		if (urls != null && urls.length > 0) {

			for (let i = 0; i < urls.length; ++i) {
				img = tta.createCharsCanvasFixSize(pw, ph, urls[i], fontSize, fontColor, bgColor);
				tta.addImageToAtlas(urls[i], img);
			}

			nameLabel = new ClipLabel();
			nameLabel.transparent = true;
			nameLabel.premultiplyAlpha = true;
			nameLabel.initialize(tta, urls);
		}

		let btn = new Button();
		if (uuid != "") btn.uuid = uuid;
		if (urls != null && urls.length > 0) {
			btn.syncLabelClip = false;
			btn.addLabel(nameLabel);
		}

		btn.initializeWithLable(bgLabel);
		return new ButtonItem( btn, nameLabel, bgLabel );
	}
	setRange(min: number, max: number): void {
		this.m_preProgress = -1;
		this.m_minValue = min;
		this.m_maxValue = max;
	}
	setValue(value: number, sendEvtEnabled: boolean = true): void {
		this.m_preProgress = -1;
		value = MathConst.Clamp(value, this.m_minValue, this.m_maxValue);
		this.m_progress = (value - this.m_minValue) / (this.m_maxValue - this.m_minValue);
		this.setProgressV(this.m_progress, sendEvtEnabled);
	}
	getValue(): number {
		return this.m_value;
	}
	
	setProgress(barProgress: number, sendEvtEnabled: boolean = true): void {
		this.m_preProgress = -1;
		this.setProgressV(barProgress, sendEvtEnabled);
	}
	private setProgressV(barProgress: number, sendEvtEnabled: boolean = true): void {

		this.m_progress = MathConst.Clamp(barProgress, 0.0, 1.0);
		this.m_barLength = this.m_barInitLength * this.m_progress;
		

		this.sendValue(sendEvtEnabled);
	}
	private sendValue(sendEvtEnabled: boolean): void {
		// if (sendEvtEnabled) {
		// 	this.sendEvt(2);
		// }
		this.m_barPlane.setScaleX(this.m_barLength);
		this.m_barPlane.update();
		this.m_value = this.m_minValue + (this.m_maxValue - this.m_minValue) * this.m_progress;
		if (sendEvtEnabled) {
			let d = Math.abs(this.m_preProgress - this.m_progress);
			if(d > MathConst.MATH_MIN_POSITIVE) {
				this.m_preProgress = this.m_progress;
				this.sendEvt(2);
			}
		}
	}
	getProgress(): number {
		return this.m_progress;
	}
	private sendEvt(status: number): void {

		this.m_currEvent.target = this;
		this.m_currEvent.status = status;
		this.m_currEvent.type = ProgressDataEvent.PROGRESS;
		this.m_currEvent.minValue = this.m_minValue;
		this.m_currEvent.maxValue = this.m_maxValue;
		this.m_currEvent.value = this.m_value;
		this.m_currEvent.progress = this.m_progress;
		this.m_currEvent.phase = 1;
		this.m_currEvent.uuid = this.uuid;
		this.m_dispatcher.dispatchEvt(this.m_currEvent);
	}
	setProgressLength(length: number, sendEvtEnabled: boolean = true): void {

		this.m_barLength = MathConst.Clamp(length, 0.0, this.m_barInitLength);
		this.m_progress = this.m_barLength / this.m_barInitLength;

		this.sendValue(sendEvtEnabled);
		
	}
	private m_moveMin: number = 0;
	private nameBtnMouseDown(evt: any): void {
		this.sendEvt(0);
	}
	private barMouseDown(evt: any): void {
		// console.log("barMouseDown");
		this.m_moveMin = evt.mouseX - this.m_progress * this.m_barInitLength;
		this.setProgressV(this.m_progress);
		this.m_ruisc.addEventListener(MouseEvent.MOUSE_MOVE, this, this.barMouseMove, true, false);
	}
	private barMouseMove(evt: any): void {
		this.setProgressV((evt.mouseX - this.m_moveMin) / this.m_barInitLength);
	}
	private barMouseUp(evt: any): void {
		//console.log("barMouseUp");
		this.m_ruisc.removeEventListener(MouseEvent.MOUSE_MOVE, this, this.barMouseMove);
		this.m_ruisc.removeEventListener(EventBase.ENTER_FRAME, this, this.barEnterFrame);
	}
	private m_autoDelay: number = 0;
	private m_changeStep: number = 0;
	private barEnterFrame(evt: any): void {
		// console.log("barEnterFrame");
		if (this.m_autoDelay > 20) {
			if ((this.m_autoDelay % 7) == 0) {
				this.setProgressLength(this.m_barLength + this.m_changeStep);
			}
		}
		this.m_autoDelay++;
	}
	private barMouseOver(evt: any): void {
		this.m_barPlane.setClipIndex(1);
	}
	private barMouseOut(evt: any): void {
		this.m_barPlane.setClipIndex(0);
	}
	private btnMouseDown(evt: IEventBase): void {
		this.m_autoDelay = 0;
		if (evt.uuid == "subProg") {
			this.m_changeStep = -this.step;
			this.setProgressLength(this.m_barLength - this.step);
			this.m_ruisc.addEventListener(EventBase.ENTER_FRAME, this, this.barEnterFrame, true, false);
		} else if (evt.uuid == "addProg") {
			this.m_changeStep = this.step;
			this.setProgressLength(this.m_barLength + this.step);
			this.m_ruisc.addEventListener(EventBase.ENTER_FRAME, this, this.barEnterFrame, true, false);
		}
	}
}
export { ProgressEntity };
