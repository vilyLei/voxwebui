
import { MouseEvent, SelectionEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import IEvtDispatcher from "../../vox/event/IEvtDispatcher";
import ISelectionEvent from "../../vox/event/ISelectionEvent";
import IColor4 from "../../vox/material/IColor4";
import { Button } from "../button/Button";
import { ClipColorLabel } from "../entity/ClipColorLabel";
import { ClipLabel } from "../entity/ClipLabel";
import { UIEntityContainer } from "../entity/UIEntityContainer";
import { IVoxUIScene } from "../scene/IVoxUIScene";

type IButtonItem = { button: Button, label: ClipLabel };
class SelectionEntity extends UIEntityContainer {

	private m_dispatcher: IEvtDispatcher = null;
	private m_currEvent: ISelectionEvent = null;

	private m_nameItem: IButtonItem = null;
	private m_flagItem: IButtonItem = null;

	private m_flag = true;
	private m_enabled = true;
	private m_nameWidth = 0.0;

	private m_fontColor: IColor4 = null;
	private m_fontBgColor: IColor4 = null;
	private m_bgColors: IColor4[] = null;

	uuid = "SelectionEntity";
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
	/**
	 * 选中
	 * @param sendEvtEnabled 是否发送选中的事件。 如果不发送事件，则只会改变状态。
	 */
	select(sendEvtEnabled: boolean = false): void {
		if (!this.m_flag) {
			this.m_flag = true;
			this.updateState();
			if (sendEvtEnabled) this.sendEvt();
		}
	}
	/**
	 * 取消选中
	 * @param sendEvtEnabled 是否发送取消选中的事件。 如果不发送事件，则只会改变状态。
	 */
	deselect(sendEvtEnabled: boolean = false): void {
		if (this.m_flag) {
			this.m_flag = false;
			this.updateState();
			if (sendEvtEnabled) this.sendEvt();
		}
	}
	setFlag(flag: boolean, sendEvtEnabled: boolean = false): void {
		if (flag) {
			this.select(sendEvtEnabled);
		} else {
			this.deselect(sendEvtEnabled);
		}
	}
	isSelected(): boolean {
		return this.m_flag;
	}
	private nameBtnMouseDown(evt: any): void {
		if (this.m_enabled) {
			this.m_flag = !this.m_flag;
			this.updateState();
			this.sendEvt();
		}
	}
	private sendEvt(): void {

		this.m_currEvent.target = this;
		this.m_currEvent.type = SelectionEvent.SELECT;
		this.m_currEvent.flag = this.m_flag;
		this.m_currEvent.phase = 1;
		this.m_currEvent.uuid = this.uuid;
		this.m_dispatcher.dispatchEvt(this.m_currEvent);
	}
	private updateState(): void {

		this.m_flagItem.label.setClipIndex(this.m_flag ? 0 : 1);
	}
	private btnMouseUp(evt: any): void {
		if (this.m_enabled) {
			this.m_flag = !this.m_flag;
			this.updateState();
			this.sendEvt();
		}
	}

	destroy(): void {
		super.destroy();
		if (this.m_flagItem != null) {

			this.m_nameItem.button.destroy();
			this.m_nameItem.label.destroy();

			this.m_nameItem = null;
			this.m_flagItem = null;

			this.m_dispatcher.destroy();
			this.m_dispatcher = null;

			this.m_fontColor = null;
			this.m_fontBgColor = null;
			this.m_bgColors = null;
		}
	}
	getNameWidth(): number {
		return this.m_nameWidth;
	}
	initialize(uisc: IVoxUIScene, barName: string = "select", select_name: string = "Yes", deselect_name: string = "No", fontSize: number = 30.0, nameWidth: number = 90, flagWidth: number = 60, height: number = 50): void {

		if (this.isIniting()) {
			this.init();
			let dis = 2.0;
			this.m_dispatcher = VoxRScene.createEventBaseDispatcher();
			this.m_currEvent = VoxRScene.createSelectionEvent();
			if (barName != "") {
				this.m_nameWidth = nameWidth;
				let nameItem = this.createBtn(uisc, [barName], fontSize, nameWidth, height);
				this.addEntity(nameItem.button);
				this.m_nameItem = nameItem;
				nameItem.button.addEventListener(MouseEvent.MOUSE_DOWN, this, this.nameBtnMouseDown);
			}

			let flagItem = this.createBtn(uisc, [select_name, deselect_name], fontSize, flagWidth, height);
			if (barName != "") {
				flagItem.button.setX(nameWidth + dis);
			}
			this.addEntity(flagItem.button);
			this.m_flagItem = flagItem;
			flagItem.button.addEventListener(MouseEvent.MOUSE_UP, this, this.btnMouseUp);

		}
	}
	private createBtn(uisc: IVoxUIScene, urls: string[], fontSize: number, pw: number, ph: number): IButtonItem {

		let img: HTMLCanvasElement;
		let tta = uisc.transparentTexAtlas;

		let bgLabel = new ClipColorLabel();
		bgLabel.initializeWithoutTex(pw, ph, 4);
		let sls = this.m_bgColors;
		if (sls == null) {
			bgLabel.getColorAt(0).setRGB3f(0.2, 0.2, 0.2);
			bgLabel.getColorAt(1).setRGB3f(0.3, 0.3, 0.3);
			bgLabel.getColorAt(2).setRGB3f(0.2, 0.6, 1.0);
			bgLabel.getColorAt(3).setRGB3f(0.3, 0.3, 0.3);
		} else {
			let dcls = bgLabel.getColors();
			for(let i = 0; i < dcls.length; ++i) {
				dcls[i].copyFrom(sls[i]);
			}
		}

		let fontColor = this.m_fontColor != null ? this.m_fontColor : VoxMaterial.createColor4(1, 1, 1, 1);
		let bgColor = this.m_fontBgColor != null ? this.m_fontBgColor : VoxMaterial.createColor4(1, 1, 1, 0);

		for (let i = 0; i < urls.length; ++i) {
			img = tta.createCharsCanvasFixSize(pw, ph, urls[i], fontSize, fontColor, bgColor);
			tta.addImageToAtlas(urls[i], img);
		}

		let nameLabel = new ClipLabel();
		nameLabel.transparent = true;
		nameLabel.premultiplyAlpha = true;
		nameLabel.initialize(tta, urls);

		let btn = new Button();
		btn.syncLabelClip = false;
		btn.addLabel(nameLabel);
		btn.initializeWithLable(bgLabel);
		return { button: btn, label: nameLabel };
	}

}
export { SelectionEntity };
