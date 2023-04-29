import { MouseEvent, SelectionEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import IEvtDispatcher from "../../vox/event/IEvtDispatcher";
import ISelectionEvent from "../../vox/event/ISelectionEvent";
import { IVoxUIScene } from "../scene/IVoxUIScene";
import { ButtonItem, CompEntityBase } from "./CompEntityBase";

class SelectionEntity extends CompEntityBase {

	private m_currEvent: ISelectionEvent = null;

	private m_nameItem: ButtonItem = null;
	private m_flagItem: ButtonItem = null;

	private m_flag = true;
	private m_enabled = true;
	private m_nameWidth = 0.0;

	constructor() {
		super();
		this.uuid = "SelectionEntity";
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
		let t = this.m_currEvent;
		t.target = this;
		t.type = SelectionEvent.SELECT;
		t.flag = this.m_flag;
		t.phase = 1;
		t.uuid = this.uuid;
		this.m_dispatcher.dispatchEvt(t);
		t.target = null;
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

			this.m_nameItem.destroy();
			this.m_nameItem = null;
			this.m_flagItem.destroy();
			this.m_flagItem = null;

			this.m_dispatcher.destroy();
			this.m_dispatcher = null;
		}
	}
	getNameWidth(): number {
		return this.m_nameWidth;
	}
	/**
	 * @param uisc IVoxUIScene instance
	 * @param btnName btn name, the default value is "select"
	 * @param select_name btn selecting status name, the default value is "Yes"
	 * @param deselect_name btn deselecting status name, the default value is "No"
	 * @param fontSize font size, the default value is 30
	 * @param nameWidth btn name part width, the default value is 70
	 * @param statusWidth btn status part width, the default value is 50
	 * @param height btn height, the default value is 40
	 */
	initialize(uisc: IVoxUIScene, btnName: string = "select", select_name: string = "Yes", deselect_name: string = "No", fontSize: number = 30.0, nameWidth: number = 70, statusWidth: number = 50, height: number = 40): void {

		if (this.isIniting()) {
			this.init();
			let dis = 2.0;
			this.m_dispatcher = VoxRScene.createEventBaseDispatcher();
			this.m_currEvent = VoxRScene.createSelectionEvent();
			if (btnName != "") {
				let nameItem = this.createBtn("name",uisc, [btnName], fontSize, nameWidth, height);
				this.addEntity(nameItem.button);
				this.m_nameWidth = nameItem.button.getWidth();
				this.m_nameItem = nameItem;
				nameItem.button.addEventListener(MouseEvent.MOUSE_DOWN, this, this.nameBtnMouseDown);
			}

			let flagItem = this.createBtn("flag",uisc, [select_name, deselect_name], fontSize, statusWidth, height);
			if (btnName != "") {
				flagItem.button.setX(this.m_nameWidth + dis);
			}
			this.addEntity(flagItem.button);
			this.m_flagItem = flagItem;
			flagItem.button.addEventListener(MouseEvent.MOUSE_UP, this, this.btnMouseUp);

		}
	}
}
export { SelectionEntity };
