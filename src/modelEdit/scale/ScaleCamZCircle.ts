/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/

import IVector3D from "../../vox/math/IVector3D";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IColorMaterial from "../../vox/material/mcase/IColorMaterial";
import { CircleRayTester } from "../base/CircleRayTester";

import IRawMesh from "../../vox/mesh/IRawMesh";
import { IRayControl } from "../base/IRayControl";
import IRendererScene from "../../vox/scene/IRendererScene";

import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
import { ICoEntity } from "../../cospace/voxentity/ICoEntity";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoAGeom } from "../../cospace/ageom/ICoAgeom";
import { ICoMesh } from "../../cospace/voxmesh/ICoMesh";
import { IRenderCamera } from "../../vox/render/IRenderCamera";
import { ScaleCtr } from "./ScaleCtr";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";

declare var CoMaterial: ICoMaterial;
declare var CoMath: ICoMath;
declare var CoEntity: ICoEntity;
declare var CoAGeom: ICoAGeom;
declare var CoMesh: ICoMesh;

/**
 * 在camera view z axis 上 拖动旋转
 */
class ScaleCamZCircle extends ScaleCtr implements IRayControl {

    private m_entity: ITransformEntity = null;
    private m_cv = CoMath.createVec3();
    private m_planeNV = CoMath.createVec3();
    private m_outV = CoMath.createVec3();
    private m_rotV = CoMath.createVec3();

    private m_scaleV = CoMath.createVec3();
    private m_posV = CoMath.createVec3();
    private m_srcDV = CoMath.createVec3();
    private m_dstDV = CoMath.createVec3();
    private m_camPos = CoMath.createVec3();
    private m_mat0 = CoMath.createMat4();

    private m_initDegree = 0;
    private m_planeDis = 0;
    private m_material: IColorMaterial = null;

    constructor() {
        super();
    }

    /**
     * init the circle mouse event display entity
     * @param radius circle radius
     * @param segsTotal segments total
     * @param type 0 is xoy, 1 is xoz, 2 is yoz
     * @param color IColor4 instance
     */
    initialize(rs: IRendererScene, container: IDisplayEntityContainer, radius: number, segsTotal: number): void {

        if (this.m_entity == null) {

            this.m_editRS = rs;
            this.m_container = container;

            this.m_entity = CoEntity.createDisplayEntity();

            let ml = CoMesh.line;
            let mesh: IRawMesh;
            ml.dynColorEnabled = true;
            let pnv = this.m_planeNV;
            // yoz
            mesh = ml.createCircleYOZ(radius, segsTotal);
            pnv.setXYZ(1, 0, 0);
            mesh.setRayTester(new CircleRayTester(radius, this.m_cv, null, pnv, this.m_planeDis, this.pickTestRadius));

            this.m_entity.setMesh(mesh);
            this.m_material = CoMaterial.createLineMaterial(ml.dynColorEnabled);
            this.m_material.setColor(this.outColor);
            this.m_entity.setMaterial(this.m_material);
            this.m_entity.update();

            this.applyEvent(this.m_entity);
            container.addEntity(this.m_entity);
        }
    }
    private m_camVer = -7;
    run(camera: IRenderCamera, rtv: IVector3D, force: boolean = false): void {

        if (this.m_camVer != camera.version || force) {
            this.m_camVer = camera.version;

            // 圆面朝向摄像机
            let et = this.m_entity;
			this.m_target.getPosition(this.m_posV);

            this.m_camPos.copyFrom(camera.getPosition());
			let container = this.m_target.container;
			container.globalToLocal(this.m_camPos);

            this.m_srcDV.setXYZ(1, 0, 0);
            this.m_dstDV.subVecsTo(this.m_camPos, this.m_posV);

            let rad = CoMath.Vector3D.RadianBetween(this.m_srcDV, this.m_dstDV);
            let axis = this.m_rotV;
            CoMath.Vector3D.Cross(this.m_srcDV, this.m_dstDV, axis);
            axis.normalize();

            let mat = this.m_mat0;
            mat.identity();
            mat.appendRotation(rad, axis);

            let rv = mat.decompose(CoMath.OrientationType.EULER_ANGLES)[1];
            et.setRotation3(rv.scaleBy(CoMath.MathConst.MATH_180_OVER_PI));
            et.update();

        }
    }
    setVisible(visible: boolean): ScaleCamZCircle {
        // console.log("ScaleCamZCircle::setVisible() ..., visible: ", visible);
        this.m_entity.setVisible(visible);
        this.m_camVer = -7;
        return this;
    }
    getVisible(): boolean {
        return this.m_entity.getVisible();
    }

    enable(): void {
        super.enable();
        this.m_entity.mouseEnabled = true;
    }
    disable(): void {
        super.disable();
        this.m_entity.mouseEnabled = false;
    }
    showOverColor(): void {
        this.setEntityColor(this.m_entity, this.overColor);
    }
    showOutColor(): void {
        this.setEntityColor(this.m_entity, this.outColor);
    }
    deselect(): void {
        console.log("ScaleCamZCircle::deselect() ...");
        if (this.isSelected()) {

            this.editEnd();
            this.setAllVisible(true);
        }
    }
    destroy(): void {
        super.destroy();
        if (this.m_entity) {
            this.m_container.removeEntity(this.m_entity);
            this.m_entity.destroy();
            this.m_entity = null;
        }
		this.m_container = null;
        this.m_editRS = null;
        this.m_mat0 = null;
        this.m_cv = null;
        this.m_planeNV = null;
    }
    private m_sv = CoMath.createVec3();
    private m_dis: number = 0;
    moveByRay(rpv: IVector3D, rtv: IVector3D, force: boolean = false): void {

        if (this.isEnabled()) {
            if (this.isSelected()) {
                let dis = this.getDis(rpv, rtv);

                let et = this.m_target;
                if (et != null && dis > 0.001) {
                    let s = dis / this.m_dis;
                    const sv = this.m_sv;
                    // console.log(s, dis);
                    et.setScaleXYZ(sv.x * s, sv.y * s, sv.z * s);
                    et.update();
                }
            }
        }
    }
    protected mouseDownListener(evt: any): void {

        console.log("ScaleCamZCircle::mouseDownListener() ..., evt: ", evt);
        if (this.isEnabled()) {

            this.editBegin();
            this.m_target.select();
            this.setThisVisible(true);
            this.m_target.getScaleXYZ(this.m_sv);
            this.m_dis = this.getDis(evt.raypv, evt.raytv);
            // console.log("dis: ", this.m_dis);
        }
    }

    public getDis(rpv: IVector3D, rtv: IVector3D): number {
        let degree = 0.0;
        if (this.isSelected()) {
            let u = CoAGeom.PlaneUtils;
            let pnv = this.m_srcDV.copyFrom(rtv).scaleBy(-1.0);
            let pos = this.m_posV;
            this.m_target.getPosition(pos);
            let hitFlag = u.IntersectRayLinePos2(pnv, pos.dot(pnv), rpv, rtv, this.m_outV);

            let v = this.m_outV;
            this.m_entity.globalToLocal(v);
            if (hitFlag) {

                hitFlag = u.Intersection == CoAGeom.Intersection.Hit;
                let V3 = CoMath.Vector3D;
                if (hitFlag && V3.Distance(v, this.m_cv) > 2.0) {
                    v.subtractBy(this.m_cv);

                    let et = this.m_target;
                    if (et != null) {
                        return v.getLength();

                    }
                }
            }
        }
        return degree;
    }
}

export { ScaleCamZCircle }
