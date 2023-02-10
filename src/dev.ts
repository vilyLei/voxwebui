
import {DemoBase as Demo} from "./demo/DemoBase";

document.title = "Vox Web UI";
let demoIns: Demo = new Demo();
let ins: any = demoIns; function main(): void {
    console.log("------ demo --- init ------");
    demoIns.initialize();
    function mainLoop(now: any): void {
        demoIns.run();
        window.requestAnimationFrame(mainLoop);
    }
    window.requestAnimationFrame(mainLoop);
    console.log("------ demo --- running ------");
}
main();