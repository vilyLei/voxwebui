
// import {DemoBase as Demo} from "./demo/DemoBase";
// import {DemoUIBase as Demo} from "./demo/DemoUIBase";
// import {DemoComp as Demo} from "./demo/DemoComp";
import {DemoParamUI as Demo} from "./demo/DemoParamUI";

document.title = "Vox Web UI";
let ins = new Demo();
function main(): void {
    console.log("------ demo --- init ------");
    ins.initialize();
    function mainLoop(now: any): void {
        ins.run();
        window.requestAnimationFrame(mainLoop);
    }
    window.requestAnimationFrame(mainLoop);
    console.log("------ demo --- running ------");
}
main();