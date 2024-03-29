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
import { RotationCtr } from "./RotationCtr";
import IRendererScene from "../../vox/scene/IRendererScene";

import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
import { ICoEntity } from "../../cospace/voxentity/ICoEntity";
import { ICoMath } from "../../cospace/math/ICoMath";
import { ICoAGeom } from "../../cospace/ageom/ICoAgeom";
import { ICoMesh } from "../../cospace/voxmesh/ICoMesh";
import { IRenderCamera } from "../../vox/render/IRenderCamera";
import { RotationRing } from "./RotationRing";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";

declare var CoMaterial: ICoMaterial;
declare var CoMath: ICoMath;
declare var CoEntity: ICoEntity;
declare var CoAGeom: ICoAGeom;
declare var CoMesh: ICoMesh;

/**
 * 在三个坐标轴上旋转
 */
class RotationCircle extends RotationCtr implements IRayControl {
	private m_cv = CoMath.createVec3();
	private m_planeNV = CoMath.createVec3();
	private m_initNV = CoMath.createVec3();
	private m_outV = CoMath.createVec3();
	private m_preRotV = CoMath.createVec3();
	private m_rotV = CoMath.createVec3();
	private m_camPos = CoMath.createVec3();

	private m_initDegree = 0;
	private m_planeDis = 0;
	private m_type = 0;

	private m_material: IColorMaterial = null;
	private m_ring: RotationRing = null;
	private m_entity: ITransformEntity = null;
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
	initialize(rs: IRendererScene, container: IDisplayEntityContainer, radius: number, segsTotal: number, type: number): void {
		if (this.m_entity == null) {
			this.m_editRS = rs;
			this.m_container = container;

			this.m_ring = new RotationRing();
			this.m_entity = CoEntity.createDisplayEntity();
			this.m_circle = CoEntity.createDisplayEntity();

			let ml = CoMesh.line;
			let mesh: IRawMesh;
			let mesh2: IRawMesh;
			ml.dynColorEnabled = true;
			this.m_type = type;
			let direcV = CoMath.createVec3();
			let pnv = this.m_planeNV;
			switch (type) {
				case 1:
					// xoz
					mesh = ml.createCircleXOZ(radius, Math.round(segsTotal * 0.5), null, 0, Math.PI);
					mesh2 = ml.createCircleXOZ(radius, segsTotal);
					pnv.setXYZ(0, 1, 0);
					direcV.setXYZ(0, 0, 1);
					break;
				case 2:
					// yoz
					mesh = ml.createCircleYOZ(radius, Math.round(segsTotal * 0.5), null, 0, Math.PI);
					mesh2 = ml.createCircleYOZ(radius, segsTotal);
					pnv.setXYZ(1, 0, 0);
					direcV.setXYZ(0, 0, 1);
					break;
				default:
					// xoy
					mesh = ml.createCircleXOY(radius, Math.round(segsTotal * 0.5), null, 0, Math.PI);
					mesh2 = ml.createCircleXOY(radius, segsTotal);
					pnv.setXYZ(0, 0, 1);
					direcV.setXYZ(0, 1, 0);
					type = 0;
					break;
			}
			this.m_initNV.copyFrom(pnv);
			mesh.setRayTester(new CircleRayTester(radius, this.m_cv, direcV, pnv, this.m_planeDis, this.pickTestRadius));
			this.m_entity.setMesh(mesh);
			this.m_material = CoMaterial.createLineMaterial(ml.dynColorEnabled);
			this.m_material.setColor(this.outColor);
			this.m_entity.setMaterial(this.m_material);
			this.m_entity.update();

			this.m_circle.setMesh(mesh2);
			this.m_circle.setMaterial(this.m_material);
			this.m_circle.update();
			this.m_circle.setVisible(false);

			this.applyEvent(this.m_entity);

			container.addEntity(this.m_entity);
			container.addEntity(this.m_circle);

			this.m_ring.initialize(rs, container, radius, 120, type);
			this.m_ring.setVisible(false);
		}
	}
	run(camera: IRenderCamera, rtv: IVector3D, force: boolean): void {
		let pv = this.m_outV;
		let camPV = this.m_camPos.copyFrom(camera.getPosition());
		let container = this.m_target.container;
		container.globalToLocal(this.m_camPos);

		this.m_planeNV.copyFrom(this.m_initNV);
		// this.m_target.container.getMatrix().deltaTransformVectorSelf(this.m_planeNV);

		pv.copyFrom(this.m_camPos);
		let dis = pv.dot(this.m_planeNV);
		pv.copyFrom(this.m_planeNV);
		pv.scaleBy(-dis);
		pv.addBy(camPV);
		let mc = CoMath.MathConst;

		const entity = this.m_entity;
		let ang = 0;
		switch (this.m_type) {
			case 0:
				// xoy
				ang = -mc.GetDegreeByXY(pv.x, pv.y);
				entity.setRotationXYZ(0, 0, 270 - ang);
				entity.update();
				break;
			case 1:
				// xoz
				ang = -mc.GetDegreeByXY(pv.x, pv.z);
				entity.setRotationXYZ(0, 90 + ang, 0);
				entity.update();
				break;
			case 2:
				// yoz
				ang = -mc.GetDegreeByXY(pv.z, pv.y);
				entity.setRotationXYZ(ang, 0, 0);
				entity.update();
				break;
			default:
				break;
		}
	}

