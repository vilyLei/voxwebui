import IRendererScene from "../vox/scene/IRendererScene";
import { IMouseInteraction } from "../cospace/voxengine/ui/IMouseInteraction";
import { IVoxUIScene } from "../voxui/scene/IVoxUIScene";
import { VoxUIScene } from "../voxui/scene/VoxUIScene";
import { Button } from "../voxui/button/Button";
import { ClipLabel } from "../voxui/entity/ClipLabel";
import { ClipColorLabel } from "../voxui/entity/ClipColorLabel";
import { ColorLabel } from "../voxui/entity/ColorLabel";
import VoxRuntime from "../common/VoxRuntime";
import { ColorClipLabel } from "../voxui/entity/ColorClipLabel";
import { VoxMath } from "../cospace/math/VoxMath";
import { ProgressDataEvent, SelectionEvent, VoxRScene } from "../cospace/voxengine/VoxRScene";
import { VoxUIInteraction } from "../cospace/voxengine/ui/VoxUIInteraction";
import { VoxMaterial } from "../cospace/voxmaterial/VoxMaterial";
import { SelectionEntity } from "../voxui/component/SelectionEntity";
import ISelectionEvent from "../vox/event/ISelectionEvent";
import { ProgressEntity } from "../voxui/component/ProgressEntity";
import IProgressDataEvent from "../vox/event/IProgressDataEvent";

export class DemoComp {

    private m_rscene: IRendererScene = null;
	private m_interact: IMouseInteraction = null;

    initialize(): void {
        console.log("DemoComp::initialize() ...");
        
		document.oncontextmenu = function (e) {
			e.preventDefault();
		}
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
		uisc.initialize(this.m_rscene, 1024);
		console.log("uisc: ", uisc);
		console.log("uisc.rscene: ", uisc.rscene);

		//this.testUIEntity(uisc);
	}
    private initUIObjs(): void {
        // this.testComp01();
        // this.testComp02();
        this.testComp03();
        // this.test01();
        // this.test02();
        // this.test03();
        // this.test04();
        // this.test05();
    }
    
	private testComp03(): void {
		let uisc = this.m_uiScene;
		
		let proBar = new ProgressEntity();
		proBar.setRange(20, 100);
		// proBar.initialize(uisc, "VVV-Progress");
		proBar.initialize(uisc, "颜色-A");
		proBar.setXY(100,100);
		this.m_uiScene.addEntity(proBar);

		proBar.addEventListener(ProgressDataEvent.PROGRESS, this, this.progressListener);

		// // let layouter = uisc.layout.createLeftTopLayouter();
		// let layouter = uisc.layout.createRightBottomLayouter();
		// layouter.addUIEntity(selectEntity);
		// uisc.layout.addLayouter(layouter);
		// uisc.updateLayout();
	}
	
