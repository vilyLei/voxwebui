/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/
import IRendererScene from "../../vox/scene/IRendererScene";
import IEntityTransform from "../../vox/entity/IEntityTransform";

import { IUserEditController } from "../base/IUserEditController";

import { IDragMoveController } from "../move/IDragMoveController";
import { DragMoveController } from "../move/DragMoveController";
import { IDragScaleController } from "../scale/IDragScaleController";
import { DragScaleController } from "../scale/DragScaleController";
import { IDragRotationController } from "../rotate/IDragRotationController";
import { DragRotationController } from "../rotate/DragRotationController";
import IVector3D from "../../vox/math/IVector3D";
import { ITransformController } from "./ITransformController";

import { ICoMath } from "../../cospace/math/ICoMath";
import { VoxRScene } from "../../cospace/voxengine/VoxRScene";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";
import { VoxMath } from "../../cospace/math/VoxMath";
import { ICtrlValueFilter } from "../base/ICtrlValueFilter";
declare var CoMath: ICoMath;

/**
 * renderable entity transform 编辑控制器
 */
class TransformController implements ITransformController {
	private m_rsc: IRendererScene = null;
	private m_enabled: boolean = false;
	private m_controllers: IUserEditController[] = [null, null, null];
	private m_pv: IVector3D;
	private m_wpos: IVector3D;

	private m_camVer = -7;
	private m_ctrVer = -7;
	private m_scale = 0.015;
	private m_targets: IEntityTransform[] = null;
	private m_valueFilter: ICtrlValueFilter = null;
	private m_movedCtr: IDragMoveController = null;
	private m_scaleCtr: IDragScaleController = null;
	private m_rotatedCtr: IDragRotationController = null;
	private m_bodyContainer: IDisplayEntityContainer = null;
	private m_type = -1;
	private m_local = false;
	private m_global = true;
	/**
	 * the type vaule is 0
	 */
	readonly TRANSLATION = 0;
	/**
	 * the type vaule is 1
	 */
	readonly SCALE = 1;
	/**
	 * the type vaule is 2
	 */
	readonly ROTATION = 2;

	constructor() {}

	setCtrlValueFilter(filter: ICtrlValueFilter): void {

		this.m_valueFilter = filter;
		if(filter) {
			let ls = this.m_controllers;
			for(let i = 0; i < ls.length; ++i) {
				if(ls[i]) {
					ls[i].getCtrlTarget().valueFilter = filter;
				}
			}
		}
	}
	isLocal(): boolean {
		return this.m_local;
	}
	isGlobal(): boolean {
		return this.m_global;
	}
	toLocal(): void {
		this.m_local = true;
		this.m_global = false;

		let container = this.m_bodyContainer;
		container.setRotation3(this.getTargetRotation());
		container.update();
		this.run(true);
	}
	toGlobal(): void {
		this.m_local = false;
		this.m_global = true;

		let container = this.m_bodyContainer;
		container.setRotation3(VoxMath.createVec3());
		container.update();
		this.run(true);
	}
	getContainer(): IDisplayEntityContainer {
		return this.m_bodyContainer;
	}
	setScale(s: number): void {
		this.m_scale = s;
	}
	getScale(): number {
		return this.m_scale;
	}

