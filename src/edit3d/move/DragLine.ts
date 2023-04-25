/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/

import IVector3D from "../../vox/math/IVector3D";
import IMatrix4 from "../../vox/math/IMatrix4";

import ITransformEntity from "../../vox/entity/ITransformEntity";
import { IRayControl } from "../base/IRayControl";
import { SphereRayTester } from "../base/SphereRayTester";
import { DashedLineRayTester } from "../base/DashedLineRayTester";
import { MoveCtr } from "./MoveCtr";

import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoAGeom } from "../../cospace/ageom/ICoAgeom";
import { ICoMesh } from "../../cospace/voxmesh/ICoMesh";
import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
import { ICoEntity } from "../../cospace/voxentity/ICoEntity";

declare var CoMath: ICoMath;
declare var CoAGeom: ICoAGeom;
declare var CoMesh: ICoMesh;
declare var CoMaterial: ICoMaterial;
declare var CoEntity: ICoEntity;

/**
 * 在直线上拖动
 */
class DragLine extends MoveCtr implements IRayControl {

    // private m_target: IMovedTarget = null;
    // private m_dispatcher: IEvtDispatcher;

    private m_entity: ITransformEntity = null;
    private m_cone: ITransformEntity = null;

    innerSphereRadius = 30.0;

    readonly tv = CoMath.createVec3(1.0, 0.0, 0.0);
    readonly coneTransMat4 = CoMath.createMat4();

    coneScale = 1.0;
    constructor() {
        super();
    }

    initialize(size: number = 100.0, innerSize: number = 0): void {

        if (this.m_entity == null) {
            let r = this.pickTestRadius;

            CoMesh.line.dynColorEnabled = true;
            // console.log("DragLine::initialize(), mesh.bounds: ", mesh.bounds);
            let material = CoMaterial.createLineMaterial(true);
            CoMesh.line.setBufSortFormat(material.getBufSortFormat());
            let minV = this.tv.clone().scaleBy(innerSize);
            let maxV = this.tv.clone().scaleBy(size);
            let mesh = CoMesh.line.createLine(minV, maxV, r);

            this.m_entity = CoEntity.createDisplayEntity();
            this.m_entity.setMaterial(material);
            this.m_entity.setMesh(mesh);

            if (mesh != null) {
                let lineTester = new DashedLineRayTester(mesh.getVS(), 1, r);
                lineTester.setPrevTester(new SphereRayTester(this.innerSphereRadius));
                mesh.setRayTester(lineTester);
            }
            this.applyEvent(this.m_entity);

            material = CoMaterial.createDefaultMaterial();
            material.initializeByCodeBuf(false);
            CoMesh.cone.setBufSortFormat(material.getBufSortFormat());
            CoMesh.cone.transMatrix = this.coneTransMat4;
            mesh = CoMesh.cone.create(this.coneScale * 0.5 * r, this.coneScale * 1.5 * r, 10, 0.0);
            this.m_cone = CoEntity.createDisplayEntity();
            this.m_cone.setMaterial(material);
            this.m_cone.setMesh(mesh);
            this.applyEvent(this.m_cone);
        }
    }
    getCone(): ITransformEntity {
        return this.m_cone;
    }
    getEntity(): ITransformEntity {
        return this.m_entity;
    }
    setVisible(visible: boolean): DragLine {
        this.m_entity.setVisible(visible);
        this.m_cone.setVisible(visible);
        return this;
    }
    getVisible(): boolean {
        return this.m_entity.getVisible();
    }
    setXYZ(px: number, py: number, pz: number): DragLine {
        this.m_entity.setXYZ(px, py, pz);
        return this;
    }
    setRotation3(r: IVector3D): DragLine {
        this.m_entity.setRotation3(r);
        return this;
    }
    setRotationXYZ(rx: number, ry: number, rz: number): DragLine {
        this.m_entity.setRotationXYZ(rx, ry, rz);
        return this;
    }
    setScaleXYZ(sx: number, sy: number, sz: number): DragLine {
        this.m_entity.setScaleXYZ(sx, sy, sz);
        return this;
    }

