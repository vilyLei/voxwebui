import IRenderEntity from "../../../vox/render/IRenderEntity";
import { ICoMath } from "../../../cospace/math/ICoMath";

declare var CoMath: ICoMath;

class TransNode {

	target: IRenderEntity;

	position = CoMath.createVec3();
	scale = CoMath.createVec3();
	rotation = CoMath.createVec3();


	// position = new Vector3D();
	// scale = new Vector3D();
	// rotation = new Vector3D();

	constructor() { }
}

class TransNodeGroup {

	list: TransNode[] = [];

	constructor() { }
	add(tar: IRenderEntity): void {

		let node = new TransNode();
		tar.getPosition(node.position);
		tar.getScaleXYZ(node.scale);
		tar.getRotationXYZ(node.rotation);
		node.target = tar;
		this.list.push(node);
	}
	use(): IRenderEntity[] {
		let ls = this.list;
		let list: IRenderEntity[] = [];
		for (let i = 0; i < ls.length; ++i) {
			let d = ls[i];
			const tar = d.target;
			tar.setScale3(d.scale);
			tar.setRotation3(d.rotation);
			tar.setPosition(d.position);
			tar.update();
			list.push( tar );
		}
		return list;
	}
	destroy(): void {
		this.list = [];
	}
}
/**
 * renderable space transforming history recorder
 */
class TransformRecorder {

	private m_undoList: TransNodeGroup[] = [];
	private m_redoList: TransNodeGroup[] = [];
	constructor() { }

	/**
	 * 存放当前状态，所以初始化target的时候就应该存放进来
	 * @param tars IRenderEntity instance list
	 */
	save(tars: IRenderEntity[]): void {

		if (this.m_redoList.length > 0) this.m_redoList = [];

		let group = new TransNodeGroup();
		for (let i = 0; i < tars.length; ++i) {
			group.add(tars[i]);
		}
		this.m_undoList.push(group);

	}

	// Ctrl + Z
	undo(): IRenderEntity[] {
		let ls = this.m_undoList;
		let len = ls.length;
		if (len > 1) {
			// console.log("XXX undo().");
			let node = ls.pop();
			this.m_redoList.push(node);
			return ls[ls.length - 1].use();
		}
		return null;
	}
	// Ctrl + Y
	redo(): IRenderEntity[] {
		let ls = this.m_redoList;
		let len = ls.length;
		if (len > 0) {
			// console.log("XXX redo().");
			let node = ls.pop();
			let list = node.use();
			this.m_undoList.push(node);
			return list;
		}
		return null;
	}
}

export { TransformRecorder }