	setVisible(visible: boolean): RotationCircle {
		this.m_entity.setVisible(visible);
		if (!visible) this.m_ring.setVisible(visible);
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
		(this.m_entity.getMaterial() as IColorMaterial).setColor(this.overColor);
	}
	showOutColor(): void {
		(this.m_entity.getMaterial() as IColorMaterial).setColor(this.outColor);
		this.m_ring.setColor(this.outColor);
	}
	deselect(): void {
		console.log("RotationCircle::deselect() ...");
		if (this.isSelected()) {
			super.deselect();
			if (this.m_circle.getVisible()) {
				this.m_entity.setVisible(true);
				this.m_circle.setVisible(false);
			}
			this.m_ring.setVisible(false);
		}
	}
	destroy(): void {
		super.destroy();
		if (this.m_entity) {
			this.m_container.removeEntity(this.m_entity);
			this.m_entity.destroy();
			this.m_entity = null;
		}
		if (this.m_circle) {
			this.m_container.removeEntity(this.m_circle);
			this.m_circle.destroy();
			this.m_circle = null;
		}
		if (this.m_ring) {
			this.m_ring.destroy();
			this.m_ring = null;
		}
		this.m_container = null;
		this.m_editRS = null;
		this.m_cv = null;
		this.m_planeNV = null;
	}

	moveByRay(rpv: IVector3D, rtv: IVector3D, force: boolean = false): void {
		if (this.isEnabled()) {
			if (this.isSelected()) {
				let degree = this.getDegree(rpv, rtv);
				degree -= this.m_initDegree;

				this.m_ring.setProgress(degree / 360.0);

				let et = this.m_target;
				if (et) {
					let rv = this.m_rotV;
					let prv = this.m_preRotV;
					et.getRotationXYZ(rv);
					switch (this.m_type) {
						case 1:
							// XOZ, Y-Axis
							rv.y = prv.y + degree;
							break;
						case 2:
							// YOZ, X-Axis
							rv.x = prv.x + degree;
							break;
						default:
							// XOY, Z-Axis
							rv.z = prv.z + degree;
							break;
					}
					et.setRotation3(rv);
					et.update();
				}
			}
		}
	}
	mouseDownListener(evt: any): void {
		console.log("RotationCircle::mouseDownListener() ..., evt: ", evt);
		if (this.isEnabled()) {
			this.editBegin();
			this.m_target.select();

			this.m_entity.setVisible(false);
			this.m_circle.setVisible(true);

			this.setThisVisible(true);

			this.m_initDegree = this.getDegree(evt.raypv, evt.raytv);

			console.log("this.m_initDegree: ", this.m_initDegree);

			this.m_ring.setVisible(true);
			this.m_ring.setRingRotation(this.m_initDegree);
			this.m_ring.setProgress(0.0);

			this.m_preRotV.setXYZ(0, 0, 0);
			if (this.m_target) {
				this.m_target.getRotationXYZ(this.m_preRotV);
			}
		}
	}

	public getDegree(rpv: IVector3D, rtv: IVector3D): number {
		let degree = 0;
		if (this.isSelected()) {
			this.m_planeNV.copyFrom(this.m_initNV);
			this.m_target.container.getMatrix().deltaTransformVectorSelf(this.m_planeNV);

			let u = CoAGeom.PlaneUtils;
			this.m_target.getPosition(this.m_outV);
			let pids = this.m_planeNV.dot(this.m_outV);
			let hitFlag = u.IntersectRayLinePos2(this.m_planeNV, pids, rpv, rtv, this.m_outV);

			// for test
			// if(this.m_axisEntity == null) {
			//     this.m_axisEntity = CoEntity.createCrossAxis3DEntity(20);
			//     this.m_editRS.addEntity(this.m_axisEntity, 1);
			// }
			// this.m_axisEntity.setPosition(this.m_outV);
			// this.m_axisEntity.update();

			let v = this.m_outV;
			this.m_circle.globalToLocal(v);
			if (hitFlag) {
				hitFlag = u.Intersection == CoAGeom.Intersection.Hit;
				let V3 = CoMath.Vector3D;
				if (hitFlag && V3.Distance(v, this.m_cv) > 2.0) {
					v.subtractBy(this.m_cv);

					let et = this.m_target;
					if (et != null) {
						switch (this.m_type) {
							case 1:
								// XOZ, Y-Axis
								degree = CoMath.MathConst.GetDegreeByXY(v.x, v.z);
								degree = -degree;
								//rv.y = pv.y - degree;
								break;
							case 2:
								// YOZ, X-Axis
								degree = CoMath.MathConst.GetDegreeByXY(v.y, v.z);
								//rv.x = pv.x + degree;
								break;
							default:
								// XOY, Z-Axis
								degree = CoMath.MathConst.GetDegreeByXY(v.x, v.y);
								//rv.z = pv.z + degree;
								break;
						}
						if (degree > 360) degree -= 360.0;
						else if (degree < 0) degree += 360.0;
						// console.log("RotationCircle::getDegree() ..., degree: ", degree);
					}
				}
			}
		}
		return degree;
	}
}

export { RotationCircle };