	private progressListener(evt: IProgressDataEvent): void {
		// console.log("progressListener(), evt.uuid: ", evt.uuid);
		console.log("progressListener(), evt.progress: ", evt.progress);
		console.log("progressListener(), evt.value: ", evt.value, "status: ", evt.status);
		// console.log("progressListener(), evt.currentTarget: ", evt.currentTarget);
	}
	private testComp02(): void {
		let uisc = this.m_uiScene;
		let selectEntity = new SelectionEntity();
		selectEntity.initialize(uisc,"VVVSelect");
		
		let ipx = uisc.getRect().getRight() - 300;
		// console.log("XXXXX ipx: ", ipx);
		selectEntity.setXY(ipx, 70);
		// selectEntity.update();
		this.m_uiScene.addEntity(selectEntity);

		selectEntity.addEventListener(SelectionEvent.SELECT, this, this.selectListener);

		// let layouter = uisc.layout.createLeftTopLayouter();
		let layouter = uisc.layout.createRightBottomLayouter();
		layouter.addUIEntity(selectEntity);
		uisc.layout.addLayouter(layouter);
		uisc.updateLayout();
	}
	private selectListener(evt: ISelectionEvent): void {
		console.log("selectListener(), evt.uuid: ", evt.uuid);
		console.log("selectListener(), evt.flag: ", evt.flag);
		console.log("selectListener(), evt.currentTarget: ", evt.currentTarget);
	}
	private testComp01(): void {
		console.log("testComp01()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		
		///*
		// let colorLabel = new ColorLabel();
		// colorLabel.initialize(200, 130);
		// colorLabel.setXY(330, 400);
		// this.m_uiScene.addEntity(colorLabel, 1);

		let pw = 90;
		let ph = 50;
		let colorClipLabel2 = new ClipColorLabel();
		colorClipLabel2.initializeWithoutTex(pw, ph, 4);
		// let colorClipLabel2 = new ColorClipLabel();
		// colorClipLabel2.initialize(csLable2, 4);
		// colorClipLabel2.getColorAt(0).setRGB3f(0.0, 0.8, 0.8);
		colorClipLabel2.getColorAt(0).setRGB3Bytes(40, 40, 40);
		colorClipLabel2.getColorAt(1).setRGB3f(0.2, 1.0, 0.2);
		colorClipLabel2.getColorAt(2).setRGB3f(0.2, 0.4, 1.0);
		colorClipLabel2.getColorAt(3).setRGB3f(0.2, 1.0, 0.2);
		// colorClipLabel2.setLabelClipIndex( 1 );
		// colorClipLabel.setXY(200,0);
		// colorClipLabel.setClipIndex(2);
		// this.m_uiScene.addEntity(colorClipLabel);
		// let colorBtn = CoUI.createButton(); //new Button();

		let fontColor = VoxMaterial.createColor4(1, 0, 0, 1);
		let bgColor = VoxMaterial.createColor4(1, 1, 1, 0);
		console.log("create file label...");
		urls = ["File", "Global", "Size", "BBB-3"];
		for(let i = 0; i < urls.length; ++i) {
			img = tta.createCharsCanvasFixSize(pw, ph, urls[i], 30, fontColor, bgColor);
			tta.addImageToAtlas(urls[i], img);
		}

		let iconLable = new ClipLabel();
		iconLable.transparent = true;
		iconLable.premultiplyAlpha = true;
		iconLable.initialize(tta, [urls[1], urls[2]]);
		iconLable.setClipIndex(1);
		// iconLable.setXY(500, 70);
		// iconLable.setScaleXY(1.5, 1.5);
		// iconLable.update();
		// this.m_uiScene.addEntity(iconLable);
        
		let colorBtn2 = new Button();
		colorBtn2.syncLabelClip = false;
		colorBtn2.addLabel(iconLable);
		colorBtn2.initializeWithLable(colorClipLabel2);
		// colorBtn2.setXY(500, 600);
		let ipx = uisc.getRect().getRight() - 100;
		// console.log("XXXXX ipx: ", ipx);
		colorBtn2.setXY(ipx, 70);
		colorBtn2.update();
		this.m_uiScene.addEntity(colorBtn2, 0);
		
		// let layouter = uisc.layout.createLeftTopLayouter();
		let layouter = uisc.layout.createRightBottomLayouter();
		layouter.addUIEntity(colorBtn2);
		uisc.layout.addLayouter(layouter);
		uisc.updateLayout();
		//*/
	}
	private test01(): void {
		console.log("test01()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		///*
		let fontColor = VoxMaterial.createColor4(0,1,0,1);
		let bgColor = VoxMaterial.createColor4(1,1,1,0);
		urls = ["BBB-0", "BBB-1", "BBB-2", "BBB-3"];
		img = tta.createCharsCanvasFixSize(90, 40, urls[0], 30, fontColor,bgColor);
		tta.addImageToAtlas(urls[0], img);
		img = tta.createCharsCanvasFixSize(90, 40, urls[1], 30, fontColor,bgColor);
		tta.addImageToAtlas(urls[1], img);
		
		let iconLable = new ClipLabel();
		iconLable.transparent = true;
		iconLable.premultiplyAlpha = true;
		iconLable.initialize(tta, [urls[1]]);
		iconLable.setClipIndex(1);
		iconLable.setXY(500, 70);
		// iconLable.setScaleXY(1.5, 1.5);
		// iconLable.update();
		this.m_uiScene.addEntity(iconLable);
		//*/
	}
	
	private test02(): void {
		console.log("test02()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		
		///*
		// let colorLabel = new ColorLabel();
		// colorLabel.initialize(200, 130);
		// colorLabel.setXY(330, 400);
		// this.m_uiScene.addEntity(colorLabel, 1);

		let pw = 60;
		let ph = 30;
		let colorClipLabel2 = new ClipColorLabel();
		colorClipLabel2.initializeWithoutTex(pw, ph, 4);
		// let colorClipLabel2 = new ColorClipLabel();
		// colorClipLabel2.initialize(csLable2, 4);
		// colorClipLabel2.getColorAt(0).setRGB3f(0.0, 0.8, 0.8);
		colorClipLabel2.getColorAt(0).setRGB3Bytes(40, 40, 40);
		colorClipLabel2.getColorAt(1).setRGB3f(0.2, 1.0, 0.2);
		colorClipLabel2.getColorAt(2).setRGB3f(1.0, 0.2, 1.0);
		// colorClipLabel2.setLabelClipIndex( 1 );
		// colorClipLabel.setXY(200,0);
		// colorClipLabel.setClipIndex(2);
		// this.m_uiScene.addEntity(colorClipLabel);
		// let colorBtn = CoUI.createButton(); //new Button();

		let fontColor = VoxMaterial.createColor4(1, 1, 1, 1);
		let bgColor = VoxMaterial.createColor4(1, 1, 1, 0);
		console.log("create file label...");
		urls = ["File", "Global", "Color", "BBB-3"];
		img = tta.createCharsCanvasFixSize(pw, ph, urls[0], 20, fontColor, bgColor);
		tta.addImageToAtlas(urls[0], img);
		img = tta.createCharsCanvasFixSize(pw, ph, urls[1], 20, fontColor, bgColor);
		tta.addImageToAtlas(urls[1], img);

		let iconLable = new ClipLabel();
		iconLable.transparent = true;
		iconLable.premultiplyAlpha = true;
		iconLable.initialize(tta, [urls[1]]);
		// iconLable.setClipIndex(1);
		// iconLable.setXY(500, 70);
		// iconLable.setScaleXY(1.5, 1.5);
		// iconLable.update();
		// this.m_uiScene.addEntity(iconLable);
        
		let colorBtn2 = new Button();
		colorBtn2.addLabel(iconLable);
		colorBtn2.initializeWithLable(colorClipLabel2);
		colorBtn2.setXY(500, 600);
		this.m_uiScene.addEntity(colorBtn2, 0);

		let layouter = uisc.layout.createLeftTopLayouter();
		layouter.addUIEntity(colorBtn2);
		//*/
	}
	private test03(): void {
		console.log("test03()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		
		///*
		let canvas = texAtlas.createCharsCanvasFixSize(100, 40, "ABC", 30);
		document.body.appendChild(canvas);
		// canvas = texAtlas.createCharsCanvasFixSize(100, 40, "ABCD", 30);
		// canvas.style.top = "40px";
		// document.body.appendChild(canvas);

		texAtlas.addImageToAtlas("ABC", canvas);
		let clipColorLabel = new ClipColorLabel();
		// clipColorLabel.initialize(texAtlas, "ABC", 4);
		clipColorLabel.initializeWithoutTex(50, 32, 4);
		clipColorLabel.getColorAt(0).setRGB3f(0.0, 0.8, 0.8);
		clipColorLabel.getColorAt(1).setRGB3f(0.2, 1.0, 0.2);
		clipColorLabel.getColorAt(2).setRGB3f(1.0, 0.2, 1.0);
		// this.m_uiScene.addEntity(clipColorLabel);
		// clipColorLabel.setClipIndex(0);
		let btn01 = new Button;
		btn01.initializeWithLable(clipColorLabel);
		this.m_uiScene.addEntity(btn01);
	}
	
	private test04(): void {
		console.log("test04()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		
		let pw = 32;
		let ph = 32;
		let borderWidth = 4;
		let borderColor = VoxMaterial.createColor4(0.7, 0.7, 0.7);
		let bgColor = VoxMaterial.createColor4(0.3, 0.3, 0.3);
		let canvas = texAtlas.createCanvas(pw, ph, borderColor, false);
		let ctx2D = canvas.getContext("2d");
		ctx2D.fillStyle = bgColor.getCSSDecRGBAColor();
		ctx2D.fillRect(borderWidth, borderWidth, pw - 2 * borderWidth, ph - 2 * borderWidth);
		document.body.append(canvas);
		texAtlas.addImageToAtlas("selectR_01", canvas);
	}
	private test05(): void {
		console.log("test05()................");

		let uisc = this.m_uiScene;
		let texAtlas = uisc.texAtlas;
		let transparentTexAtlas = uisc.transparentTexAtlas;
		let urls: string[];
		let img: HTMLCanvasElement;

		let ta = texAtlas;
		let tta = transparentTexAtlas;
		
		///*
		urls = ["AAA-0", "AAA-1", "AAA-2", "AAA-3"];
		img = texAtlas.createCharsCanvasFixSize(90, 40, urls[0], 30);
		texAtlas.addImageToAtlas(urls[0], img);
		img = texAtlas.createCharsCanvasFixSize(90, 40, urls[1], 30);
		texAtlas.addImageToAtlas(urls[1], img);
		img = texAtlas.createCharsCanvasFixSize(90, 40, urls[2], 30);
		texAtlas.addImageToAtlas(urls[2], img);
		img = texAtlas.createCharsCanvasFixSize(90, 40, urls[3], 30);
		texAtlas.addImageToAtlas(urls[3], img);
		
		// let lable = CoUI.createClipLabel();
		let lable = new ClipLabel();
		lable.initialize(texAtlas, urls);
		lable.setClipIndex(1);
		lable.setXY(50, 600);
		this.m_uiScene.addEntity(lable);
		lable.setColor(VoxMaterial.createColor4(0.1, 1.0, 0.4));
		let layouter = uisc.layout.createLeftTopLayouter();
		layouter.addUIEntity(lable);
		
		// lable = new ClipLabel();
		// lable.initialize(texAtlas, urls);
		// lable.setClipIndex(1);
		// lable.setXY(850, 600);
		// this.m_uiScene.addEntity(lable);
		// lable.setColor(VoxMaterial.createColor4(0.1, 1.0, 0.4));
		// layouter = uisc.layout.createRightTopLayouter();
		// layouter.addUIEntity(lable);
		// //createRightBottomLayouter
		// lable = new ClipLabel();
		// lable.initialize(texAtlas, urls);
		// lable.setClipIndex(1);
		// lable.setXY(600, 100);
		// this.m_uiScene.addEntity(lable);
		// lable.setColor(VoxMaterial.createColor4(0.1, 1.0, 0.4));
		// layouter = uisc.layout.createRightBottomLayouter();
		// layouter.addUIEntity(lable);
		// //return;

		// // let lable01 = CoUI.createClipLabel();
		// let lable01 = new ClipLabel();
		// lable01.initializeWithLable(lable);
		// lable01.setClipIndex(1);
		// lable01.setXY(200, 200);
		// this.m_uiScene.addEntity(lable01);

		let btnUrls = [urls[0], urls[1], urls[2], urls[1]];
		btnUrls = urls;
		// let btn = CoUI.createButton(); //new Button();
		let btn = new Button();
		btn.initialize(texAtlas, btnUrls);
		btn.setXY(50,0);
		// btn.initializeWithLable(lable01);
		this.m_uiScene.addEntity(btn);
		//*/
		///*
		let csLable = new ClipLabel();
		csLable.initialize(texAtlas, urls);

		let colorClipLabel = new ColorClipLabel();
		colorClipLabel.initialize(csLable, 4);
		colorClipLabel.getColorAt(0).setRGB3f(0.0, 0.8, 0.8);
		colorClipLabel.getColorAt(1).setRGB3f(0.2, 1.0, 0.2);
		colorClipLabel.getColorAt(2).setRGB3f(1.0, 0.2, 1.0);
		colorClipLabel.setLabelClipIndex( 1 );
		// colorClipLabel.setXY(200,0);
		// colorClipLabel.setClipIndex(2);
		// this.m_uiScene.addEntity(colorClipLabel);
		// let colorBtn = CoUI.createButton(); //new Button();

		let colorBtn = new Button();
		colorBtn.initializeWithLable(colorClipLabel);
		colorBtn.setXY(200,0);
		this.m_uiScene.addEntity(colorBtn);

		// let csLable2 = new ClipLabel();
		// csLable2.initialize(texAtlas, urls);
		//*/
	}
	private initUserInteract(): void {

		let r = this.m_rscene;
		if (r != null && this.m_interact == null && typeof VoxUIInteraction !== "undefined") {

			this.m_interact = VoxUIInteraction.createMouseInteraction();
			this.m_interact.initialize(this.m_rscene, 0, true);
			this.m_interact.setSyncLookAtEnabled(true);            
		}
	}
	private initRenderer(): void {
		if (this.m_rscene == null) {
			
			let RD = VoxRScene.RendererDevice;
			RD.SHADERCODE_TRACE_ENABLED = false;
			RD.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true;
			RD.SetWebBodyColor("#888888");

			let rparam = VoxRScene.createRendererSceneParam();
			rparam.setAttriAntialias(!RD.IsMobileWeb());
			rparam.setCamPosition(1000.0, 1000.0, 1000.0);
			rparam.setCamProject(45, 20.0, 9000.0);
			this.m_rscene = VoxRScene.createRendererScene(rparam, 3);
			this.m_rscene.setClearUint24Color(0x888888);
		}
	}
    
	private init3DScene(): void {
        let axis = VoxRScene.createAxis3DEntity();
		this.m_rscene.addEntity(axis);
	}
    run(): void {
        if (this.m_rscene != null) {
			if (this.m_interact != null) {
				this.m_interact.setLookAtPosition(null);
				this.m_interact.run();
			}
			this.m_rscene.run();
			if (this.m_uiScene != null) {
				this.m_uiScene.run();
			}
		}
    }
}

export default DemoComp;