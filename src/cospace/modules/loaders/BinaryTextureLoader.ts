import IRendererScene from "../../../vox/scene/IRendererScene";
import { IFloatCubeTexture } from "../../../vox/render/texture/IFloatCubeTexture";
import { HttpFileLoader } from "./HttpFileLoader";
import IRenderTexture from "../../../vox/render/texture/IRenderTexture";

interface I_BinaryTextureLoader {
    
}
class BinaryTextureLoader {

    protected m_rc: IRendererScene = null;
    texture: IRenderTexture = null;
    constructor(rc: IRendererScene = null) {
        this.m_rc = rc;
    }
    
    loadTextureWithUrl(url: string): void {
        this.texture = this.createTex();
        let loader = new HttpFileLoader();
        loader.load(
            url,
            (buffer: ArrayBuffer, uuid: string): void => {
                this.parseTextureBuffer(buffer);
                this.texture = null;
                this.m_rc = null;
            }
        )
    }
    protected createTex(): IRenderTexture {
        return this.m_rc.textureBlock.createFloatCubeTex(32,32);
    }
    protected parseTextureBuffer(buffer: ArrayBuffer): void {
        let begin = 0;
        let width = 128;
        let height = 128;
        let size = width * height * 3;
        let fs32 = new Float32Array(buffer);
        let subArr: Float32Array = null;
        let tex = this.texture as IFloatCubeTexture;
        tex.toRGBFormat();
        for (let i: number = 0, len: number = 6; i < len; ++i) {
            subArr = fs32.slice(begin, begin + size);
            console.log("width,height: ", width, height, ", subArr.length: ", subArr.length);
            tex.setDataFromBytesToFaceAt(i, subArr, width, height, 0);
            begin += size;
        }
    }
}

class SpecularEnvTextureLoader extends BinaryTextureLoader {

    constructor() {
        super();
    }
    
    protected parseTextureBuffer(buffer: ArrayBuffer): void {
        let begin = 0;
        let width = 128;
        let height = 128;

        let fs32 = new Float32Array(buffer);
        let subArr: Float32Array = null;

        let tex = this.texture as IFloatCubeTexture;
        tex.toRGBFormat();
        tex.mipmapEnabled = false;
        // tex.minFilter = TextureConst.LINEAR_MIPMAP_LINEAR;
        // tex.magFilter = TextureConst.LINEAR;
        
        for (let j = 0; j < 9; j++) {
            for (let i = 0; i < 6; i++) {
                const size = width * height * 3;
                subArr = fs32.slice(begin, begin + size);
                tex.setDataFromBytesToFaceAt(i, subArr, width, height, j);
                begin += size;
            }
            width >>= 1;
            height >>= 1;
        }
    }
}

export { BinaryTextureLoader, SpecularEnvTextureLoader };