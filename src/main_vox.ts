(document as any).demoState = 1;
class VVF {
    isEnabled(): boolean {
        return true;
    }
}
let pwin: any = window;
pwin["VoxVerify"] = new VVF();

// import {DemoBase as Demo} from "./demo/DemoBase";
// import {DemoUIButton as Demo} from "./demo/DemoUIButton";
// import {DemoUIBase as Demo} from "./demo/DemoUIBase";
// import {DemoComp as Demo} from "./demo/DemoComp";
// import {DemoParamUI as Demo} from "./demo/DemoParamUI";
// import {DemoParamPanel as Demo} from "./demo/DemoParamPanel";
// import {DemoShaderMaterial as Demo} from "./demo/shaderExample/DemoShaderMaterial";
///////////////////////////////////////////////////////////////////////////
///////////////////////////////  edit  ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
import {DemoEditTrans as Demo} from "./edit3d/demo/DemoEditTrans";


document.title = "Vox Web UI";
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
