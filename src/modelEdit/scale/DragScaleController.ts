import IVector3D from "../../vox/math/IVector3D";
import ScaleDragPlane from "./ScaleDragPlane";
import DragScaleRayCrossPlane from "./DragScaleRayCrossPlane";
import { ScaleCamZCircle } from "./ScaleCamZCircle";

import { ScaleDragLine } from "./ScaleDragLine";
import { ScaleTarget } from "./ScaleTarget";

import { DragTransController } from "../transform/DragTransController";
import { IDragScaleController } from "./IDragScaleController";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
import IColor4 from "../../vox/material/IColor4";
import IMatrix4 from "../../vox/math/IMatrix4";

declare var CoMath: ICoMath;
declare var CoMaterial: ICoMaterial;

/**
 * 在三个坐标轴上拖拽缩放
 */
class DragScaleController extends DragTransController implements IDragScaleController {

    circleSize = 60.0;
    axisSize = 100.0;
    planeSize = 30.0;
    planeAlpha = 0.6;
    pickTestAxisRadius = 20;
    camZCircleRadius = 120;

    constructor() { super(); }

    private createDragPlane(type: number, alpha: number, outColor: IColor4): ScaleDragPlane {

        let movePlane = new ScaleDragPlane();
        movePlane.moveSelfEnabled = false;
        movePlane.initialize(this.m_editRS, this.m_container, type, this.planeSize);
        outColor.a = alpha;
        movePlane.outColor.copyFrom(outColor);
        outColor.scaleBy(1.5);
        outColor.a = 1.3 * alpha;
        movePlane.overColor.copyFrom(outColor);

        movePlane.setTarget(this.m_target);
        this.m_target.addCtrlEntity(movePlane);
        this.m_controllers.push(movePlane);

        movePlane.showOutColor();

        return movePlane;
    }
    private createDragLine(tv: IVector3D, outColor: IColor4, mat4: IMatrix4): void {

        let trans = tv.clone().scaleBy(this.axisSize);
        mat4.setTranslation(trans);

        let line = new ScaleDragLine();
        line.boxScale = 0.4;
        line.coneTransMat4 = mat4;
        line.tv.copyFrom(tv);
        line.innerSphereRadius = this.circleSize * 0.5;
        line.moveSelfEnabled = false;
        line.pickTestRadius = this.pickTestAxisRadius;
        line.initialize(this.m_container, this.axisSize, line.innerSphereRadius);
        line.outColor.copyFrom(outColor);
        outColor.scaleBy(1.5);
        line.overColor.copyFrom(outColor);
        line.showOutColor();

        line.setTarget(this.m_target);

        this.m_target.addCtrlEntity(line.getEntity());
        this.m_target.addCtrlEntity(line.getBox());
        this.m_controllers.push(line);
    }
    protected init(): void {

        this.m_target = new ScaleTarget();
		this.m_target.container = this.m_bodyContainer;

        let alpha = this.planeAlpha;

        let color4 = CoMaterial.createColor4;

        let outColor = color4();

        const V3 = CoMath.Vector3D;
        let mat4 = CoMath.createMat4();

        outColor.setRGB3Bytes(240, 55, 80);
        mat4.identity();
        this.createDragLine(V3.X_AXIS, outColor, mat4);
        outColor.setRGB3Bytes(135, 205, 55);
        mat4.identity();
        this.createDragLine(V3.Y_AXIS, outColor, mat4);
        outColor.setRGB3Bytes(80, 145, 240);
        mat4.identity();
        this.createDragLine(V3.Z_AXIS, outColor, mat4);
		// return;
        // xoz
        outColor.setRGB3Bytes(240, 55, 80);
        this.createDragPlane(0, alpha, outColor);
		// return;
        // xoy
        outColor.setRGB3Bytes(135, 205, 55);
        this.createDragPlane(1, alpha, outColor);
        // yoz
        outColor.setRGB3Bytes(80, 145, 240);
        this.createDragPlane(2, alpha, outColor);
		// return;
        let crossPlane = new DragScaleRayCrossPlane();
        crossPlane.moveSelfEnabled = false;
        crossPlane.initialize(this.m_editRS, this.m_container, this.circleSize);
        crossPlane.setTarget(this.m_target);
        this.m_target.addCtrlEntity(crossPlane);
        this.m_controllers.push(crossPlane);


        let n = Math.floor(this.camZCircleRadius / 2.0);
        let camZCtrl = new ScaleCamZCircle();
        camZCtrl.pickTestRadius = this.pickTestAxisRadius;
        camZCtrl.initialize(this.m_editRS, this.m_container, this.camZCircleRadius, n);
        camZCtrl.setTarget(this.m_target);
        this.m_target.addCtrlEntity(camZCtrl);
        this.m_controllers.push(camZCtrl);
    }
}

export { DragScaleController };
