import { FloorLineGrid } from "./entity/FloorLineGrid";
import { UserEditEvent } from "./event/UserEditEvent";
import { CoTransformRecorder } from "./recorde/CoTransformRecorder";
import { TransformController } from "./transform/TransformController";;
import { UIRectLine } from "./entity/UIRectLine";
import { RectFrameQuery } from "./entity/RectFrameQuery";

function createTransformRecorder(): CoTransformRecorder {
	return new CoTransformRecorder();
}
function createTransformController(): TransformController {
	return new TransformController();
}
function createFloorLineGrid(): FloorLineGrid {
	return new FloorLineGrid();
}
function createUIRectLine(): UIRectLine {
	return new UIRectLine();
}
function createRectFrameQuery(): RectFrameQuery {
	return new RectFrameQuery();
}

export {
	UserEditEvent,
	createTransformRecorder,
	createTransformController,
	createFloorLineGrid,
	createUIRectLine,
	createRectFrameQuery
}
