import { IVoxUIScene } from "../scene/IVoxUIScene";
import { UIPanel } from "./UIPanel";
import { IParamCtrlPanel } from "./IParamCtrlPanel";
import { CtrlInfo, ItemCallback, CtrlItemParam, CtrlItemObj } from "./item/CtrlItemObj";
import { SelectionEvent, ProgressDataEvent, RendererDevice, MouseEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { Vector3D, MathConst, VoxMath } from "../../cospace/math/VoxMath";


import { SelectionEntity } from "../component/SelectionEntity";
import { ProgressEntity } from "../component/ProgressEntity";
import { ColorLabel } from "../entity/ColorLabel";
import { IUIEntity } from "../entity/IUIEntity";
import IColor4 from "../../vox/material/IColor4";
import { IColorPickPanel } from "./IColorPickPanel";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import ISelectionEvent from "../../vox/event/ISelectionEvent";
import IProgressDataEvent from "../../vox/event/IProgressDataEvent";

class ParamCtrlPanel extends UIPanel implements IParamCtrlPanel {

	/**
	 * 边距留白尺寸
	 */
	private m_marginWidth = 10;

	private m_colorPanel: IColorPickPanel = null;
	private m_selectedPlane: ColorLabel = null;
	private m_btnMap: Map<string, CtrlItemObj> = new Map();
	private m_contentW = 0;
	private m_contentH = 0;

	constructor() { super(); }

	initialize(scene: IVoxUIScene, rpi: number, panelW: number = 300, panelH: number = 350, marginWidth: number = 3): void {
		if (this.isIniting()) {
			this.init();

			this.m_marginWidth = marginWidth;
			this.m_scene = scene;
			this.m_rpi = rpi;

			this.m_panelW = panelW;
			this.m_panelH = panelH;
			this.buildItems();
		}
	}
	destroy(): void {
		super.destroy();

	}
	protected buildPanel(pw: number, ph: number): void {

	}
	private m_initing: boolean = true;
	protected buildItems(): void {
		if (this.m_initing) {
			this.m_initing = false;

			if (RendererDevice.IsMobileWeb()) {
				this.m_fontSize = 64;
				this.m_btnPX = 300;
			}
			if (RendererDevice.IsWebGL1()) {
				this.m_btnPX += 32;
				this.m_fontSize = MathConst.CalcCeilPowerOfTwo(this.m_fontSize);
			}
			this.m_menuBtn = this.createSelectBtn("", "menuCtrl", "Menu Open", "Menu Close", false, true);
		}
	}
	private m_fontSize = 30;
	private m_btnPX = 122.0;

	private m_visiBtns: (SelectionEntity | ProgressEntity)[] = [];
	private m_btns: (SelectionEntity | ProgressEntity)[] = [];
	private m_menuBtn: SelectionEntity = null;
	private createSelectBtn(ns: string, uuid: string, selectNS: string, deselectNS: string, flag: boolean, visibleAlways: boolean = false): SelectionEntity {

		let sc = this.m_scene;
		let selectBar = new SelectionEntity();
		selectBar.uuid = uuid;
		selectBar.initialize(sc, ns, selectNS, deselectNS, this.m_fontSize);
		selectBar.addEventListener(SelectionEvent.SELECT, this, this.selectChange);
		if (flag) {
			selectBar.select(false);
		}
		else {
			selectBar.deselect(false);
		}
		this.m_btns.push(selectBar);
		this.addEntity(selectBar);
		return selectBar;
	}
	private createProgressBtn(ns: string, uuid: string, progress: number, visibleAlways: boolean = false): ProgressEntity {

		let sc = this.m_scene;
		let proBar = new ProgressEntity();
		proBar.uuid = uuid;
		proBar.initialize(sc, ns, this.m_fontSize);
		proBar.setProgress(progress, false);
		proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.valueChange);
		this.m_btns.push(proBar);
		this.addEntity(proBar);
		return proBar;
	}

	private createValueBtn(ns: string, uuid: string, value: number, minValue: number, maxValue: number, visibleAlways: boolean = false): ProgressEntity {

		let sc = this.m_scene;
		let proBar = new ProgressEntity();
		proBar.uuid = uuid;
		proBar.initialize(sc, ns, this.m_fontSize);
		proBar.setRange(minValue, maxValue);
		proBar.setValue(value, false);

		proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.valueChange);
		this.m_btns.push(proBar);
		this.addEntity(proBar);
		return proBar;
	}
	protected openThis(): void {
		// let sc = this.getScene();
		if (this.m_menuBtn != null) {
			this.menuCtrl(true);
			this.m_menuBtn.deselect(true);
			this.layoutItem();
		}
	}
	protected closeThis(): void {
		if (this.m_menuBtn != null) {
			this.menuCtrl(false);
			this.m_menuBtn.select(false);
			if (this.m_selectedPlane != null) this.m_selectedPlane.setVisible(false);
		}
	}
	protected layout(): void {
	}

	private layoutPickColorPanel(tar: IUIEntity): void {
		let panel = this.m_colorPanel;
		if (panel != null && panel.isOpen()) {
			let bounds = tar.getGlobalBounds();
			panel.setXY(bounds.max.x - panel.getWidth(), bounds.max.y + 2);
			panel.setZ(tar.getZ() + 0.3);
			panel.update();
		}
	}
	private colorSelectListener(uuid: string, tar: IUIEntity, color: IColor4): void {

		console.log("color select..., tar: ", tar);
		console.log("color select..., this.getScene(): ", this.getScene());
		
		let panel = this.m_colorPanel;
		if (panel != null && panel.isOpen()) {
			panel.close();
			this.m_colorPanel = null;
		} else {
			
			let panel = this.getScene().panel.getPanel("colorPickPanel") as IColorPickPanel;
			if (panel != null) {
				if (panel.isOpen()) {
					panel.close();
				} else {
					this.m_colorPanel = panel;
					panel.open();
					panel.setPickXY(-1, -1);
					panel.setColor(color);
					this.layoutPickColorPanel(tar);
					panel.setSelectColorCallback((color: IColor4): void => {
						console.log("pick color: ", color)
						// this.setColor(color, true);
						this.selectColor(uuid, color);
					});
				}
			}
		}
	}
	private moveSelectToBtn(btn: ProgressEntity | SelectionEntity): void {

		// let bounds = btn.getGlobalBounds();
		this.createSelectPlane();

		// let pv = bounds.min;
		let pv = VoxMath.createVec3(btn.getX(), btn.getY());
		this.m_selectedPlane.setXY(pv.x, pv.y);
		this.m_selectedPlane.setScaleXY(btn.getWidth(), 3.0);
		this.m_selectedPlane.update();
		this.m_selectedPlane.setVisible(true);
	}
	private createSelectPlane(): void {
		if (this.m_selectedPlane == null) {
			this.m_selectedPlane = new ColorLabel();
			this.m_selectedPlane.initialize(1.0, 1.0);
			// this.m_selectedPlane.setZ(-1.0 );
			this.m_selectedPlane.depthTest = true;
			this.addEntity(this.m_selectedPlane);
			this.m_selectedPlane.setColor(VoxMaterial.createColor4(0.05, 0.1, 0.05));
			// this.m_selectedPlane.setVisible(false);
		}
	}
	// "number_value"(数值调节按钮),"progress"(百分比调节按钮),"status_select"(状态选择按钮)
	addItem(param: CtrlItemParam): void {

		let map = this.m_btnMap;
		if (!map.has(param.uuid)) {

			let obj = new CtrlItemObj();
			obj.param = param;
			obj.type = param.type;
			obj.uuid = param.uuid;
			let t = param;
			let visibleAlways = t.visibleAlways ? t.visibleAlways : false;
			t.colorPick = t.colorPick ? t.colorPick : false;

			switch (param.type) {
				case "number_value":
				case "number":

					t.value = t.value ? t.value : 0.0;
					t.minValue = t.minValue ? t.minValue : 0.0;
					t.maxValue = t.maxValue ? t.maxValue : 10.0;
					obj.btn = this.createValueBtn(t.name, t.uuid, t.value, t.minValue, t.maxValue);
					map.set(obj.uuid, obj);
					if (!t.colorPick) {
						obj.info = { type: param.type, uuid: param.uuid, values: [t.value], flag: t.flag };
						param.callback(obj.info);
					}
					break;
				case "progress":

					t.progress = t.progress ? t.progress : 0.0;
					obj.btn = this.createProgressBtn(t.name, t.uuid, t.progress, visibleAlways);
					map.set(obj.uuid, obj);
					if (!t.colorPick) {
						obj.info = { type: param.type, uuid: param.uuid, values: [t.progress], flag: t.flag };
						param.callback(obj.info);
					}
					break;
				case "status":
				case "status_select":

					t.flag = t.flag ? t.flag : false;
					obj.btn = this.createSelectBtn(t.name, t.uuid, t.selectNS, t.deselectNS, t.flag, visibleAlways);
					map.set(obj.uuid, obj);
					obj.info = { type: param.type, uuid: param.uuid, values: [], flag: t.flag };
					param.callback(obj.info);
					break;
				default:
					break;
			}
		}
	}
	addItems(params: CtrlItemParam[]): void {
		for (let i = 0; i < params.length; ++i) {
			this.addItem(params[i]);
		}
	}
	getItemByUUID(uuid: string): CtrlItemObj {
		if (this.m_btnMap.has(uuid)) {
			return this.m_btnMap.get(uuid);
		}
		return null;
	}
	private menuCtrl(flag: boolean): void {
		let ls = this.m_visiBtns;
		if (ls.length > 0) {
			if (flag && !ls[0].isOpen()) {
				for (let i = 0; i < ls.length; ++i) {
					ls[i].open();
				}
				this.m_menuBtn.getPosition(this.m_pos);
				this.m_pos.x = this.m_btnPX;
				this.m_menuBtn.setPosition(this.m_pos);
			}
			else if (ls[0].isOpen()) {
				for (let i = 0; i < ls.length; ++i) {
					ls[i].close();
				}
				this.m_menuBtn.getPosition(this.m_pos);
				this.m_pos.x = 0;
				this.m_menuBtn.setPosition(this.m_pos);
				if (this.m_selectedPlane != null) this.m_selectedPlane.setVisible(false);
			}
		}
		if (this.m_colorPanel != null) this.m_colorPanel.close();
	}

	layoutItem(): void {

		if(this.m_menuBtn != null) {

			let disX = 2.0;
			let disY = 2.0;
			let offset = this.m_marginWidth;
			let begin = VoxMath.createVec3(offset + disX, offset);
			let pos = begin.clone();
	
			let maxNameW = 0;

			let btns = this.m_btns;
			for (let i = 0; i < btns.length; ++i) {
				btns[i].update();
				
				// console.log("vw: ", btns[i].getNameWidth());
				if (btns[i].getNameWidth() > maxNameW) {
					maxNameW = btns[i].getNameWidth();
				}
			}
			begin.x += maxNameW;
			let pw = 0.0;
			let py = pos.y;
			for (let i = 0; i < btns.length; ++i) {
				let v = btns[i].getNameWidth();
				// console.log("v: ", v);
				v = v > 0 ? (v + disX) : 0;
				pos.x = begin.x - v;
				btns[i].setPosition(pos);
				btns[i].update();

				if( btns[i].getWidth() > pw ) {
					pw = btns[i].getWidth();
				}
				pos.y += btns[i].getHeight() + disY;
			}
			this.m_contentW = pw + offset * 2.0;
			this.m_contentH = pos.y - py + offset * 3.0;
			this.updateBgSize();
		}
	}

	private updateBgSize(): void {
		
		let pw = this.m_contentW;
		let ph = this.m_contentH;
		let flag = Math.abs(pw - this.m_panelW) > 0.0001;
		flag = flag || Math.abs(ph - this.m_panelH) > 0.0001;

		if(this.m_bgLabel != null && flag) {

			let sx = pw / this.m_panelW;
			let sy = ph / this.m_panelH;
			this.m_bgLabel.setScaleXY(sx, sy);
			this.m_bgLabel.update();
			this.update();
		}
	}

	private selectChange(evt: ISelectionEvent): void {

		let flag = evt.flag;
		let uuid = evt.uuid;
		let map = this.m_btnMap;
		if (map.has(uuid)) {
			let obj = map.get(uuid);
			obj.sendFlagOut(flag);
			this.moveSelectToBtn(evt.target);
		}
		if (this.m_colorPanel != null) this.m_colorPanel.close();
	}
	private m_currUUID = "";
	private selectColor(uuid: string, color: IColor4): void {

		let map = this.m_btnMap;
		if (map.has(uuid)) {
			let obj = map.get(uuid);
			let param = obj.param;
			if (param.colorPick) {
				obj.sendColorOut(color);
			}
		}
	}
	private valueChange(evt: IProgressDataEvent): void {

		console.log("valueChange(), evt.target: ", evt.target);
		let value = evt.value;
		let uuid = evt.uuid;
		let map = this.m_btnMap;
		let changeFlag = this.m_currUUID != uuid;
		this.m_currUUID = uuid;

		if (map.has(uuid)) {
			let obj = map.get(uuid);
			let param = obj.param;
			if (evt.status == 2) {

				obj.sendValueOut(value);

				if (this.m_colorPanel != null && changeFlag) this.m_colorPanel.close();
			} else if (evt.status == 0) {
				console.log("only select the btn");
				if (param.colorPick) {
					// if (this.m_colorPanel != null && this.m_colorPanel.isClosed()) {
					//     this.m_colorPanel.open();
					// }
					// if (obj.colorId >= 0) this.m_colorPanel.selectColorById(obj.colorId);
					let color = VoxMaterial.createColor4();
					color.fromArray3(obj.color);
					this.colorSelectListener(evt.uuid, evt.target, color);
				} else {
					if (this.m_colorPanel != null) this.m_colorPanel.close();
				}
			}
			this.moveSelectToBtn(evt.target);
		}
	}
	// private mouseBgDown(evt: any): void {
	// 	if (this.m_colorPanel != null) this.m_colorPanel.close();
	// }

	addStatusItem(name: string, uuid: string, selectNS: string, deselectNS: string, flag: boolean, callback: ItemCallback, visibleAlways: boolean = true): void {
		let param: CtrlItemParam = {
			type: "status_select", name: name, uuid: uuid,
			selectNS: selectNS, deselectNS: deselectNS,
			flag: flag,
			visibleAlways: visibleAlways,
			callback: callback
		};

		this.addItem(param);
	}
	addProgressItem(name: string, uuid: string, progress: number, callback: ItemCallback, colorPick?: boolean, visibleAlways: boolean = true): void {
		let param: CtrlItemParam = {
			type: "progress", name: name, uuid: uuid,
			progress: progress,
			visibleAlways: visibleAlways,
			colorPick: colorPick,
			callback: callback
		};
		this.addItem(param);
	}
	addValueItem(name: string, uuid: string, value: number, minValue: number, maxValue: number, callback: ItemCallback, colorPick?: boolean, visibleAlways: boolean = true, values?: number[]): void {
		let param: CtrlItemParam = {
			type: "number_value", name: name, uuid: uuid,
			value: value,
			minValue: minValue,
			maxValue: maxValue,
			visibleAlways: visibleAlways,
			colorPick: colorPick,
			values: values,
			callback: callback
		};
		this.addItem(param);
	}
}
export { CtrlInfo, ParamCtrlPanel };
