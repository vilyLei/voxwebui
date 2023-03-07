import IRendererScene from "../vox/scene/IRendererScene";
import { IVoxUIScene } from "../voxui/scene/IVoxUIScene";
import { VoxUIScene } from "../voxui/scene/VoxUIScene";
import VoxRuntime from "../common/VoxRuntime";
import { RendererDevice, VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../cospace/voxengine/ui/VoxUIInteraction";
import IRendererSceneGraph from "../vox/scene/IRendererSceneGraph";
import { ButtonBuilder } from "../voxui/button/ButtonBuilder";
import { IClipColorLabel } from "../voxui/entity/IClipColorLabel";
import { IButton } from "../voxui/button/IButton";

export class DemoUIButton {
	private m_graph: IRendererSceneGraph = null;
	private m_rscene: IRendererScene = null;

	initialize(): void {
		console.log("DemoUIButton::initialize() ...");

		document.oncontextmenu = function(e) {
			e.preventDefault();
		};
		this.initSysModule();
	}

	private initSysModule(): void {
		let rt = new VoxRuntime();
		rt.initialize(
			(): void => {
				this.initUserInteract();
			},
			(): void => {
				this.initRenderer();
				this.init3DScene();
			},
			(): void => {
				this.initUIScene();
				this.initUIObjs();
			}
		);
	}
	private m_uiScene: IVoxUIScene = null;
	private initUIScene(): void {
		// let uisc = CoUI.createUIScene(); //new VoxUIScene();
		console.log("create the VoxUIScene instance...");
		let uisc = new VoxUIScene();
		uisc.texAtlasNearestFilter = true;
		this.m_uiScene = uisc;
		uisc.initialize(this.m_graph, 512);
		console.log("uisc: ", uisc);
		console.log("uisc.rscene: ", uisc.rscene);
	}
	private initUIObjs(): void {
		
		let uisc = this.m_uiScene;
		// let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		// let texLabelBtn = this.createTextLabelButton("b01","Color");
		let texLabelBtn = ButtonBuilder.createTextLabelButton(transparentTexAtlas, "b01","Color");
		this.m_uiScene.addEntity(texLabelBtn);
		let label = texLabelBtn.getLable() as IClipColorLabel;
		// label.setColors();
	}
	
	private applyColors(btn: IButton): void {
		
		let colorHexList0 = [0x4CAF50, 0x00AC6A, 0x6CCF70];
		let colorHexList1 = [0x5dbea3, 0x33b249, 0x5adbb5];
		let colorHexList = colorHexList1;
		
		let label = btn.getLable() as IClipColorLabel;
		label.setColorsWithHex(colorHexList);
	}

	private initUserInteract(): void {
		const mi = VoxUIInteraction.createMouseInteraction();
		mi.initialize(this.m_rscene, 0, true).setAutoRunning(true);
	}
	private initRenderer(): void {
		if (this.m_graph == null) {
			let RD = VoxRScene.RendererDevice;
			RD.SHADERCODE_TRACE_ENABLED = false;
			RD.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;

			let graph = (this.m_graph = VoxRScene.createRendererSceneGraph());
			let rparam = graph.createRendererSceneParam();
			rparam.setAttriAntialias(!RD.IsMobileWeb());
			rparam.setCamPosition(1000.0, 1000.0, 1000.0);
			rparam.setCamProject(45, 20.0, 9000.0);
			this.m_rscene = graph.createScene(rparam, 3);
			this.m_rscene.setClearUint24Color(0x222222);
			graph.setAutoRunning(true);
		}
	}

	private init3DScene(): void {
		let axis = VoxRScene.createAxis3DEntity();
		this.m_rscene.addEntity(axis);
	}
}

export default DemoUIButton;
