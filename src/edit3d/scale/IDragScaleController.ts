import IVector3D from "../../vox/math/IVector3D";
import { IUserEditController } from "../base/IUserEditController";

interface IDragScaleController extends IUserEditController {
    /**
     * example: the value is 0.05
     */
    fixSize: number;
    axisSize: number;
    planeSize: number;
    planeAlpha: number;
    pickTestAxisRadius: number;
    camZCircleRadius: number;

    moveByRay(rpv: IVector3D, rtv: IVector3D): void;

}

export { IDragScaleController };
