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

    private m_entity: ITransformEntity = null;
    private m_cone: ITransformEntity = null;

    readonly tv = CoMath.createVec3(1.0, 0.0, 0.0);
    readonly coneTransMat4 = CoMath.createMat4();

    innerSphereRadius = 30.0;
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

            if (mesh) {
                let lineTester = new DashedLineRayTester(mesh.getVS(), 1, r);
                lineTester.setPrevTester(new SphereRayTester(this.innerSphereRadius));
                mesh.setRayTester(lineTester);
            }
            this.applyEvent(this.m_entity);

			const coneB = CoMesh.cone;
            material = CoMaterial.createDefaultMaterial();
            material.initializeByCodeBuf(false);
            coneB.setBufSortFormat(material.getBufSortFormat());
            coneB.transMatrix = this.coneTransMat4;

            mesh = coneB.create(this.coneScale * 0.5 * r, this.coneScale * 1.5 * r, 10, 0.0);
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

    showOverColor(): void {

        this.setEntityColor(this.m_entity, this.overColor);
        this.setEntityColor(this.m_cone, this.overColor);
    }
    showOutColor(): void {
        this.setEntityColor(this.m_entity, this.outColor);
        this.setEntityColor(this.m_cone, this.outColor);
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
        if (this.m_entity) {
            this.m_entity.destroy();
            this.m_entity = null;
        }
        if (this.m_cone) {
            this.m_cone.destroy();
            this.m_cone = null;
        }
    }

    private m_line_pv = CoMath.createVec3();
    private m_initPos = CoMath.createVec3();
    private m_pos = CoMath.createVec3();
    private m_dv = CoMath.createVec3();
    private m_outV = CoMath.createVec3();
    private m_initV = CoMath.createVec3();

    private m_mat4 = CoMath.createMat4();
    private m_invMat4 = CoMath.createMat4();

    private calcClosePos(rpv: IVector3D, rtv: IVector3D): void {

        if (this.isSelected()) {
            let mat4 = this.m_invMat4;
			// world to local
            mat4.transformVector3Self(rpv);
            mat4.deltaTransformVectorSelf(rtv);
            const outV = this.m_outV;
            CoAGeom.Line.CalcTwoSLCloseV2(rpv, rtv, this.m_line_pv, this.tv, outV);
            mat4 = this.m_mat4;
			// to world pos
            mat4.transformVector3Self(outV);
        }
    }
    private m_rpv = CoMath.createVec3();
    private m_rtv = CoMath.createVec3();
    moveByRay(rpv: IVector3D, rtv: IVector3D, force: boolean = false): void {

        if (this.isEnabled()) {
            if (this.isSelected()) {

                this.m_rpv.copyFrom(rpv);
                this.m_rtv.copyFrom(rtv);

                this.calcClosePos(this.m_rpv, this.m_rtv);
                this.m_dv.copyFrom(this.m_outV);
                this.m_dv.subtractBy(this.m_initV);
                this.m_pos.copyFrom(this.m_initPos);
                this.m_pos.addBy(this.m_dv);

                if (this.m_target) {
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
            const trans = this.m_entity.getTransform();

            this.m_mat4.copyFrom(trans.getMatrix());
            this.m_invMat4.copyFrom(trans.getInvMatrix());
            this.m_rpv.copyFrom(evt.raypv);
            this.m_rtv.copyFrom(evt.raytv);

            this.calcClosePos(this.m_rpv, this.m_rtv);
            this.m_initV.copyFrom(this.m_outV);
			this.m_target.getPosition(this.m_initPos);
        }

    }
}
export { DragLine }
