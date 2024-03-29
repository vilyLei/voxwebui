/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/

import IVector3D from "../../vox/math/IVector3D";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IRendererScene from "../../vox/scene/IRendererScene";
import IRenderTexture from "../../vox/render/texture/IRenderTexture";
import { IRayControl } from "../base/IRayControl";
import { SphereRayTester } from "../base/SphereRayTester";
import { IBillboardBase } from "../../cospace/particle/entity/IBillboardBase";
import { MoveCtr } from "./MoveCtr";

import { ICoRScene } from "../../cospace/voxengine/ICoRScene";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoAGeom } from "../../cospace/ageom/ICoAgeom";
import { ICoEntity } from "../../cospace/voxentity/ICoEntity";
import { ICoParticle } from "../../cospace/particle/ICoParticle";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";

declare var CoRScene: ICoRScene;
declare var CoMath: ICoMath;
declare var CoAGeom: ICoAGeom;
declare var CoEntity: ICoEntity;
declare var CoParticle: ICoParticle;

/**
 * 支持在一个和鼠标射线垂直的平面上拖动
 */
export default class DragRayCrossPlane extends MoveCtr implements IRayControl {

    private m_entity: ITransformEntity = null;
    private m_rscene: IRendererScene = null;
    private m_container: IDisplayEntityContainer = null;

    private m_billPos: IBillboardBase = null;
    private m_circle: IBillboardBase = null;

    constructor() { super(); }
    initialize(rscene: IRendererScene, container: IDisplayEntityContainer, size: number = 30): void {

        if (this.m_entity == null) {
			this.transFlag = 1;
            this.m_rscene = rscene;
            this.m_container = container;

            let bounds = CoEntity.createBoundsEntity();

            let radius = size * 0.5;
            let minV = CoMath.createVec3(radius, radius, radius).scaleBy(-1.0);
            let maxV = CoMath.createVec3(radius, radius, radius);
            bounds.setBounds(minV, maxV);
            bounds.setRayTester(new SphereRayTester(radius));
            this.applyEvent(bounds);
			bounds.mouseEnabled = false;

			container.addChild( bounds );
            this.m_entity = bounds;

            let par = CoParticle.createBillboard();
            par.initializeSquare(radius * 0.2, [this.createTexByUrl("static/assets/circle01.png")]);
			container.addChild( par.entity );

            let RST = CoRScene.RendererState;
            par.entity.setRenderState(RST.NONE_TRANSPARENT_ALWAYS_STATE);
            this.m_billPos = par;

            let segsTotal = Math.floor(radius * 0.5);
            let bl = CoParticle.createBillboardLine();
            bl.initializeCircleXOY(radius, segsTotal < 50 ? 50 : segsTotal);

			container.addChild( bl.entity );
            bl.entity.setRenderState(RST.NONE_TRANSPARENT_ALWAYS_STATE);
            this.m_circle = bl;

            this.showOutColor();
        }
    }
    private createTexByUrl(url: string = ""): IRenderTexture {
        let tex = this.m_rscene.textureBlock.createImageTex2D(64, 64, false);
        let img = new Image();
        img.onload = (evt: any): void => {
            tex.setDataFromImage(img, 0, 0, 0, false);
        };
        img.src = url != "" ? url : "static/assets/box.jpg";
        return tex;
    }
    getEntity(): ITransformEntity {
        return this.m_entity;
    }
    showOverColor(): void {
        let c = this.overColor;
        this.m_circle.setRGB3f(c.r, c.g, c.b);
    }
    showOutColor(): void {
        let c = this.outColor;
        this.m_circle.setRGB3f(c.r, c.g, c.b);
    }

    enable(): void {
        super.enable();
        this.m_entity.mouseEnabled = true;
    }
    disable(): void {
        super.disable();
        this.m_entity.mouseEnabled = false;
    }
    setRenderState(state: number): void {
        this.m_entity.setRenderState(state);
    }
    setVisible(visible: boolean): DragRayCrossPlane {
        this.m_entity.setVisible(visible);
        this.m_circle.entity.setVisible(visible);
        this.m_billPos.entity.setVisible(visible);
        return this;
    }
    getVisible(): boolean {
        return this.m_entity.getVisible();
    }

    setScaleXYZ(sx: number, sy: number, sz: number): DragRayCrossPlane {
        this.m_entity.setScaleXYZ(sx, sy, sz);
        this.m_circle.setScaleXY(sx, sy);
        this.m_billPos.setScaleXY(sx, sy);
		this.m_entity.update();
		this.m_circle.update();
		this.m_billPos.update();
        return this;
    }

    destroy(): void {
        super.destroy();
        if (this.m_entity) {
            this.m_container.removeEntity(this.m_entity);
            this.m_entity.destroy();
        }
        if (this.m_circle) {
            this.m_container.removeEntity(this.m_circle.entity);
            this.m_circle.destroy();
        }
        if (this.m_billPos) {
            this.m_container.removeEntity(this.m_billPos.entity);
            this.m_billPos.destroy();
        }
        this.m_rscene = null;
        this.m_container = null;
    }
    private m_planeNV = CoMath.createVec3(0.0, 1.0, 0.0);
    private m_planePos = CoMath.createVec3();
    private m_planeDis = 0.0;

    private m_pos = CoMath.createVec3();
    private m_dv = CoMath.createVec3();
    private m_outV = CoMath.createVec3();

    private calcClosePos(rpv: IVector3D, rtv: IVector3D): void {
        CoAGeom.PlaneUtils.IntersectLinePos2(this.m_planeNV, this.m_planeDis, rpv, rtv, this.m_outV);
    }
    private m_rpv = CoMath.createVec3();
    private m_rtv = CoMath.createVec3();
    moveByRay(rpv: IVector3D, rtv: IVector3D, force: boolean = false): void {

        if (this.isEnabled()) {
            if (this.isSelected()) {

                this.m_rpv.copyFrom(rpv);
                this.m_rtv.copyFrom(rtv);

                const pv = this.m_pos;

                this.calcClosePos(this.m_rpv, this.m_rtv);
                pv.copyFrom(this.m_outV);
                pv.addBy(this.m_dv);

                if (this.m_target) {
                    this.m_target.setPosition(pv);
                    this.m_target.update();
                }
            }
        }
    }
    /**
     * set plane world onrmal vactor3
     * @param nv
     */
    setPlaneNormal(nv: IVector3D): void {
        this.m_planeNV.copyFrom(nv);
        this.m_planeNV.normalize();
    }
    private selectByParam(raypv: IVector3D, raytv: IVector3D, wpos: IVector3D): void {

        this.m_rpv.copyFrom(raypv);
        this.m_rtv.copyFrom(raytv);
        this.m_planePos.copyFrom(wpos);
        this.m_planeNV.copyFrom(this.m_rtv);
        this.m_planeNV.normalize();

        this.m_planeDis = this.m_planePos.dot(this.m_planeNV);
        this.calcClosePos(this.m_rpv, this.m_rtv);
		this.m_target.getPosition(this.m_dv);
        this.m_dv.subtractBy(this.m_outV);
    }
    protected mouseDownListener(evt: any): void {

		console.log("DragRayCrossPlane::mouseDownListener() this.isEnabled(): ", this.isEnabled());
        if (this.isEnabled()) {

            console.log("DragRayCrossPlane::mouseDownListener() ...");

            this.editBegin();
            this.setThisVisible(true);

            this.m_target.select(this);
            this.selectByParam(evt.raypv, evt.raytv, evt.wpos);
        }
    }
}
