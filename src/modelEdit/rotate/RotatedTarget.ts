import IVector3D from "../../vox/math/IVector3D";
import IEntityTransform from "../../vox/entity/IEntityTransform";
import { ICtrTarget } from "../base/ICtrTarget";
import { CtrlTargetBase } from "../base/CtrlTargetBase";

import { ICoMath } from "../../cospace/math/ICoMath";
declare var CoMath: ICoMath;

class RotatedTarget extends CtrlTargetBase implements ICtrTarget {
	private m_rvs: IVector3D[] = [];
	private m_rv = CoMath.createVec3();
	private m_pv = CoMath.createVec3();
	private m_rotv = CoMath.createVec3();
	private m_mat0 = CoMath.createMat4();
	private m_mat1 = CoMath.createMat4();

	constructor() {
		super();
	}

	select(controller: IEntityTransform = null): void {
		let tars = this.m_tars;

		if (tars) {
			const vs = this.m_vs;
			const rvs = this.m_rvs;
			let piOver180 = Math.PI / 180.0;
			let cv = this.position;
			cv.setXYZ(0.0, 0.0, 0.0);
			for (let i = 0; i < tars.length; ++i) {
				vs[i].copyFrom(tars[i].getGlobalBounds().center);
				cv.addBy(vs[i]);
			}
			cv.scaleBy(1.0 / tars.length);
			for (let i = 0; i < tars.length; ++i) {
				vs[i].copyFrom(tars[i].getGlobalBounds().center);

				vs[i].subtractBy(cv);
				tars[i].getRotationXYZ(rvs[i]);
				rvs[i].scaleBy(piOver180);
			}
		}
	}

	setTargets(targets: IEntityTransform[]): void {
		this.m_tars = targets;
		if (targets) {
			if (this.m_vs == null || this.m_vs.length < targets.length) {
				this.m_vs = new Array(targets.length);
				this.m_rvs = new Array(targets.length);
				for (let i = 0; i < targets.length; ++i) {
					this.m_vs[i] = CoMath.createVec3();
					this.m_rvs[i] = CoMath.createVec3();
				}
			}
			this.m_rotv.setXYZ(0, 0, 0);
			this.rotation.setXYZ(0, 0, 0);
			console.log("Rotation Reset ...");
		} else {
			this.m_vs = [];
			this.m_rvs = [];
		}
	}

	setPosition(pv: IVector3D): RotatedTarget {
		this.container.setPosition(pv);
		return this;
	}
	getPosition(pv: IVector3D): IVector3D {
		pv.copyFrom(this.position);
		return pv;
	}

	setRotation3(pr: IVector3D): RotatedTarget {
		// console.log("setRotationXYZ(), rx, ry, rz: ", rx, ry, rz);
		if (this.m_tars) {
			this.version++;
			let tars = this.m_tars;
			// console.log("setRotation3(), pr: ", pr);

			let piOver180 = Math.PI / 180.0;
			let k180overPI = 180.0 / Math.PI;
			let ir = this.m_rv;

			if(this.valueFilter) {
				this.valueFilter.ctrlValueFilter(this.type, pr);
			}

			ir.copyFrom(pr).scaleBy(piOver180);

			let mt0 = this.m_mat0;
			let mt1 = this.m_mat1;
			const vs = this.m_vs;
			const rvs = this.m_rvs;
			const cv = this.position;
			let pv = this.m_pv;
			pv.setXYZ(0, 0, 0);
			let dv = CoMath.createVec3();
			let pos = CoMath.createVec3();
			let rv = this.m_rotv;
			let eulerType = CoMath.OrientationType.EULER_ANGLES;

			mt0.identity();
			mt0.setRotationEulerAngle(rv.x, rv.y, rv.z);
			mt1.identity();
			mt1.setRotationEulerAngle(ir.x, ir.y, ir.z);
			mt0.append(mt1);
			let prv = mt0.decompose(eulerType)[1];
			prv.scaleBy(k180overPI);
			// if(this.valueFilter) {
			// 	this.valueFilter.ctrlValueFilter(this.type, prv);
			// }
			this.rotation.copyFrom(prv);

			for (let i = 0; i < tars.length; ++i) {
				rv = rvs[i];
				mt0.identity();
				mt0.setRotationEulerAngle(rv.x, rv.y, rv.z);
				mt1.identity();
				mt1.setRotationEulerAngle(ir.x, ir.y, ir.z);
				mt0.append(mt1);
				prv = mt0.decompose(eulerType)[1];
				prv.scaleBy(k180overPI);
				tars[i].setRotation3(prv);
				tars[i].update();
				prv = (tars[i] as any).getMatrix().decompose(eulerType)[1].scaleBy(k180overPI);

				// if(this.valueFilter) {
				// 	this.valueFilter.ctrlValueFilter(this.type, prv);
				// 	tars[i].setRotation3(prv);
				// 	tars[i].update();
				// }
			}
			if(tars.length == 1) {
				this.rotation.copyFrom( prv );
			}
			// console.log("this.rotation: ", this.rotation);
			// console.log("prv: ", prv);

			for (let i = 0; i < tars.length; ++i) {
				mt0.identity();
				mt0.setRotationEulerAngle(ir.x, ir.y, ir.z);
				pv.copyFrom(vs[i]);
				mt0.transformVector3Self(pv);
				pv.addBy(cv);

				// calc new bounds center position

				tars[i].update();
				dv.subVecsTo(tars[i].getGlobalBounds().center, pv);
				tars[i].getPosition(pos);
				pos.subtractBy(dv);

				tars[i].setPosition(pos);
			}
			this.m_changed = true;
		}
		return this;
	}

	getRotationXYZ(rv: IVector3D): IVector3D {
		rv.setXYZ(0.0, 0.0, 0.0);
		return rv;
	}
}
export { RotatedTarget };