    getScaleXYZ(pv: IVector3D): IVector3D {
        this.m_entity.getScaleXYZ(pv);
        return pv
    }
    getRotationXYZ(pv: IVector3D): IVector3D {
        this.m_entity.getRotationXYZ(pv);
        return pv
    }
    localToGlobal(pv: IVector3D): void {
        this.m_entity.localToGlobal(pv);
    }
    globalToLocal(pv: IVector3D): void {
        this.m_entity.globalToLocal(pv);
    }
    showOverColor(): void {

        this.setEntityColor(this.m_entity, this.overColor);
        this.setEntityColor(this.m_cone, this.overColor);
        // let m = this.m_entity.getMaterial() as IColorMaterial;
        // m.setColor(this.overColor);
        // m = this.m_cone.getMaterial() as IColorMaterial;
        // m.setColor(this.overColor);
    }
    showOutColor(): void {
        this.setEntityColor(this.m_entity, this.outColor);
        this.setEntityColor(this.m_cone, this.outColor);
        // let m = this.m_entity.getMaterial() as IColorMaterial;
        // m.setColor(this.outColor);
        // m = this.m_cone.getMaterial() as IColorMaterial;
        // m.setColor(this.outColor);
    }

    enable(): void {
        super.enable();
        this.m_entity.mouseEnabled = true;
        this.m_cone.mouseEnabled = true;
    }
    disable(): void {
        super.disable();
        this.m_entity.mouseEnabled = false;
        this.m_cone.mouseEnabled = false;
    }
    destroy(): void {
        super.destroy();
        if (this.m_entity != null) {
            this.m_entity.destroy();
            this.m_entity = null;
        }
        if (this.m_cone != null) {
            this.m_cone.destroy();
            this.m_cone = null;
        }

    }
    setPosition(pos: IVector3D): DragLine {
        this.m_entity.setPosition(pos);
        return this;
    }
    getPosition(outPos: IVector3D): IVector3D {
        this.m_entity.getPosition(outPos);
        return outPos;
    }
    update(): void {
        this.m_entity.update();
        this.m_cone.update();
    }

    private m_line_pv: IVector3D = CoMath.createVec3();
    private m_initPos: IVector3D = CoMath.createVec3();
    private m_pos: IVector3D = CoMath.createVec3();
    private m_dv: IVector3D = CoMath.createVec3();
    private m_outV: IVector3D = CoMath.createVec3();
    private m_initV: IVector3D = CoMath.createVec3();

    private m_mat4: IMatrix4 = CoMath.createMat4();
    private m_invMat4: IMatrix4 = CoMath.createMat4();
    private calcClosePos(rpv: IVector3D, rtv: IVector3D): void {

        if (this.isSelected()) {
            let mat4 = this.m_invMat4;
            mat4.transformVector3Self(rpv);
            mat4.deltaTransformVectorSelf(rtv);
            let outV = this.m_outV;
            CoAGeom.Line.CalcTwoSLCloseV2(rpv, rtv, this.m_line_pv, this.tv, outV);
            mat4 = this.m_mat4;
            mat4.transformVector3Self(outV);
        }
    }
    private m_rpv = CoMath.createVec3();
    private m_rtv = CoMath.createVec3();
    moveByRay(rpv: IVector3D, rtv: IVector3D): void {

        if (this.isEnabled()) {
            if (this.isSelected()) {

                this.m_rpv.copyFrom(rpv);
                this.m_rtv.copyFrom(rtv);

                this.calcClosePos(this.m_rpv, this.m_rtv);
                this.m_dv.copyFrom(this.m_outV);
                this.m_dv.subtractBy(this.m_initV);
                this.m_pos.copyFrom(this.m_initPos);
                this.m_pos.addBy(this.m_dv);
                if (this.moveSelfEnabled) {
                    this.setPosition(this.m_pos);
                    this.update();
                }

                if (this.m_target != null) {
                    // this.m_pos.addBy(this.m_targetPosOffset);
                    this.m_target.setPosition(this.m_pos);
                    this.m_target.update();
                }
            }

        }
    }

    mouseDownListener(evt: any): void {

        console.log("DragLine::mouseDownListener() ...");
        if (this.isEnabled()) {

            this.editBegin();

            this.setThisVisible(true);

            this.m_target.select(this);

            // this.m_flag = 1;
            //console.log("AxisCtrlObj::mouseDownListener(). this.m_flag: "+this.m_flag);
            let trans = this.m_entity.getTransform();

            this.m_mat4.copyFrom(trans.getMatrix());
            this.m_invMat4.copyFrom(trans.getInvMatrix());

            this.m_rpv.copyFrom(evt.raypv);
            this.m_rtv.copyFrom(evt.raytv);

            this.calcClosePos(this.m_rpv, this.m_rtv);
            this.m_initV.copyFrom(this.m_outV);
            this.getPosition(this.m_initPos);
        }

    }
}
export { DragLine }