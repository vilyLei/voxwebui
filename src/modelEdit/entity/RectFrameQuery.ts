import IVector3D from "../../vox/math/IVector3D";
import IRenderEntity from "../../vox/render/IRenderEntity";
import IRendererScene from "../../vox/scene/IRendererScene";

import { ICoMath } from "../../cospace/math/ICoMath";
import IAABB2D from "../../vox/geom/IAABB2D";
import {IRectFrameQuery} from "./IRectFrameQuery";

declare var CoMath: ICoMath;

class RectFrameQuery implements IRectFrameQuery {

	private m_rscene: IRendererScene;
	private m_entities: IRenderEntity[] = null;
	private m_rect: IAABB2D = CoMath.createAABB2D();
	constructor() {
	}

	query(entities: IRenderEntity[], total: number): void {

		this.m_entities = [];
		if(total > 0) {
			let list = this.m_entities;
			const rect = this.m_rect;
			let pv = CoMath.createVec3();
			let cam = this.m_rscene.getCamera();
			let st = this.m_rscene.getStage3D();
			for(let i = 0; i < total; ++i) {
				if(entities[i].mouseEnabled) {
					let bounds = entities[i].getGlobalBounds();
					pv.copyFrom(bounds.center);
					cam.worldPosToScreen(pv);
					pv.x += st.stageHalfWidth;
					pv.y += st.stageHalfHeight;
					if(rect.containsXY(pv.x, pv.y)) {
						list.push(entities[i]);
					}
				}
			}
		}
	}
	initialize(rscene: IRendererScene): void {
		if (this.m_rscene == null) {
			this.m_rscene = rscene;
		}
	}
	getEntities(min: IVector3D, max: IVector3D): IRenderEntity[] {

		const rect = this.m_rect;
		rect.setTo(min.x, min.y, max.x - min.x, max.y - min.y);
		if((rect.width * rect.height) > 0) {
			let rscene = this.m_rscene;
			rscene.getSpace().renderingEntitySet.query(this);
			return this.m_entities;
		}
		return null;
	}
}

export { RectFrameQuery }
