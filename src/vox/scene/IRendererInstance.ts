/***************************************************************************/
/*                                                                         */
/*  Copyright 2018-2022 by                                                 */
/*  Vily(vily313@126.com)                                                  */
/*                                                                         */
/***************************************************************************/

import IRenderStage3D from "../../vox/render/IRenderStage3D";
import { IRenderCamera } from '../render/IRenderCamera';
import IRenderProxy from "../../vox/render/IRenderProxy";

import { IShaderProgramBuilder } from "../../vox/material/IShaderProgramBuilder";
import IRenderMaterial from "../../vox/render/IRenderMaterial";
import IRODataBuilder from "../../vox/render/IRODataBuilder";
import IRenderEntity from "../../vox/render/IRenderEntity";
import IRendererParam from "../../vox/scene/IRendererParam";
import IRenderProcess from "../../vox/render/IRenderProcess";
import {IRendererInstanceContext} from "../../vox/scene/IRendererInstanceContext";
import IRenderer from "../../vox/scene/IRenderer";

/**
 * kernal system instance, it is the renderer instance for the renderer runtime, it is very very very important class.
 */
export interface IRendererInstance extends IRenderer {

    __$setStage3D(stage3D: IRenderStage3D): void;
    getUid(): number;
    /**
     * @returns return renderer context unique id
     */
    getRCUid(): number;
    getRendererContext(): IRendererInstanceContext;
    getRenderProxy(): IRenderProxy
    getStage3D(): IRenderStage3D
    getViewX(): number;
    getViewY(): number;
    getViewWidth(): number;
    getViewHeight(): number;

    getCamera(): IRenderCamera;
    createCamera(): IRenderCamera;
    useCamera(camera: IRenderCamera, syncCamView?: boolean): void;
    useMainCamera(): void;

    updateCamera(): void;
    initialize(param: IRendererParam, camera?: IRenderCamera, shdProgramBuider?: IShaderProgramBuilder): void;
    /**
     * ?????????????????????????????????????????????(?????????)
     */
    getRendererStatus(): number;
    /**
     * update all data or status of the renderer runtime
     * should call this function per frame
     */
    update(): void;
    updateAllProcess(): void;
    updateProcessAt(processIndex: number): void;
    setEntityManaListener(listener: any): void;
    /**
     * add an entity to the renderer process of the renderer instance
     * @param entity IRenderEntity instance(for example: DisplayEntity class instance)
     * @param processIndex this destination renderer process index of the m_processes array.
     * @param deferred if the value is true,the entity will not to be immediately add to the renderer process by its id
     */
    addEntity(entity: IRenderEntity, processIndex?: number, deferred?: boolean): void;
    addEntityToProcess(entity: IRenderEntity, process: IRenderProcess, deferred?: boolean): void;
    /**
     * ?????????????????????????????????entity??????????????? process uid ??? render process ??????
     * move rendering runtime displayEntity to different renderer process
     */
    moveEntityToProcessAt(entity: IRenderEntity, dstProcessIndex: number): void;
    moveEntityToProcess(entity: IRenderEntity, dstProcess: IRenderProcess): void;
    /**
     * remove entity from the renderer instance
     * @param entity IRenderEntity instance
     */
    removeEntity(entity: IRenderEntity): void;
    /**
     * remove entity from the renderer process
     * @param IRenderEntity IRenderEntity instance
     * @param process RenderProcess instance
     */
    removeEntityFromProcess(entity: IRenderEntity, process: IRenderProcess): void;
    /**
     * remove entity from the renderer process by process index
     * @param IRenderEntity IRenderEntity instance
     * @param processIndex RenderProcess instance index in renderer instance
     */
    removeEntityByProcessIndex(entity: IRenderEntity, processIndex: number): void;
    setProcessSortEnabledAt(processIndex: number, sortEnabled: boolean): void;
    setProcessSortEnabled(process: IRenderProcess, sortEnabled: boolean): void;
    /**
     * get the renderer process by process index
     * @param processIndex IRenderProcess instance index in renderer instance
     */
    getRenderProcessAt(processIndex: number): IRenderProcess;
    /**
     * append a new renderer process instance
     * @param batchEnabled batch renderer runtime resource data
     * @param processFixedState the process is fix renderer state
     * @returns
     */
    appendProcess(batchEnabled?: boolean, processFixedState?: boolean): IRenderProcess;
    /**
     * append a independent new renderer process instance, and separate the renderer process from the renderer rendering control
     * @param batchEnabled batch renderer runtime resource data
     * @param processFixedState the process is fix renderer state
     */
    createSeparatedProcess(batchEnabled?: boolean, processFixedState?: boolean): IRenderProcess;
    setRendererProcessParam(index: number, batchEnabled: boolean, processFixedState: boolean): void;
    getProcessAt(index: number): IRenderProcess;
    showInfoAt(index: number): void;
    getProcessesTotal(): number;
    updateMaterialUniformToCurrentShd(material: IRenderMaterial): void;
    /**
     * Deprecated(??????, ???????????????)
     * ?????????????????????????????????????????????????????????????????????entity
     * ?????????Material???????????????????????????,????????????,?????????????????????????????????????????????????????????
     */
    drawEntityByLockMaterial(entity: IRenderEntity, useGlobalUniform?: boolean, forceUpdateUniform?: boolean): void;
    /**
     * ???????????????????????????????????? entity,?????????????????????????????????
     */
    drawEntity(entity: IRenderEntity, useGlobalUniform?: boolean, forceUpdateUniform?: boolean): void;
    /**
     * run the specific renderer process by its index in the renderer instance
     * @param index the renderer process index in the renderer instance
     */
    runAt(index: number): void;
    runProcess(process: IRenderProcess): void;
    runFromIndexTo(index: number): void;
    /**
     * run all renderer processes in the renderer instance
     */
    run(): void;
    getRenderUnitsTotal(): number;
    renderflush(): void;
    getDataBuilder(): IRODataBuilder;
}

export default IRendererInstance;
