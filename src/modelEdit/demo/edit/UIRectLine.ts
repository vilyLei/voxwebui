import IAABB from "../../../vox/geom/IAABB";
import IVector3D from "../../../vox/math/IVector3D";
import IRendererScene from "../../../vox/scene/IRendererScene";

import { ICoMesh } from "../../../cospace/voxmesh/ICoMesh";
import { ICoEntity } from "../../../cospace/voxentity/ICoEntity";
import { ICoMaterial } from "../../../cospace/voxmaterial/ICoMaterial";
import { ICoMath } from "../../../cospace/math/ICoMath";
import ITransformEntity from "../../../vox/entity/ITransformEntity";

declare var CoMesh: ICoMesh;
declare var CoMaterial: ICoMaterial;
declare var CoEntity: ICoEntity;
declare var CoMath: ICoMath;

class UIRectLine {

	private m_rscene: IRendererScene;
	private m_entity: ITransformEntity = null;
	private m_pz = 0.0;
	private m_flag = false;
	private m_prePos: IVector3D = CoMath.createVec3();
	private m_currPos: IVector3D = CoMath.createVec3();

	private m_enabled: boolean = false;
	readonly bounds: IAABB = CoMath.createAABB();

	constructor() {
	}

	initialize(rscene: IRendererScene): void {
		if (this.m_entity == null) {

			this.m_rscene = rscene;
			this.m_entity = CoEntity.createDisplayEntity();

			CoMesh.line.dynColorEnabled = true;
			let material = CoMaterial.createLineMaterial(CoMesh.line.dynColorEnabled);
			CoMesh.line.setBufSortFormat(material.getBufSortFormat());
			let mesh = CoMesh.line.createRectXOY(0, 0, 1, 1);
			this.m_entity.setMaterial(material);
			this.m_entity.setMesh(mesh);
			rscene.addEntity(this.m_entity);
			this.disable();
		}
	}
	reset(): void {
		this.m_enabled = false;
		this.bounds.reset();
		this.m_prePos.copyFrom(this.m_currPos.setXYZ(0,0,0));
	}
	enable(): void {
		this.m_enabled = true;
	}
	disable(): void {
		this.m_enabled = false;
		this.setVisible(false);
	}
	isEnabled(): boolean {
		return this.m_enabled;
	}

	isSelectEnabled(): boolean {
		return this.m_flag && this.m_enabled && CoMath.Vector3D.Distance(this.m_prePos, this.m_currPos) > 0.98;
	}
	private setVisible(v: boolean): void {
		if (this.m_entity) {
			this.m_entity.setVisible(v);
		}
	}
	isVisible(): boolean {
		if (this.m_entity) {
			return this.m_entity.getVisible();
		}
		return false;
	}
	setZ(pz: number): void {
		this.m_pz = pz;
	}
	begin(px: number, py: number): void {
		this.m_flag = true;
		this.bounds.reset();
		this.m_currPos.copyFrom(this.m_prePos);
		if (this.m_enabled) {
			this.m_prePos.setXYZ(px, py, this.m_pz);
			this.m_currPos.copyFrom(this.m_prePos);
			this.move(px, py);
		}
	}
	end(px: number, py: number): void {
		if (this.m_enabled) {
			this.setVisible(false);
		}
		this.m_flag = false;
	}
	move(px: number, py: number): void {
		const v = this.m_prePos;
		if (this.m_enabled && this.m_flag && CoMath.Vector3D.DistanceXYZ(v.x, v.y, 0, px, py, 0) > 1.0) {
			if (this.m_entity != null) {

				this.m_currPos.setXYZ(px, py, 0);

				this.setVisible(true);

				let b = this.bounds;
				b.reset();
				b.addPosition(this.m_prePos);
				b.addXYZ(px, py, 0);
				b.updateFast();

				let et = this.m_entity;
				et.setScaleXYZ(b.getWidth(), b.getHeight(), 1.0);
				et.setPosition(b.min);
				et.update();
			}
		}
	}
}

export { UIRectLine }
