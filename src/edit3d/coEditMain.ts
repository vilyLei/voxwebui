(document as any).demoState = 1;
class VVF {
    isEnabled(): boolean {
        return true;
    }
}
let pwin: any = window;
pwin["VoxVerify"] = new VVF();

import { DemoEditTrans as Demo } from "./demo/DemoEditTrans";

let demoIns = new Demo();
let ins: any = demoIns;
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
