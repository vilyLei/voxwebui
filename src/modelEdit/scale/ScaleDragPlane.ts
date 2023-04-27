/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/

import IVector3D from "../../vox/math/IVector3D";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import { IRayControl } from "../base/IRayControl";
import { ScaleCtr } from "./ScaleCtr";
import IRendererScene from "../../vox/scene/IRendererScene";

import { ICoRScene } from "../../cospace/voxengine/ICoRScene";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoAGeom } from "../../cospace/ageom/ICoAgeom";
import { ICoMesh } from "../../cospace/voxmesh/ICoMesh";
import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";

declare var CoRScene: ICoRScene;
declare var CoMath: ICoMath;
declare var CoAGeom: ICoAGeom;
declare var CoMesh: ICoMesh;
declare var CoMaterial: ICoMaterial;

/**
 * 支持在一个平面上拖动缩放
 */
export default class ScaleDragPlane extends ScaleCtr implements IRayControl {

    private m_entity: ITransformEntity = null;
    private m_frameEntity: ITransformEntity = null;
    private offsetV = CoMath.createVec3(30, 30, 30);
    private m_planeAxisType: number = 0;

    constructor() { super() }
    initialize(rs: IRendererScene, container: IDisplayEntityContainer, planeAxisType: number, size: number): void {

        if (this.m_entity == null) {

            this.m_editRS = rs;
            this.m_container = container;

            const V3 = CoMath.Vector3D;
            let material = CoRScene.createDefaultMaterial();
            material.initializeByCodeBuf(false);
            this.m_entity = CoRScene.createDisplayEntity();

            this.m_frameEntity = CoRScene.createDisplayEntity();

            let ml = CoMesh.line;
            ml.dynColorEnabled = true;
            let line_material = CoMaterial.createLineMaterial(ml.dynColorEnabled);
            line_material.initializeByCodeBuf(false);
            ml.setBufSortFormat(material.getBufSortFormat());
            let etL = this.m_frameEntity;
            etL.setMaterial(line_material);

            let et = this.m_entity;
            et.setMaterial(material);

            let mp = CoMesh.plane;
            mp.setBufSortFormat(material.getBufSortFormat());
            let ov = this.offsetV;

            this.m_planeAxisType = planeAxisType;

            switch (planeAxisType) {
                case 0:
                    // xoz
                    et.setMesh(mp.createXOZ(ov.x, ov.z, size, size));
                    etL.setMesh(ml.createRectXOZ(ov.x, ov.z, size, size));
                    this.setPlaneNormal(V3.Y_AXIS);
                    break;
                case 1:
                    // xoy
                    et.setMesh(mp.createXOY(ov.x, ov.y, size, size));
                    etL.setMesh(ml.createRectXOY(ov.x, ov.y, size, size));
                    this.setPlaneNormal(V3.Z_AXIS);
                    break;
                case 2:
                    // yoz
                    et.setMesh(mp.createYOZ(ov.y, ov.z, size, size));
                    etL.setMesh(ml.createRectYOZ(ov.y, ov.z, size, size));
                    this.setPlaneNormal(CoMath.Vector3D.X_AXIS);
                    break;
                default:
                    throw Error("Error type !!!");
                    break;
            }

            et.setRenderState(CoRScene.RendererState.NONE_TRANSPARENT_STATE);
            this.m_container.addEntity(et);
            this.m_container.addEntity(etL);

            this.showOutColor();
            this.applyEvent( this.m_entity );
        }
    }
    protected mouseOverListener(evt: any): void {
        // console.log("ScaleDragPlane::mouseOverListener() ...");
        this.showOverColor();
    }
    protected mouseOutListener(evt: any): void {
        // console.log("ScaleDragPlane::mouseOutListener() ...");
        this.showOutColor();
    }
    showOverColor(): void {
        this.setEntityColor(this.m_entity, this.overColor);
        this.setEntityColor(this.m_frameEntity, this.overColor, 0.7);
    }
    showOutColor(): void {
        this.setEntityColor(this.m_entity, this.outColor);
        this.setEntityColor(this.m_frameEntity, this.outColor, 0.7);
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
    setVisible(visible: boolean): ScaleDragPlane {
        this.m_entity.setVisible(visible);
        this.m_frameEntity.setVisible(visible);
        return this;
    }
    getVisible(): boolean {
        return this.m_entity.getVisible();
    }

	destroy(): void {
        super.destroy();
        if(this.m_container) {
            this.m_container.removeEntity(this.m_entity);
            this.m_container.removeEntity(this.m_frameEntity);
        }

        if (this.m_entity) {
            this.m_entity.destroy();
        }
        if (this.m_frameEntity) {
            this.m_frameEntity.destroy();
        }
		this.m_entity = null;
		this.m_frameEntity = null;
		this.m_editRS = null;
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
    private m_sv = CoMath.createVec3();
    private m_dis = 1.0;
    moveByRay(rpv: IVector3D, rtv: IVector3D, force: boolean = false): void {

        if (this.isEnabled()) {
            if (this.isSelected()) {

                this.m_rpv.copyFrom(rpv);
                this.m_rtv.copyFrom(rtv);

                this.calcClosePos(this.m_rpv, this.m_rtv);

                let V3 = CoMath.Vector3D;
                let dis = V3.Distance(this.m_pos, this.m_outV);
                if (dis < 1.0) dis = 1.0;

                const sv = this.m_sv;
                let sx = 1.0;
                let sy = 1.0;
                let sz = 1.0;

                let scale = dis / this.m_dis;
                let type = this.m_planeAxisType;

                if (type == 0) {
                    // xoz
                    sx = scale;
                    sz = scale;
                } else if (type == 1) {
                    // xoy
                    sx = scale;
                    sy = scale;

                } else {
                    // yoz
                    sy = scale;
                    sz = scale;
                }

                if (this.m_target != null) {
                    this.m_target.setScaleXYZ(sv.x * sx, sv.y * sy, sv.z * sz);
                    this.m_target.update();
                }
            }
        }
    }
	private m_initNV: IVector3D = CoMath.createVec3();
    /**
     * set plane world onrmal vactor3
     * @param nv
     */
    setPlaneNormal(nv: IVector3D): void {
        this.m_planeNV.copyFrom(nv);
        this.m_planeNV.normalize();
		this.m_initNV.copyFrom(this.m_planeNV);
    }
    selectByParam(raypv: IVector3D, raytv: IVector3D, wpos: IVector3D): void {

        this.m_rpv.copyFrom(raypv);
        this.m_rtv.copyFrom(raytv);
        this.m_planePos.copyFrom(wpos);

		this.m_planeNV.copyFrom( this.m_initNV );
		let invMat = this.m_entity.getMatrix();
		invMat.deltaTransformVectorSelf(this.m_planeNV);
        this.m_planeNV.normalize();

        this.m_planeDis = this.m_planePos.dot(this.m_planeNV);
        this.calcClosePos(this.m_rpv, this.m_rtv);
        this.m_target.getPosition(this.m_dv);
        this.m_dv.subtractBy(this.m_outV);
    }
    protected mouseDownListener(evt: any): void {

        if (this.isEnabled()) {

            this.editBegin();
            this.setThisVisible(true);

            console.log("ScaleDragPlane::mouseDownListener() ...");
            this.m_target.select();
            this.selectByParam(evt.raypv, evt.raytv, evt.wpos);
            this.m_target.getScaleXYZ(this.m_sv);
            this.m_target.getPosition(this.m_pos);

            let V3 = CoMath.Vector3D;
            this.m_dis = V3.Distance(this.m_pos, this.m_outV);
            if (this.m_dis < 1.0) this.m_dis = 1.0;
        }
    }
}
