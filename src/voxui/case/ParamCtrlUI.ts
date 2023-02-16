import { CtrlInfo, ItemCallback, CtrlItemParam, CtrlItemObj } from "./item/CtrlItemObj";
import { SelectionEvent, ProgressDataEvent, RendererDevice, MouseEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { Vector3D, MathConst, VoxMath } from "../../cospace/math/VoxMath";
import { IVoxUIScene } from "../scene/IVoxUIScene";
import { SelectionEntity } from "../component/SelectionEntity";
import { ProgressEntity } from "../component/ProgressEntity";
import IVector3D from "../../vox/math/IVector3D";
import ISelectionEvent from "../../vox/event/ISelectionEvent";
import IProgressDataEvent from "../../vox/event/IProgressDataEvent";
import { IColorPickPanel } from "../panel/IColorPickPanel";
import IColor4 from "../../vox/material/IColor4";
import { UIEntityBase } from "../entity/UIEntityBase";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import { ColorLabel } from "../entity/ColorLabel";

export default class ParamCtrlUI {

    private m_ruisc: IVoxUIScene = null;
    private m_colorPanel: IColorPickPanel = null;
    private m_selectedPlane: ColorLabel = null;
    constructor() { }

    initialize(uisc: IVoxUIScene, buildDisplay: boolean = true): void {

        if (this.m_ruisc == null) {

            this.m_ruisc = uisc;

            this.m_ruisc.addEventListener(MouseEvent.MOUSE_BG_DOWN, this, this.mouseBgDown);
            this.initUIScene(buildDisplay);
        }
    }
    close(): void {
        if (this.m_menuBtn != null) {
            this.menuCtrl(false);
            this.m_menuBtn.select(false);
            if(this.m_selectedPlane != null)this.m_selectedPlane.setVisible(false);
        }
    }
    open(): void {
        if (this.m_menuBtn != null) {
            this.menuCtrl(true);
            this.m_menuBtn.deselect(true);
        }
    }
    isOpen(): boolean {
        return this.m_menuBtn != null && !this.m_menuBtn.isSelected();
    }

    private layoutPickColorPanel(tar: UIEntityBase): void {
        let panel = this.m_colorPanel;
        if (panel != null && panel.isOpen()) {
            let bounds = tar.getGlobalBounds();
            panel.setXY(bounds.max.x - panel.getWidth(), bounds.max.y + 2);
            panel.setZ(tar.getZ() + 0.3);
            panel.update();
        }
    }
    private colorSelectListener(uuid: string, tar: UIEntityBase, color: IColor4): void {

        console.log("color select..., tar: ", tar);
        let panel = this.m_colorPanel;
        if (panel != null && panel.isOpen()) {
            panel.close();
            this.m_colorPanel = null;
        } else {
            //IColorPickPanel
            let panel = this.m_ruisc.panel.getPanel("colorPickPanel") as IColorPickPanel;
            if (panel != null) {
                if (panel.isOpen()) {
                    panel.close();
                } else {
                    this.m_colorPanel = panel;
                    panel.open();
                    panel.setColor(color);
                    this.layoutPickColorPanel(tar);
                    panel.setSelectColorCallback((color: IColor4, px: number, py: number): void => {
                        console.log("pick color: ", color)
                        // this.setColor(color, true);
                        this.selectColor(uuid, color);
                    });
                }
            }
        }
    }
    private initUIScene(buildDisplay: boolean): void {
        this.m_pos = VoxMath.createVec3();
        if (buildDisplay) {
            this.initUI();
        }
    }
    private initUI(): void {
        this.initCtrlBars();
    }

    private m_fontSize = 30;
    private m_btnPX = 122.0;
    private m_pos: IVector3D = null;

    private m_visiBtns: (SelectionEntity | ProgressEntity)[] = [];
    private m_btns: (SelectionEntity | ProgressEntity)[] = [];
    private m_menuBtn: SelectionEntity = null;
    private createSelectBtn(ns: string, uuid: string, selectNS: string, deselectNS: string, flag: boolean, visibleAlways: boolean = false): SelectionEntity {

        let selectBar = new SelectionEntity();
        selectBar.uuid = uuid;
        selectBar.initialize(this.m_ruisc, ns, selectNS, deselectNS, this.m_fontSize);
        selectBar.addEventListener(SelectionEvent.SELECT, this, this.selectChange);
        if (flag) {
            selectBar.select(false);
        }
        else {
            selectBar.deselect(false);
        }
        if (!visibleAlways) this.m_visiBtns.push(selectBar);
        this.m_btns.push(selectBar);
        this.m_ruisc.addEntity(selectBar);
        return selectBar;
    }
    private createProgressBtn(ns: string, uuid: string, progress: number, visibleAlways: boolean = false): ProgressEntity {

        let proBar = new ProgressEntity();
        proBar.uuid = uuid;
        proBar.initialize(this.m_ruisc, ns, this.m_fontSize);
        proBar.setProgress(progress, false);
        proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.valueChange);
        if (!visibleAlways) this.m_visiBtns.push(proBar);
        this.m_btns.push(proBar);
        this.m_ruisc.addEntity(proBar);
        return proBar;
    }

    private createValueBtn(ns: string, uuid: string, value: number, minValue: number, maxValue: number, visibleAlways: boolean = false): ProgressEntity {

        let proBar = new ProgressEntity();
        proBar.uuid = uuid;
        proBar.initialize(this.m_ruisc, ns, this.m_fontSize);
        proBar.setRange(minValue, maxValue);
        proBar.setValue(value, false);

        proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.valueChange);
        if (!visibleAlways) this.m_visiBtns.push(proBar);
        this.m_btns.push(proBar);
        this.m_ruisc.addEntity(proBar);
        return proBar;
    }
    private moveSelectToBtn(btn: ProgressEntity | SelectionEntity): void {

        let bounds = btn.getGlobalBounds();
        this.createSelectPlane();

        let pv = bounds.min;
        this.m_selectedPlane.setXY(pv.x, pv.y);
        this.m_selectedPlane.setScaleXY(bounds.getWidth(), 3.0);
        this.m_selectedPlane.update();
        this.m_selectedPlane.setVisible(true);
    }
    private createSelectPlane(): void {
        if(this.m_selectedPlane == null) {
            this.m_selectedPlane = new ColorLabel();
            this.m_selectedPlane.initialize(1.0, 1.0);
            // this.m_selectedPlane.setZ(-1.0 );
            this.m_selectedPlane.depthTest = true;
            this.m_ruisc.addEntity(this.m_selectedPlane);
            this.m_selectedPlane.setColor(VoxMaterial.createColor4(0.05,0.1,0.05));
            // this.m_selectedPlane.setVisible(false);
        }
    }
    private initCtrlBars(): void {

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
    private m_btnMap: Map<string, CtrlItemObj> = new Map();
    //"number_value"(数值调节按钮),"progress"(百分比调节按钮),"status_select"(状态选择按钮)
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
        if(this.m_visiBtns.length > 0) {
            if (flag && !this.m_visiBtns[0].isOpen()) {
                for (let i = 0; i < this.m_visiBtns.length; ++i) {
                    this.m_visiBtns[i].open();
                }
                this.m_menuBtn.getPosition(this.m_pos);
                this.m_pos.x = this.m_btnPX;
                this.m_menuBtn.setPosition(this.m_pos);
            }
            else if (this.m_visiBtns[0].isOpen()) {
                for (let i = 0; i < this.m_visiBtns.length; ++i) {
                    this.m_visiBtns[i].close();
                }
                this.m_menuBtn.getPosition(this.m_pos);
                this.m_pos.x = 0;
                this.m_menuBtn.setPosition(this.m_pos);
                this.m_selectedPlane.setVisible(false);
            }
        }
        if (this.m_colorPanel != null) this.m_colorPanel.close();
    }
    updateLayout(force: boolean = false): void {

        let dis = 2.0;
        let btns = force ? this.m_btns : this.m_visiBtns;
        let disY = 2.0;
        let begin = VoxMath.createVec3(10, 110);
        let pos = VoxMath.createVec3(begin.x, begin.y);

        let maxNameW = -1;
        for (let i = 0; i < btns.length; ++i) {
            if (btns[i].getNameWidth() > maxNameW) {
                maxNameW = btns[i].getNameWidth();
            }
        }
        begin.x += maxNameW;
        for (let i = 0; i < btns.length; ++i) {
            let v = btns[i].getNameWidth() > 0 ? (btns[i].getNameWidth() + dis) : 0;
            pos.x = begin.x - v;
            btns[i].setPosition(pos);
            btns[i].update();
            pos.y += btns[i].getHeight() + disY;
        }
        // this.m_colorPanel.setXY(this.m_btnPX, this.m_btnPY);
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

        // let currEvt = evt as RGBColoSelectEvent;
        // console.log("selectColor, currEvt: ", currEvt);
        // let uuid = this.m_currUUID;
        let map = this.m_btnMap;
        if (map.has(uuid)) {
            let obj = map.get(uuid);
            let param = obj.param;
            if (param.colorPick) {
                // obj.colorId = currEvt.colorId;
                obj.sendColorOut(color);
            }
        }

        // let currEvt = evt as RGBColoSelectEvent;
        // console.log("selectColor, currEvt: ", currEvt);
        // let uuid = this.m_currUUID;
        // let map = this.m_btnMap;
        // if (map.has(uuid)) {
        //     let obj = map.get(uuid);
        //     let param = obj.param;
        //     if (param.colorPick) {
        //         obj.colorId = currEvt.colorId;
        //         obj.sendColorOut(currEvt.color);
        //     }
        // }
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
    private mouseBgDown(evt: any): void {
        if (this.m_colorPanel != null) this.m_colorPanel.close();
    }

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
export { CtrlInfo, ItemCallback, CtrlItemParam, CtrlItemObj, ParamCtrlUI };