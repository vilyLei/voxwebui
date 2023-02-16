import IDefault3DMaterial from "../../vox/material/mcase/IDefault3DMaterial";
import { IColorLabel } from "./IColorLabel";
import IRawMesh from "../../vox/mesh/IRawMesh";
import IColor4 from "../../vox/material/IColor4";
import { UIEntityBase } from "./UIEntityBase";
import { VoxEntity } from "../../cospace/voxentity/VoxEntity";
import { VoxMesh } from "../../cospace/voxmesh/VoxMesh";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";

class ColorLabel extends UIEntityBase implements IColorLabel {

	private m_color: IColor4 = null;
	private m_material: IDefault3DMaterial = null;
	constructor(){ super(); }
	private createMesh(material: IDefault3DMaterial): IRawMesh {

		let ivs = new Uint16Array([0, 1, 2, 0, 2, 3]);
		let vs = new Float32Array(this.createVS(0, 0, this.m_width, this.m_height));

		let mesh = VoxMesh.createRawMesh();
		mesh.reset();
		mesh.setBufSortFormat(material.getBufSortFormat());
		mesh.setIVS(ivs);
		mesh.addFloat32Data(vs, 3);
		mesh.initialize();
		return mesh;
	}

	initialize(width: number, height: number): void {

		if (this.isIniting()) {
			this.init();

			this.m_width = width;
			this.m_height = height;
			let material = VoxMaterial.createDefaultMaterial();
			material.initializeByCodeBuf(false);
			this.m_color = VoxMaterial.createColor4();
			let mesh = this.createMesh( material );
			let et = VoxEntity.createDisplayEntity();
			et.setMaterial(material);
			et.setMesh(mesh);
			this.applyRST(et);
			this.m_entities.push(et);

			this.m_material = material;
		}
	}
	setColor(c: IColor4): IColor4 {
		this.m_color.copyFrom(c);
		if(this.m_material != null) {
			this.m_material.setColor(c);
		}
		return c;
	}
	getColor(): IColor4 {
		return this.m_color;
	}
	destroy(): void {
		super.destroy();
		this.m_material = null;
	}
}
export { ColorLabel };
