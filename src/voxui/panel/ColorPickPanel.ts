import { IVoxUIScene } from "../scene/IVoxUIScene";
import { UIPanel } from "./UIPanel";
import IColor4 from "../../vox/material/IColor4";
import IRenderTexture from "../../vox/render/texture/IRenderTexture";
import { TextureLabel } from "../entity/TextureLabel";
import { IColorPickPanel } from "./IColorPickPanel";
import { ColorLabel } from "../entity/ColorLabel";
import { EventBase, MouseEvent } from "../../cospace/voxengine/VoxRScene";
import { VoxMaterial } from "../../cospace/voxmaterial/VoxMaterial";
import IEventBase from "../../vox/event/IEventBase";


class ColorPickPanel extends UIPanel implements IColorPickPanel {

	/**
	 * 边距留白尺寸
	 */
	private m_marginWidth = 15;

	constructor() { super(); }

	initialize(scene: IVoxUIScene, rpi: number, panelW: number = 260, panelH: number = 260, marginWidth: number = 3): void {
		if (this.isIniting()) {
			this.init();

			this.m_marginWidth = marginWidth;
			this.m_scene = scene;
			this.m_rpi = rpi;

			this.m_panelW = panelW;
			this.m_panelH = panelH;
		}
	}
	destroy(): void {
		super.destroy();

	}
	private m_colorLabel: ColorLabel = null;
	setColor(color: IColor4): void {
		if (this.isOpen() && color != null) {
			if (this.m_colorLabel == null) {
				this.m_colorLabel = new ColorLabel();
				this.m_colorLabel.initialize(32, 32);
				this.m_colorLabel.setXY(2, this.m_panelH);
				this.addEntity(this.m_colorLabel);
			}
			this.m_colorLabel.setColor(color);
			this.m_colorLabel.setVisible(true);
		}
	}
	setPickXY(px: number, py: number): void {
		
		this.m_prePickX = px;
		this.m_prePickY = py;
	}
	private m_callback: (color: IColor4) => void = null;
	setSelectColorCallback(callback: (color: IColor4) => void): void {
		this.m_callback = callback;
	}

	protected buildPanel(pw: number, ph: number): void {

		this.buildItems();
	}
	private m_initing: boolean = true;
	protected buildItems(): void {
		if (this.m_initing) {
			this.m_initing = false;
			let sc = this.getScene();
			let cplUrl = "static/assets/colors.png";

			let dis = this.m_marginWidth;
			let pw = this.m_panelW - 2.0 * dis;
			let ph = this.m_panelH - 2.0 * dis;
			let tex = this.createTexByUrl(cplUrl);
			let texLabel = new TextureLabel()
			texLabel.initialize(sc, tex, pw, ph);
			texLabel.setXY(dis, dis);
			this.addEntity(texLabel);
		}
	}
	private m_pixelsW = 256;
	private m_pixelsH = 256;
	private m_pixels: Uint8ClampedArray;
	private m_color: IColor4;
	private getRGBAByXY(px: number, py: number): IColor4 {
		px = px | 0;
		py = py | 0;
		// if(px < 0 || px > 255 || py < 0 || py > 255) {
		// 	return null;
		// }
		if (px < 0) px = 0;
		if (py < 0) py = 0;
		if (px > 255) px = 255;
		if (py > 255) py = 255;
		py = 255 - py;
		if (this.m_color == null) {
			this.m_color = VoxMaterial.createColor4();
		}
		let ls = this.m_pixels;
		if (this.m_pixels != null) {
			let i = (py * this.m_pixelsW + px) * 4;
			let r = ls[i];
			let g = ls[i + 1];
			let b = ls[i + 2];
			this.m_color.setRGB3Bytes(r, g, b);
		}
		return this.m_color;
	}
	private createColorData(img: HTMLImageElement): void {

		let canvas = document.createElement("canvas");
		canvas.style.display = "bolck";
		canvas.style.overflow = "hidden";
		canvas.style.left = "0px";
		canvas.style.top = "0px";
		canvas.style.position = "absolute";
		canvas.width = img.width;
		canvas.height = img.height;
		let ctx2D = canvas.getContext("2d");
		ctx2D.drawImage(img, 0, 0);

		let imgData = ctx2D.getImageData(0, 0, img.width, img.height);
		this.m_pixels = imgData.data;
	}
	private createTexByUrl(url: string = ""): IRenderTexture {

		let sc = this.getScene();

		let tex = sc.rscene.textureBlock.createImageTex2D(64, 64, false);
		let img = new Image();
		img.onload = (evt: any): void => {
			this.createColorData(img);
			tex.setDataFromImage(img, 0, 0, 0, false);
		};
		img.src = url;
		return tex;
	}
	protected openThis(): void {
		if (this.m_scene != null) {
			this.m_scene.addEventListener(MouseEvent.MOUSE_DOWN, this, this.stMouseDownListener);

		}
	}
	protected closeThis(): void {
		if (this.m_scene != null) {
			this.m_scene.removeEventListener(MouseEvent.MOUSE_DOWN, this, this.stMouseDownListener);
		}
		this.m_callback = null;
		if (this.m_colorLabel != null) this.m_colorLabel.setVisible(false);
		this.stMouseUp(null);
	}

	private m_prePickX = -1;
	private m_prePickY = -1;
	private pickColorByXY(px: number, py: number): void {

		if (this.m_prePickX != px || this.m_prePickY != py) {

			this.m_prePickX = px;
			this.m_prePickY = py;

			if (px >= 0 || px <= this.m_panelW || py >= 0 || py <= this.m_panelH) {

				let d = this.m_marginWidth;
				px -= d;
				py -= d;
				let color = this.getRGBAByXY(px, py);
				if (this.m_callback != null) {
					this.setColor(color);
					this.m_callback(color);
				}
			}
		}
	}
	private stMouseDownListener(evt: any): void {

		let px = evt.mouseX;
		let py = evt.mouseY;
		let pv = this.m_v0;
		pv.setXYZ(px, py, 0);

		this.globalToLocal(pv);

		if (pv.x < 0 || pv.x > this.m_panelW || pv.y < 0 || pv.y > this.m_panelH) {
			this.close();
		} else {
			this.pickColorByXY(pv.x, pv.y);
			this.m_scene.addEventListener(EventBase.ENTER_FRAME, this, this.enterFrame, true, false);
			this.m_scene.addEventListener(MouseEvent.MOUSE_UP, this, this.stMouseUp, true, false);
		}
	}
	private m_autoDelay: number = 0;
	private enterFrame(evt: IEventBase): void {
		// console.log("enterFrame");
		if (this.m_autoDelay > 20) {
			if ((this.m_autoDelay % 7) == 0) {
				let st = this.getScene().getStage();
				let pv = this.m_v0;
				pv.setXYZ(st.mouseX, st.mouseY, 0);
				this.globalToLocal(pv);
				this.pickColorByXY(pv.x, pv.y);
			}
		}
		this.m_autoDelay++;
	}
	private stMouseUp(evt: IEventBase): void {
		if (this.m_scene != null) {
			this.m_scene.removeEventListener(EventBase.ENTER_FRAME, this, this.enterFrame);
			this.m_scene.removeEventListener(MouseEvent.MOUSE_UP, this, this.stMouseUp);
		}
	}
	protected layout(): void {
	}
}
export { ColorPickPanel };
