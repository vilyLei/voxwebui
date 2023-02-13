import ICanvasTexAtlas from "../../cospace/voxtexture/atlas/ICanvasTexAtlas";
import { IClipLabel } from "../entity/IClipLabel";
import IRawMesh from "../../vox/mesh/IRawMesh";
import { ClipLabelBase } from "../entity/ClipLabelBase";
import { UIEntityContainer } from "../entity/UIEntityContainer";
import IDefault3DMaterial from "../../vox/material/mcase/IDefault3DMaterial";

import { ICoMesh } from "../../cospace/voxmesh/ICoMesh";
declare var CoMesh: ICoMesh;
import { ICoMaterial } from "../../cospace/voxmaterial/ICoMaterial";
declare var CoMaterial: ICoMaterial;
import { ICoMath } from "../../cospace/math/ICoMath";
declare var CoMath: ICoMath;
import { ICoEntity } from "../../cospace/voxentity/ICoEntity";
import IColor4 from "../../vox/material/IColor4";
declare var CoEntity: ICoEntity;

class SelectionEntity extends UIEntityContainer {
	
	constructor(){super();}

}
export { SelectionEntity };
