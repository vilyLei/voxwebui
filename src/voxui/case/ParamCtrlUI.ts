
// import SelectionEntity from "../../orthoui/button/SelectionEntity";
// import ProgressEntity from "../../orthoui/button/ProgressEntity";
// import ProgressDataEvent from "../../vox/event/ProgressDataEvent";
// import CanvasTextureTool from "../../orthoui/assets/CanvasTextureTool";
// import SelectionEvent from "../../vox/event/SelectionEvent";
// import RGBColorPanel, { RGBColoSelectEvent } from "../../orthoui/panel/RGBColorPanel";
// import Color4 from "../../vox/material/Color4";
// import Vector3D from "../../vox/math/Vector3D";
// import MathConst from "../../vox/math/MathConst";
// import AABB2D from "../../vox/geom/AABB2D";
// import Plane3DEntity from "../../vox/entity/Plane3DEntity";

import { CtrlInfo, ItemCallback, CtrlItemParam, CtrlItemObj } from "./item/CtrlItemObj";
import IRendererScene from "../../vox/scene/IRendererScene";
// import EventBase from "../../vox/event/EventBase";
import { SelectionEvent, ProgressDataEvent, RendererDevice, MouseEvent, VoxRScene } from "../../cospace/voxengine/VoxRScene";
import { Vector3D, MathConst, VoxMath } from "../../cospace/math/VoxMath";
import { IVoxUIScene } from "../scene/IVoxUIScene";
import { SelectionEntity } from "../component/SelectionEntity";
import { ProgressEntity } from "../component/ProgressEntity";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IVector3D from "../../vox/math/IVector3D";
import ISelectionEvent from "../../vox/event/ISelectionEvent";
import IProgressDataEvent from "../../vox/event/IProgressDataEvent";

export default class ParamCtrlUI {

    private m_ruisc: IVoxUIScene = null;

    // ruisc: IRendererScene = null;
    rgbPanel: any;
    
    constructor() { }

