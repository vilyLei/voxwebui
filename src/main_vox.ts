
// import {DemoBase as Demo} from "./demo/DemoBase";
import {DemoUIButton as Demo} from "./demo/DemoUIButton";
// import {DemoUIBase as Demo} from "./demo/DemoUIBase";
// import {DemoComp as Demo} from "./demo/DemoComp";
// import {DemoParamUI as Demo} from "./demo/DemoParamUI";
// import {DemoParamPanel as Demo} from "./demo/DemoParamPanel";
// import {DemoShaderMaterial as Demo} from "./demo/shaderExample/DemoShaderMaterial";

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