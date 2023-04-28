import { IButton } from "../button/IButton";
import { ISelectButtonGroup } from "../button/ISelectButtonGroup";

import { ICoRScene } from "../../cospace/voxengine/ICoRScene";
import { IClipColorLabel } from "../entity/IClipColorLabel";
declare var CoRScene: ICoRScene;

class SelectButtonGroup implements ISelectButtonGroup {
	private m_map: Map<string, IButton> = new Map();
	private m_selectFunc: (btn: IButton) => void = null;
	private m_deselectFunc: (btn: IButton) => void = null;
	private m_mouseUpSelect: boolean = true;
	private m_btn: IButton = null;

	constructor(mouseUpSelect: boolean = true) {
		this.m_mouseUpSelect = mouseUpSelect;
	}
	addButton(btn: IButton): void {
		if (btn != null) {
			if (this.m_map == null) {
				this.m_map = new Map();
			}

			this.m_map.set(btn.uuid, btn);

			const ME = CoRScene.MouseEvent;
			if (this.m_mouseUpSelect) {
				btn.addEventListener(ME.MOUSE_UP, this, this.mouseEvtFunc);
			} else {
				btn.addEventListener(ME.MOUSE_DOWN, this, this.mouseEvtFunc);
			}
			if (this.m_deselectFunc) {
				this.m_deselectFunc(btn);
			} else {
				this.applyDeselectColors(btn);
			}
		}
	}
	private mouseEvtFunc(evt: any): void {
		this.select(evt.currentTarget.uuid);
	}
	setSelectedFunction(selectFunc: (btn: IButton) => void, deselectFunc: (btn: IButton) => void): void {
		this.m_selectFunc = selectFunc;
		this.m_deselectFunc = deselectFunc;
	}
	selectButton(btn: IButton): void {
		if (btn) {
			this.select(btn.uuid);
		}
	}
	select(uuid: string): void {
		if (this.m_map != null && this.m_map.has(uuid)) {
			let btn = this.m_map.get(uuid);
			if (this.m_btn != btn) {
				if (this.m_btn) {
					if (this.m_deselectFunc) {
						this.m_deselectFunc(this.m_btn);
					} else {
						this.applyDeselectColors(this.m_btn);
					}
				}
				this.m_btn = btn;
				if (this.m_selectFunc) {
					this.m_selectFunc(btn);
				} else {
					this.applySelectColors(btn);
				}
			}
		}
	}
	private m_selectColorHexList = [0x4caf50, 0xaaac6a, 0x6ccf70];
	private m_deselectColorHexList = [0x5dbea3, 0x33b249, 0x5adbb5];
	/**
	 * @param colorHexList for example: [0x4caf50, 0xaaac6a, 0x6ccf70]
	 */
	setSelectColors(colorHexList: number[]): void {
		if (colorHexList) {
			let ls = this.m_selectColorHexList;
			let len = Math.min(colorHexList.length, ls.length);
			for (let i = 0; i < len; ++i) {
				ls[i] = colorHexList[i];
			}
		}
	}
	/**
	 * @param colorHexList for example: [0x4caf50, 0xaaac6a, 0x6ccf70]
	 */
	setDeselectColors(colorHexList: number[]): void {
		if (colorHexList) {
			let ls = this.m_deselectColorHexList;
			let len = Math.min(colorHexList.length, ls.length);
			for (let i = 0; i < len; ++i) {
				ls[i] = colorHexList[i];
			}
		}
	}
	private setBtnColors(btn: IButton, colorHexList: number[]): void {
		let label = btn.getLable() as IClipColorLabel;
		if (label.setColorsWithHex) {
			label.setColorsWithHex(colorHexList);
		}
	}
	private applySelectColors(btn: IButton): void {
		this.setBtnColors(btn, this.m_selectColorHexList);
	}
	private applyDeselectColors(btn: IButton): void {
		this.setBtnColors(btn, this.m_deselectColorHexList);
	}
	destroy(): void {
		this.m_btn = null;
		this.m_map = null;
		this.m_selectFunc = null;
		this.m_deselectFunc = null;
	}
}
export { SelectButtonGroup };