    initialize(uisc: IVoxUIScene, buildDisplay: boolean = true): void {

        if (this.m_ruisc == null) {

            this.m_ruisc = uisc;;

            this.m_ruisc.addEventListener(MouseEvent.MOUSE_BG_DOWN, this, this.mouseBgDown);

            // CanvasTextureTool.GetInstance().initialize(this.m_ruisc);
            // CanvasTextureTool.GetInstance().initializeAtlas(1024, 1024, new Color4(1.0, 1.0, 1.0, 0.0), true);
            this.initUIScene(buildDisplay);
        }
    }
    close(): void {
        if (this.m_menuBtn != null) {
            this.menuCtrl(false);
            this.m_menuBtn.select(false);
            this.m_selectPlane.setVisible(false);
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
    private initUIScene(buildDisplay: boolean): void {
        this.m_pos = VoxMath.createVec3();
        if (buildDisplay) {
            this.initUI();
        }
    }
    // private resize(evt: any): void {
    //     // let stage = this.m_ruisc.getStage3D();
    //     // this.ruisc.getCamera().translationXYZ(stage.stageHalfWidth, stage.stageHalfHeight, 1500.0);
    //     // this.ruisc.getCamera().update();
    // }
    private initUI(): void {
        this.initCtrlBars();

    }
    private m_btnSize = 30;
    private m_bgLength = 200.0;
    private m_btnPX = 122.0;
    private m_btnPY = 10.0;
    private m_btnYSpace = 4.0;
    private m_pos: IVector3D = null;
    private m_selectPlane: ITransformEntity = null;

    private m_visiBtns: (SelectionEntity | ProgressEntity)[] = [];
    private m_btns: (SelectionEntity | ProgressEntity)[] = [];
    private m_menuBtn: SelectionEntity = null;
    private m_minBtnX = 10000;
    private createSelectBtn(ns: string, uuid: string, selectNS: string, deselectNS: string, flag: boolean, visibleAlways: boolean = false): SelectionEntity {

        let selectBar = new SelectionEntity();
        selectBar.uuid = uuid;
        selectBar.initialize(this.m_ruisc, ns, selectNS, deselectNS, this.m_btnSize);
        selectBar.addEventListener(SelectionEvent.SELECT, this, this.selectChange);
        if (flag) {
            selectBar.select(false);
        }
        else {
            selectBar.deselect(false);
        }
        selectBar.setXY(this.m_btnPX, this.m_btnPY);
        this.m_btnPY += this.m_btnSize + this.m_btnYSpace;
        if (!visibleAlways) this.m_visiBtns.push(selectBar);
        this.m_btns.push(selectBar);

        selectBar.update();
        let bounds = selectBar.getGlobalBounds();
        let minX = this.m_btnPX + bounds.min.x;

        if (minX < this.m_minBtnX) {
            this.m_minBtnX = minX;
        }
        return selectBar;
    }
    private createProgressBtn(ns: string, uuid: string, progress: number, visibleAlways: boolean = false): ProgressEntity {

        let proBar = new ProgressEntity();
        proBar.uuid = uuid;
        proBar.initialize(this.m_ruisc, ns, this.m_btnSize, this.m_bgLength);
        proBar.setProgress(progress, false);
        proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.valueChange);
        proBar.setXY(this.m_btnPX, this.m_btnPY);
        this.m_btnPY += this.m_btnSize + this.m_btnYSpace;
        if (!visibleAlways) this.m_visiBtns.push(proBar);
        this.m_btns.push(proBar);

        proBar.update();
        let bounds = proBar.getGlobalBounds();
        let minX = this.m_btnPX + bounds.min.x;

        // let minX = this.m_btnPX + proBar.getRect().x;
        if (minX < this.m_minBtnX) {
            this.m_minBtnX = minX;
        }
        return proBar;
    }

    private createValueBtn(ns: string, uuid: string, value: number, minValue: number, maxValue: number, visibleAlways: boolean = false): ProgressEntity {

        let proBar = new ProgressEntity();
        proBar.uuid = uuid;
        proBar.initialize(this.m_ruisc, ns, this.m_btnSize, this.m_bgLength);
        // proBar.minValue = minValue;
        // proBar.maxValue = maxValue;
        proBar.setRange(minValue, maxValue);
        proBar.setValue(value, false);

        proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.valueChange);
        proBar.setXY(this.m_btnPX, this.m_btnPY);
        this.m_btnPY += this.m_btnSize + this.m_btnYSpace;
        if (!visibleAlways) this.m_visiBtns.push(proBar);
        this.m_btns.push(proBar);

        proBar.update();
        let bounds = proBar.getGlobalBounds();
        let minX = this.m_btnPX + bounds.min.x;
        // let minX = this.m_btnPX + proBar.getRect().x;
        if (minX < this.m_minBtnX) {
            this.m_minBtnX = minX;
        }
        return proBar;
    }
    private moveSelectToBtn(btn: ProgressEntity | SelectionEntity): void {
        let bounds = btn.getGlobalBounds();
        // let rect = btn.getRect();
        btn.getPosition(this.m_pos);
        this.m_pos.x += bounds.min.x;
        this.m_selectPlane.setXYZ(this.m_pos.x, this.m_pos.y, -1.0);
        this.m_selectPlane.setScaleXYZ(bounds.getWidth(), bounds.getHeight(), 1.0);
        this.m_selectPlane.update();
        this.m_selectPlane.setVisible(true);
    }
    private initCtrlBars(): void {

        if (RendererDevice.IsMobileWeb()) {
            this.m_btnSize = 64;
            this.m_btnPX = 300;
            this.m_btnPY = 30;
        }
        if (RendererDevice.IsWebGL1()) {
            this.m_btnPX += 32;
            this.m_btnSize = MathConst.CalcCeilPowerOfTwo(this.m_btnSize);
        }
        this.m_menuBtn = this.createSelectBtn("", "menuCtrl", "Menu Open", "Menu Close", false, true);

        // this.m_selectPlane = new Plane3DEntity();
        // this.m_selectPlane.vertColorEnabled = true;
        // this.m_selectPlane.color0.setRGB3f(0.0, 0.3, 0.0);
        // this.m_selectPlane.color1.setRGB3f(0.0, 0.3, 0.0);
        // this.m_selectPlane.color2.setRGB3f(0.0, 0.5, 0.5);
        // this.m_selectPlane.color3.setRGB3f(0.0, 0.5, 0.5);
        // this.m_selectPlane.initializeXOY(0, 0, 1.0, 1.0);
        // this.m_ruisc.addEntity(this.m_selectPlane);
        // this.m_selectPlane.setVisible(false);

        // let flag = RendererDevice.IsMobileWeb();
        // this.rgbPanel = new RGBColorPanel();
        // this.rgbPanel.initialize(flag ? 64 : 32, 4);
        // this.rgbPanel.addEventListener(RGBColoSelectEvent.COLOR_SELECT, this, this.selectColor);
        // this.rgbPanel.setXY(this.m_btnPX, this.m_btnPY);
        // this.rgbPanel.close();
        // this.m_ruisc.addContainer(this.rgbPanel, 1);
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
            return this.m_btnMap.get( uuid );
        }
        return null;
    }
    private menuCtrl(flag: boolean): void {

        if (flag && !this.m_visiBtns[0].isOpen()) {
            for (let i: number = 0; i < this.m_visiBtns.length; ++i) {
                this.m_visiBtns[i].open();
            }
            this.m_menuBtn.getPosition(this.m_pos);
            this.m_pos.x = this.m_btnPX;
            this.m_menuBtn.setPosition(this.m_pos);
        }
        else if (this.m_visiBtns[0].isOpen()) {
            for (let i: number = 0; i < this.m_visiBtns.length; ++i) {
                this.m_visiBtns[i].close();
            }
            this.m_menuBtn.getPosition(this.m_pos);
            this.m_pos.x = 0;
            this.m_menuBtn.setPosition(this.m_pos);
            this.m_selectPlane.setVisible(false);
        }
        if (this.rgbPanel != null) this.rgbPanel.close();
    }
    updateLayout(force: boolean = false): void {

        let dis = 5 - this.m_minBtnX;
        let pos = VoxMath.createVec3();
        let btns = force ? this.m_btns : this.m_visiBtns;

        for (let i = 0; i < btns.length; ++i) {
            btns[i].getPosition(pos);
            pos.x += dis;
            btns[i].setPosition(pos);
            btns[i].update();
        }
        this.rgbPanel.setXY(this.m_btnPX, this.m_btnPY);
    }

    private selectChange(evt: ISelectionEvent): void {

        let flag = evt.flag;
        let uuid = evt.uuid;
        let map = this.m_btnMap;
        if (map.has(uuid)) {
            let obj = map.get(uuid);
            obj.sendFlagOut( flag );
            this.moveSelectToBtn(evt.target);
        }
        if (this.rgbPanel != null) this.rgbPanel.close();
    }
    private m_currUUID = "";
    private selectColor(evt: any): void {

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

        // let progEvt = evt as ProgressDataEvent;
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

                if (this.rgbPanel != null && changeFlag) this.rgbPanel.close();
            } else if (evt.status == 0) {
                console.log("only select the btn");
                if (param.colorPick) {
                    if (this.rgbPanel != null && this.rgbPanel.isClosed()) {
                        this.rgbPanel.open();
                    }
                    if (obj.colorId >= 0) this.rgbPanel.selectColorById(obj.colorId);
                } else {
                    if (this.rgbPanel != null) this.rgbPanel.close();
                }
            }
            this.moveSelectToBtn(evt.target);
        }
    }
    private mouseBgDown(evt: any): void {
        if (this.rgbPanel != null) this.rgbPanel.close();
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