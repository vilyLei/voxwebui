/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/

import IVector3D from "../../vox/math/IVector3D";
import ITransformEntity from "../../vox/entity/ITransformEntity";
import IColorMaterial from "../../vox/material/mcase/IColorMaterial";

import { IRayControl } from "../base/IRayControl";
import { RotationCtr } from "./RotationCtr";
import IRendererScene from "../../vox/scene/IRendererScene";

import { ICoRScene } from "../../cospace/voxengine/ICoRScene";
import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
import { ICoEntity } from "../../cospace/voxentity/ICoEntity";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoMesh } from "../../cospace/voxmesh/ICoMesh";
import { IRenderCamera } from "../../vox/render/IRenderCamera";
import { SphereRayTester } from "../base/SphereRayTester";
import IRenderStage3D from "../../vox/render/IRenderStage3D";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";

declare var CoRScene: ICoRScene;
declare var CoMaterial: ICoMaterial;
declare var CoMath: ICoMath;
declare var CoEntity: ICoEntity;
declare var CoMesh: ICoMesh;

/**
 * 在camera view x/y axis 上 拖动旋转
 */
class RotationCamXYCircle extends RotationCtr implements IRayControl {

    private m_entity: ITransformEntity = null;
    private m_rotV = CoMath.createVec3();

    private m_scaleV = CoMath.createVec3();
    private m_posV = CoMath.createVec3();
    private m_srcDV = CoMath.createVec3();
    private m_dstDV = CoMath.createVec3();
    private m_camPos = CoMath.createVec3();
    private m_mat0 = CoMath.createMat4();
    private m_stage: IRenderStage3D = null;
    private m_stagePos = CoMath.createVec3();

    private m_circle: ITransformEntity = null;
    private m_editRS: IRendererScene = null;

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
    initialize(rs: IRendererScene, container: IDisplayEntityContainer, radius: number): void {

        if (this.m_entity == null) {

            this.m_editRS = rs;
            this.m_container = container;
            this.m_stage = rs.getStage3D();

            let bounds = CoEntity.createBoundsEntity();

            let minV = CoMath.createVec3(radius, radius, radius).scaleBy(-1.0);
            let maxV = CoMath.createVec3(radius, radius, radius);
            bounds.setBounds(minV, maxV);
            bounds.setRayTester(new SphereRayTester(radius));
            this.applyEvent(bounds);
            this.m_entity = bounds;

            let n = Math.floor(radius / 2.0);
            if (n < 30) {
                n = 30;
            }
            let RST = CoRScene.RendererState;
            let cirMat = CoMath.createMat4();
            cirMat.setRotationEulerAngle(Math.PI * 0.5, 0.0, Math.PI * 0.5);
            let plb = CoMesh.plane;;
            plb.transMatrix = cirMat;
            let cirPlMaterial = CoMaterial.createDefaultMaterial(false);
            cirPlMaterial.initializeByCodeBuf(false);

            plb.setBufSortFormat(cirPlMaterial.getBufSortFormat());
            let cirPlaneMesh = plb.createCircle(radius, n);

            let cirEntity = CoEntity.createDisplayEntity();
            cirEntity.setMaterial(cirPlMaterial);
            cirEntity.setMesh(cirPlaneMesh);
            // cirEntity.setRenderState(RST.NONE_CULLFACE_NORMAL_STATE);
            cirEntity.setRenderState(RST.NONE_TRANSPARENT_ALWAYS_STATE);
            this.m_container.addEntity(cirEntity);
            this.m_circle = cirEntity;

            this.applyEvent(bounds);
            this.m_container.addEntity(this.m_entity);
        }
    }

    enable(): void {
        super.enable();
        this.m_entity.mouseEnabled = true;
    }
    disable(): void {
        super.disable();
        this.m_entity.mouseEnabled = false;
    }
    private m_camVer = -7;
    run(camera: IRenderCamera, rtv: IVector3D, force: boolean = false): void {
        if (this.m_camVer != camera.version || force) {
            this.m_camVer = camera.version;

            // 圆面朝向摄像机

            const sv = this.m_scaleV;
            let et = this.m_circle;
            et.getPosition(this.m_posV);
            et.getScaleXYZ(sv);

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
            et.setPosition(this.m_posV);
            et.setScale3(sv);
            et.setRotation3(rv.scaleBy(CoMath.MathConst.MATH_180_OVER_PI));
            // et.update();
        }
    }
    setVisible(visible: boolean): RotationCamXYCircle {

        this.m_entity.setVisible(visible);
        this.m_circle.setVisible(visible);
        this.m_camVer = -7;
        return this;
    }
    getVisible(): boolean {
        return this.m_entity.getVisible();
    }

    showOverColor(): void {
        this.overColor.a = 0.1;
        (this.m_circle.getMaterial() as IColorMaterial).setColor(this.overColor);
    }
    showOutColor(): void {
        this.outColor.a = 0.05;
        (this.m_circle.getMaterial() as IColorMaterial).setColor(this.outColor);
    }

    destroy(): void {

        super.destroy();

        if (this.m_entity != null) {
            this.m_container.removeEntity(this.m_entity);
            this.m_entity.destroy();
            this.m_entity = null;
        }
		this.m_container = null;
        this.m_editRS = null;
        this.m_stage = null;
        this.m_mat0 = null;
    }
    moveByRay(rpv: IVector3D, rtv: IVector3D, force: boolean = false): void {
        if (this.isEnabled()) {
            if (this.isSelected()) {
                let et = this.m_target;
                if (et != null) {

                    const f = 0.02;
                    let cam = this.m_editRS.getCamera();
                    let uv = cam.getUV();
                    let rv = cam.getRV();

                    let pv = this.m_stagePos;
                    let st = this.m_stage;
                    let mat = this.m_mat0;

                    let dx = st.mouseX - pv.x;
                    let dy = pv.y - st.mouseY;
                    let rotv = this.m_rotV;

                    mat.identity();
                    mat.appendRotation(dx * f, uv);
                    mat.appendRotation(dy * f, rv);

                    rotv = mat.decompose(CoMath.OrientationType.EULER_ANGLES)[1];
                    et.setRotation3(rotv.scaleBy(CoMath.MathConst.MATH_180_OVER_PI));
                    et.update();
                }
            }
        }
    }
    protected mouseDownListener(evt: any): void {

        console.log("RotationCamXYCircle::mouseDownListener() ..., evt: ", evt);
        if (this.isEnabled()) {

            this.editBegin();
            this.m_target.select();

            this.setThisVisible(true);

            let st = this.m_stage;
            this.m_stagePos.setXYZ(st.mouseX, st.mouseY, 0.0);
        }

    }
}

export { RotationCamXYCircle }
