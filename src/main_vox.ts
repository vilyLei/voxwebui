(document as any).demoState = 1;
class VVF {
    isEnabled(): boolean {
        return true;
    }
}
let pwin: any = window;
pwin["VoxVerify"] = new VVF();

///////////////////////////////////////////////////////////////////////////
///////////////////////////////  ui  ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// import {DemoBase as Demo} from "./demo/DemoBase";
// import {DemoUIButton as Demo} from "./demo/DemoUIButton";
// import {DemoUIBase as Demo} from "./demo/DemoUIBase";
// import {DemoComp as Demo} from "./demo/DemoComp";
// import {DemoParamUI as Demo} from "./demo/DemoParamUI";
// import {DemoParamPanel as Demo} from "./demo/DemoParamPanel";
// import {DemoShaderMaterial as Demo} from "./demo/shaderExample/DemoShaderMaterial";
// import {DemoModelLoad as Demo} from "./demo/DemoModelLoad";

///////////////////////////////////////////////////////////////////////////
//////////////////////////  ui module usage  //////////////////////////////
///////////////////////////////////////////////////////////////////////////

// import {DemoBtnGroup as Demo} from "./demo/DemoBtnGroup";

///////////////////////////////////////////////////////////////////////////
///////////////////////////////  modelEdit  ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// import {DemoModelEditTrans as Demo} from "./modelEdit/demo/DemoModelEditTrans";
// import {DemoModelEditTrans2 as Demo} from "./modelEdit/demo/DemoModelEditTrans2";
// import {DemoModelEditTrans3 as Demo} from "./modelEdit/demo/DemoModelEditTrans3";
import {DemoModelEditTrans4 as Demo} from "./modelEdit/demo/DemoModelEditTrans4";


document.title = "Vox Web GPU UI";
let ins = new Demo() as any;
function main(): void {
    console.log("------ demo --- init ------");
    ins.initialize();
    if(ins.run) {
        function mainLoop(now: any): void {
            ins.run();
            window.requestAnimationFrame(mainLoop);
        }
        window.requestAnimationFrame(mainLoop);
    }
    console.log("------ demo --- running ------");
}
main();
