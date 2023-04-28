import IVector3D from "../../vox/math/IVector3D";
import IEntityTransform from "../../vox/entity/IEntityTransform";
import { ICtrTarget } from "../base/ICtrTarget";
import { CtrlTargetBase } from "../base/CtrlTargetBase";

import { ICoMath } from "../../cospace/math/ICoMath";
declare var CoMath: ICoMath;

class MovedTarget extends CtrlTargetBase implements ICtrTarget {
	constructor() {
		super();
	}

	select(controller: IEntityTransform = null): void {
		let tars = this.m_tars;
		if (tars) {
			let vs = this.m_vs;
			if(this.container == null) {
				if (controller == null) controller = this.m_controllers[0];
				controller.getPosition(this.m_v3);
			}else {
				this.container.getPosition(this.m_v3);
			}
			for (let i = 0; i < tars.length; ++i) {
				vs[i].copyFrom(tars[i].getGlobalBounds().center);
				vs[i].subtractBy(this.m_v3);
			}
		}
	}
	setTargets(targets: IEntityTransform[]): void {
		this.m_tars = targets;
		if (targets) {
			if (this.m_vs == null || this.m_vs.length < targets.length) {
				this.m_vs = new Array(targets.length);
				for (let i = 0; i < targets.length; ++i) {
					this.m_vs[i] = CoMath.createVec3();
				}
			}
		} else {
			this.m_vs = [];
		}
	}
	setPosition(pv: IVector3D): MovedTarget {
		if(this.valueFilter) {
			this.valueFilter.ctrlValueFilter(this.type, pv);
		}
		this.version++;
		const tars = this.m_tars;
		if (tars) {
			const vs = this.m_vs;
			const v3 = this.m_v3;
			let dv = CoMath.createVec3();
			let pos = CoMath.createVec3();
			for (let i = 0; i < tars.length; ++i) {
				v3.addVecsTo(pv, vs[i]);
				tars[i].getPosition(pos);
				dv.subVecsTo(tars[i].getGlobalBounds().center, pos);
				v3.subtractBy(dv);
				tars[i].setPosition(v3);
			}
		}
		this.container.setPosition(pv);
		this.position.copyFrom(pv);
		this.m_changed = true;
		return this;
	}
}
export { MovedTarget };
