import ITransformEntity from "../../vox/entity/ITransformEntity";
import IDisplayEntityContainer from "../../vox/entity/IDisplayEntityContainer";
import IVector3D from "../../vox/math/IVector3D";
import { IUIEntity } from "./IUIEntity";
import { UIEntityBase } from "./UIEntityBase";

import { ICoRScene } from "../../cospace/voxengine/ICoRScene";
declare var CoRScene: ICoRScene;
import { ICoMath } from "../../cospace/math/ICoMath";
declare var CoMath: ICoMath;

class ClipLabelBase extends UIEntityBase {

	protected m_index = 0;
	protected m_total = 0;
	protected m_step = 6;
	protected m_vtCount = 0;
	protected m_sizes: number[] = null;

	uuid = "label";

	constructor() { super(); }
	protected createVS(startX: number, startY: number, pwidth: number, pheight: number): number[] {
		let minX = startX;
		let minY = startY;
		let maxX = startX + pwidth;
		let maxY = startY + pheight;
		let pz = 0.0;
		return [minX, minY, pz, maxX, minY, pz, maxX, maxY, pz, minX, maxY, pz];
	}

	setClipIndex(i: number): void {
	}
	setCircleClipIndex(i: number): void {
		i %= this.m_total;
		i += this.m_total;
		i %= this.m_total;
		this.setClipIndex(i);
	}
	getClipIndex(): number {
		return this.m_index;
	}
	getClipsTotal(): number {
		return this.m_total;
	}

	getClipWidthAt(i: number): number {
		if (this.m_sizes != null) {
			if (i >= 0 && i < this.m_total) {
				i = i << 1;
				return this.m_sizes[i];
			}
		} else {
			return this.m_width;
		}
	}
	getClipHeightAt(i: number): number {
		if (this.m_sizes != null) {
			if (i >= 0 && i < this.m_total) {
				i = i << 1;
				return this.m_sizes[i + 1];
			}
		} else {
			return this.m_height;
		}
	}

	getClipWidth(): number {
		return this.m_width;
	}
	getClipHeight(): number {
		return this.m_height;
	}
	destroy(): void {
		this.m_sizes = null;
		this.m_total = 0;
		super.destroy();
	}
}
export { ClipLabelBase };