	initialize(rsc: IRendererScene, processid: number = 0): void {
		if (this.m_rsc == null) {
			let bodyContainer = VoxRScene.createDisplayEntityContainer();
			bodyContainer.uuid = "bodyContainer";
			let move_container = VoxRScene.createDisplayEntityContainer();
			let rotate_container = VoxRScene.createDisplayEntityContainer();
			let scale_container = VoxRScene.createDisplayEntityContainer();

			bodyContainer.addChild(move_container);
			bodyContainer.addChild(rotate_container);
			bodyContainer.addChild(scale_container);
			this.m_bodyContainer = bodyContainer;
			rsc.addContainer(bodyContainer, processid);

			this.m_rsc = rsc;
			this.m_pv = CoMath.createVec3();
			this.m_wpos = CoMath.createVec3();

			let ls = this.m_controllers;

			let ctr0 = (this.m_movedCtr = new DragMoveController());
			ctr0.axisSize = 100;
			ctr0.planeSize = 30;
			ctr0.pickTestAxisRadius = 10;
			ctr0.runningVisible = true;
			ctr0.initialize(rsc, move_container, bodyContainer);
			ctr0.getCtrlTarget().type = this.TRANSLATION;
			ctr0.disable();
			ctr0.setVisible(false);
			ls[0] = ctr0;

			let ctr1 = (this.m_scaleCtr = new DragScaleController());
			ctr1.axisSize = 100;
			ctr1.planeSize = 30;
			ctr1.pickTestAxisRadius = 10;
			ctr1.initialize(rsc, scale_container, bodyContainer);
			ctr1.getCtrlTarget().type = this.SCALE;
			ctr1.disable();
			ctr1.setVisible(false);
			ls[1] = ctr1;

			let ctr2 = (this.m_rotatedCtr = new DragRotationController());
			ctr2.pickTestAxisRadius = 10;
			ctr2.runningVisible = true;
			ctr2.initialize(rsc, rotate_container, bodyContainer);
			ctr2.getCtrlTarget().type = this.ROTATION;
			ctr2.disable();
			ctr2.setVisible(false);
			ls[2] = ctr2;

			this.setCtrlValueFilter( this.m_valueFilter );

			this.toTranslation();
			this.disable();
		}
	}
	getTargetRotation(): IVector3D {
		return this.m_rotatedCtr.getCtrlTarget().rotation;
	}
	addEventListener(type: number, listener: any, func: (evt: any) => void, captureEnabled: boolean = true, bubbleEnabled: boolean = false): void {
		let ls = this.m_controllers;
		for (let i = 0; i < ls.length; ++i) {
			ls[i].addEventListener(type, listener, func, captureEnabled, bubbleEnabled);
		}
	}
	removeEventListener(type: number, listener: any, func: (evt: any) => void): void {
		let ls = this.m_controllers;
		for (let i = 0; i < ls.length; ++i) {
			ls[i].removeEventListener(type, listener, func);
		}
	}
	/**
	 * to translation controller
	 */
	toTranslation(): void {
		this.enable(this.TRANSLATION);
	}
	/**
	 * to scale controller
	 */
	toScale(): void {
		this.enable(this.SCALE);
	}
	/**
	 * to rotation controller
	 */
	toRotation(): void {
		this.enable(this.ROTATION);
	}
	/**
	 * get the current controller type
	 * @returns the legal value is 0, 1, or 2, -1 or other value is illegal.
	 */
	getCurrType(): number {
		return this.m_type;
	}
	/**
	 * @param type the correct value is 0, 1, or 2, the default value is -1.
	 */
	enable(type: number = -1): void {
		let ls = this.m_controllers;
		let t = this.m_type;
		this.m_enabled = true;
		if (type >= 0 && type <= 2) {
			if (t != type) {
				let targets = this.m_targets;
				if (t >= 0) {
					if (targets == null) {
						targets = ls[t].getTargets();
					}

					this.m_bodyContainer.getPosition(this.m_wpos);
					ls[t].decontrol();
					ls[t].disable();
					ls[t].setVisible(false);
				}
				this.m_camVer = -7;
				this.m_type = type;
				// ls[type].enable();
				// if (targets) {
				// 	this.select(targets, this.m_wpos, false);
				// }
				// if (this.m_local) {
				// 	this.toLocal();
				// } else {
				// 	this.toGlobal();
				// }
				this.applyCtrl(type, targets);
			}
		} else {
			// if (t >= 0) {
			// 	// ls[t].enable();
			// 	// if(this.m_local) {
			// 	// 	this.toLocal();
			// 	// }else {
			// 	// 	this.toGlobal();
			// 	// }
			// }
			this.applyCtrl(t);
		}
	}
	private applyCtrl(t: number, targets: IEntityTransform[] = null): void {
		if (t >= 0) {
			this.m_controllers[t].enable();
			if (targets) {
				this.select(targets, this.m_wpos, false);
			}
			if (this.m_local) {
				this.toLocal();
			} else {
				this.toGlobal();
			}
		}
	}
	disable(force: boolean = false): void {
		this.m_enabled = false;
		this.m_targets = null;
		let ls = this.m_controllers;
		let t = this.m_type;
		if (t >= 0) {
			ls[t].decontrol();
			ls[t].disable();
			ls[t].setVisible(false);
		}
		if (force) {
			this.m_type = -1;
		}
	}
	decontrol(): void {
		if (this.m_rsc != null) {
			if (this.m_enabled && this.m_type >= 0) {
				this.m_controllers[this.m_type].decontrol();
			}
		}
	}
	destroy(): void {
		if (this.m_rsc != null) {
			this.decontrol();
			this.m_rsc = null;
		}
	}
	select(targets: IEntityTransform[], wpos: IVector3D = null, autoEnabled: boolean = true): void {
		if (targets) {
			if (this.m_type >= 0) {
				if (wpos == null) {
					let pos = this.m_wpos;
					let pv = CoMath.createVec3();
					pos.setXYZ(0, 0, 0);
					for (let i = 0; i < targets.length; ++i) {
						pos.addBy(targets[i].getPosition(pv));
					}
					pos.scaleBy(1.0 / targets.length);
				} else {
					this.m_wpos.copyFrom(wpos);
				}
				this.m_camVer = -7;
				const ctr = this.m_controllers[this.m_type];
				if (autoEnabled && !ctr.isEnabled()) {
					this.m_enabled = true;
					ctr.enable();
				}
				ctr.deselect();
				ctr.setPosition(this.m_wpos);
				ctr.update();
				ctr.select(targets);
				ctr.setVisible(true);
				this.updateSize(this.m_rsc, ctr);
			} else {
				this.m_targets = targets;
				this.m_wpos.copyFrom(wpos);
			}
		} else {
			console.error("targets == null");
		}
	}
	private updateSize(sc: IRendererScene, ct: IUserEditController, force: boolean = false): void {
		sc.updateCamera();
		let cam = sc.getCamera();
		if (this.m_camVer != cam.version || this.m_ctrVer != ct.getVersion() || force) {
			const pv = this.m_pv;
			this.m_bodyContainer.getPosition(pv);
			let vm = cam.getViewMatrix();
			vm.transformVector3Self(pv);

			let s = (-this.m_scale * pv.z) / cam.getZNear();

			ct.setCtrlScaleXYZ(s, s, s);
			ct.updateCtrl();
			this.m_camVer = cam.version;
			this.m_ctrVer = ct.getVersion();
		}
	}
	run(force: boolean = false): void {
		let sc = this.m_rsc;
		if (sc) {
			if (this.m_enabled && this.m_type >= 0) {
				let ct = this.m_controllers[this.m_type];
				this.updateSize(sc, ct, force);
				ct.run(force);
			}
		}
	}
}

export { TransformController };
