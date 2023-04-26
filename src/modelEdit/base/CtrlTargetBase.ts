import IVector3D from "../../vox/math/IVector3D";
import IAABB from "../../vox/geom/IAABB";
import IEntityTransform from "../../vox/entity/IEntityTransform";
import { ICtrTarget } from "../base/ICtrTarget";

import { ICoMath } from "../../cospace/math/ICoMath";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";
declare var CoMath: ICoMath;

class CtrlTargetBase implements ICtrTarget {
	protected m_controllers: IEntityTransform[] = [];
	protected m_tars: IEntityTransform[] = null;
	protected m_vs: IVector3D[] = [];
	protected m_flags: boolean[] = [];
	protected m_changed = false;
	protected m_v3 = CoMath.createVec3();

	container: IDisplayEntityContainer = null;
	position = CoMath.createVec3();
	version = 0;

	constructor() {}

	select(controller: IEntityTransform = null): void {}
	deselect(): void {
		this.m_tars = null;
	}
	addCtrlEntity(entity: IEntityTransform): void {
		if (entity != null) {
			this.m_controllers.push(entity);
			this.m_flags.push(true);
		}
	}
	setTargets(targets: IEntityTransform[]): void {}
	getTargets(): IEntityTransform[] {
		return this.m_tars;
	}

	setCtrlScaleXYZ(sx: number, sy: number, sz: number): void {
		if (this.container == null) {
			const ls = this.m_controllers;
			for (let i = 0; i < ls.length; ++i) {
				this.m_flags[i] = true;
				ls[i].setScaleXYZ(sx, sy, sz);
			}
		} else {
			this.container.setScaleXYZ(sx, sy, sz);
			const ls = this.m_controllers;
			for (let i = 0; i < ls.length; ++i) {
				if((ls[i] as any).scaleEnabled) {
					ls[i].setScaleXYZ(sx, sy, sz);
				}
			}
		}
	}

	setXYZ(px: number, py: number, pz: number): CtrlTargetBase {
		return this;
	}
	setPosition(pv: IVector3D): CtrlTargetBase {
		return this;
	}
	getPosition(pv: IVector3D): IVector3D {
		if (this.container == null) {
			return this.container.getPosition(pv);
		}
		pv.copyFrom(this.position);
		return pv;
	}
	setRotation3(r: IVector3D): CtrlTargetBase {
		return this;
	}
	setRotationXYZ(rx: number, ry: number, rz: number): CtrlTargetBase {
		return this;
	}
	setScaleXYZ(sx: number, sy: number, sz: number): CtrlTargetBase {
		return this;
	}
	getRotationXYZ(rv: IVector3D): IVector3D {
		return null;
	}
	getScaleXYZ(sv: IVector3D): IVector3D {
		return null;
	}
	getGlobalBounds(): IAABB {
		return null;
	}
	getLocalBounds(): IAABB {
		return null;
	}
	localToGlobal(pv: IVector3D): void {}
	globalToLocal(pv: IVector3D): void {}
	update(): void {
		if (this.m_changed) {
			let tars = this.m_tars;
			if (tars) {
				for (let i = 0; i < tars.length; ++i) {
					tars[i].update();
				}
			}
		}
		if (this.container == null) {
			let ls = this.m_controllers;
			for (let i = 0; i < ls.length; ++i) {
				if (this.m_flags[i]) {
					// t++;
					this.m_flags[i] = false;
					ls[i].update();
				}
			}
		} else {
			this.container.update();
		}
	}
	updateCtrl(): void {
		if (this.container == null) {
			let ls = this.m_controllers;
			for (let i = 0; i < ls.length; ++i) {
				if (this.m_flags[i]) {
					this.m_flags[i] = false;
					ls[i].update();
				}
			}
		} else {
			this.container.update();
		}
		// console.log("t: ", t);
	}
	destroy(): void {
		this.m_tars = null;
		this.m_controllers = null;
		this.container = null;
	}
}
export { CtrlTargetBase };
