module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "030e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/
// renderer context Extensions

class RCExtension {
  static Initialize(webVer, gl) {
    let selfT = this;

    if (webVer == 1) {
      //#extension OES_standard_derivatives : enable
      selfT.OES_standard_derivatives = gl.getExtension('OES_standard_derivatives');
      if (selfT.OES_standard_derivatives != null) console.log("Use OES_standard_derivatives Extension success!");else console.log("OES_standard_derivatives Extension can not support!"); //#extension GL_EXT_shader_texture_lod : enable, for example: textureCubeLodEXT(envMap, dir, mipLv)
      // vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
      // vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
      // vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
      // vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
      // vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
      // vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
      // vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)
      // vec4 textureCubeGradEXT(samplerCube sampler, vec3 P, vec3 dPdx, vec3 dPdy)

      selfT.EXT_shader_texture_lod = gl.getExtension('EXT_shader_texture_lod');
      if (selfT.EXT_shader_texture_lod != null) console.log("Use EXT_shader_texture_lod Extension success!");else console.log("EXT_shader_texture_lod Extension can not support!");
      /*
      <script type="x-shader/x-fragment">
      #extension GL_EXT_shader_texture_lod : enable
      #extension GL_OES_standard_derivatives : enable
      
      uniform sampler2D myTexture;
      varying vec2 texcoord;
      
      void main(){
        gl_FragColor = texture2DGradEXT(myTexture, mod(texcoord, vec2(0.1, 0.5)),
                                        dFdx(texcoord), dFdy(texcoord));
      }
      </script>
      */

      selfT.WEBGL_draw_buffers = gl.getExtension('WEBGL_draw_buffers');
      if (selfT.WEBGL_draw_buffers != null) console.log("Use WEBGL_draw_buffers Extension success!");else console.log("WEBGL_draw_buffers Extension can not support!"); //DivLog.ShowLog("selfT.WEBGL_draw_buffers != null: "+(selfT.WEBGL_draw_buffers != null));

      selfT.OES_vertex_array_object = gl.getExtension('OES_vertex_array_object');
      if (selfT.OES_vertex_array_object != null) console.log("Use OES_vertex_array_object Extension success!");else console.log("OES_vertex_array_object Extension can not support!");
      selfT.ANGLE_instanced_arrays = gl.getExtension('ANGLE_instanced_arrays');
      if (selfT.ANGLE_instanced_arrays != null) console.log("Use ANGLE_instanced_arrays Extension success!");else console.log("ANGLE_instanced_arrays Extension can not support!");
      selfT.EXT_color_buffer_float = gl.getExtension('EXT_color_buffer_float');
      if (selfT.EXT_color_buffer_float != null) console.log("Use EXT_color_buffer_float Extension success!");else console.log("EXT_color_buffer_float Extension can not support!");
      selfT.EXT_color_buffer_half_float = gl.getExtension('EXT_color_buffer_half_float');
      if (selfT.EXT_color_buffer_half_float != null) console.log("Use EXT_color_buffer_half_float Extension success!");else console.log("EXT_color_buffer_half_float Extension can not support!");
      selfT.OES_texture_half_float = gl.getExtension('OES_texture_half_float');
      if (selfT.OES_texture_half_float != null) console.log("Use OES_texture_half_float Extension success!");else console.log("OES_texture_half_float Extension can not support!");
      selfT.OES_texture_half_float_linear = gl.getExtension('OES_texture_half_float_linear');
      if (selfT.OES_texture_half_float_linear != null) console.log("Use OES_texture_half_float_linear Extension success!");else console.log("OES_texture_half_float_linear Extension can not support!");
      selfT.OES_texture_float = gl.getExtension('OES_texture_float');
      if (selfT.OES_texture_float != null) console.log("Use OES_texture_float Extension success!");else console.log("OES_texture_float Extension can not support!"); //

      selfT.OES_element_index_uint = gl.getExtension('OES_element_index_uint');
      if (selfT.OES_element_index_uint != null) console.log("Use OES_element_index_uint Extension success!");else console.log("OES_element_index_uint Extension can not support!"); //EXT_blend_minmax

      selfT.EXT_blend_minmax = gl.getExtension('EXT_blend_minmax');
      if (selfT.EXT_blend_minmax != null) console.log("Use EXT_blend_minmax Extension success!");else console.log("EXT_blend_minmax Extension can not support!");
    } else {
      //  selfT.OES_standard_derivatives = gl.getExtension('OES_standard_derivatives');
      //  if(selfT.OES_standard_derivatives != null)
      //  console.log("Use OES_standard_derivatives Extension success!");
      //  else
      //  console.log("OES_standard_derivatives Extension can not support!");
      selfT.EXT_shader_texture_lod = gl.getExtension('EXT_shader_texture_lod');
      if (selfT.EXT_shader_texture_lod != null) console.log("Use EXT_shader_texture_lod Extension success!");else console.log("EXT_shader_texture_lod Extension can not support!");
      selfT.EXT_color_buffer_half_float = gl.getExtension('EXT_color_buffer_half_float');
      if (selfT.EXT_color_buffer_half_float != null) console.log("Use EXT_color_buffer_half_float Extension success!");else console.log("EXT_color_buffer_half_float Extension can not support!");
      selfT.OES_texture_half_float_linear = gl.getExtension('OES_texture_half_float_linear');
      if (selfT.OES_texture_half_float_linear != null) console.log("Use OES_texture_half_float_linear Extension success!");else console.log("OES_texture_half_float_linear Extension can not support!");
      selfT.EXT_color_buffer_float = gl.getExtension('EXT_color_buffer_float');
      if (selfT.EXT_color_buffer_float != null) console.log("Use EXT_color_buffer_float Extension success!");else console.log("EXT_color_buffer_float Extension can not support!");
    }

    selfT.OES_texture_float_linear = gl.getExtension('OES_texture_float_linear');
    if (selfT.OES_texture_float_linear != null) console.log("Use OES_texture_float_linear Extension success!");else console.log("OES_texture_float_linear Extension can not support!");
    selfT.WEBGL_depth_texture = gl.getExtension('WEBGL_depth_texture');
    if (selfT.WEBGL_depth_texture != null) console.log("Use WEBGL_depth_texture Extension success!");else console.log("WEBGL_depth_texture Extension can not support!");
    selfT.WEBGL_debug_renderer_info = gl.getExtension('WEBGL_debug_renderer_info');
    if (selfT.WEBGL_debug_renderer_info != null) console.log("Use WEBGL_debug_renderer_info Extension success!");else console.log("WEBGL_debug_renderer_info Extension can not support!"); //
    //console.log("RCExtension.WEBGL_depth_texture: ",RCExtension.WEBGL_depth_texture);
  }

}

RCExtension.OES_standard_derivatives = null;
RCExtension.EXT_shader_texture_lod = null;
RCExtension.WEBGL_draw_buffers = null;
RCExtension.OES_vertex_array_object = null;
RCExtension.ANGLE_instanced_arrays = null;
RCExtension.EXT_color_buffer_float = null;
RCExtension.EXT_color_buffer_half_float = null;
RCExtension.OES_texture_float_linear = null;
RCExtension.OES_texture_half_float_linear = null;
RCExtension.OES_texture_half_float = null;
RCExtension.OES_texture_float = null;
RCExtension.OES_element_index_uint = null;
RCExtension.EXT_blend_minmax = null;
RCExtension.WEBGL_depth_texture = null;
RCExtension.WEBGL_debug_renderer_info = null;
exports.default = RCExtension;

/***/ }),

/***/ "0714":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 材质功能组装流水线, 组装符合一个流水线系统设定的材质, 最终形成完整的shader, 以及对应的数据输入
 * 每个流水线是由若干pipe组成的， 每一个 pipe 都有自己的组装能力
 * 组装功能举例: 全局的光照环境shader及数据, 灯光组shader及数据， 雾shader及数据, 等等
 * material pipeline 输出 的控制码，也能控制渲染流程, 也就是 material pipelie 也能配合 render pipeline 一起协作完成渲染过程
 */

class MaterialPipeline {
  constructor(shaderLib = null) {
    this.m_uid = MaterialPipeline.s_uid++;
    this.m_shaderCode = null;
    this.m_shaderCodeFlag = false;
    this.m_pipeMap = new Map();
    this.m_keys = [];
    this.m_sharedUniforms = null;
    this.m_shaderLib = null;
    this.m_pipetypes = null;
    this.m_appendKeyStr = "";
    this.uuid = "";
    this.m_shaderLib = shaderLib;
  }

  getUid() {
    return this.m_uid;
  }
  /**
   * @param shaderCodeUUID IShaderCodeObject instance uuid
   * @param force default value is false
   */


  addShaderCodeWithUUID(shaderCodeUUID, force) {
    if (this.m_shaderLib != null) {
      this.addShaderCode(this.m_shaderLib.getShaderCodeObjectWithUUID(shaderCodeUUID), force);
    }
  }

  addShaderCode(shaderCode, force = false) {
    this.m_shaderCodeFlag = shaderCode != null;

    if (this.m_shaderCode == null || shaderCode != null && force) {
      this.m_shaderCode = shaderCode;
    }
  }

  hasShaderCode() {
    return this.m_shaderCode != null;
  }

  addPipe(pipe) {
    let types = pipe.getPipeTypes(); //console.log("#### MaterialPipeline, types: ",types);

    for (let i = 0; i < types.length; ++i) {
      if (!this.m_pipeMap.has(types[i])) {
        this.m_pipeMap.set(types[i], pipe);
      }
    }
  }

  getPipeByType(type) {
    return this.m_pipeMap.get(type);
  }

  hasPipeByType(type) {
    return this.m_pipeMap.has(type);
  }

  createKeys(pipetypes) {
    //console.log("#### MaterialPipeline::createKeys(), pipetypes: ",pipetypes);
    this.m_keys = [];

    if (pipetypes != null) {
      let pipe;
      let type;
      let types = pipetypes;

      for (let i = 0; i < types.length; ++i) {
        type = types[i];

        if (this.m_pipeMap.has(type)) {
          pipe = this.m_pipeMap.get(type);
          this.m_keys.push(pipe.getPipeKey(type));
        }
      }
    }
  }

  buildSharedUniforms(pipetypes) {
    this.m_sharedUniforms = [];
    this.m_pipetypes = pipetypes;

    if (pipetypes != null) {
      let pipe;
      let type;
      let types = pipetypes;

      for (let i = 0; i < types.length; ++i) {
        type = types[i];

        if (this.m_pipeMap.has(type)) {
          pipe = this.m_pipeMap.get(type);
          pipe.resetPipe();
          this.m_sharedUniforms.push(pipe.getGlobalUinform());
        }
      }
    }
  }

  build(shaderBuilder) {
    // console.log("#### MaterialPipeline::build(), pipetypes: ",pipetypes,", this.m_shaderCode != null: ",this.m_shaderCode != null);
    if (this.m_shaderCodeFlag && this.m_shaderCode != null) {
      shaderBuilder.addShaderObject(this.m_shaderCode);
    }

    if (this.m_pipetypes != null) {
      let pipe;
      let type;
      let types = this.m_pipetypes;

      for (let i = 0; i < types.length; ++i) {
        type = types[i];

        if (this.m_pipeMap.has(type)) {
          pipe = this.m_pipeMap.get(type);
          pipe.useShaderPipe(shaderBuilder, type);
        }
      }
    }
  }

  getTextures(shaderBuilder, outList, pipetypes) {
    if (pipetypes != null) {
      let pipe;
      let type;
      let types = pipetypes;

      for (let i = 0; i < types.length; ++i) {
        type = types[i];

        if (this.m_pipeMap.has(type)) {
          pipe = this.m_pipeMap.get(type);
          pipe.getTextures(shaderBuilder, outList, type);
        }
      }
    }
  }

  getSharedUniforms() {
    return this.m_sharedUniforms;
  }

  getSelfUniformData() {
    return null;
  }

  appendKeyString(key) {
    this.m_appendKeyStr += key;
  }

  getKeys() {
    return this.m_keys;
  }

  getKeysString() {
    let str = "";

    for (let i = 0; i < this.m_keys.length; ++i) {
      str += this.m_keys[i];
    }

    return str + this.m_appendKeyStr;
  }

  reset() {
    //this.m_texList = null;
    this.m_appendKeyStr = "";
    this.m_shaderCodeFlag = false;
  }

  clear() {
    this.m_pipeMap = new Map();
    this.m_keys = [];
    this.m_sharedUniforms = null;
    this.m_shaderCode = null;
    this.m_shaderLib = null;
    this.m_pipetypes = null;
  }

}

MaterialPipeline.s_uid = 0;
exports.MaterialPipeline = MaterialPipeline;

/***/ }),

/***/ "0851":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TextureTarget_1 = __importDefault(__webpack_require__("5deb"));

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const TextureResSlot_1 = __importDefault(__webpack_require__("da6a"));
/**
 * Texture cpu memory data object
 */


class TextureProxy {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    this.m_uid = -1; // 自身的引用计数器

    this.m_attachCount = 0;
    this.m_renderProxy = null;
    this.m_slot = null;
    this.m_miplevel = -1;
    this.m_texWidth = 128;
    this.m_texHeight = 128;
    this.m_texBufW = 128;
    this.m_texBufH = 128;
    this.m_texTarget = TextureTarget_1.default.TEXTURE_2D; // The fragment processor texture sampler type.

    this.m_sampler = -1; // have render useable data

    this.m_haveRData = false;
    this.m_type = TextureProxyType_1.TextureProxyType.Default;
    this.m_generateMipmap = true;
    this.name = "TextureProxy";
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.dataType = TextureDataType_1.default.UNSIGNED_BYTE;
    this.wrap_s = TextureConst_1.default.WRAP_CLAMP_TO_EDGE;
    this.wrap_t = TextureConst_1.default.WRAP_CLAMP_TO_EDGE;
    this.wrap_r = TextureConst_1.default.WRAP_CLAMP_TO_EDGE;
    this.mipmapEnabled = false;
    this.flipY = false;
    this.premultiplyAlpha = false;
    /**
     * the value contains (1,2,4,8)
     */

    this.unpackAlignment = 4;
    this.minFilter = TextureConst_1.default.LINEAR_MIPMAP_LINEAR; // webgl1环境下,这个参数值为LINEAR会报错:
    // [.WebGL-0BC70EE8]RENDER WARNING: texture bound to texture unit 1 is not renderable. It maybe non-power-of-2 and have incompatible texture filtering.

    this.magFilter = TextureConst_1.default.LINEAR; // 用于记录自身变换的版本号，例如数据变换

    this.version = 0;
    this.m_slot = TextureResSlot_1.default.GetInstance();
    this.m_uid = this.m_slot.getFreeUid();
    if (texWidth < 1) texWidth = 128;
    if (texHeight < 1) texHeight = 128;

    if (powerof2Boo) {
      this.m_texWidth = MathConst_1.default.CalcNearestCeilPow2(texWidth);
      this.m_texHeight = MathConst_1.default.CalcNearestCeilPow2(texHeight);
    } else {
      this.m_texWidth = texWidth;
      this.m_texHeight = texHeight;
    }

    this.m_slot.__$$addTexture(this);
  }
  /**
   * This function only be be called by the renderer inner system.
   */


  __$$use(resTex) {
    resTex.bindToGpu(this.getResUid());
  }

  __$setRenderProxy(rc) {
    if (this.m_slot != null) {
      this.m_renderProxy = rc;
    } else {
      // 这样处理可能有错误
      this.m_slot = TextureResSlot_1.default.GetInstance();
      this.m_uid = this.m_slot.getFreeUid();

      this.m_slot.__$$addTexture(this);

      this.m_renderProxy = rc;
    }
  }
  /**
   * 被引用计数加一
   */


  __$attachThis() {
    if (this.m_attachCount == -1) {
      this.m_slot.removeFreeUid(this.getUid());
      this.m_attachCount = 0;
    }

    ++this.m_attachCount; //console.log("TextureProxy::__$attachThis() this(uid="+this.getUid()+").attachCount: "+this.m_attachCount);
  }
  /**
   * 被引用计数减一
   */


  __$detachThis() {
    if (this.m_attachCount > 0) {
      --this.m_attachCount; //console.log("TextureProxy::__$detachThis() this(uid="+this.getUid()+").attachCount: "+this.m_attachCount);

      if (this.m_attachCount < 1) {
        this.m_attachCount = -1;
        this.m_slot.addFreeUid(this.getUid()); //console.log("TextureProxy::__$detachThis() this.m_attachCount value is 0.");
      }
    }
  }
  /**
   * @returns 获得引用计数值
   */


  getAttachCount() {
    return this.m_attachCount;
  }
  /**
   * @returns 返回true, 表示当前纹理对象是渲染直接使用其对应的显存资源的对象
   *          返回false, 表示不能直接使用对应的显存资源
   */


  isDirect() {
    return true;
  }
  /**
   * @returns 返回自己的纹理类型(value: TextureProxyType)
   */


  getType() {
    return this.m_type;
  }
  /**
   * @returns 返回自己的 纹理资源 unique id, 这个id会被对应的资源管理器使用, 此方法子类可以依据需求覆盖
   */


  getResUid() {
    return this.m_uid;
  }
  /**
   * @returns 返回自己的 unique id, 此方法不允许子类覆盖
   */


  getUid() {
    return this.m_uid;
  }

  setWrap(wrap) {
    this.wrap_s = this.wrap_t = this.wrap_r = wrap;
  }
  /**
   * 注意，这个返回值在多 renderer instance的时候，如果renderer instance 共享了这个texture，则此返回值和TextureSlot相关
   * @returns the texture gpu resource is enabled or not.
   */


  isGpuEnabled() {
    return this.m_renderProxy != null && this.m_renderProxy.Texture.hasResUid(this.getResUid());
  }
  /**
   * @returns The fragment processor texture sampler type.
   */


  getSampler() {
    return this.m_sampler;
  }
  /**
   * @returns return value is TextureConst.TEXTURE_2D or TextureConst.TEXTURE_CUBE or TextureConst.TEXTURE_3D
   */


  getTargetType() {
    return this.m_texTarget;
  } // gpu texture buf size


  getBufWidth() {
    return this.m_texBufW;
  }

  getBufHeight() {
    return this.m_texBufH;
  } // logic texture size


  getWidth() {
    return this.m_texWidth;
  }

  getHeight() {
    return this.m_texHeight;
  }
  /**
   * @returns the texture data is enough or not.
   */


  isDataEnough() {
    return this.m_haveRData;
  }

  uploadFromFbo(texResource, fboWidth, fboHeight) {
    throw Error("Illegal operation !!!");
  }

  __$buildParam(gl) {
    this.m_texBufW = this.m_texWidth;
    this.m_texBufH = this.m_texHeight; // texture wrap

    gl.texParameteri(this.m_sampler, gl.TEXTURE_WRAP_S, TextureConst_1.default.GetConst(gl, this.wrap_s));
    gl.texParameteri(this.m_sampler, gl.TEXTURE_WRAP_T, TextureConst_1.default.GetConst(gl, this.wrap_t)); // texture filter

    gl.texParameteri(this.m_sampler, gl.TEXTURE_MIN_FILTER, TextureConst_1.default.GetConst(gl, this.minFilter));
    gl.texParameteri(this.m_sampler, gl.TEXTURE_MAG_FILTER, TextureConst_1.default.GetConst(gl, this.magFilter)); //      //gl.DONT_CARE
    //      //gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
    //      //gl.hint(gl.GENERATE_MIPMAP_HINT, gl.FASTEST);

    if (this.m_texTarget == TextureTarget_1.default.TEXTURE_3D) {
      gl.texParameteri(this.m_sampler, gl.TEXTURE_WRAP_R, TextureConst_1.default.GetConst(gl, this.wrap_r));
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, Math.log2(this.m_texWidth));
    }

    if (this.mipmapEnabled && this.m_generateMipmap) {
      gl.generateMipmap(this.m_sampler);
    }
  }

  enableMipmap() {}

  disableMipmap() {}

  generateMipmap(texRes) {
    if (this.mipmapEnabled && this.m_generateMipmap) {
      let gl = texRes.getRC();
      texRes.bindToGpu(this.getResUid()); //gl.generateMipmap(this.m_sampler);

      this.__$buildParam(gl);
    }
  } // sub class override


  uploadData(texRes) {} // sub class override


  __$updateToGpu(texRes) {}
  /**
   * 准备将数据更新到当前的 Gpu context,这是一个异步过程，在渲染运行时才会真正的提交给gpu
   * 这个函数由用户主动调用
   * 这个函数不能被子类覆盖
   */


  updateDataToGpu(rc = null, deferred = true) {
    if (rc != null) this.m_renderProxy = rc;

    if (this.m_renderProxy != null) {
      this.m_renderProxy.MaterialUpdater.updateTextureData(this, deferred);
    }
  }

  createTexBuf(texResource) {
    if (!texResource.hasResUid(this.getResUid())) {
      this.m_sampler = TextureTarget_1.default.GetValue(texResource.getRC(), this.m_texTarget);
      texResource.createResByParams3(this.getResUid(), this.getWidth(), this.getHeight(), this.m_sampler);
      return true;
    }

    return false;
  }
  /**
   * This function only be be called by the renderer inner system.
   * if sub class override this function, it must does call this function.
   */


  __$$upload(texRes) {
    if (this.m_haveRData && this.m_slot != null) {
      let buildStatus = this.createTexBuf(texRes); //console.log("Tex __$$upload buildStatus: ",buildStatus, ",resUid: ", this.getResUid());

      if (buildStatus) {
        this.__$updateToGpuBegin(texRes);

        this.uploadData(texRes);

        this.__$buildParam(texRes.getRC());

        this.m_generateMipmap = true;
      }
    }
  }
  /**
   * sub class can not override!!!!
   */


  dataUploadToGpu(gl, texData, texDatas, force = false) {
    this.version = 0;
    let interType = TextureFormat_1.default.ToGL(gl, this.internalFormat);
    let format = TextureFormat_1.default.ToGL(gl, this.srcFormat);
    let type = TextureDataType_1.default.ToGL(gl, this.dataType);
    let d = texData;

    if (texDatas == null) {
      if (d.status > -1 || force) d.updateToGpu(gl, this.m_sampler, interType, format, type, force);
    } else {
      let ds = texDatas;

      for (let i = 0, len = ds.length; i < len; ++i) {
        d = ds[i];

        if (d != null) {
          if (d.status > -1 || force) d.updateToGpu(gl, this.m_sampler, interType, format, type, force);
        }
      }

      this.m_generateMipmap = false;
    }
  }

  __$updateToGpuBegin(texRes) {
    let gl = texRes.getRC();
    texRes.bindToGpu(this.getResUid());
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment);
  }

  __$updateToGpuEnd(gl) {}
  /**
   * @returns This textureProxy instance has been destroyed.
   */


  isDestroyed() {
    return this.m_attachCount < -1;
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      this.m_attachCount = -2;
      this.m_haveRData = false;
      this.m_texWidth = 1;
      this.m_texHeight = 1;
      this.m_renderProxy = null; //console.log("TextureProxy::destroy(), destroy a textureProxy instance(uid="+this.getUid()+")...");
    }
  }
  /**
   * 移除之后则不能再正常使用了
   */


  __$$removeFromSlot() {
    if (this.m_slot != null && this.getAttachCount() == -2) {
      // this.m_slot.__$$removeTexture(this);
      // this.m_slot 不能随便等于null,因为当前textureProxy实例还会通过this.m_slot来重复使用
      // 如果 this.m_slot 要等于 null, 则这个textureProxy实例及其uid需要回收
      console.log("TextureProxy::RemoveFromSlot(), destroy a textureProxy instance(uid=" + this.getUid() + ")...");
      this.m_slot = null;
      this.m_renderProxy = null;
      this.m_uid = -1;
    }
  }

  toString() {
    return "[TextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.TextureProxy = TextureProxy;
exports.default = TextureProxy;

/***/ }),

/***/ "0929":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/
// 只是用transform 和一个 ROTransform 一一对应, 只是记录transform的最终形态

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const Matrix4Pool_1 = __importDefault(__webpack_require__("2139"));

class ROTransform {
  constructor(fs32 = null) {
    this.m_uid = 0;
    this.m_fs32 = null; // It is a flag that need inverted mat yes or no

    this.m_invMatEnabled = false;
    this.m_rotFlag = false;
    this.m_dt = 0;
    this.version = -1;
    this.updatedStatus = ROTransform.UPDATE_POSITION;
    this.updateStatus = ROTransform.UPDATE_TRANSFORM; // local to world spcae matrix

    this.m_omat = null;
    this.m_localMat = null;
    this.m_parentMat = null;
    this.m_toParentMat = null;
    this.m_toParentMatFlag = true; // word to local matrix

    this.m_invOmat = null;
    this.m_uid = ROTransform.s_uid++;
    this.m_dt = fs32 != null ? 1 : 0;
    this.m_fs32 = fs32 != null ? fs32 : new Float32Array(16);
  }

  getUid() {
    return this.m_uid;
  }

  getFS32Data() {
    return this.m_fs32;
  }
  /**
   * 防止因为共享 fs32 数据带来的逻辑错误
   */


  rebuildFS32Data() {
    if (this.m_dt > 0) {
      this.m_dt = 0;
      this.m_fs32 = new Float32Array(16);
    }
  }

  getRotationFlag() {
    return this.m_rotFlag;
  }

  getX() {
    return this.m_fs32[12];
  }

  getY() {
    return this.m_fs32[13];
  }

  getZ() {
    return this.m_fs32[14];
  }

  setX(p) {
    this.updateStatus |= 1;
    this.updatedStatus |= 1;
    this.m_fs32[12] = p;
  }

  setY(p) {
    this.updateStatus |= 1;
    this.updatedStatus |= 1;
    this.m_fs32[13] = p;
  }

  setZ(p) {
    this.updateStatus |= 1;
    this.updatedStatus |= 1;
    this.m_fs32[14] = p;
  }

  setXYZ(px, py, pz) {
    this.m_fs32[12] = px;
    this.m_fs32[13] = py;
    this.m_fs32[14] = pz;
    this.updateStatus |= 1;
    this.updatedStatus |= 1;
  }

  offsetPosition(pv) {
    this.m_fs32[12] += pv.x;
    this.m_fs32[13] += pv.y;
    this.m_fs32[14] += pv.z;
    this.updateStatus |= 1;
    this.updatedStatus |= 1;
  }

  setPosition(pv) {
    this.m_fs32[12] = pv.x;
    this.m_fs32[13] = pv.y;
    this.m_fs32[14] = pv.z;
    this.updateStatus |= 1;
    this.updatedStatus |= 1;
  }

  getPosition(pv) {
    pv.x = this.m_fs32[12];
    pv.y = this.m_fs32[13];
    pv.z = this.m_fs32[14];
  }

  copyPositionFrom(t) {
    if (t != null) {
      this.m_fs32[12] = t.m_fs32[12];
      this.m_fs32[13] = t.m_fs32[13];
      this.m_fs32[14] = t.m_fs32[14];
      this.updateStatus |= ROTransform.UPDATE_POSITION;
      this.updatedStatus |= ROTransform.UPDATE_POSITION;
    }
  }

  getRotationX() {
    return this.m_fs32[1];
  }

  getRotationY() {
    return this.m_fs32[6];
  }

  getRotationZ() {
    return this.m_fs32[9];
  }

  setRotationX(degrees) {
    this.m_fs32[1] = degrees;
    this.m_rotFlag = true;
    this.updateStatus |= ROTransform.UPDATE_ROTATION;
    this.updatedStatus |= ROTransform.UPDATE_ROTATION;
  }

  setRotationY(degrees) {
    this.m_fs32[6] = degrees;
    this.m_rotFlag = true;
    this.updateStatus |= ROTransform.UPDATE_ROTATION;
    this.updatedStatus |= ROTransform.UPDATE_ROTATION;
  }

  setRotationZ(degrees) {
    this.m_fs32[9] = degrees;
    this.m_rotFlag = true;
    this.updateStatus |= ROTransform.UPDATE_ROTATION;
    this.updatedStatus |= ROTransform.UPDATE_ROTATION;
  }

  setRotationXYZ(rx, ry, rz) {
    this.m_fs32[1] = rx;
    this.m_fs32[6] = ry;
    this.m_fs32[9] = rz;
    this.updateStatus |= ROTransform.UPDATE_ROTATION;
    this.updatedStatus |= ROTransform.UPDATE_ROTATION;
    this.m_rotFlag = true;
  }

  getScaleX() {
    return this.m_fs32[0];
  }

  getScaleY() {
    return this.m_fs32[5];
  }

  getScaleZ() {
    return this.m_fs32[10];
  }

  setScaleX(p) {
    this.m_fs32[0] = p;
    this.updateStatus |= ROTransform.UPDATE_SCALE;
    this.updatedStatus |= ROTransform.UPDATE_SCALE;
  }

  setScaleY(p) {
    this.m_fs32[5] = p;
    this.updateStatus |= ROTransform.UPDATE_SCALE;
    this.updatedStatus |= ROTransform.UPDATE_SCALE;
  }

  setScaleZ(p) {
    this.m_fs32[10] = p;
    this.updateStatus |= ROTransform.UPDATE_SCALE;
    this.updatedStatus |= ROTransform.UPDATE_SCALE;
  }

  setScaleXYZ(sx, sy, sz) {
    this.m_fs32[0] = sx;
    this.m_fs32[5] = sy;
    this.m_fs32[10] = sz;
    this.updateStatus |= ROTransform.UPDATE_SCALE;
    this.updatedStatus |= ROTransform.UPDATE_SCALE;
  }

  setScale(s) {
    this.m_fs32[0] = s;
    this.m_fs32[5] = s;
    this.m_fs32[10] = s;
    this.updateStatus |= ROTransform.UPDATE_SCALE;
    this.updatedStatus |= ROTransform.UPDATE_SCALE;
  }

  getRotationXYZ(pv) {
    pv.x = this.m_fs32[1];
    pv.y = this.m_fs32[6];
    pv.z = this.m_fs32[9];
  }

  getScaleXYZ(pv) {
    pv.x = this.m_fs32[0];
    pv.y = this.m_fs32[5];
    pv.z = this.m_fs32[10];
  }

  localToGlobal(pv) {
    this.getMatrix().transformVectorSelf(pv);
  }

  globalToLocal(pv) {
    this.getInvMatrix().transformVectorSelf(pv);
  } // maybe need call update function


  getInvMatrix() {
    if (this.m_invOmat != null) {
      if (this.m_invMatEnabled) {
        this.m_invOmat.copyFrom(this.m_omat);
        this.m_invOmat.invert();
      }
    } else {
      this.m_invOmat = Matrix4Pool_1.default.GetMatrix();
      this.m_invOmat.copyFrom(this.m_omat);
      this.m_invOmat.invert();
    }

    this.m_invMatEnabled = false;
    return this.m_invOmat;
  }

  getLocalMatrix() {
    if (this.updateStatus > 0) {
      this.update();
    }

    return this.m_localMat;
  } // get local to world matrix, maybe need call update function


  getMatrix(flag = true) {
    if (this.updateStatus > 0 && flag) {
      this.update();
    }

    return this.m_omat;
  } // get local to parent space matrix, maybe need call update function


  getToParentMatrix() {
    if (this.m_toParentMat != null) {
      //  if(this.m_toParentMatFlag)
      //  {
      //      console.log("....");
      //      this.m_toParentMat.invert();
      //  }
      return this.m_toParentMat;
    }

    return this.m_omat;
  } // local to world matrix, 使用的时候注意数据安全->防止多个显示对象拥有而出现多次修改的问题,因此此函数尽量不要用


  setParentMatrix(matrix) {
    //  console.log("sTOTransform::etParentMatrix(), this.m_parentMat != matrix: ",(this.m_parentMat != matrix),this.m_uid);
    this.m_parentMat = matrix;
    this.m_invMatEnabled = true;

    if (this.m_parentMat != null) {
      if (this.m_localMat == this.m_omat) {
        this.updateStatus = ROTransform.UPDATE_TRANSFORM;
        this.updatedStatus = this.updateStatus;
        this.m_localMat = Matrix4Pool_1.default.GetMatrix();
      } else {
        this.updateStatus |= ROTransform.UPDATE_PARENT_MAT;
        this.updatedStatus = this.updateStatus;
      }
    }
  }

  getParentMatrix() {
    return this.m_parentMat;
  }

  updateMatrixData(matrix) {
    if (matrix != null) {
      this.updateStatus = ROTransform.UPDATE_NONE;
      this.m_invMatEnabled = true;
      this.m_omat.copyFrom(matrix);
    }
  }

  __$setMatrix(matrix) {
    if (matrix != null) {
      this.updateStatus = ROTransform.UPDATE_NONE;
      this.m_invMatEnabled = true;

      if (this.m_localMat == this.m_omat) {
        this.m_localMat = matrix;
      }

      if (this.m_omat != null) {
        // ROTransPool.RemoveTransUniform(this.m_omat);
        Matrix4Pool_1.default.RetrieveMatrix(this.m_omat);
      }

      this.m_omat = matrix;
    }
  }

  destroy() {
    // 当自身被完全移出RenderWorld之后才能执行自身的destroy
    if (this.m_invOmat != null) Matrix4Pool_1.default.RetrieveMatrix(this.m_invOmat);

    if (this.m_localMat != null) {
      // if (this.m_omat == this.m_localMat) {
      //     ROTransPool.RemoveTransUniform(this.m_omat);
      // }
      Matrix4Pool_1.default.RetrieveMatrix(this.m_localMat);
    }

    if (this.m_omat != null && this.m_omat != this.m_localMat) {
      // ROTransPool.RemoveTransUniform(this.m_omat);
      Matrix4Pool_1.default.RetrieveMatrix(this.m_omat);
    }

    this.m_invOmat = null;
    this.m_localMat = null;
    this.m_omat = null;
    this.m_parentMat = null;
    this.updateStatus = ROTransform.UPDATE_TRANSFORM;
    this.m_fs32 = null;
  }

  copyFrom(src) {
    this.m_fs32.set(src.m_fs32, 0);
    this.updatedStatus |= 1;
    this.updateStatus |= ROTransform.UPDATE_TRANSFORM;
    this.m_rotFlag = src.m_rotFlag;
  }

  forceUpdate() {
    this.updateStatus |= ROTransform.UPDATE_TRANSFORM;
    this.update();
  }

  update() {
    if (this.updateStatus > 0) {
      this.m_invMatEnabled = true;
      this.updateStatus = this.updateStatus | this.updatedStatus;

      if ((this.updateStatus & ROTransform.UPDATE_TRANSFORM) > 0) {
        this.m_localMat.getLocalFS32().set(this.m_fs32, 0);

        if (this.m_rotFlag) {
          this.m_localMat.setRotationEulerAngle(this.m_fs32[1] * MathConst_1.default.MATH_PI_OVER_180, this.m_fs32[6] * MathConst_1.default.MATH_PI_OVER_180, this.m_fs32[9] * MathConst_1.default.MATH_PI_OVER_180);
        }

        if (this.m_parentMat != null) {
          this.updateStatus = this.updateStatus | ROTransform.UPDATE_PARENT_MAT;
        }
      }

      if (this.m_omat != this.m_localMat) {
        this.m_omat.copyFrom(this.m_localMat);
      }

      if ((this.updateStatus & ROTransform.UPDATE_PARENT_MAT) == ROTransform.UPDATE_PARENT_MAT) {
        if (this.m_toParentMat != null) {
          this.m_toParentMat.copyFrom(this.m_omat);
        } else {
          this.m_toParentMat = Matrix4Pool_1.default.GetMatrix();
          this.m_toParentMat.copyFrom(this.m_omat);
        }

        this.m_toParentMatFlag = true;
        this.m_omat.append(this.m_parentMat);
      }

      this.updateStatus = ROTransform.UPDATE_NONE;
      this.version++;
    }
  }

  getMatrixFS32() {
    return this.getMatrix().getLocalFS32();
  }

  toString() {
    return "[ROTransform(uid = " + this.m_uid + ")]";
  }

  static GetFreeId() {
    if (ROTransform.m_freeIdList.length > 0) {
      return ROTransform.m_freeIdList.pop();
    }

    return -1;
  }

  static Create(matrix = null, fs32 = null) {
    let unit = null;
    let index = fs32 != null ? -1 : ROTransform.GetFreeId();

    if (index >= 0) {
      unit = ROTransform.m_unitList[index];
      ROTransform.m_unitFlagList[index] = ROTransform.s_FLAG_BUSY;
      unit.rebuildFS32Data();
    } else {
      unit = new ROTransform(fs32);
      ROTransform.m_unitList.push(unit);
      ROTransform.m_unitFlagList.push(ROTransform.s_FLAG_BUSY);
      ROTransform.m_unitListLen++;
    }

    if (matrix == null) {
      unit.m_omat = Matrix4Pool_1.default.GetMatrix();
    } else {
      unit.m_omat = matrix;
    }

    unit.m_localMat = unit.m_omat;

    if (fs32 == null) {
      unit.m_fs32.set(ROTransform.s_initData, 0);
    }

    return unit;
  }

  static Restore(pt) {
    if (pt != null && ROTransform.m_unitFlagList[pt.getUid()] == ROTransform.s_FLAG_BUSY) {
      let uid = pt.getUid();
      ROTransform.m_freeIdList.push(uid);
      ROTransform.m_unitFlagList[uid] = ROTransform.s_FLAG_FREE;
      pt.destroy();
    }
  }

}

ROTransform.s_uid = 0;
ROTransform.s_initData = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
ROTransform.UPDATE_NONE = 0;
ROTransform.UPDATE_POSITION = 1;
ROTransform.UPDATE_ROTATION = 2;
ROTransform.UPDATE_SCALE = 4;
ROTransform.UPDATE_TRANSFORM = 7;
ROTransform.UPDATE_PARENT_MAT = 8;
ROTransform.s_FLAG_BUSY = 1;
ROTransform.s_FLAG_FREE = 0;
ROTransform.m_unitFlagList = [];
ROTransform.m_unitListLen = 0;
ROTransform.m_unitList = [];
ROTransform.m_freeIdList = [];
exports.default = ROTransform;

/***/ }),

/***/ "0fc4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MaterialResource_1 = __importDefault(__webpack_require__("9666"));

const ShaderCodeBuffer_1 = __importDefault(__webpack_require__("faa5"));

class MaterialBase {
  constructor() {
    this.m_shduns = "";
    this.m_shdData = null;
    this.m_polygonOffset = null;
    this.m_sharedUniforms = null;
    this.m_shaderUniformData = null;
    this.m_pipeLine = null;
    this.m_uniqueShaderName = ""; // tex list unique hash value

    this.__$troMid = -1;
    this.__$uniform = null;
    /**
     * pipes type list for material pipeline
     */

    this.pipeTypes = null;
    this.m_texList = null;
    this.m_texListLen = 0;
    this.m_texDataEnabled = false;
    this.m_attachCount = 0;
  }
  /*
   * specifies the scale factors and units to calculate depth values.
   * @param factor the value is a GLfloat which sets the scale factor for the variable depth offset for each polygon. The default value is 0.
   * @param units the value is a which sets the multiplier by which an implementation-specific value is multiplied with to create a constant depth offset. The default value is 0.
   */


  setPolygonOffset(factor, units = 0.0) {
    if (this.m_polygonOffset == null) {
      this.m_polygonOffset = [factor, units];
    } else {
      this.m_polygonOffset[0] = factor;
      this.m_polygonOffset[1] = units;
    }
  }

  getPolygonOffset() {
    return this.m_polygonOffset;
  }
  /**
   * 设置深度偏移量
   * @param offset the value range: [-2.0 -> 2.0]
   */


  setDepthOffset(offset) {}

  setMaterialPipeline(pipeline) {
    this.m_pipeLine = pipeline;
  }

  getMaterialPipeline() {
    return this.m_pipeLine;
  }

  getShdUniqueName() {
    return this.m_shduns;
  } // get a shader code buf instance, for sub class override


  getCodeBuf() {
    throw Error("Illgel operation !!!");
    return null;
  }

  hasShaderData() {
    if (this.m_shdData != null) {
      return this.m_shdData.haveTexture() ? this.texDataEnabled() : true; // if (this.m_shdData.haveTexture()) {
      //     return this.texDataEnabled();
      // }
      // else {
      //     return true;
      // }
    }

    return false;
  }

  initializeByRenderer(texEnabled = false) {
    this.initializeByCodeBuf(texEnabled);
  }

  initializeByCodeBuf(texEnabled = false) {
    texEnabled = texEnabled || this.getTextureTotal() > 0;

    if (this.m_shdData == null) {
      let buf = this.getCodeBuf();

      if (buf != null) {
        buf.reset();
        buf.pipeline = this.m_pipeLine;
        buf.pipeTypes = this.pipeTypes;
        if (buf.pipeline != null) buf.pipeline.reset();
        this.buildBuf();
        let shdData;
        let shdCode_uniqueName = this.m_uniqueShaderName;

        if (shdCode_uniqueName != "") {
          shdData = MaterialResource_1.default.FindData(shdCode_uniqueName);
          this.m_shduns = shdCode_uniqueName;
        }

        if (shdData == null) {
          texEnabled = texEnabled || this.getTextureTotal() > 0;
          buf.initialize(texEnabled);
          shdCode_uniqueName = buf.getUniqueShaderName() + buf.keysString + buf.getShaderCodeBuilder().getUniqueNSKeyString();
          this.m_shduns = shdCode_uniqueName;

          this.__$initShd(this.m_shduns);

          shdData = MaterialResource_1.default.FindData(shdCode_uniqueName);
          this.m_uniqueShaderName = this.m_shduns;
        } else {
          texEnabled = texEnabled || this.getTextureTotal() > 0;
          buf.initialize(texEnabled);
        }

        if (shdData == null) {
          if (buf.pipeline == null) {
            if (buf.getShaderCodeObject() != null) {
              buf.getShaderCodeBuilder().addShaderObject(buf.getShaderCodeObject());
            }
          }

          buf.buildShader();
          buf.buildDefine();

          if (buf.pipeline != null) {
            if (buf.getShaderCodeObject() != null) {
              buf.pipeline.addShaderCode(buf.getShaderCodeObject(), false);
            } else {
              buf.pipeline.addShaderCodeWithUUID(buf.getShaderCodeObjectUUID(), false);
            }

            buf.pipeline.build(buf.getShaderCodeBuilder());
          }

          let fshd = buf.getFragShaderCode();
          let vshd = buf.getVertShaderCode();
          shdData = MaterialResource_1.default.CreateShdData(shdCode_uniqueName, vshd, fshd, buf.adaptationShaderVersion, ShaderCodeBuffer_1.default.GetPreCompileInfo());
        }

        if (this.m_pipeLine != null) {
          this.m_sharedUniforms = this.m_pipeLine.getSharedUniforms();
        }

        this.m_shdData = shdData;
      }
    }
  }

  buildBuf() {}

  __$initShd(pshduns) {}

  getShaderData() {
    return this.m_shdData;
  }
  /**
   * set TextuerProxy instances
   * @param texList [tex0,tex1,...]
   */


  setTextureList(texList) {
    if (this.m_texList != texList) {
      this.m_texDataEnabled = false;

      if (texList != null) {
        this.m_texListLen = texList.length;
      } else {
        this.m_texListLen = 0;
      }

      let i = 0;

      if (this.m_texList != null) {
        for (; i < this.m_texList.length; ++i) {
          this.m_texList[i].__$detachThis();
        }
      }

      this.m_texDataEnabled = true;
      this.m_texList = texList;

      if (this.m_texList != null) {
        let key = 31;

        for (i = 0; i < this.m_texList.length; ++i) {
          key = key * 131 + this.m_texList[i].getUid();

          this.m_texList[i].__$attachThis();

          if (!this.m_texList[i].isDataEnough()) {
            this.m_texDataEnabled = false;
          }
        }

        this.__$troMid = key;
      }
    }
  }

  setTextureAt(index, tex) {
    if (index >= 0 && tex != null) {
      let texList = this.m_texList;
      let len = texList.length;

      if (texList != null && texList[index] != tex && index < len && len > 0) {
        texList = texList.slice(0);

        texList[index].__$detachThis();

        texList[index] = tex;
        this.m_texDataEnabled = tex.isDataEnough();

        tex.__$attachThis();

        let key = 31;

        for (let i = 0; i < len; ++i) {
          key = key * 131 + texList[i].getUid();
        }

        this.__$troMid = key;
        this.m_texList = texList;
      }
    }
  }

  getTextureList() {
    return this.m_texList;
  }

  getTextureAt(index) {
    return this.m_texList[index];
  }

  getTextureTotal() {
    return this.m_texListLen;
  }

  getShdTexTotal() {
    if (this.m_shdData != null) {
      return this.m_shdData.getTexTotal();
    }

    return 0;
  }

  texDataEnabled() {
    if (this.m_texList != null) {
      if (this.m_texDataEnabled) {
        return true;
      }

      let boo = true;
      let texList = this.m_texList;

      for (let i = 0; i < this.m_texListLen; ++i) {
        if (!texList[i].isDataEnough()) {
          boo = false;
          break;
        }
      }

      this.m_texDataEnabled = boo;
      return boo;
    } else {
      if (this.m_shdData != null && this.m_shdData.getTexTotal() > 0) {
        console.warn("this material(" + this.m_shdData.getUniqueShaderName() + ") texList is null, need " + this.m_shdData.getTexTotal() + " textures.");
      }
    }

    return false;
  }

  createSharedUniforms() {
    return this.m_sharedUniforms;
  }

  createSharedUniformsData() {
    return null;
  }

  createSelfUniformData() {
    return this.m_shaderUniformData;
  } //synchronism ubo data or other displayEntity data


  updateSelfData(ro) {}

  hasTexture() {
    return this.m_shdData.haveTexture();
  }

  getBufSortFormat() {
    return this.m_shdData != null ? this.m_shdData.getLayoutBit() : 0x0;
  }

  getBufTypeList() {
    return this.m_shdData != null ? this.m_shdData.getLocationTypes() : null;
  }

  getBufSizeList() {
    return this.m_shdData != null ? this.m_shdData.getAttriSizeList() : null;
  }

  __$attachThis() {
    ++this.m_attachCount; // console.log("MaterialBase::__$attachThis() this.m_attachCount: "+this.m_attachCount);
  }

  __$detachThis() {
    --this.m_attachCount; // console.log("MaterialBase::__$detachThis() this.m_attachCount: "+this.m_attachCount);

    if (this.m_attachCount < 1) {
      this.m_attachCount = 0;
    }
  }

  getAttachCount() {
    return this.m_attachCount;
  }

  destroy() {
    this.m_sharedUniforms = null;
    this.m_shaderUniformData = null;
    this.pipeTypes = null;

    if (this.getAttachCount() < 1) {
      if (this.m_texList != null) {
        for (let i = 0; i < this.m_texList.length; ++i) {
          this.m_texList[i].__$detachThis();
        }
      }

      this.m_shdData = null;
      this.m_texList = null;
      this.m_texDataEnabled = false;
      this.__$troMid = 0;

      if (this.__$uniform != null) {
        this.__$uniform.destroy();

        this.__$uniform = null;
      }
    }
  }

  toString() {
    return "[MaterialBase()]";
  }

}

exports.default = MaterialBase;

/***/ }),

/***/ "11e6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class RSEntityFlag {
  static AddContainerFlag(flag) {
    //return flag | RSEntityFlag.CONTAINER_FLAG;
    return flag | 0x80000000;
  }

  static RemoveContainerFlag(flag) {
    //return flag & RSEntityFlag.CONTAINER_NOT_FLAG;
    return flag & -0x80000001;
  }

  static AddSpaceUid(flag, rawUid) {
    return flag & -0x100000 | rawUid;
  }

  static RemoveSpaceUid(flag) {
    //return flag & RSEntityFlag.SPACE_NOT_FLAG;
    return flag & -0x100000;
  }

  static GetSpaceUid(flag) {
    //return flag & RSEntityFlag.SPACE_FLAG;
    return flag & 0xFFFFF;
  }

  static AddRendererUid(flag, rawUid) {
    return flag & -0x7f00001 | rawUid << 20;
  }

  static RemoveRendererUid(flag) {
    //return flag | RSEntityFlag.RENDERER_UID_FLAG;
    return flag | 0x7F00000;
  }

  static GetRendererUid(flag) {
    //return (flag & RSEntityFlag.RENDERER_UID_FLAG)>>20;
    flag = (flag & 0x7F00000) >> 20;
    return flag < 127 ? flag : -1;
  }

  static TestRendererUid(flag) {
    //return (flag & RSEntityFlag.RENDERER_UID_FLAG)>>20;
    flag = (flag & 0x7F00000) >> 20;
    return flag < 127;
  }

  static AddSortEnabled(flag) {
    //return flag | RSEntityFlag.SORT_FLAG;
    return flag | 0x40000000;
  }

  static RemoveSortEnabled(flag) {
    //return flag & RSEntityFlag.SORT_NOT_FLAG;
    return flag & -0x40000001;
  }

  static TestSortEnabled(flag) {
    //return (flag & RSEntityFlag.SORT_FLAG) == RSEntityFlag.SORT_FLAG;
    return (flag & 0x40000000) == 0x40000000;
  }

  static AddRendererLoad(flag) {
    //return flag | RSEntityFlag.RENDERER_LOAD_FLAG;
    return flag | 0x30000000;
  }

  static RemoveRendererLoad(flag) {
    //return flag & RSEntityFlag.RENDERER_LOAD_NOT_FLAG;
    return flag & -0x30000001;
  }

  static TestSpaceContains(flag) {
    return (0xFFFFF & flag) > 0;
  }

  static TestSpaceEnabled(flag) {
    return (0xFFFFF & flag) < 1;
  }

  static TestSpaceEnabled2(flag) {
    // console.log("   TestSpaceEnabled2(), 0xFFFFF & flag: ", (0xFFFFF & flag));
    // console.log("                       (0x80000000 & flag) != 0x80000000: ", ((0x80000000 & flag) != 0x80000000));
    return (0xFFFFF & flag) < 1 && (0x80000000 & flag) != 0x80000000;
  }

  static TestContainerEnabled(flag) {
    //return (RSEntityFlag.RENDERER_UID_FLAG & flag) == RSEntityFlag.RENDERER_UID_FLAG && (RSEntityFlag.CONTAINER_FLAG & flag) != RSEntityFlag.CONTAINER_FLAG;
    return (0x7F00000 & flag) == 0x7F00000 && (0x80000000 & flag) != 0x80000000;
  }

  static TestRendererEnabled(flag) {
    //return (RSEntityFlag.RENDERER_ADN_LOAD_FLAG & flag) == RSEntityFlag.RENDERER_UID_FLAG && (RSEntityFlag.CONTAINER_FLAG & flag) != RSEntityFlag.CONTAINER_FLAG;
    return (0x37F00000 & flag) == 0x7F00000 && (0x80000000 & flag) != 0x80000000;
  }

}

RSEntityFlag.DEFAULT = 0x7f00000; // 第27位存放是否在container里面
// 在 container 内

RSEntityFlag.CONTAINER_FLAG = 0x80000000; // (1<<27)
// 没在 container 内

RSEntityFlag.CONTAINER_NOT_FLAG = -0x80000001; //~(0x80000000), ~(1<<27)
// 第0位到第19位总共20位存放自身在space中的 index id(1 到 1048575(0xFFFFF), 但是不会包含0xFFFFF)

RSEntityFlag.SPACE_FLAG = 0xFFFFF;
RSEntityFlag.SPACE_NOT_FLAG = -0x100000; // ~0xFFFFF;
// 第20位开始到26位为总共7位止存放在renderer中的状态数据(renderer unique id and others),
// 最多可以支持同时构建64个renderer instance

RSEntityFlag.RENDERER_UID_FLAG = 0x7F00000; // (1<<20 | 1<<21 | 1<<22 | 1<<23 | 1<<24 | 1<<25 | 1<<26);

RSEntityFlag.RENDERER_UID_NOT_FLAG = -0x7f00001; // ~0x7F00000;

RSEntityFlag.RENDERER_UID_INVALID = 127; // ~0x7F00000;
//0x40000000
// 第30位存放 是否渲染运行时排序(rendering sort enabled) 的相关信息

RSEntityFlag.SORT_FLAG = 0x40000000; // (1<<30);

RSEntityFlag.SORT_NOT_FLAG = -0x40000001; // ~0x40000000;
// 第28位开始到29位总共2位存放renderer 载入状态 的相关信息

RSEntityFlag.RENDERER_LOAD_FLAG = 0x30000000; // (1<<28 | 1<<29);

RSEntityFlag.RENDERER_LOAD_NOT_FLAG = -0x30000001; // ~0x30000000;

RSEntityFlag.RENDERER_ADN_LOAD_FLAG = 0x37F00000; // 0x7f00000 | 0x30000000;

exports.default = RSEntityFlag;

/***/ }),

/***/ "12e2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "131b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ShaderCodeBuffer_1 = __importDefault(__webpack_require__("faa5"));

const ShaderUniformData_1 = __importDefault(__webpack_require__("b3bd"));

const MaterialBase_1 = __importDefault(__webpack_require__("0fc4"));

class RawCodeShaderBuffer extends ShaderCodeBuffer_1.default {
  constructor() {
    super();
    this.m_uniqueName = "";
    this.m_fragCode = "";
    this.m_vtxCode = "";
    this.m_flag = true;
    this.shaderBuilder = null;
  }

  initialize(texEnabled) {
    super.initialize(texEnabled);
    this.adaptationShaderVersion = false;
  }

  buildShader() {
    this.m_flag = this.shaderBuilder != null;

    if (this.m_flag) {
      this.shaderBuilder(this);
      this.shaderBuilder = null;
    }
  }

  setUniqueName(uniqueName) {
    this.m_uniqueName = uniqueName;
  }

  setFragShaderCode(codeStr) {
    this.m_fragCode = codeStr;
  }

  getFragShaderCode() {
    if (this.m_flag) return this.m_coder.buildFragCode();
    return this.m_fragCode;
  }

  setVtxShaderCode(codeStr) {
    this.m_vtxCode = codeStr;
  }

  getVertShaderCode() {
    if (this.m_flag) return this.m_coder.buildVertCode();
    return this.m_vtxCode;
  }

  getUniqueShaderName() {
    //console.log("H ########################### this.m_uniqueName: "+this.m_uniqueName);
    return this.m_uniqueName;
  }

  toString() {
    return "[RawCodeShaderBuffer()]";
  }

}

class ShaderMaterial extends MaterialBase_1.default {
  constructor(shd_uniqueName) {
    super();
    this.m_buffer = new RawCodeShaderBuffer();
    this.m_uniformData = null;
    this.m_shaderBuilder = null;
    this.vertColorEnabled = false;
    this.premultiplyAlpha = false;
    this.shadowReceiveEnabled = false;
    this.lightEnabled = false;
    this.fogEnabled = false;
    this.envAmbientLightEnabled = false;
    this.brightnessOverlayEnabeld = false;
    this.glossinessEnabeld = true;
    this.m_buffer.setUniqueName(shd_uniqueName);
  }

  buildBuf() {
    let buf = this.m_buffer;
    buf.shaderBuilder = this.m_shaderBuilder;
    buf.vertColorEnabled = this.vertColorEnabled;
    buf.premultiplyAlpha = this.premultiplyAlpha;
    buf.shadowReceiveEnabled = this.shadowReceiveEnabled;
    buf.lightEnabled = this.lightEnabled;
    buf.fogEnabled = this.fogEnabled;
    buf.envAmbientLightEnabled = this.envAmbientLightEnabled;
    buf.brightnessOverlayEnabeld = this.brightnessOverlayEnabeld;
    buf.glossinessEnabeld = this.glossinessEnabeld;
  }

  setShaderBuilder(shaderBuilder) {
    this.m_shaderBuilder = shaderBuilder;
  }

  setFragShaderCode(codeStr) {
    this.m_buffer.shaderBuilder = null;
    this.m_buffer.setFragShaderCode(codeStr);
  }

  setVtxShaderCode(codeStr) {
    this.m_buffer.shaderBuilder = null;
    this.m_buffer.setVtxShaderCode(codeStr);
  }
  /**
   * @param           uniform_name        the name of a uniform in the shader.
   * @param           data                Float32Array type data stream,for example: vec4(Float32Array(4)),mat4(Float32Array(16))
   */


  addUniformDataAt(uniform_name, data) {
    if (data != null) {
      if (this.m_uniformData == null) {
        this.m_uniformData = new ShaderUniformData_1.default();
        this.m_uniformData.uniformNameList = [];
        this.m_uniformData.dataList = [];
      }

      this.m_uniformData.uniformNameList.push(uniform_name);
      this.m_uniformData.dataList.push(data);
    }
  }

  getCodeBuf() {
    return this.m_buffer;
  }

  createSelfUniformData() {
    return this.m_uniformData;
  }

  destroy() {
    this.m_shaderBuilder = null;
  }

}

exports.default = ShaderMaterial;

/***/ }),

/***/ "1440":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class SimpleStage3D {
  constructor(rcuid, pdocument) {
    this.m_rcuid = 0;
    this.uProbe = null;
    this.pixelRatio = 1.0;
    this.stageWidth = 800;
    this.stageHeight = 600; // 实际宽高, 和gpu端对齐

    this.stageHalfWidth = 400;
    this.stageHalfHeight = 300;
    this.mouseX = 0;
    this.mouseY = 0; // sdiv页面实际占据的像素宽高

    this.viewWidth = 800;
    this.viewHeight = 600;
    this.mouseViewX = 0;
    this.mouseViewY = 0;
    this.m_viewX = 0.0;
    this.m_viewY = 0.0;
    this.m_viewW = 1.0;
    this.m_viewH = 1.0;
    this.m_preStageWidth = 0;
    this.m_preStageHeight = 0; // 是否舞台尺寸和view自动同步一致

    this.m_autoSynViewAndStageSize = true;
    this.m_rcuid = rcuid;

    if (SimpleStage3D.s_document == null) {
      SimpleStage3D.s_document = pdocument;
    }
  }
  /**
   * @returns return renderer context unique id
   */


  getRCUid() {
    return this.m_rcuid;
  }

  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }

  getViewX() {
    return this.m_viewX;
  }

  getViewY() {
    return this.m_viewY;
  }

  getViewWidth() {
    return this.m_viewW;
  }

  getViewHeight() {
    return this.m_viewH;
  }

  setViewPort(px, py, pw, ph) {
    this.m_autoSynViewAndStageSize = false;
    this.m_viewX = px;
    this.m_viewY = py;

    if (pw != this.m_viewW || ph != this.m_viewH) {
      this.m_viewW = pw;
      this.m_viewH = ph;
      this.updateViewUData();
    }
  }

  updateViewUData() {
    this.uProbe.setVec4Data(2.0 / this.stageWidth, 2.0 / this.stageHeight, this.stageWidth, this.stageHeight);
    this.uProbe.update();
    this.m_preStageWidth = this.m_viewW;
    this.m_preStageHeight = this.m_viewH;
  }

  update() {
    if (this.m_preStageWidth != this.stageWidth || this.m_preStageHeight != this.stageHeight) {
      if (this.m_autoSynViewAndStageSize) {
        this.m_viewW = this.stageWidth;
        this.m_viewH = this.stageHeight;
        this.updateViewUData();
      }

      this.stageHalfWidth = 0.5 * this.stageWidth;
      this.stageHalfHeight = 0.5 * this.stageHeight;
    }
  }

  mouseDown(phase = 1) {}

  mouseUp(phase = 1) {}

  mouseClick() {}

  mouseDoubleClick() {}

  mouseRightDown(phase = 1) {}

  mouseRightUp(phase = 1) {}

  mouseMiddleDown(phase = 1) {}

  mouseMiddleUp(phase = 1) {}

  mouseBgDown() {}

  mouseBgUp() {}

  mouseBgClick() {}

  mouseBgRightDown() {}

  mouseBgRightUp() {}

  mouseBgMiddleDown() {}

  mouseBgMiddleUp() {}

  mouseRightClick() {}

  mouseMove() {}

  mouseWheel(evt) {} // 等同于 touchCancle


  mouseCancel() {} //param [{x,y},{x,y},...]


  mouseMultiDown(posArray) {} //param [{x,y},{x,y},...]


  mouseMultiUp(posArray) {} //param [{x,y},{x,y},...]


  mouseMultiMove(posArray) {}

  mouseWindowUp(phase = 1) {}

  mouseWindowRightUp(phase = 1) {}

  enterFrame() {}

  addEventListener(type, target, func, captureEnabled = true, bubbleEnabled = true) {}

  removeEventListener(type, target, func) {}

}

SimpleStage3D.s_document = null;
exports.default = SimpleStage3D;

/***/ }),

/***/ "18c7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

const EulerOrder_1 = __webpack_require__("cc7a");

const OrientationType_1 = __importDefault(__webpack_require__("abdb"));

class Matrix4 {
  constructor(pfs32 = null, index = 0) {
    this.m_uid = -1;
    this._mvx = new Vector3D_1.default();
    this._mvy = new Vector3D_1.default();
    this._mvz = new Vector3D_1.default();
    this.m_index = 0;
    this.m_fs32 = null;
    this.m_localFS32 = null;
    this.m_index = index;

    if (pfs32 != null) {
      this.m_uid = Matrix4.s_uid++;
      this.m_fs32 = pfs32;
      this.m_localFS32 = this.m_fs32.subarray(index, index + 16);
    } else {
      this.m_uid = Matrix4.s_isolatedUid++;
      this.m_fs32 = new Float32Array(16);
      this.m_fs32.set(Matrix4.s_InitData, 0);
      this.m_localFS32 = this.m_fs32;
    }
  }

  setData(data) {
    if (data.length == 16) {
      this.m_localFS32.set(data);
    }
  }

  getCapacity() {
    return 16;
  }

  GetMaxUid() {
    return Matrix4.s_uid;
  }

  getUid() {
    return this.m_uid;
  }

  getLocalFS32() {
    return this.m_localFS32;
  }

  getFS32() {
    return this.m_fs32;
  }

  getFSIndex() {
    return this.m_index;
  }

  identity() {
    this.m_localFS32.set(Matrix4.s_InitData, 0);
  }

  determinant() {
    let lfs = this.m_localFS32;
    return (lfs[0] * lfs[5] - lfs[4] * lfs[1]) * (lfs[10] * lfs[15] - lfs[14] * lfs[11]) - (lfs[0] * lfs[9] - lfs[8] * lfs[1]) * (lfs[6] * lfs[15] - lfs[14] * lfs[7]) + (lfs[0] * lfs[13] - lfs[12] * lfs[1]) * (lfs[6] * lfs[11] - lfs[10] * lfs[7]) + (lfs[4] * lfs[9] - lfs[8] * lfs[5]) * (lfs[2] * lfs[15] - lfs[14] * lfs[3]) - (lfs[4] * lfs[13] - lfs[12] * lfs[5]) * (lfs[2] * lfs[11] - lfs[10] * lfs[3]) + (lfs[8] * lfs[13] - lfs[12] * lfs[9]) * (lfs[2] * lfs[7] - lfs[6] * lfs[3]);
  }

  multiplyMatrices(a, b) {
    const ae = a.getLocalFS32();
    const be = b.getLocalFS32();
    const fs = this.getLocalFS32();
    const a11 = ae[0],
          a12 = ae[4],
          a13 = ae[8],
          a14 = ae[12];
    const a21 = ae[1],
          a22 = ae[5],
          a23 = ae[9],
          a24 = ae[13];
    const a31 = ae[2],
          a32 = ae[6],
          a33 = ae[10],
          a34 = ae[14];
    const a41 = ae[3],
          a42 = ae[7],
          a43 = ae[11],
          a44 = ae[15];
    const b11 = be[0],
          b12 = be[4],
          b13 = be[8],
          b14 = be[12];
    const b21 = be[1],
          b22 = be[5],
          b23 = be[9],
          b24 = be[13];
    const b31 = be[2],
          b32 = be[6],
          b33 = be[10],
          b34 = be[14];
    const b41 = be[3],
          b42 = be[7],
          b43 = be[11],
          b44 = be[15];
    fs[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    fs[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    fs[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    fs[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    fs[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    fs[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    fs[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    fs[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    fs[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    fs[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    fs[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    fs[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    fs[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    fs[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    fs[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    fs[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  }

  multiply(ma, mb = null) {
    if (ma != null && mb != null) {
      return this.multiplyMatrices(ma, mb);
    } else if (ma != null) {
      return this.multiplyMatrices(this, ma);
    }

    return this;
  }

  premultiply(m) {
    if (m != this && m != null) {
      return this.multiplyMatrices(m, this);
    }

    return this;
  }

  append(lhs) {
    let lfs32 = lhs.getLocalFS32();
    let fs = this.m_localFS32;
    let m111 = fs[0];
    let m121 = fs[4];
    let m131 = fs[8];
    let m141 = fs[12];
    let m112 = fs[1];
    let m122 = fs[5];
    let m132 = fs[9];
    let m142 = fs[13];
    let m113 = fs[2];
    let m123 = fs[6];
    let m133 = fs[10];
    let m143 = fs[14];
    let m114 = fs[3];
    let m124 = fs[7];
    let m134 = fs[11];
    let m144 = fs[15];
    let m211 = lfs32[0];
    let m221 = lfs32[4];
    let m231 = lfs32[8];
    let m241 = lfs32[12];
    let m212 = lfs32[1];
    let m222 = lfs32[5];
    let m232 = lfs32[9];
    let m242 = lfs32[13];
    let m213 = lfs32[2];
    let m223 = lfs32[6];
    let m233 = lfs32[10];
    let m243 = lfs32[14];
    let m214 = lfs32[3];
    let m224 = lfs32[7];
    let m234 = lfs32[11];
    let m244 = lfs32[15];
    fs[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
    fs[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
    fs[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
    fs[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
    fs[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
    fs[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
    fs[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
    fs[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
    fs[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
    fs[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
    fs[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
    fs[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
    fs[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
    fs[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
    fs[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
    fs[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
  }

  append3x3(lhs) {
    let lfs32 = lhs.getLocalFS32();
    let fs = this.m_localFS32;
    let m111 = fs[0];
    let m121 = fs[4];
    let m131 = fs[8];
    let m112 = fs[1];
    let m122 = fs[5];
    let m132 = fs[9];
    let m113 = fs[2];
    let m123 = fs[6];
    let m133 = fs[10];
    let m211 = lfs32[0];
    let m221 = lfs32[4];
    let m231 = lfs32[8];
    let m212 = lfs32[1];
    let m222 = lfs32[5];
    let m232 = lfs32[9];
    let m213 = lfs32[2];
    let m223 = lfs32[6];
    let m233 = lfs32[10];
    fs[0] = m111 * m211 + m112 * m221 + m113 * m231;
    fs[1] = m111 * m212 + m112 * m222 + m113 * m232;
    fs[2] = m111 * m213 + m112 * m223 + m113 * m233;
    fs[4] = m121 * m211 + m122 * m221 + m123 * m231;
    fs[5] = m121 * m212 + m122 * m222 + m123 * m232;
    fs[6] = m121 * m213 + m122 * m223 + m123 * m233;
    fs[8] = m131 * m211 + m132 * m221 + m133 * m231;
    fs[9] = m131 * m212 + m132 * m222 + m133 * m232;
    fs[10] = m131 * m213 + m132 * m223 + m133 * m233;
  }

  appendRotationPivot(radian, axis, pivotPoint = null) {
    if (pivotPoint == null) {
      pivotPoint = Vector3D_1.default.Z_AXIS;
    }

    Matrix4.s_tMat4.identity();
    Matrix4.s_tMat4.getAxisRotation(axis.x, axis.y, axis.z, radian);
    Matrix4.s_tMat4.appendTranslationXYZ(pivotPoint.x, pivotPoint.y, pivotPoint.z);
    this.append(Matrix4.s_tMat4);
  }

  appendRotation(radian, axis) {
    Matrix4.s_tMat4.identity();
    Matrix4.s_tMat4.getAxisRotation(axis.x, axis.y, axis.z, radian);
    this.append(Matrix4.s_tMat4);
  }

  appendRotationX(radian) {
    Matrix4.s_tMat4.rotationX(radian);
    this.append3x3(Matrix4.s_tMat4);
  }

  appendRotationY(radian) {
    Matrix4.s_tMat4.rotationY(radian);
    this.append3x3(Matrix4.s_tMat4);
  }

  appendRotationZ(radian) {
    Matrix4.s_tMat4.rotationZ(radian);
    this.append3x3(Matrix4.s_tMat4);
  } // 用欧拉角形式旋转(heading->pitch->bank) => (y->x->z)


  appendRotationEulerAngle(radianX, radianY, radianZ) {
    Matrix4.s_tMat4.rotationY(radianY);
    this.append3x3(Matrix4.s_tMat4);
    Matrix4.s_tMat4.rotationX(radianX);
    this.append3x3(Matrix4.s_tMat4);
    Matrix4.s_tMat4.rotationZ(radianZ);
    this.append3x3(Matrix4.s_tMat4);
  }

  setScale(v3) {
    let fs = this.m_localFS32;
    fs[0] = v3.x;
    fs[5] = v3.y;
    fs[10] = v3.z;
    return this;
  }

  setScaleXYZ(xScale, yScale, zScale) {
    let fs = this.m_localFS32;
    fs[0] = xScale;
    fs[5] = yScale;
    fs[10] = zScale;
  }

  getScale(outV3) {
    let fs = this.m_localFS32;
    outV3.x = fs[0];
    outV3.y = fs[5];
    outV3.z = fs[10];
  }

  setRotationEulerAngle(radianX, radianY, radianZ) {
    let fs = this.m_localFS32; //let sx:number = fs[0];
    //let sy:number = fs[5];
    //let sz:number = fs[10];

    let cosX = Math.cos(radianX);
    let sinX = Math.sin(radianX);
    let cosY = Math.cos(radianY);
    let sinY = Math.sin(radianY);
    let cosZ = Math.cos(radianZ);
    let sinZ = Math.sin(radianZ);
    let cosZsinY = cosZ * sinY;
    let sinZsinY = sinZ * sinY;
    let cosYscaleX = cosY * fs[0];
    let sinXscaleY = sinX * fs[5];
    let cosXscaleY = cosX * fs[5];
    let cosXscaleZ = cosX * fs[10];
    let sinXscaleZ = sinX * fs[10];
    fs[1] = sinZ * cosYscaleX;
    fs[2] = -sinY * fs[0];
    fs[0] = cosZ * cosYscaleX;
    fs[4] = cosZsinY * sinXscaleY - sinZ * cosXscaleY;
    fs[8] = cosZsinY * cosXscaleZ + sinZ * sinXscaleZ;
    fs[5] = sinZsinY * sinXscaleY + cosZ * cosXscaleY;
    fs[9] = sinZsinY * cosXscaleZ - cosZ * sinXscaleZ;
    fs[6] = cosY * sinXscaleY;
    fs[10] = cosY * cosXscaleZ;
  }

  setRotationEulerAngle2(cosX, sinX, cosY, sinY, cosZ, sinZ) {
    let fs = this.m_localFS32; //let sx:number = fs[0];
    //let sy:number = fs[5];
    //let sz:number = fs[10];
    //	let cosX: number = Math.cos(radianX);
    //	let sinX:number = Math.sin(radianX);
    //	let cosY:number = Math.cos(radianY);
    //	let sinY:number = Math.sin(radianY);
    //	let cosZ:number = Math.cos(radianZ);
    //	let sinZ:number = Math.sin(radianZ);

    let cosZsinY = cosZ * sinY;
    let sinZsinY = sinZ * sinY;
    let cosYscaleX = cosY * fs[0];
    let sinXscaleY = sinX * fs[5];
    let cosXscaleY = cosX * fs[5];
    let cosXscaleZ = cosX * fs[10];
    let sinXscaleZ = sinX * fs[10];
    fs[1] = sinZ * cosYscaleX;
    fs[2] = -sinY * fs[0];
    fs[0] = cosZ * cosYscaleX;
    fs[4] = cosZsinY * sinXscaleY - sinZ * cosXscaleY;
    fs[8] = cosZsinY * cosXscaleZ + sinZ * sinXscaleZ;
    fs[5] = sinZsinY * sinXscaleY + cosZ * cosXscaleY;
    fs[9] = sinZsinY * cosXscaleZ - cosZ * sinXscaleZ;
    fs[6] = cosY * sinXscaleY;
    fs[10] = cosY * cosXscaleZ;
  }

  compose(position, quaternion, scale) {
    const fs = this.m_localFS32;
    const x = quaternion.x,
          y = quaternion.y,
          z = quaternion.z,
          w = quaternion.w;
    const x2 = x + x,
          y2 = y + y,
          z2 = z + z;
    const xx = x * x2,
          xy = x * y2,
          xz = x * z2;
    const yy = y * y2,
          yz = y * z2,
          zz = z * z2;
    const wx = w * x2,
          wy = w * y2,
          wz = w * z2;
    const sx = scale.x,
          sy = scale.y,
          sz = scale.z;
    fs[0] = (1 - (yy + zz)) * sx;
    fs[1] = (xy + wz) * sx;
    fs[2] = (xz - wy) * sx;
    fs[3] = 0;
    fs[4] = (xy - wz) * sy;
    fs[5] = (1 - (xx + zz)) * sy;
    fs[6] = (yz + wx) * sy;
    fs[7] = 0;
    fs[8] = (xz + wy) * sz;
    fs[9] = (yz - wx) * sz;
    fs[10] = (1 - (xx + yy)) * sz;
    fs[11] = 0;
    fs[12] = position.x;
    fs[13] = position.y;
    fs[14] = position.z;
    fs[15] = 1;
    return this;
  }

  makeRotationFromQuaternion(q) {
    return this.compose(Vector3D_1.default.ZERO, q, Vector3D_1.default.ONE);
  }

  makeRotationFromEuler(euler) {
    if (euler == null) {
      console.error('Matrix4::makeRotationFromEuler() now expects a Euler rotation rather than a Vector3D and order.');
    }

    const fs = this.m_localFS32;
    const x = euler.x,
          y = euler.y,
          z = euler.z;
    const a = Math.cos(x),
          b = Math.sin(x);
    const c = Math.cos(y),
          d = Math.sin(y);
    const e = Math.cos(z),
          f = Math.sin(z);

    if (euler.order === EulerOrder_1.EulerOrder.XYZ) {
      const ae = a * e,
            af = a * f,
            be = b * e,
            bf = b * f;
      fs[0] = c * e;
      fs[4] = -c * f;
      fs[8] = d;
      fs[1] = af + be * d;
      fs[5] = ae - bf * d;
      fs[9] = -b * c;
      fs[2] = bf - ae * d;
      fs[6] = be + af * d;
      fs[10] = a * c;
    } else if (euler.order === EulerOrder_1.EulerOrder.YXZ) {
      const ce = c * e,
            cf = c * f,
            de = d * e,
            df = d * f;
      fs[0] = ce + df * b;
      fs[4] = de * b - cf;
      fs[8] = a * d;
      fs[1] = a * f;
      fs[5] = a * e;
      fs[9] = -b;
      fs[2] = cf * b - de;
      fs[6] = df + ce * b;
      fs[10] = a * c;
    } else if (euler.order === EulerOrder_1.EulerOrder.ZXY) {
      const ce = c * e,
            cf = c * f,
            de = d * e,
            df = d * f;
      fs[0] = ce - df * b;
      fs[4] = -a * f;
      fs[8] = de + cf * b;
      fs[1] = cf + de * b;
      fs[5] = a * e;
      fs[9] = df - ce * b;
      fs[2] = -a * d;
      fs[6] = b;
      fs[10] = a * c;
    } else if (euler.order === EulerOrder_1.EulerOrder.ZYX) {
      const ae = a * e,
            af = a * f,
            be = b * e,
            bf = b * f;
      fs[0] = c * e;
      fs[4] = be * d - af;
      fs[8] = ae * d + bf;
      fs[1] = c * f;
      fs[5] = bf * d + ae;
      fs[9] = af * d - be;
      fs[2] = -d;
      fs[6] = b * c;
      fs[10] = a * c;
    } else if (euler.order === EulerOrder_1.EulerOrder.YZX) {
      const ac = a * c,
            ad = a * d,
            bc = b * c,
            bd = b * d;
      fs[0] = c * e;
      fs[4] = bd - ac * f;
      fs[8] = bc * f + ad;
      fs[1] = f;
      fs[5] = a * e;
      fs[9] = -b * e;
      fs[2] = -d * e;
      fs[6] = ad * f + bc;
      fs[10] = ac - bd * f;
    } else if (euler.order === EulerOrder_1.EulerOrder.XZY) {
      const ac = a * c,
            ad = a * d,
            bc = b * c,
            bd = b * d;
      fs[0] = c * e;
      fs[4] = -f;
      fs[8] = d * e;
      fs[1] = ac * f + bd;
      fs[5] = a * e;
      fs[9] = ad * f - bc;
      fs[2] = bc * f - ad;
      fs[6] = b * e;
      fs[10] = bd * f + ac;
    } // reset bottom row


    fs[3] = 0;
    fs[7] = 0;
    fs[11] = 0; // reset last column

    fs[12] = 0;
    fs[13] = 0;
    fs[14] = 0;
    fs[15] = 1;
    return this;
  }

  extractRotation(m) {
    // this method does not support reflection matrices
    const fs = this.m_localFS32;
    const me = m.getLocalFS32();
    const v3 = Matrix4.m_v3;
    m.copyColumnTo(0, v3);
    const scaleX = 1.0 / v3.getLength();
    m.copyColumnTo(1, v3);
    const scaleY = 1.0 / v3.getLength();
    m.copyColumnTo(2, v3);
    const scaleZ = 1.0 / v3.getLength();
    fs[0] = me[0] * scaleX;
    fs[1] = me[1] * scaleX;
    fs[2] = me[2] * scaleX;
    fs[3] = 0;
    fs[4] = me[4] * scaleY;
    fs[5] = me[5] * scaleY;
    fs[6] = me[6] * scaleY;
    fs[7] = 0;
    fs[8] = me[8] * scaleZ;
    fs[9] = me[9] * scaleZ;
    fs[10] = me[10] * scaleZ;
    fs[11] = 0;
    fs[12] = 0;
    fs[13] = 0;
    fs[14] = 0;
    fs[15] = 1;
    return this;
  }

  copyTranslation(m) {
    const fs = this.m_localFS32,
          me = m.getLocalFS32();
    fs[12] = me[12];
    fs[13] = me[13];
    fs[14] = me[14];
    return this;
  }

  setTranslationXYZ(px, py, pz) {
    this.m_localFS32[12] = px;
    this.m_localFS32[13] = py;
    this.m_localFS32[14] = pz;
  }

  setTranslation(v3) {
    this.m_localFS32[12] = v3.x;
    this.m_localFS32[13] = v3.y;
    this.m_localFS32[14] = v3.z;
  }

  appendScaleXYZ(xScale, yScale, zScale) {
    const fs = this.m_localFS32;
    fs[0] *= xScale;
    fs[1] *= xScale;
    fs[2] *= xScale;
    fs[3] *= xScale;
    fs[4] *= yScale;
    fs[5] *= yScale;
    fs[6] *= yScale;
    fs[7] *= yScale;
    fs[8] *= zScale;
    fs[9] *= zScale;
    fs[10] *= zScale;
    fs[11] *= zScale;
  }

  appendScaleXY(xScale, yScale) {
    const fs = this.m_localFS32;
    fs[0] *= xScale;
    fs[1] *= xScale;
    fs[2] *= xScale;
    fs[3] *= xScale;
    fs[4] *= yScale;
    fs[5] *= yScale;
    fs[6] *= yScale;
    fs[7] *= yScale;
  }

  appendTranslationXYZ(px, py, pz) {
    this.m_localFS32[12] += px;
    this.m_localFS32[13] += py;
    this.m_localFS32[14] += pz;
  }

  appendTranslation(v3) {
    this.m_localFS32[12] += v3.x;
    this.m_localFS32[13] += v3.y;
    this.m_localFS32[14] += v3.z;
  }

  copyColumnFrom(column_index, v3) {
    const fs = this.m_localFS32;

    switch (column_index) {
      case 0:
        {
          fs[0] = v3.x;
          fs[1] = v3.y;
          fs[2] = v3.z;
          fs[3] = v3.w;
        }
        break;

      case 1:
        {
          fs[4] = v3.x;
          fs[5] = v3.y;
          fs[6] = v3.z;
          fs[7] = v3.w;
        }
        break;

      case 2:
        {
          fs[8] = v3.x;
          fs[9] = v3.y;
          fs[10] = v3.z;
          fs[11] = v3.w;
        }
        break;

      case 3:
        {
          fs[12] = v3.x;
          fs[13] = v3.y;
          fs[14] = v3.z;
          fs[15] = v3.w;
        }
        break;

      default:
        break;
    }
  }

  copyColumnTo(column_index, outV3) {
    const fs = this.m_localFS32;
    column_index <<= 2;
    outV3.x = fs[column_index];
    outV3.y = fs[1 + column_index];
    outV3.z = fs[2 + column_index];
    outV3.w = fs[3 + column_index];
  }

  setF32ArrAndIndex(fs32Arr, index = 0) {
    if (fs32Arr != null && index >= 0) {
      this.m_fs32 = fs32Arr;
      this.m_index = index;
      this.m_localFS32 = this.m_fs32.subarray(index, index + 16);
    }
  }

  setF32ArrIndex(index = 0) {
    if (index >= 0) {
      this.m_index = index;
      this.m_localFS32 = this.m_fs32.subarray(index, index + 16);
    }
  }

  setF32Arr(fs32Arr) {
    if (fs32Arr != null) {
      this.m_fs32 = fs32Arr;
    }
  }

  copyFromF32Arr(fs32Arr, index = 0) {
    //let subArr:Float32Array = fs32Arr.subarray(index, index + 16);
    //this.m_localFS32.set(fs32Arr.subarray(index, index + 16), 0);
    let i = 0;

    for (let end = index + 16; index < end; index++) {
      this.m_localFS32[i] = fs32Arr[index];
      ++i;
    }
  }

  copyToF32Arr(fs32Arr, index = 0) {
    fs32Arr.set(this.m_localFS32, index);
  }

  copy(smat) {
    this.m_localFS32.set(smat.getLocalFS32(), 0);
    return this;
  }

  copyFrom(smat) {
    this.m_localFS32.set(smat.getLocalFS32(), 0);
  }

  copyTo(dmat) {
    //dmat.copyFrom(this);
    dmat.getLocalFS32().set(this.getLocalFS32(), 0);
  }

  copyRawDataFrom(float_rawDataArr, rawDataLength = 16, index = 0, bool_tp = false) {
    if (bool_tp) this.transpose();
    rawDataLength = rawDataLength - index;
    let c = 0;

    while (c < rawDataLength) {
      this.m_fs32[this.m_index + c] = float_rawDataArr[c + index];
      ++c;
    }

    if (bool_tp) this.transpose();
  }

  copyRawDataTo(float_rawDataArr, rawDataLength = 16, index = 0, bool_tp = false) {
    if (bool_tp) this.transpose();
    let c = 0;

    while (c < rawDataLength) {
      float_rawDataArr[c + index] = this.m_fs32[this.m_index + c];
      ++c;
    }

    if (bool_tp) this.transpose();
  }

  copyRowFrom(row_index, v3) {
    const fs = this.m_localFS32;

    switch (row_index) {
      case 0:
        {
          fs[0] = v3.x;
          fs[4] = v3.y;
          fs[8] = v3.z;
          fs[12] = v3.w;
        }
        break;

      case 1:
        {
          fs[1] = v3.x;
          fs[5] = v3.y;
          fs[9] = v3.z;
          fs[13] = v3.w;
        }
        break;

      case 2:
        {
          fs[2] = v3.x;
          fs[6] = v3.y;
          fs[10] = v3.z;
          fs[14] = v3.w;
        }
        break;

      case 3:
        {
          fs[3] = v3.x;
          fs[7] = v3.y;
          fs[11] = v3.z;
          fs[15] = v3.w;
        }
        break;

      default:
        break;
    }
  }

  copyRowTo(row_index, v3) {
    const fs = this.m_localFS32;
    v3.x = fs[row_index];
    v3.y = fs[4 + row_index];
    v3.z = fs[8 + row_index];
    v3.w = fs[12 + row_index];
  }
  /**
   * @param orientationStyle the value example: OrientationType.EULER_ANGLES
   * @returns [position, rotation, scale]
   */


  decompose(orientationStyle) {
    // TODO: optimize after 4 lines
    let vec = [];
    let mr = Matrix4.s_tMat4;
    let rfs = mr.getLocalFS32(); //let mrfsI = mr.getFSIndex();
    //std::memcpy(&mr, m_rawData, m_rawDataSize);

    mr.copyFrom(this); ///*

    let pos = new Vector3D_1.default(rfs[12], rfs[13], rfs[14]);
    let scale = new Vector3D_1.default();
    scale.x = Math.sqrt(rfs[0] * rfs[0] + rfs[1] * rfs[1] + rfs[2] * rfs[2]);
    scale.y = Math.sqrt(rfs[4] * rfs[4] + rfs[5] * rfs[5] + rfs[6] * rfs[6]);
    scale.z = Math.sqrt(rfs[8] * rfs[8] + rfs[9] * rfs[9] + rfs[10] * rfs[10]);
    if (rfs[0] * (rfs[5] * rfs[10] - rfs[6] * rfs[9]) - rfs[1] * (rfs[4] * rfs[10] - rfs[6] * rfs[8]) + rfs[2] * (rfs[4] * rfs[9] - rfs[5] * rfs[8]) < 0) scale.z = -scale.z;
    rfs[0] /= scale.x;
    rfs[1] /= scale.x;
    rfs[2] /= scale.x;
    rfs[4] /= scale.y;
    rfs[5] /= scale.y;
    rfs[6] /= scale.y;
    rfs[8] /= scale.z;
    rfs[9] /= scale.z;
    rfs[10] /= scale.z;
    let rot = new Vector3D_1.default();

    switch (orientationStyle) {
      case OrientationType_1.default.AXIS_ANGLE:
        {
          rot.w = MathConst_1.default.SafeACos((rfs[0] + rfs[5] + rfs[10] - 1) / 2);
          let len = Math.sqrt((rfs[6] - rfs[9]) * (rfs[6] - rfs[9]) + (rfs[8] - rfs[2]) * (rfs[8] - rfs[2]) + (rfs[1] - rfs[4]) * (rfs[1] - rfs[4]));

          if (len > MathConst_1.default.MATH_MIN_POSITIVE) {
            rot.x = (rfs[6] - rfs[9]) / len;
            rot.y = (rfs[8] - rfs[2]) / len;
            rot.z = (rfs[1] - rfs[4]) / len;
          } else rot.x = rot.y = rot.z = 0;
        }
        break;

      case OrientationType_1.default.QUATERNION:
        {
          let tr = rfs[0] + rfs[5] + rfs[10];

          if (tr > 0) {
            rot.w = Math.sqrt(1 + tr) / 2;
            rot.x = (rfs[6] - rfs[9]) / (4 * rot.w);
            rot.y = (rfs[8] - rfs[2]) / (4 * rot.w);
            rot.z = (rfs[1] - rfs[4]) / (4 * rot.w);
          } else if (rfs[0] > rfs[5] && rfs[0] > rfs[10]) {
            rot.x = Math.sqrt(1 + rfs[0] - rfs[5] - rfs[10]) / 2;
            rot.w = (rfs[6] - rfs[9]) / (4 * rot.x);
            rot.y = (rfs[1] + rfs[4]) / (4 * rot.x);
            rot.z = (rfs[8] + rfs[2]) / (4 * rot.x);
          } else if (rfs[5] > rfs[10]) {
            rot.y = Math.sqrt(1 + rfs[5] - rfs[0] - rfs[10]) / 2;
            rot.x = (rfs[1] + rfs[4]) / (4 * rot.y);
            rot.w = (rfs[8] - rfs[2]) / (4 * rot.y);
            rot.z = (rfs[6] + rfs[9]) / (4 * rot.y);
          } else {
            rot.z = Math.sqrt(1 + rfs[10] - rfs[0] - rfs[5]) / 2;
            rot.x = (rfs[8] + rfs[2]) / (4 * rot.z);
            rot.y = (rfs[6] + rfs[9]) / (4 * rot.z);
            rot.w = (rfs[1] - rfs[4]) / (4 * rot.z);
          }
        }
        break;

      case OrientationType_1.default.EULER_ANGLES:
        {
          rot.y = Math.asin(-rfs[2]);

          if (rfs[2] != 1 && rfs[2] != -1) {
            rot.x = Math.atan2(rfs[6], rfs[10]);
            rot.z = Math.atan2(rfs[1], rfs[0]);
          } else {
            rot.z = 0;
            rot.x = Math.atan2(rfs[4], rfs[5]);
          }
        }
        break;

      default:
        break;
    }

    ;
    vec.push(pos);
    vec.push(rot);
    vec.push(scale);
    mr = null;
    return vec;
  }

  invert() {
    let d = this.determinant();
    let invertable = Math.abs(d) > MathConst_1.default.MATH_MIN_POSITIVE;

    if (invertable) {
      let fs = this.m_localFS32;
      d = 1.0 / d;
      let m11 = fs[0];
      let m21 = fs[4];
      let m31 = fs[8];
      let m41 = fs[12];
      let m12 = fs[1];
      let m22 = fs[5];
      let m32 = fs[9];
      let m42 = fs[13];
      let m13 = fs[2];
      let m23 = fs[6];
      let m33 = fs[10];
      let m43 = fs[14];
      let m14 = fs[3];
      let m24 = fs[7];
      let m34 = fs[11];
      let m44 = fs[15];
      fs[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
      fs[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
      fs[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
      fs[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
      fs[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
      fs[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
      fs[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
      fs[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
      fs[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
      fs[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
      fs[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
      fs[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
      fs[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
      fs[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
      fs[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
      fs[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
    }

    ;
    return invertable;
  }

  invertThis() {
    this.invert();
    return this;
  }

  pointAt(pos, at, up) {
    //TODO: need optimize
    if (at == null) at = new Vector3D_1.default(0.0, 0.0, -1.0);
    if (up == null) up = new Vector3D_1.default(0.0, -1.0, 0.0);
    let dir = at.subtract(pos);
    let vup = up.clone(); //Vector3D right;

    dir.normalize();
    vup.normalize();
    let dir2 = dir.clone().scaleBy(vup.dot(dir));
    vup.subtractBy(dir2);
    if (vup.getLength() > MathConst_1.default.MATH_MIN_POSITIVE) vup.normalize();else if (dir.x != 0) vup.setTo(-dir.y, dir.x, 0);else vup.setTo(1, 0, 0);
    let right = vup.crossProduct(dir);
    right.normalize();
    let fs = this.m_localFS32;
    fs[0] = right.x;
    fs[4] = right.y;
    fs[8] = right.z;
    fs[12] = 0.0;
    fs[1] = vup.x;
    fs[5] = vup.y;
    fs[9] = vup.z;
    fs[13] = 0.0;
    fs[2] = dir.x;
    fs[6] = dir.y;
    fs[10] = dir.z;
    fs[14] = 0.0;
    fs[3] = pos.x;
    fs[7] = pos.y;
    fs[11] = pos.z;
    fs[15] = 1.0;
  }

  prepend(rhs) {
    let rfs32 = rhs.getLocalFS32();
    let fs = this.m_localFS32;
    let m111 = rfs32[0];
    let m121 = rfs32[4];
    let m131 = rfs32[8];
    let m141 = rfs32[12];
    let m112 = rfs32[1];
    let m122 = rfs32[5];
    let m132 = rfs32[9];
    let m142 = rfs32[13];
    let m113 = rfs32[2];
    let m123 = rfs32[6];
    let m133 = rfs32[10];
    let m143 = rfs32[14];
    let m114 = rfs32[3];
    let m124 = rfs32[7];
    let m134 = rfs32[11];
    let m144 = rfs32[15];
    let m211 = fs[0];
    let m221 = fs[4];
    let m231 = fs[8];
    let m241 = fs[12];
    let m212 = fs[1];
    let m222 = fs[5];
    let m232 = fs[9];
    let m242 = fs[13];
    let m213 = fs[2];
    let m223 = fs[6];
    let m233 = fs[10];
    let m243 = fs[14];
    let m214 = fs[3];
    let m224 = fs[7];
    let m234 = fs[11];
    let m244 = fs[15];
    fs[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
    fs[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
    fs[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
    fs[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
    fs[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
    fs[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
    fs[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
    fs[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
    fs[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
    fs[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
    fs[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
    fs[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
    fs[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
    fs[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
    fs[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
    fs[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
  }

  prepend3x3(rhs) {
    let rfs32 = rhs.getLocalFS32();
    let fs = this.m_localFS32;
    let m111 = rfs32[0];
    let m121 = rfs32[4];
    let m131 = rfs32[8];
    let m112 = rfs32[1];
    let m122 = rfs32[5];
    let m132 = rfs32[9];
    let m113 = rfs32[2];
    let m123 = rfs32[6];
    let m133 = rfs32[10];
    let m211 = fs[0];
    let m221 = fs[4];
    let m231 = fs[8];
    let m212 = fs[1];
    let m222 = fs[5];
    let m232 = fs[9];
    let m213 = fs[2];
    let m223 = fs[6];
    let m233 = fs[10];
    fs[0] = m111 * m211 + m112 * m221 + m113 * m231;
    fs[1] = m111 * m212 + m112 * m222 + m113 * m232;
    fs[2] = m111 * m213 + m112 * m223 + m113 * m233;
    fs[4] = m121 * m211 + m122 * m221 + m123 * m231;
    fs[5] = m121 * m212 + m122 * m222 + m123 * m232;
    fs[6] = m121 * m213 + m122 * m223 + m123 * m233;
    fs[8] = m131 * m211 + m132 * m221 + m133 * m231;
    fs[9] = m131 * m212 + m132 * m222 + m133 * m232;
    fs[10] = m131 * m213 + m132 * m223 + m133 * m233;
  }

  prependRotationPivot(radian, axis, pivotPoint) {
    Matrix4.s_tMat4.identity();
    Matrix4.s_tMat4.getAxisRotation(axis.x, axis.y, axis.z, radian);
    Matrix4.s_tMat4.appendTranslationXYZ(pivotPoint.x, pivotPoint.y, pivotPoint.z);
    this.prepend(Matrix4.s_tMat4);
  }

  prependRotation(radian, axis) {
    Matrix4.s_tMat4.identity();
    Matrix4.s_tMat4.getAxisRotation(axis.x, axis.y, axis.z, radian);
    this.prepend(Matrix4.s_tMat4);
  }

  prependRotationX(radian) {
    //s_tempMat.identity();
    Matrix4.s_tMat4.rotationX(radian);
    this.prepend3x3(Matrix4.s_tMat4);
  }

  prependRotationY(radian) {
    //s_tempMat.identity();
    Matrix4.s_tMat4.rotationY(radian);
    this.prepend3x3(Matrix4.s_tMat4);
  }

  prependRotationZ(radian) {
    //s_tempMat.identity();
    Matrix4.s_tMat4.rotationZ(radian);
    this.prepend3x3(Matrix4.s_tMat4);
  } // 用欧拉角形式旋转(heading->pitch->bank) => (y->x->z)


  prependRotationEulerAngle(radianX, radianY, radianZ) {
    //s_tempMat.identity();
    Matrix4.s_tMat4.rotationY(radianY);
    this.prepend3x3(Matrix4.s_tMat4); //s_tempMat.identity();

    Matrix4.s_tMat4.rotationX(radianX);
    this.prepend3x3(Matrix4.s_tMat4); //s_tempMat.identity();

    Matrix4.s_tMat4.rotationZ(radianZ);
    this.prepend3x3(Matrix4.s_tMat4);
  }

  prependScale(xScale, yScale, zScale) {
    const fs = this.m_localFS32;
    fs[0] *= xScale;
    fs[1] *= yScale;
    fs[2] *= zScale;
    fs[4] *= xScale;
    fs[5] *= yScale;
    fs[6] *= zScale;
    fs[8] *= xScale;
    fs[9] *= yScale;
    fs[10] *= zScale;
    fs[12] *= xScale;
    fs[13] *= yScale;
    fs[14] *= zScale;
  }

  prependScaleXY(xScale, yScale) {
    const fs = this.m_localFS32;
    fs[0] *= xScale;
    fs[1] *= yScale;
    fs[4] *= xScale;
    fs[5] *= yScale;
    fs[8] *= xScale;
    fs[9] *= yScale;
    fs[12] *= xScale;
    fs[13] *= yScale;
  }

  prependTranslationXYZ(px, py, pz) {
    Matrix4.s_tMat4.identity(); //Matrix4.s_tMat4.setPositionXYZ(px, py, pz);

    this.prepend(Matrix4.s_tMat4);
  }

  prependTranslation(v3) {
    Matrix4.s_tMat4.identity(); //Matrix4.s_tMat4.setPositionXYZ(v3.x, v3.y, v3.z);

    this.prepend(Matrix4.s_tMat4);
  }

  recompose(components, orientationStyle) {
    if (components.length < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) return false;
    this.identity();
    let scale = Matrix4.s_tMat4.getFS32();
    scale[0] = scale[1] = scale[2] = components[2].x;
    scale[4] = scale[5] = scale[6] = components[2].y;
    scale[8] = scale[9] = scale[10] = components[2].z;
    let fs = this.m_localFS32;

    switch (orientationStyle) {
      case OrientationType_1.default.EULER_ANGLES:
        {
          let cx = Math.cos(components[1].x);
          let cy = Math.cos(components[1].y);
          let cz = Math.cos(components[1].z);
          let sx = Math.sin(components[1].x);
          let sy = Math.sin(components[1].y);
          let sz = Math.sin(components[1].z);
          fs[0] = cy * cz * scale[0];
          fs[1] = cy * sz * scale[1];
          fs[2] = -sy * scale[2];
          fs[3] = 0;
          fs[4] = (sx * sy * cz - cx * sz) * scale[4];
          fs[5] = (sx * sy * sz + cx * cz) * scale[5];
          fs[6] = sx * cy * scale[6];
          fs[7] = 0;
          fs[8] = (cx * sy * cz + sx * sz) * scale[8];
          fs[9] = (cx * sy * sz - sx * cz) * scale[9];
          fs[10] = cx * cy * scale[10];
          fs[11] = 0;
          fs[12] = components[0].x;
          fs[13] = components[0].y;
          fs[14] = components[0].z;
          fs[15] = 1;
        }
        break;

      default:
        {
          let x = components[1].x;
          let y = components[1].y;
          let z = components[1].z;
          let w = components[1].w;

          if (orientationStyle == OrientationType_1.default.AXIS_ANGLE) {
            let halfW = 0.5 * w;
            x *= Math.sin(halfW);
            y *= Math.sin(halfW);
            z *= Math.sin(halfW);
            w = Math.cos(halfW);
          }

          ;
          fs[0] = (1 - 2 * y * y - 2 * z * z) * scale[0];
          fs[1] = (2 * x * y + 2 * w * z) * scale[1];
          fs[2] = (2 * x * z - 2 * w * y) * scale[2];
          fs[3] = 0;
          fs[4] = (2 * x * y - 2 * w * z) * scale[4];
          fs[5] = (1 - 2 * x * x - 2 * z * z) * scale[5];
          fs[6] = (2 * y * z + 2 * w * x) * scale[6];
          fs[7] = 0;
          fs[8] = (2 * x * z + 2 * w * y) * scale[8];
          fs[9] = (2 * y * z - 2 * w * x) * scale[9];
          fs[10] = (1 - 2 * x * x - 2 * y * y) * scale[10];
          fs[11] = 0;
          fs[12] = components[0].x;
          fs[13] = components[0].y;
          fs[14] = components[0].z;
          fs[15] = 1;
        }
        break;
    }

    ; //TODO: need thinking

    if (components[2].x == 0) this.m_localFS32[0] = 0; // 1e-15;

    if (components[2].y == 0) this.m_localFS32[5] = 0; // 1e-15;

    if (components[2].z == 0) this.m_localFS32[10] = 0; // 1e-15;

    scale = null;
    return true;
  }

  setThreeAxes(x_axis, y_axis, z_axis) {
    let vs = this.m_localFS32;
    vs[0] = x_axis.x;
    vs[1] = x_axis.y;
    vs[2] = x_axis.z;
    vs[4] = y_axis.x;
    vs[5] = y_axis.y;
    vs[6] = y_axis.z;
    vs[8] = z_axis.x;
    vs[9] = z_axis.y;
    vs[10] = z_axis.z;
  }

  deltaTransformVector(v3) {
    let x = v3.x;
    let y = v3.y;
    let z = v3.z;
    return new Vector3D_1.default(x * this.m_localFS32[0] + y * this.m_localFS32[4] + z * this.m_localFS32[8], x * this.m_localFS32[1] + y * this.m_localFS32[5] + z * this.m_localFS32[9], x * this.m_localFS32[2] + y * this.m_localFS32[6] + z * this.m_localFS32[10], 0.0);
  }

  deltaTransformVectorSelf(v3) {
    let fs = this.m_localFS32;
    let x = v3.x;
    let y = v3.y;
    let z = v3.z;
    v3.x = x * fs[0] + y * fs[4] + z * fs[8];
    v3.y = x * fs[1] + y * fs[5] + z * fs[9];
    v3.z = x * fs[2] + y * fs[6] + z * fs[10];
  }

  deltaTransformOutVector(v3, out_v3) {
    let fs = this.m_localFS32;
    out_v3.x = v3.x * fs[0] + v3.y * fs[4] + v3.z * fs[8];
    out_v3.y = v3.x * fs[1] + v3.y * fs[5] + v3.z * fs[9];
    out_v3.z = v3.x * fs[2] + v3.y * fs[6] + v3.z * fs[10];
  }

  transformVector(v3) {
    let fs = this.m_localFS32;
    let x = v3.x;
    let y = v3.y;
    let z = v3.z;
    return new Vector3D_1.default(x * fs[0] + y * fs[4] + z * fs[8] + fs[12], x * fs[1] + y * fs[5] + z * fs[9] + fs[13], x * fs[2] + y * fs[6] + z * fs[10] + fs[14], x * fs[3] + y * fs[7] + z * fs[11] + fs[15]);
  }

  transformOutVector(v3, out_v3) {
    let x = v3.x;
    let y = v3.y;
    let z = v3.z;
    let fs = this.m_localFS32;
    out_v3.setTo(x * fs[0] + y * fs[4] + z * fs[8] + fs[12], x * fs[1] + y * fs[5] + z * fs[9] + fs[13], x * fs[2] + y * fs[6] + z * fs[10] + fs[14], x * fs[3] + y * fs[7] + z * fs[11] + fs[15]);
  }

  transformOutVector3(v3, out_v3) {
    let fs = this.m_localFS32;
    out_v3.x = v3.x * fs[0] + v3.y * fs[4] + v3.z * fs[8] + fs[12];
    out_v3.y = v3.x * fs[1] + v3.y * fs[5] + v3.z * fs[9] + fs[13];
    out_v3.z = v3.x * fs[2] + v3.y * fs[6] + v3.z * fs[10] + fs[14];
  }

  transformVector3Self(v3) {
    let x = v3.x;
    let y = v3.y;
    let z = v3.z;
    let fs = this.m_localFS32;
    v3.x = x * fs[0] + y * fs[4] + z * fs[8] + fs[12];
    v3.y = x * fs[1] + y * fs[5] + z * fs[9] + fs[13];
    v3.z = x * fs[2] + y * fs[6] + z * fs[10] + fs[14];
  }

  transformVectorSelf(v3) {
    let x = v3.x;
    let y = v3.y;
    let z = v3.z;
    let fs = this.m_localFS32;
    v3.setTo(x * fs[0] + y * fs[4] + z * fs[8] + fs[12], x * fs[1] + y * fs[5] + z * fs[9] + fs[13], x * fs[2] + y * fs[6] + z * fs[10] + fs[14], x * fs[3] + y * fs[7] + z * fs[11] + fs[15]);
  }

  transformVectors(float_vinArr, vinLength, float_voutArr) {
    let i = 0;
    let x, y, z;
    let pfs = this.m_localFS32;
    vinLength -= 3;

    while (i <= vinLength) {
      x = float_vinArr[i];
      y = float_vinArr[i + 1];
      z = float_vinArr[i + 2];
      float_voutArr[i] = x * pfs[0] + y * pfs[4] + z * pfs[8] + pfs[12];
      float_voutArr[i + 1] = x * pfs[1] + y * pfs[5] + z * pfs[9] + pfs[13];
      float_voutArr[i + 2] = x * pfs[2] + y * pfs[6] + z * pfs[10] + pfs[14];
      i += 3;
    }
  }

  transformVectorsSelf(float_vinArr, vinLength) {
    let i = 0;
    let x, y, z;
    let pfs = this.m_localFS32;
    vinLength -= 3;

    while (i <= vinLength) {
      x = float_vinArr[i];
      y = float_vinArr[i + 1];
      z = float_vinArr[i + 2];
      float_vinArr[i] = x * pfs[0] + y * pfs[4] + z * pfs[8] + pfs[12];
      float_vinArr[i + 1] = x * pfs[1] + y * pfs[5] + z * pfs[9] + pfs[13];
      float_vinArr[i + 2] = x * pfs[2] + y * pfs[6] + z * pfs[10] + pfs[14];
      i += 3;
    }
  }

  transformVectorsRangeSelf(float_vinArr, begin, end) {
    let i = begin;
    let x, y, z;
    let pfs = this.m_localFS32;
    end -= 3;

    while (i <= end) {
      x = float_vinArr[i];
      y = float_vinArr[i + 1];
      z = float_vinArr[i + 2];
      float_vinArr[i] = x * pfs[0] + y * pfs[4] + z * pfs[8] + pfs[12];
      float_vinArr[i + 1] = x * pfs[1] + y * pfs[5] + z * pfs[9] + pfs[13];
      float_vinArr[i + 2] = x * pfs[2] + y * pfs[6] + z * pfs[10] + pfs[14];
      i += 3;
    }
  }

  transpose() {
    Matrix4.s_tMat4.copyFrom(this);
    let fs32 = Matrix4.s_tMat4.getFS32();
    let fs = this.m_localFS32;
    fs[1] = fs32[4];
    fs[2] = fs32[8];
    fs[3] = fs32[12];
    fs[4] = fs32[1];
    fs[6] = fs32[9];
    fs[7] = fs32[13];
    fs[8] = fs32[2];
    fs[9] = fs32[6];
    fs[11] = fs32[14];
    fs[12] = fs32[3];
    fs[13] = fs32[7];
    fs[14] = fs32[11];
  }

  interpolateTo(toMat, float_percent) {
    let fs32 = toMat.getFS32();
    let fsI = toMat.getFSIndex();
    let _g = 0;
    let i = this.m_index;

    while (_g < 16) {
      this.m_fs32[i] += (fs32[fsI + _g] - this.m_fs32[i]) * float_percent;
      ++i;
      ++_g;
    }
  }

  getAxisRotation(x, y, z, radian) {
    radian = -radian;
    let fs = this.m_localFS32;
    let s = Math.sin(radian),
        c = Math.cos(radian);
    let t = 1.0 - c;
    fs[0] = c + x * x * t;
    fs[5] = c + y * y * t;
    fs[10] = c + z * z * t;
    let tmp1 = x * y * t;
    let tmp2 = z * s;
    fs[4] = tmp1 + tmp2;
    fs[1] = tmp1 - tmp2;
    tmp1 = x * z * t;
    tmp2 = y * s;
    fs[8] = tmp1 - tmp2;
    fs[2] = tmp1 + tmp2;
    tmp1 = y * z * t;
    tmp2 = x * s;
    fs[9] = tmp1 + tmp2;
    fs[6] = tmp1 - tmp2;
  }

  rotationX(radian) {
    let s = Math.sin(radian),
        c = Math.cos(radian);
    this.m_localFS32[0] = 1.0;
    this.m_localFS32[1] = 0.0;
    this.m_localFS32[2] = 0.0;
    this.m_localFS32[4] = 0.0;
    this.m_localFS32[5] = c;
    this.m_localFS32[6] = s;
    this.m_localFS32[8] = 0.0;
    this.m_localFS32[9] = -s;
    this.m_localFS32[10] = c;
  }

  rotationY(radian) {
    let s = Math.sin(radian),
        c = Math.cos(radian);
    this.m_localFS32[0] = c;
    this.m_localFS32[1] = 0.0;
    this.m_localFS32[2] = -s;
    this.m_localFS32[4] = 0.0;
    this.m_localFS32[5] = 1.0;
    this.m_localFS32[6] = 0.0;
    this.m_localFS32[8] = s;
    this.m_localFS32[9] = 0.0;
    this.m_localFS32[10] = c;
  }

  rotationZ(radian) {
    let s = Math.sin(radian),
        c = Math.cos(radian);
    this.m_localFS32[0] = c;
    this.m_localFS32[1] = s;
    this.m_localFS32[2] = 0.0;
    this.m_localFS32[4] = -s;
    this.m_localFS32[5] = c;
    this.m_localFS32[6] = 0.0;
    this.m_localFS32[8] = 0.0;
    this.m_localFS32[9] = 0.0;
    this.m_localFS32[10] = 1.0;
  } /////////////////////////////////////////////////////////////


  toString() {
    let str = "\n" + this.m_localFS32[0] + "," + this.m_localFS32[1] + "," + this.m_localFS32[2] + "," + this.m_localFS32[3] + "\n";
    str += this.m_localFS32[4] + "," + this.m_localFS32[5] + "," + this.m_localFS32[6] + "," + this.m_localFS32[7] + "\n";
    str += this.m_localFS32[8] + "," + this.m_localFS32[9] + "," + this.m_localFS32[10] + "," + this.m_localFS32[11] + "\n";
    str += this.m_localFS32[12] + "," + this.m_localFS32[13] + "," + this.m_localFS32[14] + "," + this.m_localFS32[15] + "\n";
    return str;
  }

  transformPerspV4Self(v4) {
    const fs = this.m_localFS32;
    v4.w = v4.z;
    v4.x *= fs[0];
    v4.y *= fs[5];
    v4.z *= fs[10];
    v4.z += fs[14];
    v4.w *= fs[11];
    v4.w += fs[15];
  }

  clone() {
    let m = new Matrix4();
    m.copyFrom(this);
    return m;
  } ///////
  // view etc..
  ///////////////////////////////////////////


  perspectiveRH(fovy, aspect, zNear, zFar) {
    //assert(abs(aspect - std::numeric_limits<float>::epsilon()) > minFloatValue)
    const fs = this.m_localFS32;
    let tanHalfFovy = Math.tan(fovy * 0.5);
    this.identity();
    fs[0] = 1.0 / (aspect * tanHalfFovy);
    fs[5] = 1.0 / tanHalfFovy;
    fs[10] = -(zFar + zNear) / (zFar - zNear);
    fs[11] = -1.0;
    fs[14] = -(2.0 * zFar * zNear) / (zFar - zNear);
  }

  perspectiveRH2(fovy, pw, ph, zNear, zFar) {
    let focalLength = pw / Math.tan(fovy * 0.5);
    let m0 = focalLength / pw;
    let m5 = focalLength / ph;
    let m10 = -zFar / (zFar - zNear);
    let m14 = -zNear * m10;
    this.identity();
    const fs = this.m_localFS32;
    fs[0] = m0;
    fs[5] = m5;
    fs[10] = m10;
    fs[11] = -1.0;
    fs[14] = m14;
  }

  orthoRH(b, t, l, r, zNear, zFar) {
    this.identity();
    const fs = this.m_localFS32;
    fs[0] = 2.0 / (r - l);
    fs[5] = 2.0 / (t - b);
    fs[10] = -2.0 / (zFar - zNear);
    fs[12] = -(r + l) / (r - l);
    fs[13] = -(t + b) / (t - b);
    fs[14] = -(zFar + zNear) / (zFar - zNear);
    fs[15] = 1.0;
  }

  perspectiveLH(fovy, aspect, zNear, zFar) {
    //assert(abs(aspect - std::numeric_limits<float>::epsilon()) > minFloatValue)
    let tanHalfFovy = Math.tan(fovy * 0.5);
    this.identity();
    const fs = this.m_localFS32;
    fs[0] = 1.0 / (aspect * tanHalfFovy);
    fs[5] = 1.0 / tanHalfFovy;
    fs[10] = (zFar + zNear) / (zFar - zNear);
    fs[11] = 1.0;
    fs[14] = 2.0 * zFar * zNear / (zFar - zNear);
  }

  orthoLH(b, t, l, r, zNear, zFar) {
    this.identity();
    const fs = this.m_localFS32;
    fs[0] = 2.0 / (r - l); // / (aspect * tanHalfFovy);

    fs[5] = 2.0 / (t - b); // / tanHalfFovy;

    fs[10] = 2.0 / (zFar - zNear);
    fs[12] = -(r + l) / (r - l);
    fs[13] = -(t + b) / (t - b);
    fs[14] = -(zFar + zNear) / (zFar - zNear);
    fs[15] = 1.0;
  }

  lookAtRH(eyePos, atPos, up) {
    this.identity();
    let f = atPos.subtract(eyePos);
    f.normalize();
    let s = f.crossProduct(up);
    s.normalize();
    let u = s.crossProduct(f);
    s.w = -s.dot(eyePos);
    u.w = -u.dot(eyePos);
    f.w = f.dot(eyePos);
    f.negate();
    this.copyRowFrom(0, s);
    this.copyRowFrom(1, u);
    this.copyRowFrom(2, f);
  }

  lookAtLH(eyePos, atPos, up) {
    this.identity();
    let f = atPos.subtract(eyePos);
    f.normalize();
    let s = f.crossProduct(up);
    s.normalize();
    let u = s.crossProduct(f);
    s.w = -s.dot(eyePos);
    u.w = -u.dot(eyePos);
    f.w = -f.dot(eyePos);
    this.copyRowFrom(0, s);
    this.copyRowFrom(1, u);
    this.copyRowFrom(2, f);
  }

  destroy() {
    this.m_localFS32 = null;
    this.m_fs32 = null;
    this.m_index = -1;
  }

}

Matrix4.s_InitData = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
Matrix4.m_v3 = new Vector3D_1.default();
Matrix4.s_uid = 0;
Matrix4.s_isolatedUid = 0x4ffff;
Matrix4.s_tMat4 = new Matrix4();
exports.default = Matrix4;

/***/ }),

/***/ "1b95":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MaterialPipeline_1 = __webpack_require__("0714");

const SimpleMaterial_1 = __webpack_require__("ee6e");

const Material_1 = __webpack_require__("6c6b");

class RenderableMaterialBlock {
  constructor() {
    this.m_initFlag = true;
  }

  initialize() {
    if (this.m_initFlag) {
      this.m_initFlag = false;
    }
  }

  createMaterial(decorator) {
    let m = new Material_1.Material();
    m.setDecorator(decorator);
    return m;
  }

  createSimpleMaterial(decorator) {
    let m = new SimpleMaterial_1.SimpleMaterial();
    m.setDecorator(decorator);
    return m;
  }

  createMaterialPipeline(shaderLib) {
    return new MaterialPipeline_1.MaterialPipeline(shaderLib);
  }

}

exports.RenderableMaterialBlock = RenderableMaterialBlock;

/***/ }),

/***/ "1d40":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ROVertexBuffer_1 = __importDefault(__webpack_require__("e7d2"));

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const MeshBase_1 = __importDefault(__webpack_require__("cb29"));

const AABB_1 = __importDefault(__webpack_require__("fecb"));
/**
 * rawMesh
 */


class RawMesh extends MeshBase_1.default {
  constructor(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    super(bufDataUsage);
    this.m_dataList = [];
    this.m_rayTester = null;
    this.autoBuilding = true;
    this.ivsEnabled = true;
    this.aabbEnabled = true;
  }

  setRayTester(rayTester) {
    this.m_rayTester = rayTester;
  }

  reset() {
    this.m_dataList = [];
    ROVertexBuffer_1.default.Reset();
  }

  addFloat32Data(fs32, step, status = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    this.m_dataList.push(fs32);
    ROVertexBuffer_1.default.AddFloat32Data(fs32, step, status);
  }

  setIVS(ivs) {
    this.m_ivs = ivs;
  }

  getVS() {
    return this.m_dataList[0];
  }

  getUVS() {
    return this.m_dataList.length > 1 ? this.m_dataList[1] : null;
  }

  getNVS() {
    return this.m_dataList.length > 2 ? this.m_dataList[2] : null;
  }

  initialize() {
    if (this.getBufSortFormat() < 1) {
      console.warn("bufSortFormat is zero!");
    }

    const vs = this.m_dataList[0];
    this.m_ivs = this.m_ivs;
    let rvb = ROVertexBuffer_1.default;
    rvb.vbWholeDataEnabled = this.vbWholeDataEnabled;

    if (this.aabbEnabled && this.autoBuilding && this.m_dataList.length > 0) {
      if (this.bounds == null) {
        this.bounds = new AABB_1.default();
      }

      if (this.m_transMatrix != null) {
        this.m_transMatrix.transformVectorsSelf(vs, vs.length);
      }

      this.bounds.addFloat32Arr(vs);
      this.bounds.updateFast();
    }

    if (this.ivsEnabled) {
      this.vtCount = this.m_ivs.length;

      if (this.autoBuilding) {
        this.updateWireframeIvs();
        this.vtCount = this.m_ivs.length;
      }
    } else {
      this.vtCount = 0;
    }

    ROVertexBuffer_1.default.vbWholeDataEnabled = this.vbWholeDataEnabled;

    if (this.m_vbuf != null) {
      rvb.UpdateBufData(this.m_vbuf);
    } else {
      let u = this.getBufDataUsage();
      let f = this.getBufSortFormat();

      if (this.vbWholeDataEnabled) {
        this.m_vbuf = rvb.CreateBySaveData(u, f);
      } else {
        this.m_vbuf = rvb.CreateBySaveDataSeparate(u);
      }
    }

    if (this.ivsEnabled) {
      this.m_vbuf.setUintIVSData(this.m_ivs);
    }

    this.buildEnd();
  }

  setBufData4fAt(vertexI, attribI, px, py, pz, pw) {
    if (this.m_vbuf != null) {
      this.m_vbuf.setData4fAt(vertexI, attribI, px, py, pz, pw);
    }
  }

  setBufData3fAt(vertexI, attribI, px, py, pz) {
    if (this.m_vbuf != null) {
      this.m_vbuf.setData3fAt(vertexI, attribI, px, py, pz);
    }
  }

  setBufData2fAt(vertexI, attribI, px, py) {
    if (this.m_vbuf != null) {
      this.m_vbuf.setData2fAt(vertexI, attribI, px, py);
    }
  }
  /**
   * 射线和自身的相交检测(多面体或几何函数(例如球体))
   * @rlpv            表示物体坐标空间的射线起点
   * @rltv            表示物体坐标空间的射线朝向
   * @outV            如果检测相交存放物体坐标空间的交点
   * @boundsHit       表示是否包围盒体已经和射线相交了
   * @return          返回值 -1 表示不会进行检测,1表示相交,0表示不相交
   */


  testRay(rlpv, rltv, outV, boundsHit) {
    if (this.m_rayTester != null) {
      return this.m_rayTester.testRay(rlpv, rltv, outV, boundsHit);
    }

    return -1;
  }

  __$destroy() {
    if (this.m_dataList != null) {
      this.m_dataList = [];
    }

    if (this.m_rayTester != null) {
      this.m_rayTester.destroy();
      this.m_rayTester = null;
    }

    super.__$destroy();
  }

}

exports.default = RawMesh;

/***/ }),

/***/ "1eb2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* unused harmony default export */ var _unused_webpack_default_export = (null);


/***/ }),

/***/ "1f61":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RCExtension_1 = __importDefault(__webpack_require__("030e"));

class TextureDataType {
  static ToGL(gl, type) {
    switch (type) {
      case TextureDataType.UNSIGNED_BYTE:
        return gl.UNSIGNED_BYTE;
        break;

      case TextureDataType.BYTE:
        return gl.BYTE;
        break;

      case TextureDataType.FLOAT:
        return gl.FLOAT;
        break;

      case TextureDataType.HALF_FLOAT:
        return gl.HALF_FLOAT;
        break;

      case TextureDataType.HALF_FLOAT_OES:
        if (RCExtension_1.default.OES_texture_half_float != null) return RCExtension_1.default.OES_texture_half_float.HALF_FLOAT_OES;
        return gl.FLOAT;
        break;

      case TextureDataType.UNSIGNED_SHORT:
        return gl.UNSIGNED_SHORT;
        break;

      case TextureDataType.UNSIGNED_INT:
        return gl.UNSIGNED_INT;
        break;

      case TextureDataType.UNSIGNED_SHORT_5_6_5:
        return gl.UNSIGNED_SHORT_5_6_5;
        break;

      case TextureDataType.UNSIGNED_SHORT_4_4_4_4:
        return gl.UNSIGNED_SHORT_4_4_4_4;
        break;

      case TextureDataType.UNSIGNED_SHORT_5_5_5_1:
        return gl.UNSIGNED_SHORT_5_5_5_1;
        break;

      case TextureDataType.UNSIGNED_INT_24_8_WEBGL:
        return RCExtension_1.default.WEBGL_depth_texture.UNSIGNED_INT_24_8_WEBGL;
        break;

      default:
        break;
    }

    return gl.UNSIGNED_BYTE;
  }

}

TextureDataType.UNSIGNED_BYTE = 1108;
TextureDataType.UNSIGNED_SHORT = 1109;
TextureDataType.UNSIGNED_INT = 1110;
TextureDataType.BYTE = 1111;
TextureDataType.FLOAT = 1211;
TextureDataType.HALF_FLOAT = 1212;
TextureDataType.HALF_FLOAT_OES = 1213;
TextureDataType.UNSIGNED_SHORT_5_6_5 = 1214;
TextureDataType.UNSIGNED_SHORT_4_4_4_4 = 1215;
TextureDataType.UNSIGNED_SHORT_5_5_5_1 = 1216;
TextureDataType.UNSIGNED_INT_24_8_WEBGL = 1217;
exports.default = TextureDataType;

/***/ }),

/***/ "20ef":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

class ShdProgram {
  constructor(uid) {
    this.m_shdData = null;
    this.m_uid = -1;
    this.m_program = null;
    this.m_rcuid = -1;
    this.m_gl = null;
    this.m_shdUniqueName = "";
    this.m_texTotal = 0; // recorde uniform GLUniformLocation id

    this.m_aLocations = null;
    this.m_aLocationIVS = new Array(12);
    this.m_aLocationTypes = null;
    this.m_aLocationSizes = null;
    this.m_uLocations = null;
    this.m_texLocations = null;
    this.m_attribLIndexList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.m_attribTypeSizeList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.m_attriSizeList = null;
    this.m_uniformDict = new Map();
    this.m_uLocationDict = new Map();
    this.m_vertShader = null;
    this.m_fragShader = null; // recode shader uniform including status

    this.dataUniformEnabled = false;
    this.m_attrid = 0;
    this.m_attridIndex = 0;
    this.m_uLc = null;
    this.m_uIndex = 0;
    this.m_uid = uid;
    this.m_aLocationIVS.fill(0);
  }

  setShdData(shdData) {
    this.m_shdData = shdData;
    this.m_shdUniqueName = shdData.getUniqueShaderName();
  }

  getUid() {
    return this.m_uid;
  }

  getTexTotal() {
    return this.m_shdData.getTexTotal();
  }

  useTexLocation() {
    for (let i = 0; i < this.m_texTotal; i++) {
      this.m_gl.uniform1i(this.m_texLocations[i], i);
    }
  } // use texture true or false


  haveTexture() {
    return this.m_shdData.haveTexture();
  }

  createLocations() {
    let i = 0;
    let len = 0;
    let attriNSList = this.m_shdData.getAttriNSList();

    if (attriNSList != null && attriNSList.length > 0) {
      if (this.m_aLocations == null) {
        this.dataUniformEnabled = false;
        let attriSizeList = this.m_shdData.getAttriSizeList();
        this.m_aLocations = [];
        this.m_aLocationTypes = [];
        this.m_aLocationSizes = [];
        const ls = this.m_aLocationTypes;
        len = attriNSList.length;
        let type = 0;
        let altI = 0;

        while (i < len) {
          altI = this.m_gl.getAttribLocation(this.m_program, attriNSList[i]);
          this.m_aLocations.push(altI);
          type = VtxBufConst_1.default.GetVBufAttributeTypeByNS(attriNSList[i]);
          ls.push(type);
          this.m_aLocationSizes.push(attriSizeList[i]);
          this.m_attribLIndexList[type] = altI;
          this.m_attribTypeSizeList[type] = attriSizeList[i];
          this.dataUniformEnabled = true;
          ++i;
        }

        for (i = 0; i < ls.length; ++i) {
          this.m_aLocationIVS[ls[i]] = i;
        }

        this.m_attriSizeList = [];

        for (i = 0; i < this.m_attribTypeSizeList.length; ++i) {
          if (this.m_attribTypeSizeList[i] > 0) {
            this.m_attriSizeList.push(this.m_attribTypeSizeList[i]);
          }
        }

        if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
          console.log("ShdProgram(" + this.m_uid + ")::createLocations(), attri aLocationTypes: " + this.m_aLocationTypes);
          console.log("ShdProgram(" + this.m_uid + ")::createLocations(), attri m_aLocations: " + this.m_aLocations);
          console.log("ShdProgram(" + this.m_uid + ")::createLocations(), attriNSList: " + attriNSList);
          console.log("ShdProgram(" + this.m_uid + ")::createLocations(), attribLIndexList: " + this.m_attribLIndexList);
          console.log("ShdProgram(" + this.m_uid + ")::createLocations(), attribTypeSizeList: " + this.m_attribTypeSizeList);
          console.log("ShdProgram(" + this.m_uid + ")::createLocations(), attriSizeList: " + this.m_attriSizeList);
        }
      }
    }

    if (this.m_shdData.haveCommonUniform()) {
      if (this.m_uLocations == null) {
        let uninforms = this.m_shdData.getUniforms();
        this.m_uLocations = [];
        len = uninforms.length;
        i = 0;
        let ul = null;
        let uns = "";

        while (i < len) {
          if (!uninforms[i].isTex) {
            uns = uninforms[i].name;
            ul = this.m_gl.getUniformLocation(this.m_program, uns);

            if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
              console.log("ShdProgram::createLocations() uniform, ul " + ul + ", uninforms[" + i + "].name: " + uns);
            }

            if (ul != null) {
              ul.uniformName = uns;
              ul.uniqueName = this.m_shdUniqueName;
              uninforms[i].location = ul;
              this.m_uniformDict.set(uns, uninforms[i]);
              this.m_uLocationDict.set(uns, ul);
              this.m_uLocations.push(ul);
              this.dataUniformEnabled = true;
            } else {
              if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
                console.warn("uniform ", uns, " was not used!");
              }
            }
          }

          ++i;
        }
      }
    }

    this.m_texTotal = this.m_shdData.getTexTotal();

    if (this.m_texTotal > 0) {
      this.m_texLocations = new Array(this.m_texTotal);
      let texnsList = this.m_shdData.getTexUniformNames();

      for (i = 0; i < this.m_texTotal; ++i) {
        texnsList[i] = "u_sampler" + i;
        this.m_texLocations[i] = this.m_gl.getUniformLocation(this.m_program, texnsList[i]);
      }
    }
  }

  getLayoutBit() {
    return this.m_shdData.getLayoutBit();
  }

  getMid() {
    return this.m_shdData.getMid();
  }

  getFragOutputTotal() {
    return this.m_shdData.getFragOutputTotal();
  }

  getLocationsTotal() {
    return this.m_aLocationTypes.length;
  }

  getLocationTypeByIndex(index) {
    return this.m_aLocationTypes[index];
  }

  getLocationSizeByIndex(index) {
    return this.m_aLocationSizes[index];
  }

  getLocationTypes() {
    return this.m_aLocationTypes;
  }

  getLocationIVS() {
    return this.m_aLocationIVS;
  }

  testVertexAttribPointerOffset(offsetList) {
    let flag = false;

    if (offsetList != null && this.m_attriSizeList != null) {
      // 使用大于等于，例如绘制深度图的时候不需要法线和uv而只需要顶点数据即可
      if (offsetList.length >= this.m_attriSizeList.length) {
        let offset = 0;
        let i = 0;

        for (; i < this.m_attriSizeList.length; ++i) {
          if (offset != offsetList[i]) {
            break;
          }

          offset += this.m_attriSizeList[i] * 4;
        }

        flag = i >= this.m_attriSizeList.length;
      }
    }

    if (!flag) {
      console.error("顶点数据layout和顶点着色器中的layout(" + this.m_attriSizeList + ")不匹配");
      throw Error("Shader program vertx attributes layout can not match float attribute vertex data !!!");
    }

    return flag;
  }

  vertexAttribPointerType(attribType, size, type, normalized, stride, offset) {
    this.m_attrid = this.m_attribLIndexList[attribType];

    if (this.m_attrid > -1) {
      this.m_gl.enableVertexAttribArray(this.m_attrid);
      this.m_gl.vertexAttribPointer(this.m_attrid, this.m_attribTypeSizeList[attribType], type, normalized, stride, offset);
    }
  }

  vertexAttribPointerTypeFloat(attribType, stride, offset) {
    this.m_attrid = this.m_attribLIndexList[attribType];

    if (this.m_attrid > -1) {
      this.m_gl.enableVertexAttribArray(this.m_attrid);
      this.m_gl.vertexAttribPointer(this.m_attrid, this.m_attribTypeSizeList[attribType], this.m_gl.FLOAT, false, stride, offset);
    }
  }

  testVertexAttribPointerType(attribType) {
    return this.m_attribLIndexList[attribType] > -1;
  }

  getVertexAttribByTpye(attribType) {
    return this.m_attribLIndexList[attribType];
  }

  vertexAttribPointerAt(i, size, type, normalized, stride, offset) {
    this.m_attridIndex = i;
    this.m_attrid = this.m_aLocations[i];

    if (this.m_attrid > -1) {
      this.m_gl.enableVertexAttribArray(this.m_attrid);
      this.m_gl.vertexAttribPointer(this.m_attrid, size, type, normalized, stride, offset);
    }
  }

  vertexAttribPointerNext(size, type, normalized, stride, offset) {
    this.m_attrid = this.m_aLocations[this.m_attridIndex];

    if (this.m_attrid > -1) {
      this.m_gl.enableVertexAttribArray(this.m_attrid);
      this.m_gl.vertexAttribPointer(this.m_attrid, size, type, normalized, stride, offset);
    }

    this.m_attridIndex++;
  }

  vertexAttribPointerFirst(size, type, normalized, stride, offset) {
    this.m_attridIndex = 1;
    this.m_attrid = this.m_aLocations[0];

    if (this.m_attrid > -1) {
      this.m_gl.enableVertexAttribArray(this.m_attrid);
      this.m_gl.vertexAttribPointer(this.m_attrid, size, type, normalized, stride, offset);
    }
  }

  getUniformLocationAt(i) {
    this.m_uIndex = i + 1;
    return this.m_uLocations[i];
  }

  getUniformLocationNext() {
    this.m_uLc = this.m_uLocations[this.m_uIndex++];
    return this.m_uLc;
  }

  getUniformLocationFirst() {
    this.m_uIndex = 1;
    return this.m_uLocations[0];
  }

  getUniformLocationByNS(ns) {
    return this.m_uLocationDict.get(ns);
  }

  getUniformTypeNameByNS(ns) {
    if (this.m_uniformDict.has(ns)) {
      return this.m_uniformDict.get(ns).typeName;
    }

    return "";
  }

  getUniformTypeByNS(ns) {
    if (this.m_uniformDict.has(ns)) {
      return this.m_uniformDict.get(ns).type;
    }

    return 0;
  }

  hasUniformByName(ns) {
    return this.m_uniformDict.has(ns);
  }

  getUniformLengthByNS(ns) {
    if (this.m_uniformDict.has(ns)) {
      return this.m_uniformDict.get(ns).arrLength;
    }

    return 0;
  }

  initShdProgram() {
    let gl = this.m_gl;
    let vshd_str = this.m_shdData.getVSCodeStr();
    let fshd_str = this.m_shdData.getFSCodeStr(); //console.log("ShdProgram::initShdProgram(), this: ",this);

    let pr;

    if (this.m_shdData.preCompileInfo == null) {
      if (RendererDevice_1.default.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED) {
        if (vshd_str.indexOf(" mediump ") >= 0) {
          pr = new RegExp(" mediump ", "g");
          vshd_str = vshd_str.replace(pr, " highp ");
        }

        if (vshd_str.indexOf(" lowp ") >= 0) {
          pr = new RegExp(" lowp ", "g");
          vshd_str = vshd_str.replace(pr, " highp ");
        }
      }
    }

    if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
      console.log("vert shader code: \n" + vshd_str);
    }

    let vertShader = this.loadShader(gl.VERTEX_SHADER, vshd_str);

    if (this.m_shdData.preCompileInfo == null) {
      if (RendererDevice_1.default.FRAG_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED) {
        if (fshd_str.indexOf(" mediump ") >= 0) {
          pr = new RegExp(" mediump ", "g");
          fshd_str = fshd_str.replace(pr, " highp ");
        }

        if (fshd_str.indexOf(" lowp ") >= 0) {
          pr = new RegExp(" lowp ", "g");
          fshd_str = fshd_str.replace(pr, " highp ");
        }
      }
    }

    if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
      console.log("frag shader code: \n" + fshd_str);
    }

    let fragShader = this.loadShader(gl.FRAGMENT_SHADER, fshd_str); // Create the shader program      

    let shdProgram = gl.createProgram();
    gl.attachShader(shdProgram, fragShader);
    gl.attachShader(shdProgram, vertShader);
    gl.linkProgram(shdProgram);

    if (!gl.getProgramParameter(shdProgram, gl.LINK_STATUS)) {
      if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
        console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shdProgram));
      }

      return null;
    }

    this.m_vertShader = vertShader;
    this.m_fragShader = fragShader;
    gl.detachShader(shdProgram, vertShader);
    gl.detachShader(shdProgram, fragShader);
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);
    return shdProgram;
  }

  loadShader(type, source) {
    let shader = this.m_gl.createShader(type);
    this.m_gl.shaderSource(shader, source);
    this.m_gl.compileShader(shader);

    if (!this.m_gl.getShaderParameter(shader, this.m_gl.COMPILE_STATUS)) {
      if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
        console.log('An error occurred compiling the shaders: ' + this.m_gl.getShaderInfoLog(shader));
      }

      this.m_gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  getUniqueShaderName() {
    return this.m_shdUniqueName;
  }

  enabled() {
    return this.m_program != null;
  }

  upload(gl, rcuid) {
    if (this.m_program == null) {
      this.m_rcuid = rcuid;
      this.m_gl = gl;
      this.m_program = this.initShdProgram();
      this.m_program.uniqueName = this.m_shdUniqueName;
      if (null != this.m_program) this.createLocations();
    }
  }
  /**
   * @returns return renderer context unique id
   */


  getRCUid() {
    return this.m_rcuid;
  }

  uniformBlockBinding(uniform_block_ns, bindingIndex) {
    this.m_gl.uniformBlockBinding(this.m_program, this.m_gl.getUniformBlockIndex(this.m_program, uniform_block_ns), bindingIndex);
  }

  toString() {
    return "[ShdProgram(uniqueName = " + this.m_shdUniqueName + ")]";
  }
  /**
   * @returns return current gpu shader  program
   */


  getGPUProgram() {
    return this.m_program;
  }

  destroy() {
    this.m_aLocations = null;
    this.m_attriSizeList = null;

    if (this.m_texTotal > 0) {
      this.m_texLocations.fill(null);
      this.m_texTotal = 0;
    }

    if (this.m_program != null) {
      this.m_gl.deleteShader(this.m_vertShader);
      this.m_gl.deleteShader(this.m_fragShader);
      this.m_vertShader = null;
      this.m_fragShader = null;
      this.m_gl.deleteProgram(this.m_program);
      this.m_program = null;
    }

    this.m_gl = null;
    this.m_shdData = null;
  }

}

exports.default = ShdProgram;

/***/ }),

/***/ "2139":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Matrix4_1 = __importDefault(__webpack_require__("18c7"));

class Matrix4Pool {
  static GetMatTotal() {
    return Matrix4Pool.s_mtotal;
  }

  static GetFS32Arr() {
    return Matrix4Pool.s_mfs32Arr;
  }

  static SetFS32Arr(fs32) {
    Matrix4Pool.s_mfs32Arr = fs32;
    let total = Matrix4Pool.s_mtotal;
    let list = Matrix4Pool.s_matList;

    for (let i = 0; i < total; ++i) {
      list[i].setF32Arr(fs32);
    }
  }

  static GetFreeId() {
    if (Matrix4Pool.m_freeIdList.length > 0) {
      return Matrix4Pool.m_freeIdList.pop();
    }

    return -1;
  }

  static Allocate(total) {
    if (total < 1024) {
      total = 1024;
    }

    if (Matrix4Pool.s_mtotal < 1) {
      console.log("Matrix4Pool::Allocate(), Matrix total: " + total);
      Matrix4Pool.s_mtotal = total;
      Matrix4Pool.s_mfs32Arr = new Float32Array(total * 16);
      let i = 0;
      let mat = new Matrix4_1.default(Matrix4Pool.s_mfs32Arr, i * 16);
      let uid = mat.getUid();
      Matrix4Pool.s_baseUid = uid;
      Matrix4Pool.s_maxUid = uid + total;

      for (; i < uid; ++i) {
        Matrix4Pool.s_matList.push(null);
        Matrix4Pool.s_matFlagList.push(Matrix4Pool.s_FLAG_FREE);
      }

      Matrix4Pool.s_matList.push(mat);
      Matrix4Pool.s_matFlagList.push(Matrix4Pool.s_FLAG_FREE);
      Matrix4Pool.m_freeIdList.push(mat.getUid());

      for (i = 1; i < total; ++i) {
        mat = new Matrix4_1.default(Matrix4Pool.s_mfs32Arr, i * 16);
        Matrix4Pool.s_matList.push(mat);
        Matrix4Pool.s_matFlagList.push(Matrix4Pool.s_FLAG_FREE);
        Matrix4Pool.m_freeIdList.push(mat.getUid());
      }
    }
  }

  static GetMatrix() {
    let mat = null;
    let index = Matrix4Pool.GetFreeId() - Matrix4Pool.s_baseUid;

    if (index >= 0) {
      mat = Matrix4Pool.s_matList[index];
      mat.identity();
      Matrix4Pool.s_matFlagList[index] = Matrix4Pool.s_FLAG_BUSY; //console.log("Get a free Matrix !!!");
    } else {
      //console.error("Matrix4Pool::GetMatrix(), Error Matrix4Pool is empty !!!");
      mat = new Matrix4_1.default();
    }

    return mat;
  }

  static RetrieveMatrix(mat) {
    if (mat != null) {
      let uid = mat.getUid();

      if (uid >= Matrix4Pool.s_baseUid && uid < Matrix4Pool.s_maxUid) {
        if (Matrix4Pool.s_matFlagList[uid - Matrix4Pool.s_baseUid] == Matrix4Pool.s_FLAG_BUSY) {
          Matrix4Pool.m_freeIdList.push(uid);
          Matrix4Pool.s_matFlagList[uid - Matrix4Pool.s_baseUid] = Matrix4Pool.s_FLAG_FREE;
        }
      }
    }
  }

}

Matrix4Pool.s_FLAG_BUSY = 1;
Matrix4Pool.s_FLAG_FREE = 0;
Matrix4Pool.s_matList = [];
Matrix4Pool.s_matFlagList = [];
Matrix4Pool.m_freeIdList = [];
Matrix4Pool.s_mfs32Arr = null;
Matrix4Pool.s_baseUid = 0;
Matrix4Pool.s_maxUid = 0;
Matrix4Pool.s_mtotal = 0;
exports.default = Matrix4Pool;

/***/ }),

/***/ "251a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const DisplayEntity_1 = __importDefault(__webpack_require__("402a"));

const VtxBufRenderData_1 = __webpack_require__("d08b");

const DataMesh_1 = __importDefault(__webpack_require__("519e"));

const AABB_1 = __importDefault(__webpack_require__("fecb"));

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

const Matrix4_1 = __importDefault(__webpack_require__("18c7"));

class RenderableEntityBlock {
  constructor() {
    this.m_initFlag = true;
    this.screenPlane = new DisplayEntity_1.default();
    /**
     * center align in the XOY Plane, its size is 1
     */

    this.unitXOYPlane = new DisplayEntity_1.default();
    /**
     * center align in the XOZ Plane, its size is 1
     */

    this.unitXOZPlane = new DisplayEntity_1.default();
    /**
     * center align in the YOZ Plane, its size is 1
     */

    this.unitYOZPlane = new DisplayEntity_1.default();
    /**
     * center align, its size is 1
     */

    this.unitBox = new DisplayEntity_1.default();
    /**
     * axis origin align in the XOY Plane, its size is 1
     */

    this.unitOXOYPlane = new DisplayEntity_1.default();
    /**
     * axis origin align in the XOZ Plane, its size is 1
     */

    this.unitOXOZPlane = new DisplayEntity_1.default();
    /**
     * axis origin align in the YOZ Plane, its size is 1
     */

    this.unitOYOZPlane = new DisplayEntity_1.default();
    /**
     * axis origin align, its size is 1
     */

    this.unitOBox = new DisplayEntity_1.default();
  }

  initialize() {
    if (this.m_initFlag) {
      this.m_initFlag = false;
      let vtxData = new VtxBufRenderData_1.VtxBufRenderData();
      let vs = new Float32Array([1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]);

      for (let i = 0; i < vs.length; ++i) {
        vs[i] *= 0.5;
      }

      let uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1]);
      let nvs = new Float32Array([0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
      let ivs = new Uint16Array([3, 2, 1, 3, 1, 0, 6, 7, 4, 6, 4, 5, 11, 10, 9, 11, 9, 8, 15, 14, 13, 15, 13, 12, 18, 19, 16, 18, 16, 17, 22, 23, 20, 22, 20, 21]);
      let dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitBox.setMesh(dm);
      vs = new Float32Array(vs);

      for (let i = 0; i < vs.length; ++i) {
        vs[i] += 0.5;
      } // console.log("obox vs: ",vs);


      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitOBox.setMesh(dm);
      vs = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
      uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
      nvs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
      ivs = new Uint16Array([0, 1, 2, 0, 2, 3]);
      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.screenPlane.setMesh(dm);

      for (let i = 0; i < vs.length; ++i) {
        vs[i] *= 0.5;
      }

      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitXOYPlane.setMesh(dm);
      vs = new Float32Array(vs);

      for (let i = 0; i < vs.length;) {
        vs[i++] += 0.5;
        vs[i++] += 0.5;
        i++;
      }

      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitOXOYPlane.setMesh(dm);
      vs = new Float32Array([0.5, 0, -0.5, -0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, 0.5]);
      nvs = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]);
      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitXOZPlane.setMesh(dm);
      vs = new Float32Array(vs);

      for (let i = 0; i < vs.length;) {
        vs[i++] += 0.5;
        i++;
        vs[i++] += 0.5;
      }

      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitOXOZPlane.setMesh(dm);
      vs = new Float32Array([0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5]);
      nvs = new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitYOZPlane.setMesh(dm);

      for (let i = 0; i < vs.length;) {
        i++;
        vs[i++] += 0.5;
        vs[i++] += 0.5;
      }

      dm = new DataMesh_1.default();
      dm.setVS(vs).setUVS(uvs).setNVS(nvs).setIVS(ivs).setVtxBufRenderData(vtxData);
      dm.vbWholeDataEnabled = true;
      dm.initialize();
      this.unitOYOZPlane.setMesh(dm);
    }
  }

  createVector3(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
    return new Vector3D_1.default(x, y, z, w);
  }

  createMatrix4() {
    return new Matrix4_1.default();
  }

  createAABB() {
    return new AABB_1.default();
  }

  createEntity() {
    return new DisplayEntity_1.default();
  }

  createMesh() {
    return new DataMesh_1.default();
  }

}

exports.RenderableEntityBlock = RenderableEntityBlock;

/***/ }),

/***/ "28a9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const ShaderCodeUUID_1 = __webpack_require__("f3a2");

const ShaderCodeType_1 = __webpack_require__("69ed");

class ShaderCodeConfigure {
  constructor() {
    this.types = [ShaderCodeType_1.ShaderCodeType.VertHead, ShaderCodeType_1.ShaderCodeType.VertBody, ShaderCodeType_1.ShaderCodeType.FragHead, ShaderCodeType_1.ShaderCodeType.FragBody];
    this.urls = null;
    this.uuid = ShaderCodeUUID_1.ShaderCodeUUID.Default;
    this.binary = false;
    this.buildBinaryFile = false;
  }

}

exports.ShaderCodeConfigure = ShaderCodeConfigure;

/***/ }),

/***/ "29ef":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class RendererState {
  static CreateBlendMode(name, srcColor, dstColor, blendEquation = 0) {
    return RendererState.rstb.createBlendMode(name, srcColor, dstColor, blendEquation);
  }

  static CreateBlendModeSeparate(name, srcColor, dstColor, srcAlpha = 0, dstAlpha = 0, blendEquation = 0) {
    return RendererState.rstb.createBlendModeSeparate(name, srcColor, dstColor, srcAlpha, dstAlpha, blendEquation);
  }

  static CreateRenderState(objName, cullFaceMode, blendMode, depthTestMode) {
    return RendererState.rstb.createRenderState(objName, cullFaceMode, blendMode, depthTestMode);
  }

  static CreateRenderColorMask(objName, rBoo, gBoo, bBoo, aBoo) {
    return RendererState.rstb.createRenderColorMask(objName, rBoo, gBoo, bBoo, aBoo);
  }

  static GetRenderStateByName(objName) {
    return RendererState.rstb.getRenderStateByName(objName);
  }

  static GetRenderColorMaskByName(objName) {
    return RendererState.rstb.getRenderColorMaskByName(objName);
  }

  static UnlockBlendMode() {
    RendererState.rstb.unlockBlendMode();
  }

  static LockBlendMode(cullFaceMode) {
    RendererState.rstb.lockBlendMode(cullFaceMode);
  }

  static UnlockDepthTestMode() {
    RendererState.rstb.unlockDepthTestMode();
  }

  static LockDepthTestMode(depthTestMode) {
    RendererState.rstb.lockDepthTestMode(depthTestMode);
  }

  static ResetState() {
    RendererState.rstb.resetState();
  }

  static Reset(context) {
    RendererState.rstb.reset(context);
  }

  static ResetInfo() {}

  static SetDepthTestEnable(enable) {
    RendererState.rstb.setDepthTestEnable(enable);
  }

  static SetBlendEnable(enable) {
    RendererState.rstb.setBlendEnable(enable);
  }

}

exports.default = RendererState;

/***/ }),

/***/ "2e8a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const MaterialConst_1 = __importDefault(__webpack_require__("644c"));

class AttributeLine {
  constructor() {
    this.type = -1;
    this.attriType = -1;
    this.typeSize = 3;
    this.typeName = "";
    this.name = "";
    this.layoutEnabled = true;
  }

  parseCode(codeStr) {
    const SEMICOLON = ";";
    const SPACE = " "; // 去掉两头的空格

    codeStr = codeStr.replace(/^\s*|\s*$/g, "");
    let i = codeStr.indexOf(SEMICOLON);
    if (i > 0) codeStr = codeStr.slice(0, i);
    let arr = codeStr.split(SPACE);
    this.typeName = arr[arr.length - 2];
    this.name = arr[arr.length - 1];
    this.type = MaterialConst_1.default.GetTypeByTypeNS(this.typeName);
    this.typeSize = parseInt(this.typeName.slice(this.typeName.length - 1));
    this.attriType = VtxBufConst_1.default.GetVBufAttributeTypeByNS(this.name); //trace("Attribute: >"+this.typeName+"<,>"+this.name+"<,>"+this.type+"<,typeSize: >"+this.typeSize+",attriType: "+this.attriType);
  }

}

exports.default = AttributeLine;

/***/ }),

/***/ "3113":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const SpecularMode_1 = __webpack_require__("839a");

const ShadowMode_1 = __webpack_require__("a9f4");

const UniformConst_1 = __importDefault(__webpack_require__("ab73"));

class ShaderCodeUniform {
  constructor() {
    this.m_codeBuilder = null;
    this.m_uniqueNSKeyString = "";
    this.m_uniqueNSKeys = new Uint16Array(128);
    this.m_uniqueNSKeysTotal = 16;
    this.m_uniqueNSKeyFlag = false;
  }

  __$setCodeBuilder(codeBuilder) {
    this.m_codeBuilder = codeBuilder;
  }

  getUniqueNSKeyID() {
    if (this.m_uniqueNSKeyFlag) {
      let id = 31;

      for (let i = 0; i < this.m_uniqueNSKeysTotal; ++i) {
        id = id * 131 + this.m_uniqueNSKeys[i];
      }

      return id;
    }

    return 0;
  }

  getUniqueNSKeyString() {
    if (this.m_uniqueNSKeyFlag) {
      this.m_uniqueNSKeyString = "[" + this.m_uniqueNSKeys[0];

      for (let i = 1; i < this.m_uniqueNSKeysTotal; ++i) {
        //this.m_uniqueNSKeyString += "-"+this.m_uniqueNSKeys[i];
        this.m_uniqueNSKeyString += "" + this.m_uniqueNSKeys[i];
      }

      this.m_uniqueNSKeyString += "]";
      return this.m_uniqueNSKeyString;
    }

    return "";
  }

  reset() {
    if (this.m_uniqueNSKeyFlag) {
      for (let i = 0; i < this.m_uniqueNSKeysTotal; ++i) {
        this.m_uniqueNSKeys[i] = 0;
      }

      this.m_uniqueNSKeyFlag = false;
    }
  }
  /**
   * apply camera position uniform in the shader,the uniform vec4 data: [x, y, z, w]
   * @param vertEnabled whether apply camera position uniform in the vertex shader, the default value is false
   * @param fragEnabled whether apply camera position uniform in the fragment shader, the default value is true
   */


  useCameraPosition(vertEnabled = false, fragEnabled = true) {
    if (vertEnabled) {
      this.m_codeBuilder.addVertUniformParam(UniformConst_1.default.CameraPosParam);
    }

    if (fragEnabled) {
      this.m_codeBuilder.addFragUniformParam(UniformConst_1.default.CameraPosParam);
    }
  }
  /**
   * apply view parameters uniform in the shader,the uniform vec4 data: [viewPortX, viewPortY, viewPortWidth, viewPortHeight]
   * @param vertEnabled whether apply view parameters uniform in the vertex shader, the default value is false
   * @param fragEnabled whether apply view parameters uniform in the fragment shader, the default value is true
   */


  useViewPort(vertEnabled = false, fragEnabled = true) {
    if (vertEnabled) {
      this.m_codeBuilder.addVertUniformParam(UniformConst_1.default.ViewportParam);
    }

    if (fragEnabled) {
      this.m_codeBuilder.addFragUniformParam(UniformConst_1.default.ViewportParam);
    }
  }
  /**
   * apply frustum parameters uniform in the shader,the uniform vec4 data: [camera zNear,camera zFar, camera nearPlaneHalfWidth, camera nearPlaneHalfHeight]
   * @param vertEnabled whether apply frustum parameters uniform in the vertex shader, the default value is false
   * @param fragEnabled whether apply frustum parameters uniform in the fragment shader, the default value is true
   */


  useFrustum(vertEnabled = false, fragEnabled = true) {
    if (vertEnabled) {
      this.m_codeBuilder.addVertUniformParam(UniformConst_1.default.FrustumParam);
    }

    if (fragEnabled) {
      this.m_codeBuilder.addFragUniformParam(UniformConst_1.default.FrustumParam);
    }
  }
  /**
   * apply stage parameters uniform in the shader,the uniform vec4 data: [2.0/stageWidth,2.0/stageHeight, stageWidth,stageHeight]
   * @param vertEnabled whether apply stage parameters uniform in the vertex shader, the default value is false
   * @param fragEnabled whether apply stage parameters uniform in the fragment shader, the default value is true
   */


  useStage(vertEnabled, fragEnabled) {
    if (vertEnabled) {
      this.m_codeBuilder.addVertUniformParam(UniformConst_1.default.StageParam);
    }

    if (fragEnabled) {
      this.m_codeBuilder.addFragUniformParam(UniformConst_1.default.StageParam);
    }
  }
  /**
   * add diffuse map uniform code
   */


  addDiffuseMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_DIFFUSE_MAP", true, true, false);
    this.m_uniqueNSKeys[0] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add normal map uniform code
   */


  addNormalMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_NORMAL_MAP", true, true, false);
    this.m_codeBuilder.normalMapEnabled = true;
    this.m_uniqueNSKeys[1] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add parallax map uniform code
   * @param parallaxParamIndex parallax map parameter uniform data array index
   */


  addParallaxMap(parallaxParamIndex) {
    this.m_codeBuilder.addTextureSample2D("VOX_PARALLAX_MAP", true, true, false);

    if (parallaxParamIndex >= 0) {
      this.m_codeBuilder.addDefine("VOX_PARALLAX_PARAMS_INDEX", "" + parallaxParamIndex);
      this.m_uniqueNSKeys[2] = 1 + (parallaxParamIndex << 1);
    } else {
      this.m_uniqueNSKeys[2] = 1;
    }

    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add displacement map uniform code
   * @param parallaxParamIndex vec4 param array index in the vertex shader
   */


  addDisplacementMap(displacementParamIndex) {
    this.m_codeBuilder.addTextureSample2D("VOX_DISPLACEMENT_MAP", true, false, true);

    if (displacementParamIndex >= 0) {
      this.m_codeBuilder.addDefine("VOX_DISPLACEMENT_PARAMS_INDEX", "" + displacementParamIndex);
      this.m_uniqueNSKeys[3] = 1 + (displacementParamIndex << 1);
    } else {
      this.m_uniqueNSKeys[3] = 1;
    }

    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add specular map uniform code
   * @param specularMode is SpecularMode type value, the default is SpecularMode.Default
   */


  addSpecularMap(specularMode = SpecularMode_1.SpecularMode.Default) {
    this.m_codeBuilder.addTextureSample2D("VOX_SPECULAR_MAP", true, true, false);
    this.m_codeBuilder.addDefine("VOX_SPECULAR_MODE", "" + specularMode);
    this.m_uniqueNSKeys[5] = 1 + (specularMode << 1);
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add shadow map uniform code
   * @param shadowMode is shadowMode type value, the default is ShadowMode.VSM
   */


  addShadowMap(shadowMode = ShadowMode_1.ShadowMode.VSM) {
    this.m_codeBuilder.addTextureSample2D("VOX_VSM_SHADOW_MAP", false, true, false);
    this.m_uniqueNSKeys[6] = 1 + (shadowMode << 1);
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add fog color map uniform code
   */


  addFogColorMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_FOG_COLOR_MAP", true, true, false);
    this.m_uniqueNSKeys[7] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add env specular cube map uniform code
   * @param cubeMap yes or no, the default is true
   */


  addSpecularEnvMap(cubeMap = true) {
    if (cubeMap) {
      this.m_codeBuilder.addTextureSampleCube("VOX_ENV_MAP", true, false);
    } else {
      this.m_codeBuilder.addTextureSample2D("VOX_ENV_MAP", true, true, false);
    }

    this.m_uniqueNSKeys[8] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add ambient occlusion map uniform code
   */


  addAOMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_AO_MAP", true, true, false);
    this.m_uniqueNSKeys[4] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add roughness map uniform code
   */


  addRoughnessMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_ROUGHNESS_MAP", true, true, false);
    this.m_uniqueNSKeys[9] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add metalness map uniform code
   */


  addMetalnessMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_METALNESS_MAP", true, true, false);
    this.m_uniqueNSKeys[10] = 1;
    this.m_uniqueNSKeyFlag = true;
  }
  /**
   * add ao, roughness, metalness map uniform code
   */


  addARMMap() {
    this.m_codeBuilder.addTextureSample2D("VOX_ARM_MAP", true, true, false);
    this.m_uniqueNSKeys[11] = 1;
    this.m_uniqueNSKeyFlag = true;
  }

  add2DMap(macroName = "", map2DEnabled = true, fragEnabled = true, vertEnabled = false) {
    this.m_codeBuilder.addTextureSample2D(macroName, map2DEnabled, fragEnabled, vertEnabled);
  }

  addCubeMap(macroName = "", fragEnabled = true, vertEnabled = false) {
    this.m_codeBuilder.addTextureSampleCube(macroName, fragEnabled, vertEnabled);
  }

  add3DMap(macroName = "", fragEnabled = true, vertEnabled = false) {
    this.m_codeBuilder.addTextureSample3D(macroName, fragEnabled, vertEnabled);
  }

}

exports.ShaderCodeUniform = ShaderCodeUniform;

/***/ }),

/***/ "32cc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ShaderUniformData_1 = __importDefault(__webpack_require__("b3bd"));

const ShaderCodeBuffer_1 = __importDefault(__webpack_require__("faa5"));

const MaterialBase_1 = __importDefault(__webpack_require__("0fc4"));

class Line3DShaderBuffer extends ShaderCodeBuffer_1.default {
  constructor() {
    super();
    this.m_uniqueName = "";
    this.dynColorEnabled = false;
  }

  initialize(texEnabled) {
    super.initialize(texEnabled);
    this.m_uniqueName = "Line3DShd";
    if (this.dynColorEnabled) this.m_uniqueName += "_dynColor";
  }

  buildShader() {
    this.m_coder.addVertLayout("vec3", "a_vs");
    this.m_coder.addFragUniform("vec4", "u_color");

    if (this.dynColorEnabled) {
      this.m_coder.addDefine("DYNAMIC_COLOR");
    } else {
      this.m_coder.addVertLayout("vec3", "a_cvs");
      this.m_coder.addVarying("vec3", "v_color");
    }

    this.m_coder.addFragOutputHighp("vec4", "FragColor0");
    this.m_coder.addFragMainCode(`
    #ifndef DYNAMIC_COLOR
        FragColor0 = vec4(v_color, 1.0) * u_color;
    #else
        FragColor0 = u_color;
    #endif
`);
    this.m_coder.addVertMainCode(`
    viewPosition = u_viewMat * u_objMat * vec4(a_vs,1.0);
    vec4 pv = u_projMat * viewPosition;
    #ifndef DYNAMIC_COLOR
        v_color = a_cvs;
    #endif
    gl_Position = pv;
            `);
  }

  getUniqueShaderName() {
    return this.m_uniqueName;
  }

  static GetInstance() {
    let lsb = Line3DShaderBuffer;

    if (lsb.s_instance != null) {
      return lsb.s_instance;
    }

    lsb.s_instance = new Line3DShaderBuffer();
    return lsb.s_instance;
  }

}

Line3DShaderBuffer.s_instance = null;

class Line3DMaterial extends MaterialBase_1.default {
  /**
   * @param dynColorEnabled the default value is false
   */
  constructor(dynColorEnabled = false) {
    super();
    this.m_dynColorEnabled = false;
    this.m_data = null;
    this.premultiplyAlpha = false;
    this.normalEnabled = false;
    this.shadowReceiveEnabled = false;
    this.m_dynColorEnabled = dynColorEnabled;
    this.m_data = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    let oum = new ShaderUniformData_1.default();
    oum.uniformNameList = ["u_color"];
    oum.dataList = [this.m_data];
    this.m_shaderUniformData = oum;
  }

  buildBuf() {
    Line3DShaderBuffer.GetInstance().dynColorEnabled = this.m_dynColorEnabled;
  }

  getCodeBuf() {
    return Line3DShaderBuffer.GetInstance();
  }

  setRGB3f(pr, pg, pb) {
    this.m_data[0] = pr;
    this.m_data[1] = pg;
    this.m_data[2] = pb;
  }

  getRGB3f(color) {
    let ds = this.m_data;
    color.setRGB3f(ds[0], ds[1], ds[2]);
  }

  setRGBA4f(pr, pg, pb, pa) {
    this.m_data[0] = pr;
    this.m_data[1] = pg;
    this.m_data[2] = pb;
    this.m_data[3] = pa;
  }

  getRGBA4f(color) {
    color.fromArray4(this.m_data);
  }

  setAlpha(pa) {
    this.m_data[3] = pa;
  }

  getAlpha() {
    return this.m_data[3];
  }

  setColor(color) {
    color.toArray4(this.m_data);
  }

  getColor(color) {
    color.fromArray4(this.m_data);
  }

}

exports.default = Line3DMaterial;

/***/ }),

/***/ "35fa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

class SurfaceNormalCalc {
  /**
  * calc a triangle's normal,cw is positive, right hand rule. there is calc result is positive.
  */
  static ClacTriNormal(va, vb, vc, resultNormal) {
    let calc = SurfaceNormalCalc;
    Vector3D_1.default.Subtract(vb, va, calc.s_temp_vb);
    Vector3D_1.default.Subtract(vc, vb, calc.s_temp_vc);
    Vector3D_1.default.Cross(calc.s_temp_vb, calc.s_temp_vc, resultNormal);
    resultNormal.normalize();
  }
  /**
  * calc a triangle's normal,cw is positive, right hand rule. there is calc result is positive.
  * @param verteies			verteies's length is N multiple 9
  * @param triangleIndex		triangle index of triangles
  * @param resultNormal		result normalize Vector3D normal
  */


  static ClacTriNormalByVS(verteies, triangleIndex, resultNormal) {
    let calc = SurfaceNormalCalc;
    let i = triangleIndex * 9;
    calc.s_temp_va.setTo(verteies[i], verteies[i + 1], verteies[i + 2]);
    resultNormal.setTo(verteies[i + 3], verteies[i + 4], verteies[i + 5]);
    calc.s_temp_vc.setTo(verteies[i + 6], verteies[i + 7], verteies[i + 8]);
    resultNormal.subtractBy(calc.s_temp_va);
    calc.s_temp_vc.subtractBy(calc.s_temp_va); //vox::kernel::geom::Vector3D::cross(vb, vc, resultNormal);

    resultNormal.crossBy(calc.s_temp_vc);
    resultNormal.normalize();
  }

  static ClacTriNormalByIVS(verteies, triangleIndex, indices, resultNormal) {
    let calc = SurfaceNormalCalc;
    let j = triangleIndex * 3;
    let i = indices[j] * 3;
    calc.s_temp_va.setTo(verteies[i], verteies[i + 1], verteies[i + 2]);
    i = indices[j + 1] * 3;
    resultNormal.setTo(verteies[i], verteies[i + 1], verteies[i + 2]);
    i = indices[j + 2] * 3;
    calc.s_temp_vc.setTo(verteies[i], verteies[i + 1], verteies[i + 2]); //trace(triangleIndex, ", v3a: ", SurfaceNormalCalc.s_temp_va, ", v3b: ", resultNormal, ", v3c: ", SurfaceNormalCalc.s_temp_vc);

    resultNormal.subtractBy(calc.s_temp_va);
    calc.s_temp_vc.subtractBy(calc.s_temp_va);
    resultNormal.crossBy(calc.s_temp_vc);
    resultNormal.normalize(); //trace("						normal: ", resultNormal);
  }

  static ClacTrisNormal(verteies, verteiesLength, numTriangles, indices, normals) {
    let calc = SurfaceNormalCalc;
    let v3 = new Vector3D_1.default();
    let j = 0,
        k = 0,
        i = 0;

    for (i = 0; i < verteiesLength; ++i) {
      normals[i] = 0.0;
    }

    for (i = 0; i < numTriangles; ++i) {
      calc.ClacTriNormalByIVS(verteies, i, indices, v3);
      j = i * 3;
      k = indices[j] * 3;
      normals[k] += v3.x;
      normals[k + 1] += v3.y;
      normals[k + 2] += v3.z;
      k = indices[j + 1] * 3;
      normals[k] += v3.x;
      normals[k + 1] += v3.y;
      normals[k + 2] += v3.z;
      k = indices[j + 2] * 3;
      normals[k] += v3.x;
      normals[k + 1] += v3.y;
      normals[k + 2] += v3.z;
    }

    for (i = 0; i < verteiesLength; i += 3) {
      calc.s_temp_va.setTo(normals[i], normals[i + 1], normals[i + 2]);
      calc.s_temp_va.normalize();
      normals[i] = calc.s_temp_va.x;
      normals[i + 1] = calc.s_temp_va.y;
      normals[i + 2] = calc.s_temp_va.z;
    }
  }

  static ClacTriTangent(verteies, uvs, nvs, triangleIndex, indices, tangent, biTangent) {
    let calc = SurfaceNormalCalc;
    let j = triangleIndex * 3; // pos

    let i = indices[j] * 3;
    calc.s_temp_va.setTo(nvs[i], nvs[i + 1], nvs[i + 2]);
    calc.s_temp_va.setTo(verteies[i], verteies[i + 1], verteies[i + 2]);
    i = indices[j + 1] * 3;
    calc.s_temp_vb.setTo(verteies[i], verteies[i + 1], verteies[i + 2]);
    i = indices[j + 2] * 3;
    calc.s_temp_vc.setTo(verteies[i], verteies[i + 1], verteies[i + 2]); // uv

    i = indices[j] * 2;
    calc.s_temp_vd.setTo(uvs[i], uvs[i + 1], 0.0);
    i = indices[j + 1] * 2;
    calc.s_temp_ve.setTo(uvs[i], uvs[i + 1], 0.0);
    i = indices[j + 2] * 2;
    calc.s_temp_vf.setTo(uvs[i], uvs[i + 1], 0.0); // edges of pos

    calc.s_temp_vb.subtractBy(calc.s_temp_va);
    calc.s_temp_vc.subtractBy(calc.s_temp_va);
    calc.s_temp_ve.subtractBy(calc.s_temp_vd);
    calc.s_temp_vf.subtractBy(calc.s_temp_vd);
    let dt = 1.0 / (calc.s_temp_ve.x * calc.s_temp_vf.y - calc.s_temp_ve.y * calc.s_temp_vf.x);
    tangent.copyFrom(calc.s_temp_vb);
    tangent.scaleBy(calc.s_temp_vf.y);
    calc.s_temp_va.copyFrom(calc.s_temp_vc);
    calc.s_temp_va.scaleBy(calc.s_temp_ve.y);
    tangent.subtractBy(calc.s_temp_va);
    tangent.scaleBy(dt);
    tangent.normalize();
    biTangent.copyFrom(calc.s_temp_vc);
    biTangent.scaleBy(calc.s_temp_ve.x);
    calc.s_temp_va.copyFrom(calc.s_temp_vb);
    calc.s_temp_va.scaleBy(calc.s_temp_vf.x);
    biTangent.subtractBy(calc.s_temp_va);
    biTangent.scaleBy(dt);
    biTangent.normalize(); //*/
  }

  static ClacTrisTangent(verteies, verteiesLength, uvs, nvs, numTriangles, indices, tangent, biTangent) {
    let calc = SurfaceNormalCalc;
    let tv3 = new Vector3D_1.default(),
        btv3 = new Vector3D_1.default();
    let j = 0,
        k = 0,
        i = 0;

    for (i = 0; i < verteiesLength; ++i) {
      tangent[i] = 0.0;
      biTangent[i] = 0.0;
    }

    for (i = 0; i < numTriangles; ++i) {
      calc.ClacTriTangent(verteies, uvs, nvs, i, indices, tv3, btv3);
      j = i * 3;
      k = indices[j] * 3;
      tangent[k] = tv3.x;
      tangent[k + 1] = tv3.y;
      tangent[k + 2] = tv3.z;
      biTangent[k] = btv3.x;
      biTangent[k + 1] = btv3.y;
      biTangent[k + 2] = btv3.z;
      k = indices[j + 1] * 3;
      tangent[k] = tv3.x;
      tangent[k + 1] = tv3.y;
      tangent[k + 2] = tv3.z;
      biTangent[k] = btv3.x;
      biTangent[k + 1] = btv3.y;
      biTangent[k + 2] = btv3.z;
      k = indices[j + 2] * 3;
      tangent[k] = tv3.x;
      tangent[k + 1] = tv3.y;
      tangent[k + 2] = tv3.z;
      biTangent[k] = btv3.x;
      biTangent[k + 1] = btv3.y;
      biTangent[k + 2] = btv3.z;
    }

    for (i = 0; i < verteiesLength; i += 3) {
      calc.s_temp_vd.setTo(tangent[i], tangent[i + 1], tangent[i + 2]);
      calc.s_temp_vd.normalize();
      calc.s_temp_vb.setTo(biTangent[i], biTangent[i + 1], biTangent[i + 2]);
      calc.s_temp_vb.normalize();
      calc.s_temp_vc.setTo(nvs[i], nvs[i + 1], nvs[i + 2]);
      calc.s_temp_va.copyFrom(calc.s_temp_vc);
      calc.s_temp_vc.scaleBy(calc.s_temp_vc.dot(calc.s_temp_vd));
      calc.s_temp_vd.subtractBy(calc.s_temp_vc);
      calc.s_temp_vd.normalize(); //b = b - n * dot( b, n )

      calc.s_temp_vc.setTo(nvs[i], nvs[i + 1], nvs[i + 2]);
      calc.s_temp_vc.scaleBy(calc.s_temp_vb.dot(calc.s_temp_vc));
      calc.s_temp_vb.subtractBy(calc.s_temp_vc);
      calc.s_temp_vb.normalize();
      calc.s_temp_va.crossBy(calc.s_temp_vd);

      if (calc.s_temp_va.dot(calc.s_temp_vb) < 0.0) {
        calc.s_temp_vd.scaleBy(-1.0);
      }

      tangent[i] = calc.s_temp_vd.x;
      tangent[i + 1] = calc.s_temp_vd.y;
      tangent[i + 2] = calc.s_temp_vd.z;
      calc.s_temp_vb.setTo(nvs[i], nvs[i + 1], nvs[i + 2]);
      calc.s_temp_vb.crossBy(calc.s_temp_vd);
      calc.s_temp_vb.normalize();
      biTangent[i] = calc.s_temp_vb.x;
      biTangent[i + 1] = calc.s_temp_vb.y;
      biTangent[i + 2] = calc.s_temp_vb.z;
    }
  }

}

SurfaceNormalCalc.s_temp_va = new Vector3D_1.default();
SurfaceNormalCalc.s_temp_vb = new Vector3D_1.default();
SurfaceNormalCalc.s_temp_vc = new Vector3D_1.default();
SurfaceNormalCalc.s_temp_vd = new Vector3D_1.default();
SurfaceNormalCalc.s_temp_ve = new Vector3D_1.default();
SurfaceNormalCalc.s_temp_vf = new Vector3D_1.default();
SurfaceNormalCalc.s_temp_vg = new Vector3D_1.default();
exports.default = SurfaceNormalCalc;

/***/ }),

/***/ "3930":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
const __$mcv = 1e-5;

class Color4 {
  constructor(pr = 1.0, pg = 1.0, pb = 1.0, pa = 1.0) {
    this.r = pr;
    this.g = pg;
    this.b = pb;
    this.a = pa;
  }

  clone() {
    return new Color4(this.r, this.g, this.b, this.a);
  }

  fromArray4(arr, offset = 0) {
    this.r = arr[offset];
    this.g = arr[offset + 1];
    this.b = arr[offset + 2];
    this.a = arr[offset + 3];
    return this;
  }

  toArray4(arr, offset = 0) {
    arr[offset] = this.r;
    arr[offset + 1] = this.g;
    arr[offset + 2] = this.b;
    arr[offset + 3] = this.a;
    return this;
  }

  fromArray3(arr, offset = 0) {
    this.r = arr[offset];
    this.g = arr[offset + 1];
    this.b = arr[offset + 2];
    return this;
  }

  toArray3(arr, offset = 0) {
    arr[offset] = this.r;
    arr[offset + 1] = this.g;
    arr[offset + 2] = this.b;
    return this;
  }

  fromBytesArray3(arr, offset = 0) {
    this.setRGB3Bytes(arr[offset], arr[offset + 1], arr[offset + 2]);
    return this;
  }

  toBytesArray3(arr, offset = 0) {
    arr[offset] = Math.round(this.r * 255);
    arr[offset + 1] = Math.round(this.g * 255);
    arr[offset + 2] = Math.round(this.b * 255);
    return this;
  }

  setRGB3f(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  setRGB3Bytes(uint8R, uint8G, uint8B) {
    const k = 1.0 / 255.0;
    this.r = uint8R * k;
    this.g = uint8G * k;
    this.b = uint8B * k;
    return this; // return this.setRGB3Bytes(r,g,b);
  } // setRGB3Bytes(uint8R: number, uint8G: number, uint8B: number): Color4 {
  //     let k = 1.0 / 255.0;
  //     this.r = uint8R * k;
  //     this.g = uint8G * k;
  //     this.b = uint8B * k;
  //     return this;
  // }


  setRGBUint24(rgbUint24) {
    this.r = (rgbUint24 >> 16 & 0x0000ff) / 255.0;
    this.g = (rgbUint24 >> 8 & 0x0000ff) / 255.0;
    this.b = (rgbUint24 & 0x0000ff) / 255.0;
    return this;
  }

  getRGBUint24() {
    return (Math.round(this.r * 255) << 16) + (Math.round(this.g * 255) << 8) + Math.round(this.b * 255);
  }

  setRGBA4f(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }

  copyFrom(c) {
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    this.a = c.a;
    return this;
  }

  copyFromRGB(c) {
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    return this;
  }

  scaleBy(s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  }

  inverseRGB() {
    this.r = 1.0 - this.r;
    this.g = 1.0 - this.g;
    this.b = 1.0 - this.b;
    return this;
  }

  randomRGB(density = 1.0, bias = 0.0) {
    this.r = Math.random() * density;
    this.g = Math.random() * density;
    this.b = Math.random() * density;
    this.r += bias;
    this.g += bias;
    this.b += bias;
    return this;
  }

  normalizeRandom(density = 1.0, bias = 0.0) {
    this.r = Math.random();
    this.g = Math.random();
    this.b = Math.random();
    let d = Math.sqrt(this.r * this.r + this.g * this.g + this.b * this.b);

    if (d > __$mcv) {
      this.r = density * this.r / d;
      this.g = density * this.g / d;
      this.b = density * this.b / d;
    }

    this.r += bias;
    this.g += bias;
    this.b += bias;
    return this;
  }

  normalize(density) {
    if (density == undefined) density = 1.0;
    let d = Math.sqrt(this.r * this.r + this.g * this.g + this.b * this.b);

    if (d > __$mcv) {
      this.r = density * this.r / d;
      this.g = density * this.g / d;
      this.b = density * this.b / d;
    }

    return this;
  }
  /**
   * @returns for example: rgba(255,255,255,1.0)
   */


  getCSSDecRGBAColor() {
    let pr = Math.floor(this.r * 255.0);
    let pg = Math.floor(this.g * 255.0);
    let pb = Math.floor(this.b * 255.0);
    let pa = this.a;
    return "rgba(" + pr + "," + pg + "," + pb + "," + pa + ")";
  }
  /**
   * @returns for example: #350b7e
   */


  getCSSHeXRGBColor() {
    let str = "#";
    let t = Math.floor(this.r * 255.0);

    if (t < 0xf) {
      str += "0" + t.toString(16);
    } else {
      str += "" + t.toString(16);
    }

    t = Math.floor(this.g * 255.0);

    if (t < 0xf) {
      str += "0" + t.toString(16);
    } else {
      str += "" + t.toString(16);
    }

    t = Math.floor(this.b * 255.0);

    if (t < 0xf) {
      str += "0" + t.toString(16);
    } else {
      str += "" + t.toString(16);
    }

    return str;
  }

  toString() {
    return "[Color4(r=" + this.r + ", g=" + this.g + ",b=" + this.b + ",a=" + this.a + ")]";
  }

}

exports.default = Color4;

/***/ }),

/***/ "3b73":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class RendererDevice {
  /**
   * set web html body background color
   * @param color a color string, the default value is "white"
   */
  static SetWebBodyColor(color = "white") {
    const body = document.body;
    body.style.background = color;
  }

  static SetLanguage(language) {
    RendererDevice.s_language = language;
  }

  static GetLanguage() {
    if (RendererDevice.s_language != "") {
      return RendererDevice.s_language;
    }

    RendererDevice.s_language = navigator.language;
    return RendererDevice.s_language;
  }

  static SetThreadEnabled(boo) {
    RendererDevice.s_threadEnabled = boo;
  }

  static GetThreadEnabled() {
    return RendererDevice.s_threadEnabled;
  }

  static GetDebugEnabled() {
    return RendererDevice.s_debugEnabled;
  }

  static SetDebugEnabled(boo) {
    RendererDevice.s_debugEnabled = boo;
  }

  static SetDevicePixelRatio(dpr) {
    RendererDevice.s_devicePixelRatio = dpr;
  }

  static GetDevicePixelRatio() {
    return RendererDevice.s_devicePixelRatio;
  }

  static Initialize(infoArr) {
    if (RendererDevice.s_inited) {
      RendererDevice.s_inited = false;
      RendererDevice.s_WEBGL_VER = infoArr[0];
      RendererDevice.TestMobileWeb();
      RendererDevice.s_language = navigator.language + "";
    }
  }
  /**
   * 返回当前是不是window操作系统 PC端
   */


  static IsWindowsPCOS() {
    return !(RendererDevice.IsSafariWeb() || RendererDevice.IsMobileWeb());
  }
  /**
   * 得到windows系统环境下当前浏览器是否使用独立显卡。集显 integrated video card, 独显 external video card
   * get whether the gpu is external video card in window os
   * @returns get whether the gpu is external video card in window os
   */


  static IsWinExternalVideoCard() {
    if (RendererDevice.s_winExternalVideoCardFlag > 0) {
      return RendererDevice.s_winExternalVideoCardFlag == 2;
    }

    let flag = RendererDevice.IsSafariWeb() || RendererDevice.IsMobileWeb();

    if (!flag) {
      flag = RendererDevice.GPU_RENDERER.indexOf("Intel(R)") < 0;
    }

    RendererDevice.s_winExternalVideoCardFlag = flag ? 2 : 1;
    /**
     * webgl_renderer:  ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11-25.20.100.6617)
     */

    return RendererDevice.s_winExternalVideoCardFlag == 2;
  }

  static TestSafariWeb() {
    //return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    return /Safari/.test(navigator.userAgent) && /Mac OS/.test(navigator.userAgent);
  }

  static IsWebGL1() {
    return RendererDevice.s_WEBGL_VER == 1;
  }

  static IsWebGL2() {
    return RendererDevice.s_WEBGL_VER == 2;
  }

  static IsMobileWeb() {
    if (RendererDevice.s_mobileFlag > 0) {
      return RendererDevice.s_mobileFlag == 2;
    }

    return RendererDevice.TestMobileWeb();
  }

  static IsSafariWeb() {
    if (RendererDevice.s_safariFlag > 0) {
      return RendererDevice.s_safariFlag == 2;
    }

    RendererDevice.s_safariFlag = RendererDevice.TestSafariWeb() ? 2 : 1;
    return RendererDevice.s_safariFlag == 2;
  }

  static IsIOS() {
    if (RendererDevice.s_IOS_Flag > 0) {
      return RendererDevice.s_IOS_Flag == 2;
    }

    let boo = false;

    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      boo = true;
    } else {
      boo = navigator.maxTouchPoints != undefined && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
    }

    RendererDevice.s_IOS_Flag = boo ? 2 : 1;
    return boo;
  }

  static IsIpadOS() {
    if (RendererDevice.s_IPad_Flag > 0) {
      return RendererDevice.s_IPad_Flag == 2;
    }

    let boo = navigator.maxTouchPoints > 0 && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);

    if (!boo && /iPod|iPad|iPadPro|iPodPro/i.test(navigator.userAgent)) {
      boo = true;
    }

    RendererDevice.s_IPad_Flag = boo ? 2 : 1;
    return boo;
  }

  static IsAndroidOS() {
    if (RendererDevice.s_Android_Flag > 0) {
      return RendererDevice.s_Android_Flag == 2;
    }

    let boo = RendererDevice.TestMobileWeb();

    if (boo && /Android|Linux/i.test(navigator.userAgent)) {
      boo = true;
    } else {
      boo = false;
    }

    RendererDevice.s_Android_Flag = boo ? 2 : 1;
    return boo;
  }

  static TestMobileWeb() {
    if (RendererDevice.s_mobileFlag > 0) {
      return RendererDevice.s_mobileFlag == 2;
    }

    if (/mobile/.test(location.href)) {
      RendererDevice.s_mobileFlag = 2;
      return RendererDevice.s_mobileFlag == 2;
    }

    if (/Android/i.test(navigator.userAgent)) {
      if (/Mobile/i.test(navigator.userAgent)) {
        RendererDevice.s_mobileFlag = 2;
        return RendererDevice.s_mobileFlag == 2;
      } else {
        RendererDevice.s_mobileFlag = 1;
        return RendererDevice.s_mobileFlag == 2;
      }
    } else if (/webOS|iPhone|iPod|iPad|iPodPro|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      RendererDevice.s_mobileFlag = 2;
      return RendererDevice.s_mobileFlag == 2;
    }

    RendererDevice.s_mobileFlag = 1;
    return RendererDevice.s_mobileFlag == 2;
  }

}

RendererDevice.s_inited = true;
RendererDevice.s_WEBGL_VER = 2;
RendererDevice.s_devicePixelRatio = 1.0;
RendererDevice.s_mobileFlag = 0;
RendererDevice.s_safariFlag = 0;
RendererDevice.s_Android_Flag = 0;
RendererDevice.s_IOS_Flag = 0;
RendererDevice.s_IPad_Flag = 0;
RendererDevice.s_winExternalVideoCardFlag = 0;
/**
 * zh-CN, en-US, ect....
 */

RendererDevice.s_language = "";
RendererDevice.s_debugEnabled = true;
RendererDevice.GPU_VENDOR = "unknown";
RendererDevice.GPU_RENDERER = "unknown";
RendererDevice.MAX_TEXTURE_SIZE = 4096;
RendererDevice.MAX_RENDERBUFFER_SIZE = 4096;
RendererDevice.MAX_VIEWPORT_WIDTH = 4096;
RendererDevice.MAX_VIEWPORT_HEIGHT = 4096; // for debug

RendererDevice.SHOWLOG_ENABLED = false;
RendererDevice.SHADERCODE_TRACE_ENABLED = false; // true: force vertex shader precision to highp

RendererDevice.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true; // true: force fragment shader precision to highp

RendererDevice.FRAG_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED = true; // worker multi threads enabled yes or no

RendererDevice.s_threadEnabled = true;
exports.default = RendererDevice;

/***/ }),

/***/ "3efb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/
// 整个渲染场景的入口类

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

const Matrix4_1 = __importDefault(__webpack_require__("18c7"));

const Matrix4Pool_1 = __importDefault(__webpack_require__("2139"));

const RendererState_1 = __importDefault(__webpack_require__("29ef"));

const SimpleStage3D_1 = __importDefault(__webpack_require__("1440"));

const CameraBase_1 = __importDefault(__webpack_require__("c51d"));

const RendererParam_1 = __importDefault(__webpack_require__("c497"));

const EntityNodeQueue_1 = __importDefault(__webpack_require__("af68"));

const Entity3DNodeLinker_1 = __importDefault(__webpack_require__("a80a"));

const RunnableQueue_1 = __importDefault(__webpack_require__("9c4d"));

const TextureBlock_1 = __webpack_require__("5d04");

const FBOInstance_1 = __importDefault(__webpack_require__("af29"));

const CameraDsistanceSorter_1 = __importDefault(__webpack_require__("d7e2"));

const ShaderProgramBuilder_1 = __webpack_require__("a156");

class CoSimpleRendererScene {
  constructor() {
    this.m_uid = -1;
    this.m_adapter = null;
    this.m_renderProxy = null;
    this.m_shader = null;
    this.m_rcontext = null;
    this.m_renderer = null;
    this.m_processids = new Uint8Array(128);
    this.m_processidsLen = 0;
    this.m_accessor = null;
    this.m_viewX = 0.0;
    this.m_viewY = 0.0;
    this.m_viewW = 800.0;
    this.m_viewH = 800.0;
    this.m_nodeWaitLinker = null;
    this.m_nodeWaitQueue = null;
    this.m_camDisSorter = null;
    this.m_subscListLen = 0;
    this.m_runFlag = -1;
    this.m_autoRunning = true;
    this.m_processUpdate = false;
    this.m_tickId = -1;
    this.m_rparam = null;
    this.m_enabled = true;
    this.runnableQueue = new RunnableQueue_1.default();
    this.textureBlock = new TextureBlock_1.TextureBlock();
    this.stage3D = null;
    this.materialBlock = null;
    this.entityBlock = null;
    this.m_containers = [];
    this.m_containersTotal = 0;
    this.m_currCamera = null;
    this.m_prependNodes = null;
    this.m_appendNodes = null;
    this.m_uid = CoSimpleRendererScene.s_uid++;
  }

  tickUpdate() {
    if (this.m_tickId > -1) {
      clearTimeout(this.m_tickId);
    }

    this.m_tickId = setTimeout(this.tickUpdate.bind(this), this.m_rparam.getTickUpdateTime());
    this.textureBlock.run();
  }

  enable() {
    this.m_enabled = true;
  }

  disable() {
    this.m_enabled = false;
  }

  isEnabled() {
    return this.m_enabled;
  }

  getUid() {
    return this.m_uid;
  }

  getDiv() {
    return this.m_renderProxy.getDiv();
  }

  getCanvas() {
    return this.m_renderProxy.getCanvas();
  }

  getRPONodeBuilder() {
    return null;
  }

  getRenderProxy() {
    return this.m_renderProxy;
  } // set new view port rectangle area


  setViewPort(px, py, pw, ph) {
    if (this.m_renderProxy != null) {
      this.m_viewX = px;
      this.m_viewY = py;
      this.m_viewW = pw;
      this.m_viewH = ph;
      this.m_renderProxy.setViewPort(px, py, pw, ph);
    }
  }

  setViewPortFromCamera(camera) {
    if (this.m_renderProxy != null && camera != null) {
      this.m_viewX = camera.getViewX();
      this.m_viewY = camera.getViewY();
      this.m_viewW = camera.getViewWidth();
      this.m_viewH = camera.getViewHeight();
      this.m_renderProxy.setViewPort(this.m_viewX, this.m_viewY, this.m_viewW, this.m_viewH);
    }
  } // apply new view port rectangle area


  reseizeViewPort() {
    this.m_renderProxy.reseizeRCViewPort();
  }

  lockViewport() {
    this.m_adapter.lockViewport();
  }

  unlockViewport() {
    this.m_adapter.unlockViewport();
  }

  getRendererAdapter() {
    return this.m_adapter;
  }

  getRenderer() {
    return this.m_renderer;
  }

  getRendererContext() {
    return this.m_rcontext;
  }

  getStage3D() {
    return this.m_renderProxy.getStage3D();
  }
  /**
   * 获取渲染器可渲染对象管理器状态(版本号)
   */


  getRendererStatus() {
    return this.m_renderer.getRendererStatus();
  }

  getViewWidth() {
    return this.m_renderProxy.getStage3D().viewWidth;
  }

  getViewHeight() {
    return this.m_renderProxy.getStage3D().viewHeight;
  }

  getCamera() {
    return this.m_renderProxy.getCamera();
  }

  asynFBOSizeWithViewport() {
    this.m_rcontext.asynFBOSizeWithViewport();
  }

  synFBOSizeWithViewport() {
    this.m_rcontext.synFBOSizeWithViewport();
  }

  cameraLock() {
    this.m_renderProxy.cameraLock();
  }

  cameraUnlock() {
    this.m_renderProxy.cameraUnlock();
  }

  getMouseXYWorldRay(rl_position, rl_tv) {
    this.m_renderProxy.getMouseXYWorldRay(rl_position, rl_tv);
  }

  createCamera() {
    return new CameraBase_1.default();
  }

  createFBOInstance() {
    return new FBOInstance_1.default(this, this.textureBlock.getRTTStrore());
  }

  createMatrix4() {
    return new Matrix4_1.default();
  }

  createVector3(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
    return new Vector3D_1.default(x, y, z, w);
  }

  setClearUint24Color(colorUint24, alpha = 1.0) {
    this.m_renderProxy.setClearUint24Color(colorUint24, alpha);
  }

  setClearRGBColor3f(pr, pg, pb) {
    this.m_renderProxy.setClearRGBColor3f(pr, pg, pb);
  }

  setClearRGBAColor4f(pr, pg, pb, pa) {
    this.m_renderProxy.setClearRGBAColor4f(pr, pg, pb, pa);
  }

  setClearColor(color) {
    this.m_renderProxy.setClearRGBAColor4f(color.r, color.g, color.b, color.a);
  }

  setRenderToBackBuffer() {
    this.m_rcontext.setRenderToBackBuffer();
  }

  drawBackBufferToCanvas(dstCanvas) {
    let srcCanvas = this.getCanvas();
    var ctx = dstCanvas.getContext("2d");
    ctx.drawImage(srcCanvas, 0, 0, dstCanvas.width, dstCanvas.height);
  }

  updateRenderBufferSize() {
    this.m_adapter.updateRenderBufferSize();
  }

  setEvt3DController(evt3DCtr) {
    throw Error("iellegal operations !!!");
  }

  isRayPickSelected() {
    return false;
  }

  enableMouseEvent(gpuTestEnabled = true) {}

  disableMouseEvent() {}

  getEvt3DController() {
    return null;
  }

  getSpace() {
    // return this.m_rspace;
    return null;
  }

  getDevicePixelRatio() {
    return this.m_adapter.getDevicePixelRatio();
  }
  /**
   * very important renderer scene system function
   */


  createSubScene(rparam = null, renderProcessesTotal = 3, createNewCamera = true) {
    throw Error("illegal operations !!!");
    return null;
  }

  addEventListener(type, target, func, captureEnabled = true, bubbleEnabled = false) {// this.stage3D.addEventListener(type, target, func, captureEnabled, bubbleEnabled);
  }

  removeEventListener(type, target, func) {// this.stage3D.removeEventListener(type, target, func);
  }

  setAccessor(accessor) {
    this.m_accessor = accessor;
  }

  initialize(rparam = null, renderProcessesTotal = 3) {
    if (this.m_renderer == null) {
      if (rparam == null) rparam = new RendererParam_1.default();
      this.m_rparam = rparam;
      let selfT = this;
      selfT.stage3D = new SimpleStage3D_1.default(this.getUid(), document);

      if (renderProcessesTotal < 1) {
        renderProcessesTotal = 1;
      }

      if (renderProcessesTotal > 8) {
        renderProcessesTotal = 8;
      }

      this.m_renderer = CoRenderer.createRendererInstance();

      this.m_renderer.__$setStage3D(this.stage3D);

      Matrix4Pool_1.default.Allocate(rparam.getMatrix4AllocateSize());
      let camera = new CameraBase_1.default();
      this.m_renderer.initialize(rparam, camera, new ShaderProgramBuilder_1.ShaderProgramBuilder(this.m_renderer.getRCUid()));
      let srcSt = CoRenderer.RendererState;
      srcSt.rstb.buildToRST(RendererState_1.default); // RendererState.Initialize(srcSt.Rstate, srcSt.VRO);

      this.m_processids[0] = 0;
      this.m_processidsLen++;
      let process = null;

      for (; renderProcessesTotal >= 0;) {
        process = this.m_renderer.appendProcess(rparam.batchEnabled, rparam.processFixedState);
        this.m_processids[this.m_processidsLen] = process.getRPIndex();
        this.m_processidsLen++;
        --renderProcessesTotal;
      }

      this.m_rcontext = this.m_renderer.getRendererContext();
      this.m_renderProxy = this.m_rcontext.getRenderProxy();
      this.m_adapter = this.m_renderProxy.getRenderAdapter();
      let stage3D = this.m_renderProxy.getStage3D();
      this.m_viewW = stage3D.stageWidth;
      this.m_viewH = stage3D.stageHeight;
      this.m_shader = this.m_renderer.getDataBuilder().getRenderShader();
      this.textureBlock.setRenderer(this.m_renderProxy);
      this.m_camDisSorter = new CameraDsistanceSorter_1.default(this.m_renderProxy);
      this.tickUpdate();
    }
  }

  setRendererProcessParam(index, batchEnabled, processFixedState) {
    this.m_renderer.setRendererProcessParam(this.m_processids[index], batchEnabled, processFixedState);
  }

  appendARendererProcess(batchEnabled = true, processFixedState = false) {
    let process = this.m_renderer.appendProcess(batchEnabled, processFixedState);
    this.m_processids[this.m_processidsLen] = process.getRPIndex();
    this.m_processidsLen++;
  }
  /**
   * get the renderer process by process index
   * @param processIndex IRenderProcess instance index in renderer scene instance
   */


  getRenderProcessAt(processIndex) {
    return this.m_renderer.getProcessAt(this.m_processids[processIndex]);
  }

  addContainer(container, processIndex = 0) {
    if (processIndex < 0) {
      processIndex = 0;
    }

    if (container != null && container.__$wuid < 0 && container.__$contId < 1) {
      let i = 0;

      for (; i < this.m_containersTotal; ++i) {
        if (this.m_containers[i] == container) {
          return;
        }
      }

      if (i >= this.m_containersTotal) {
        container.__$wuid = this.m_uid;
        container.wprocuid = processIndex;

        container.__$setRenderer(this);

        this.m_containers.push(container);
        this.m_containersTotal++;
      }
    }
  }

  removeContainer(container) {
    if (container != null && container.__$wuid == this.m_uid && container.getRenderer() == this.m_renderer) {
      let i = 0;

      for (; i < this.m_containersTotal; ++i) {
        if (this.m_containers[i] == container) {
          container.__$wuid = -1;
          container.wprocuid = -1;

          container.__$setRenderer(null);

          this.m_containers.splice(i, 1);
          --this.m_containersTotal;
          break;
        }
      }
    }
  }

  setAutoRunningEnabled(autoRunning) {
    this.m_autoRunning = autoRunning;
  }

  setAutoRenderingSort(sortEnabled) {
    this.m_processUpdate = sortEnabled;
  }

  setProcessSortEnabledAt(processIndex, sortEnabled, sorter = null) {
    this.m_renderer.setProcessSortEnabledAt(processIndex, sortEnabled);

    if (sortEnabled) {
      let process = this.m_renderer.getProcessAt(processIndex);
      sorter = sorter != null ? sorter : this.m_camDisSorter;

      if (process != null) {
        process.setSorter(sorter);
      }
    }
  }

  setProcessSortEnabled(process, sortEnabled, sorter = null) {
    this.m_renderer.setProcessSortEnabled(process, sortEnabled);

    if (sortEnabled && process != null && !process.hasSorter()) {
      sorter = sorter != null ? sorter : this.m_camDisSorter;
      process.setSorter(sorter);
    }
  }
  /**
   * 将已经在渲染运行时中的entity移动到指定 process uid 的 render process 中去
   * move rendering runtime displayEntity to different renderer process
   */


  moveEntityTo(entity, processindex) {
    this.m_renderer.moveEntityToProcessAt(entity, this.m_processids[processindex]);
  }
  /**
   * 单独绘制可渲染对象, 可能是使用了 global material也可能没有。这种方式比较耗性能,只能用在特殊的地方。
   * @param entity 需要指定绘制的 IRenderEntity 实例
   * @param useGlobalUniform 是否使用当前 global material 所携带的 uniform, default value: false
   * @param forceUpdateUniform 是否强制更新当前 global material 所对应的 shader program 的 uniform, default value: true
   */


  drawEntity(entity, useGlobalUniform = false, forceUpdateUniform = true) {
    this.m_renderer.drawEntity(entity, useGlobalUniform, forceUpdateUniform);
  }
  /**
   * add an entity to the renderer process of the renderer instance
   * @param entity IRenderEntity instance(for example: DisplayEntity class instance)
   * @param processid this destination renderer process id
   * @param deferred if the value is true,the entity will not to be immediately add to the renderer process by its id
   */


  addEntity(entity, processid = 0, deferred = true) {
    if (entity != null && entity.__$testSpaceEnabled()) {
      if (entity.isPolyhedral()) {
        if (entity.hasMesh()) {
          this.m_renderer.addEntity(entity, this.m_processids[processid], deferred);
        } else {
          // 这里的等待队列可能会和加入容器的操作冲突
          // wait queue
          if (this.m_nodeWaitLinker == null) {
            this.m_nodeWaitLinker = new Entity3DNodeLinker_1.default();
            this.m_nodeWaitQueue = new EntityNodeQueue_1.default();
          }

          let node = this.m_nodeWaitQueue.addEntity(entity);
          node.rstatus = processid;
          this.m_nodeWaitLinker.addNode(node);
        }
      } else {
        this.m_renderer.addEntity(entity, this.m_processids[processid], deferred);
      }
    }
  }
  /**
   * remove an entity from the rendererinstance
   * @param entity IRenderEntity instance(for example: DisplayEntity class instance)
   */


  removeEntity(entity) {
    if (entity != null) {
      let node = null;

      if (this.m_nodeWaitLinker != null) {
        let node = this.m_nodeWaitQueue.getNodeByEntity(entity);

        if (node != null) {
          this.m_nodeWaitLinker.removeNode(node);
          this.m_nodeWaitQueue.removeEntity(entity);
        }
      }

      if (node == null) {
        this.m_renderer.removeEntity(entity);
      }
    }
  }

  updateMaterialUniformToCurrentShd(material) {
    this.m_renderer.updateMaterialUniformToCurrentShd(material);
  }

  showInfoAt(index) {
    this.m_renderer.showInfoAt(index);
  }

  getRenderUnitsTotal() {
    return this.m_renderer.getRenderUnitsTotal();
  }

  useCamera(camera, syncCamView = false) {
    this.m_currCamera = camera;

    if (syncCamView) {
      this.m_renderProxy.setRCViewPort(camera.getViewX(), camera.getViewY(), camera.getViewWidth(), camera.getViewHeight(), true);
      this.m_renderProxy.reseizeRCViewPort();
    }

    camera.update();
    this.m_rcontext.resetUniform();
    this.m_renderProxy.updateCameraDataFromCamera(camera);
  }

  useMainCamera() {
    this.m_currCamera = null;
    let camera = this.m_renderProxy.getCamera();
    this.m_renderProxy.setRCViewPort(camera.getViewX(), camera.getViewY(), camera.getViewWidth(), camera.getViewHeight(), true);
    this.m_renderProxy.reseizeRCViewPort();
    this.m_renderProxy.updateCamera();
    this.m_rcontext.resetUniform();
    this.m_renderProxy.updateCameraDataFromCamera(this.m_renderProxy.getCamera());
  }

  updateCameraDataFromCamera(camera) {
    this.m_renderProxy.updateCameraDataFromCamera(camera);
  }
  /**
   * reset renderer rendering state
   */


  resetState() {
    this.m_rcontext.resetState();
  }
  /**
   * reset render shader uniform location
   */


  resetUniform() {
    this.m_rcontext.resetUniform();
  }

  enableSynViewAndStage() {
    this.m_renderProxy.enableSynViewAndStage();
  }
  /**
   * the function only resets the renderer instance rendering status.
   * you should use it before the run or runAt function is called.
   */


  renderBegin(contextBeginEnabled = true) {
    if (this.m_currCamera == null) {
      this.m_adapter.unlockViewport();

      if (this.m_renderProxy.isAutoSynViewAndStage()) {
        let boo = this.m_renderProxy.testViewPortChanged(this.m_viewX, this.m_viewY, this.m_viewW, this.m_viewH);
        this.m_viewX = this.m_renderProxy.getViewX();
        this.m_viewY = this.m_renderProxy.getViewY();
        this.m_viewW = this.m_renderProxy.getViewWidth();
        this.m_viewH = this.m_renderProxy.getViewHeight();

        if (boo) {
          this.m_renderProxy.setRCViewPort(this.m_viewX, this.m_viewY, this.m_viewW, this.m_viewH, true);
          this.m_renderProxy.reseizeRCViewPort();
        }
      } else {
        this.m_renderProxy.setViewPort(this.m_viewX, this.m_viewY, this.m_viewW, this.m_viewH);
      }

      this.m_renderProxy.updateCamera();
      this.m_renderProxy.updateCameraDataFromCamera(this.m_renderProxy.getCamera());
    }

    this.m_shader.renderBegin();

    if (contextBeginEnabled) {
      this.m_rcontext.renderBegin(this.m_currCamera == null);
    }

    this.m_currCamera = null;

    if (this.m_accessor != null) {
      this.m_accessor.renderBegin(this);
    }
  }
  /**
   * the function resets the renderer scene status.
   * you should use it on the frame starting time.
   */


  runBegin(autoCycle = true, contextBeginEnabled = true) {
    if (autoCycle && this.m_autoRunning) {
      if (this.m_runFlag >= 0) this.runEnd();
      this.m_runFlag = 0;
    }

    this.renderBegin(contextBeginEnabled);
  }

  renderContextBegin() {
    this.m_rcontext.renderBegin();
  }

  setRayTestEnabled(enabled) {} // @param       evtFlowPhase: 0(none phase),1(capture phase),2(bubble phase)
  // @param       status: 1(default process),1(deselect ray pick target)
  // @return      1 is send evt yes,0 is send evt no,-1 is event nothing


  runMouseTest(evtFlowPhase, status) {
    return -1;
  }
  /**
   * update all data or status of the renderer runtime
   * should call this function per frame
   */


  update(autoCycle = true, mouseEventEnabled = true) {
    this.stage3D.enterFrame();

    if (autoCycle && this.m_autoRunning) {
      if (this.m_runFlag != 0) this.runBegin();
      this.m_runFlag = 1;
    } // wait mesh data ready to finish


    if (this.m_nodeWaitLinker != null) {
      let nextNode = this.m_nodeWaitLinker.getBegin();

      if (nextNode != null) {
        let pnode;
        let entity;
        let status;

        while (nextNode != null) {
          if (nextNode.entity.hasMesh()) {
            pnode = nextNode;
            nextNode = nextNode.next;
            entity = pnode.entity;
            status = pnode.rstatus;
            this.m_nodeWaitLinker.removeNode(pnode);
            this.m_nodeWaitQueue.removeEntity(pnode.entity); //console.log("RenderScene::update(), ready a mesh data that was finished.");

            this.addEntity(entity, status);
          } else {
            nextNode = nextNode.next;
          }
        }
      }
    }

    let i = 0;

    for (; i < this.m_containersTotal; ++i) {
      this.m_containers[i].update();
    }

    this.m_renderer.update();

    if (this.m_processUpdate) {
      this.m_renderer.updateAllProcess();
    }
  } // 运行渲染可见性裁剪测试，射线检测等空间管理机制


  cullingTest() {} // 鼠标位置的射线拾取测试


  mouseRayTest() {}

  runRenderNodes(nodes) {
    if (nodes != null) {
      // console.log("CoSC runRenderNodes(), nodes.length: ", nodes.length);
      for (let i = 0; i < nodes.length; ++i) {
        nodes[i].render();
      }
    }
  }

  addRenderNodes(node, nodes) {
    for (let i = 0; i < nodes.length; ++i) {
      if (node == nodes[i]) {
        return;
      }
    }

    nodes.push(node);
  }

  prependRenderNode(node) {
    if (node != null && node != this) {
      if (this.m_prependNodes == null) this.m_prependNodes = [];
      this.addRenderNodes(node, this.m_prependNodes);
    }
  }

  appendRenderNode(node) {
    if (node != null && node != this) {
      // console.log("CoSC appendRenderNode(), node: ", node);
      if (this.m_appendNodes == null) this.m_appendNodes = [];
      let ls = this.m_appendNodes;

      for (let i = 0; i < ls.length; ++i) {
        if (node == ls[i]) {
          return;
        }
      }

      ls.push(node);
    }
  }

  removeRenderNode(node) {
    if (node != null) {
      let ls = this.m_prependNodes;

      if (ls != null) {
        for (let i = 0; i < ls.length; ++i) {
          if (node == ls[i]) {
            ls.splice(i, 1);
            break;
          }
        }
      }
    }
  }
  /**
   * run all renderer processes in the renderer instance
   * @param autoCycle the default is true
   */


  run(autoCycle = true) {
    if (this.m_enabled) {
      if (autoCycle && this.m_autoRunning) {
        if (this.m_runFlag != 1) this.update();
        this.m_runFlag = 2;
      }

      this.runnableQueue.run();
      this.runRenderNodes(this.m_prependNodes);

      if (this.m_subscListLen > 0) {
        for (let i = 0; i < this.m_processidsLen; ++i) {
          this.m_renderer.runAt(this.m_processids[i]);
        }
      } else {
        this.m_renderer.run();
      }

      this.runRenderNodes(this.m_appendNodes);

      if (autoCycle) {
        this.runEnd();
      }
    }
  }
  /**
   * run the specific renderer process by its index in the renderer instance
   * @param index the renderer process index in the renderer instance
   */


  runAt(index) {
    if (this.m_enabled) {
      this.m_renderer.runAt(this.m_processids[index]);
    }
  }

  runEnd() {
    this.m_rcontext.runEnd();

    if (this.m_autoRunning) {
      this.m_runFlag = -1;
    }

    if (this.m_accessor != null) {
      this.m_accessor.renderEnd(this);
    }
  }

  render() {}

  renderFlush() {
    if (this.m_renderProxy != null) {
      this.m_renderProxy.flush();
    }
  }

  updateCamera() {
    if (this.m_renderProxy != null) {
      this.m_renderProxy.updateCamera();
    }
  }

  destroy() {}

}

CoSimpleRendererScene.s_uid = 0;
exports.default = CoSimpleRendererScene;

/***/ }),

/***/ "402a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RSEntityFlag_1 = __importDefault(__webpack_require__("11e6"));

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

const AABB_1 = __importDefault(__webpack_require__("fecb"));

const RendererState_1 = __importDefault(__webpack_require__("29ef"));

const ROTransform_1 = __importDefault(__webpack_require__("0929"));

const SpaceCullingMask_1 = __webpack_require__("cc48");

const RODisplay_1 = __importDefault(__webpack_require__("dc2b"));

class DisplayEntity {
  constructor(transform = null, sharedData = false) {
    this.m_uid = 0;
    this.m_transfrom = null;
    this.m_eventDispatcher = null;
    this.m_visible = true;
    this.m_drawEnabled = true;
    this.m_rcolorMask = 0;
    this.m_renderState = 0;
    this.m_display = null;
    this.m_mesh = null; // 如果一个entity如果包含了多个mesh,则这个bounds就是多个mesh aabb 合并的aabb

    this.m_localBounds = null;
    this.m_globalBounds = null;
    this.m_localBuondsVer = -1;
    this.m_parent = null;
    this.m_renderProxy = null;
    this.m_pipeLine = null;
    /**
     * renderer scene entity flag, be used by the renderer system
     * 第0位到第19位总共20位存放自身在space中的 index id(最小值为1, 最大值为1048575,默认值是0, 也就是最多只能展示1048575个entitys),
     * 第20位开始到26位为总共7位止存放在renderer中的状态数据(renderer unique id and others)
     * 第27位存放是否在container里面
     * 第28位开始到29位总共二位存放renderer 载入状态 的相关信息
     * 第30位位存放是否渲染运行时排序
     */

    this.__$rseFlag = RSEntityFlag_1.default.DEFAULT;
    this.name = "DisplayEntity";
    /**
     * 可见性裁剪是否开启, 如果不开启，则摄像机和遮挡剔除都不会裁剪, 取值于 SpaceCullingMask, 默认只会有摄像机裁剪
     */

    this.spaceCullMask = SpaceCullingMask_1.SpaceCullingMask.CAMERA;
    /**
     * recorde a draw status
     */

    this.drawEnabled = false;
    /**
     * mouse interaction enabled
     */

    this.mouseEnabled = false;
    /**
     * whether merge vertex geometry data for shader vertex buffer attribute data
     */

    this.vbWholeDataEnabled = true;
    /**
     * pipes type list for material pipeline
     */

    this.pipeTypes = null;
    this.m_texChanged = false;
    this.m_meshChanged = false;
    this.m_lBoundsVS = null;
    this.m_transStatus = ROTransform_1.default.UPDATE_TRANSFORM;
    this.m_uid = DisplayEntity.s_uid++;

    if (transform == null) {
      this.m_transfrom = ROTransform_1.default.Create();
    } else {
      if (sharedData) {
        this.m_transfrom = ROTransform_1.default.Create(null, transform.getFS32Data());
      } else {
        this.m_transfrom = transform;
      }
    }

    this.createBounds();
  }

  createBounds() {
    this.m_globalBounds = new AABB_1.default();
  }

  __$setRenderProxy(rc) {
    this.m_renderProxy = rc;
  }

  __$setParent(parent) {
    if (this.m_parent == null) {}

    this.m_parent = parent;
  }

  __$getParent() {
    return this.m_parent;
  }

  __$testSpaceEnabled() {
    //return this.__$spaceId < 0 && this.__$contId < 1;
    return RSEntityFlag_1.default.TestSpaceEnabled2(this.__$rseFlag);
  }

  __$testContainerEnabled() {
    //return this.__$wuid < 0 && this.__$contId < 1;
    return RSEntityFlag_1.default.TestContainerEnabled(this.__$rseFlag);
  }

  __$testRendererEnabled() {
    //return this.__$wuid < 0 && this.__$weid < 0 && this.__$contId < 1;
    return RSEntityFlag_1.default.TestRendererEnabled(this.__$rseFlag);
  }

  getRendererUid() {
    return RSEntityFlag_1.default.GetRendererUid(this.__$rseFlag);
  }

  setMaterialPipeline(pipeline) {
    this.m_pipeLine = pipeline;
  }

  getMaterialPipeline() {
    return this.m_pipeLine;
  }
  /**
   * @returns 自身是否未必任何渲染器相关的系统使用
   */


  isFree() {
    return this.__$rseFlag == RSEntityFlag_1.default.DEFAULT;
  }

  dispatchEvt(evt) {
    // if (evt.getClassType() == MouseEvent.EventClassType) {
    if (this.m_eventDispatcher != null) {
      return this.m_eventDispatcher.dispatchEvt(evt);
    } // }


    return 0;
  }

  getEvtDispatcher(evtClassType) {
    return this.m_eventDispatcher;
  }

  setEvtDispatcher(evtDisptacher) {
    this.m_eventDispatcher = evtDisptacher;
  }

  getGlobalBounds() {
    return this.m_globalBounds;
  }

  getLocalBounds() {
    return this.m_mesh.bounds;
  }

  getGlobalBoundsVer() {
    if (this.m_globalBounds != null) {
      return this.m_globalBounds.version;
    }

    return -1;
  }

  __$setDrawEnabled(boo) {
    if (this.m_drawEnabled != boo) {
      this.m_drawEnabled = boo;
      const d = this.m_display;

      if (d != null) {
        d.visible = this.m_visible && boo;

        if (d.__$$runit != null) {
          d.__$$runit.setVisible(d.visible);
        }
      }
    }
  }

  isDrawEnabled() {
    return this.m_drawEnabled;
  }
  /**
   * users need to call this function manually
   * 更新有两种形式, 1: 只是更改资源内部的数据, 2: 替换资源本身
   * 更新过程可以通过DisplayEntity对象来控制，也可以通过资源本身来控制
   */


  updateMeshToGpu(rc = null, deferred = true) {
    if (rc != null) this.m_renderProxy = rc;

    if (this.m_renderProxy != null && this.m_display != null && this.m_display.__$ruid > -1) {
      if (this.m_meshChanged) {
        this.m_meshChanged = false;
        this.m_renderProxy.VtxBufUpdater.updateDispVbuf(this.m_display, deferred);
      } else {
        // this.m_renderProxy.VtxBufUpdater.updateVtxDataToGpuByUid(this.m_display.vbuf.getUid(), deferred);
        this.m_renderProxy.VtxBufUpdater.updateVtxDataToGpuByUid(this.m_display.getVtxResUid(), deferred);
      }
    }
  }
  /**
   * users need to call this function manually
   * 更新有两种形式, 1: 只是更改资源内部的数据, 2: 替换资源本身
   * 更新过程可以通过DisplayEntity对象来控制，也可以通过资源本身来控制
   */


  updateMaterialToGpu(rc = null, deferred = true) {
    if (rc != null) this.m_renderProxy = rc;

    if (this.m_renderProxy != null && this.m_display != null && this.m_display.__$ruid > -1) {
      if (this.m_texChanged) {
        this.m_texChanged = false;
        this.m_renderProxy.MaterialUpdater.updateDispTRO(this.m_display, deferred);
      }
    }
  }
  /**
   * set new textures list for the material of this instance.
   */


  setTextureList(texList) {
    if (this.m_display != null && this.m_display.__$ruid > -1) {
      let material = this.m_display.getMaterial();

      if (material != null) {
        material.setTextureList(texList);
        this.m_texChanged = true;
      }
    }
  }
  /**
   * set new texture by the index in the material textures list for the material of this instance.
   */


  setTextureAt(index, tex) {
    if (this.m_display != null && this.m_display.__$ruid > -1) {
      let material = this.m_display.getMaterial();

      if (material != null) {
        material.setTextureAt(index, tex);
        this.m_texChanged = true;
      }
    }
  }

  setSortValue(value) {
    if (this.m_display != null) {
      if (this.m_display.__$$runit != null) {
        this.m_display.__$$runit.value = value;
      }
    }
  }

  setVisible(boo) {
    if (this.m_visible != boo) {
      this.m_visible = boo;

      if (this.m_display != null) {
        this.m_display.visible = boo && this.m_drawEnabled;

        if (this.m_display.__$$runit != null) {
          this.m_display.__$$runit.setVisible(this.m_display.visible);
        }
      }
    }
  }

  getVisible() {
    return this.m_visible;
  }

  getTransform() {
    return this.m_transfrom;
  }

  copyPositionFrom(entity) {
    if (entity != null) {
      this.m_transfrom.copyPositionFrom(entity.getTransform());
    }
  }

  copyMeshFrom(entity) {
    if (entity != null) {
      this.setMesh(entity.getMesh());
    }
  }

  copyMaterialFrom(entity) {
    if (entity != null) {
      this.setMaterial(entity.getMaterial());
    }
  }

  copyTransformFrom(entity) {
    let pe = entity;

    if (pe != null) {
      this.m_transfrom.copyFrom(pe.m_transfrom);
    }
  }

  initDisplay(m) {
    let vbuf = m.__$attachVBuf();

    vbuf.setBufSortFormat(m.getBufSortFormat());
    const d = this.m_display;
    d.vbuf = vbuf;
    d.ivbuf = m.__$attachIVBuf();
    d.ivsIndex = 0;
    d.ivsCount = m.vtCount;
    d.drawMode = m.drawMode;
    d.trisNumber = m.trisNumber;
    d.visible = this.m_visible && this.m_drawEnabled;
  }
  /**
   * 设置几何相关的数据,必须是构建完备的mesh才能被设置进来
   * 这个设置函数也可以动态运行时更新几何相关的顶点数据
   */


  setMesh(m) {
    if (this.m_mesh == null) {
      if (m != null) {
        if (!m.isEnabled()) {
          m.rebuild();
        }

        if (m.isEnabled()) {
          this.m_mesh = m;

          m.__$attachThis();

          if (this.m_display == null) {
            this.createDisplay();
          }

          if (this.m_display != null) {
            this.m_display.setTransform(this.m_transfrom.getMatrix());
            this.initDisplay(m);
          } //console.log("DisplayEntity::setMesh(), "+this.m_display.toString()+",m.drawMode: "+m.drawMode);


          if (this.m_localBounds == null) {
            this.m_localBounds = m.bounds;
          } else {
            this.m_localBounds.copyFrom(m.bounds);
          }

          this.updateMesh();
        }
      }
    } else if (this.m_display != null && this.m_display.__$ruid > -1) {
      if (this.m_mesh != m && m != null) {
        this.m_transfrom.updatedStatus |= 2;

        this.m_mesh.__$detachVBuf(this.m_display.vbuf);

        this.m_mesh.__$detachIVBuf(this.m_display.ivbuf);

        this.m_mesh.__$detachThis();

        m.__$attachThis();

        this.m_mesh = m;
        this.initDisplay(m);
        this.updateMesh();
        this.m_meshChanged = true;
      }
    }
  }

  updateMesh() {}

  getIvsIndex() {
    return this.m_display.ivsIndex;
  }

  getIvsCount() {
    return this.m_display.ivsCount;
  }

  setIvsParam(ivsIndex, ivsCount, updateBounds = false) {
    if (this.m_display != null) {
      this.m_display.ivsIndex = ivsIndex;
      this.m_display.ivsCount = ivsCount;

      if (this.m_display.__$ruid > -1) {
        let ut = this.m_display.__$$runit;
        ut.trisNumber = Math.floor((ivsCount - ivsIndex) / 3);
        ut.setIvsParam(ivsIndex, ivsCount);
        ut.drawMode = this.m_mesh.drawMode;

        if (updateBounds && this.isPolyhedral()) {
          if (this.m_localBounds == this.m_mesh.bounds) {
            this.m_localBounds = new AABB_1.default();
            this.m_localBounds.copyFrom(this.m_mesh.bounds);
          }

          this.m_transStatus = ROTransform_1.default.UPDATE_TRANSFORM;
          this.m_localBounds.reset();
          let ivs = this.m_mesh.getIVS();
          this.m_localBounds.addFloat32AndIndicesArr(this.m_mesh.getVS(), ivs.subarray(ivsIndex, ivsIndex + ivsCount));
          this.m_localBounds.update();
        }
      }
    }
  }

  getMesh() {
    return this.m_mesh;
  }

  hasMesh() {
    return this.m_mesh != null;
  }
  /**
   * @return 返回true是则表示这是基于三角面的多面体, 返回false则是一个数学方程描述的几何体(例如球体),默认返回true
   */


  isPolyhedral() {
    return this.m_mesh === null || this.m_mesh.isPolyhedral();
  }
  /**
   * @boundsHit       表示是否包围盒体已经和射线相交了
   * @rlpv            表示物体坐标空间的射线起点
   * @rltv            表示物体坐标空间的射线朝向
   * @outV            如果检测相交存放物体坐标空间的交点
   * @return          返回值 -1 表示不会进行检测,1表示相交,0表示不相交
   */


  testRay(rlpv, rltv, outV, boundsHit) {
    return this.m_mesh.testRay(rlpv, rltv, outV, boundsHit);
  }
  /**
   * 只允许在加入渲染器之前设置 IRenderMaterial 实例
   */


  setMaterial(m) {
    if (m != null) {
      if (this.m_display == null) {
        this.m_display = RODisplay_1.default.Create();
        this.m_display.setTransform(this.m_transfrom.getMatrix());
        this.m_display.visible = this.m_visible && this.m_drawEnabled;
      }

      const flag = RSEntityFlag_1.default.RENDERER_UID_FLAG;
      const disp = this.m_display;

      if (disp.getMaterial() != m && (flag & this.__$rseFlag) == flag && disp.__$ruid < 0) {
        disp.renderState = this.m_renderState;
        disp.rcolorMask = this.m_rcolorMask;
        disp.setMaterial(m);
      }
    }
  }

  getMaterial() {
    if (this.m_display != null) {
      return this.m_display.getMaterial();
    }

    return null;
  }

  getDisplay() {
    return this.m_display;
  }

  getInvMatrix() {
    return this.m_transfrom.getInvMatrix();
  }
  /**
   * 获取当前 entity 的 local space to world space matrix
   * @param flag 是否将当前matrix更新到最新, 默认值是true
   * @returns local space to world space matrix
   */


  getMatrix(flag = true) {
    return this.m_transfrom.getMatrix(flag);
  }

  getToParentMatrix() {
    return this.m_transfrom.getToParentMatrix();
  }

  setRenderColorMask(rt) {
    this.m_rcolorMask = rt;

    if (this.m_display != null) {
      this.m_display.rcolorMask = this.m_rcolorMask;

      if (this.m_display.__$$runit != null) {
        this.m_display.__$$runit.setDrawFlag(this.m_renderState, this.m_rcolorMask);
      }
    }
  }

  setRenderColorMaskByName(rt_name) {
    this.m_rcolorMask = RendererState_1.default.GetRenderColorMaskByName(rt_name);

    if (this.m_display != null) {
      this.m_display.rcolorMask = this.m_rcolorMask;

      if (this.m_display.__$$runit != null) {
        this.m_display.__$$runit.setDrawFlag(this.m_renderState, this.m_rcolorMask);
      }
    }
  }

  setRenderState(renderState) {
    this.m_renderState = renderState;

    if (this.m_display != null) {
      this.m_display.renderState = this.m_renderState;

      if (this.m_display.__$$runit != null) {
        this.m_display.__$$runit.setDrawFlag(this.m_renderState, this.m_rcolorMask);
      }
    }
  }

  getRenderState() {
    return this.m_renderState;
  }

  setRenderStateByName(renderState_name) {
    this.m_renderState = RendererState_1.default.GetRenderStateByName(renderState_name);

    if (this.m_display != null) {
      this.m_display.renderState = this.m_renderState;

      if (this.m_display.__$$runit != null) {
        this.m_display.__$$runit.setDrawFlag(this.m_renderState, this.m_rcolorMask);
      }
    }
  }

  createDisplay() {
    this.m_display = RODisplay_1.default.Create();
  }

  activeDisplay() {
    if (this.m_display != null) {
      let material = this.m_display.getMaterial();

      if (material != null) {
        if (material.getShaderData() == null) {
          if (material.getCodeBuf() != null) {
            if (material.getShaderData() == null) {
              let texList = material.getTextureList();
              let texEnabled = texList != null && texList.length > 0;

              if (material.getMaterialPipeline() == null && this.getMaterialPipeline() != null) {
                material.setMaterialPipeline(this.getMaterialPipeline());
              }

              if (material.pipeTypes == null) {
                material.pipeTypes = this.pipeTypes;
              }

              material.initializeByCodeBuf(texEnabled);
            }
          }
        }

        if (this.getMesh() == null) {
          this.__activeMesh(material); //  // for debug


          this.m_display.name = this.name;
        }
      }
    }
  } // for sub class override


  __activeMesh(material) {}

  getUid() {
    return this.m_uid;
  }

  setXYZ(px, py, pz) {
    this.m_transfrom.setXYZ(px, py, pz);
  }

  offsetPosition(pv) {
    this.m_transfrom.offsetPosition(pv);
  }

  setPosition(pv) {
    this.m_transfrom.setPosition(pv);
  }

  getPosition(pv) {
    this.m_transfrom.getPosition(pv);
    return pv;
  }

  setRotation3(rotV) {
    this.m_transfrom.setRotationXYZ(rotV.x, rotV.y, rotV.z);
  }

  setRotationXYZ(rx, ry, rz) {
    this.m_transfrom.setRotationXYZ(rx, ry, rz);
  }

  setScale3(scaleV) {
    this.m_transfrom.setScaleXYZ(scaleV.x, scaleV.y, scaleV.z);
  }

  setScaleXYZ(sx, sy, sz) {
    this.m_transfrom.setScaleXYZ(sx, sy, sz);
  }

  getRotationXYZ(pv) {
    this.m_transfrom.getRotationXYZ(pv);
  }

  getScaleXYZ(pv) {
    this.m_transfrom.getScaleXYZ(pv);
  }

  localToGlobal(pv) {
    if (this.m_transfrom != null) {
      this.m_transfrom.localToGlobal(pv);
    }
  }

  globalToLocal(pv) {
    if (this.m_transfrom != null) {
      this.m_transfrom.globalToLocal(pv);
    }
  }
  /**
   * 表示没有加入任何渲染场景或者渲染器
   */


  isRFree() {
    return this.__$rseFlag == RSEntityFlag_1.default.DEFAULT;
  }
  /**
   * @returns 是否已经加入渲染器中(但是可能还没有进入真正的渲染运行时)
   */


  isInRenderer() {
    return (this.__$rseFlag & RSEntityFlag_1.default.RENDERER_UID_FLAG) != RSEntityFlag_1.default.RENDERER_UID_FLAG;
  }
  /**
   * @returns 是否在渲染器渲染过程中
   */


  isInRendererProcess() {
    return this.m_display != null && this.m_display.__$ruid > -1;
  }
  /**
   * @returns 是否能被渲染
   */


  isRenderEnabled() {
    return this.drawEnabled && this.m_visible && this.m_display != null && this.m_display.__$ruid > -1;
  }

  updateBounds() {
    if (this.m_transfrom != null) {
      this.m_transStatus = ROTransform_1.default.UPDATE_TRANSFORM;

      if (this.m_mesh != null && this.m_localBounds != this.m_mesh.bounds) {
        this.m_localBounds.reset();
        let ivs = this.m_mesh.getIVS();
        this.m_localBounds.addFloat32AndIndicesArr(this.m_mesh.getVS(), ivs.subarray(this.m_display.ivsIndex, this.m_display.ivsIndex + this.m_display.ivsCount));
        this.m_localBounds.update();
      }

      this.update();
    }
  }

  updateLocalBoundsVS(bounds) {
    let min = bounds.min;
    let max = bounds.max;

    if (this.m_lBoundsVS == null) {
      this.m_lBoundsVS = new Float32Array(24);
    }

    let pvs = this.m_lBoundsVS;
    pvs[0] = min.x;
    pvs[1] = min.y;
    pvs[2] = min.z;
    pvs[3] = max.x;
    pvs[4] = min.y;
    pvs[5] = min.z;
    pvs[6] = min.x;
    pvs[7] = min.y;
    pvs[8] = max.z;
    pvs[9] = max.x;
    pvs[10] = min.y;
    pvs[11] = max.z;
    pvs[12] = min.x;
    pvs[13] = max.y;
    pvs[14] = min.z;
    pvs[15] = max.x;
    pvs[16] = max.y;
    pvs[17] = min.z;
    pvs[18] = min.x;
    pvs[19] = max.y;
    pvs[20] = max.z;
    pvs[21] = max.x;
    pvs[22] = max.y;
    pvs[23] = max.z;
  }

  updateGlobalBounds() {
    // 这里的逻辑也有问题,需要再处理，为了支持摄像机等的拾取以及支持遮挡计算等空间管理计算
    let DE = DisplayEntity;
    let bounds = this.m_localBounds;

    if (this.m_transStatus > ROTransform_1.default.UPDATE_POSITION || this.m_localBuondsVer != bounds.version) {
      let st = this.m_transfrom.updateStatus;
      this.m_transfrom.update();

      if (this.m_localBuondsVer != bounds.version || st != this.m_transfrom.updateStatus) {
        this.m_localBuondsVer = bounds.version;
        this.updateLocalBoundsVS(bounds);
        let in_vs = this.m_lBoundsVS;
        let out_vs = DE.s_boundsOutVS;
        this.m_transfrom.getMatrix().transformVectors(in_vs, 24, out_vs);
        this.m_globalBounds.reset();
        this.m_globalBounds.addFloat32Arr(out_vs);
        this.m_globalBounds.update();
      }
    } else {
      DE.s_prePos.setXYZ(0, 0, 0);
      DE.s_pos.setXYZ(0, 0, 0);
      let matrix = this.m_transfrom.getMatrix(false);
      matrix.transformVector3Self(DE.s_prePos);
      this.m_transfrom.update();
      matrix = this.m_transfrom.getMatrix(false);
      matrix.transformVector3Self(DE.s_pos);
      DE.s_pos.subtractBy(DE.s_prePos);
      let gbounds = this.m_globalBounds;
      gbounds.min.addBy(DE.s_pos);
      gbounds.max.addBy(DE.s_pos);
      gbounds.center.addBy(DE.s_pos);
      ++this.m_globalBounds.version;
    }
  }

  update() {
    if (this.m_transfrom.updatedStatus > this.m_transStatus) this.m_transStatus = this.m_transfrom.updatedStatus;

    if (this.m_transStatus != ROTransform_1.default.UPDATE_NONE) {
      if (this.m_mesh != null && this.m_globalBounds != null) {
        this.updateGlobalBounds();
      } else {
        this.m_transfrom.update();
      }

      this.m_transStatus = ROTransform_1.default.UPDATE_NONE;
      this.m_transfrom.updatedStatus = this.m_transStatus;
    }
  }

  destroy() {
    // 当自身被完全移出RenderWorld之后才能执行自身的destroy
    //console.log("DisplayEntity::destroy(), renderer uid: "+this.getRendererUid()+", this.__$spaceId: "+this.__$spaceId);
    if (this.m_eventDispatcher != null) {
      this.m_eventDispatcher.destroy();
      this.m_eventDispatcher = null;
    }

    if (this.m_transfrom != null && this.isFree()) {
      // 这里要保证其在所有的process中都被移除
      if (this.m_display != null) {
        this.m_mesh.__$detachVBuf(this.m_display.vbuf);

        RODisplay_1.default.Restore(this.m_display);
        this.m_display = null;
      }

      ROTransform_1.default.Restore(this.m_transfrom);
      this.m_transfrom = null;

      if (this.m_mesh != null) {
        this.m_mesh.__$detachThis();

        this.m_mesh = null;
      }

      this.__$setParent(null);

      this.m_visible = true;
      this.m_drawEnabled = true;
      this.m_renderProxy = null;
      this.__$rseFlag = RSEntityFlag_1.default.DEFAULT;
    }

    this.m_globalBounds = null;
    this.m_localBounds = null;
    this.m_pipeLine = null;
  }

  toString() {
    return "DisplayEntity(name=" + this.name + ",uid = " + this.m_uid + ", rseFlag = " + this.__$rseFlag + ")";
  }

}

DisplayEntity.s_uid = 0; //private static s_boundsInVS: Float32Array = new Float32Array(24);

DisplayEntity.s_boundsOutVS = new Float32Array(24);
DisplayEntity.s_pos = new Vector3D_1.default();
DisplayEntity.s_prePos = new Vector3D_1.default();
exports.default = DisplayEntity;

/***/ }),

/***/ "4301":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class MaterialContextParam {
  constructor() {
    this.pointLightsTotal = 1;
    this.directionLightsTotal = 1;
    this.spotLightsTotal = 0;
    this.vsmFboIndex = 0;
    this.vsmEnabled = true;
    this.loadAllShaderCode = false;
    this.shaderCodeBinary = false;
    this.shaderLibVersion = "";
    this.shaderFileNickname = false;
    this.lambertMaterialEnabled = true;
    this.pbrMaterialEnabled = true;
    /**
     * 生产 二进制 glsl代码文件
     */

    this.buildBinaryFile = false;
  }

}

exports.MaterialContextParam = MaterialContextParam;

/***/ }),

/***/ "4a54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

const GLSLConverter_1 = __importDefault(__webpack_require__("81ce"));

const ShaderCompileInfo_1 = __importDefault(__webpack_require__("f208"));

const ShaderCode_1 = __webpack_require__("c164");

class ShaderCodeBuilder {
  constructor(uniform) {
    this.m_versionDeclare = `#version 300 es
`;
    this.m_preciousCode = `precision mediump float;
`;
    this.m_fragExt = [];
    this.m_vertExt = [];
    this.m_defineNames = [];
    this.m_defineValues = [];
    this.m_vertLayoutNames = [];
    this.m_vertLayoutTypes = [];
    this.m_fragOutputPrecises = [];
    this.m_fragOutputNames = [];
    this.m_fragOutputTypes = [];
    this.m_vertUniformNames = [];
    this.m_vertUniformTypes = [];
    this.m_fragUniformNames = [];
    this.m_fragUniformTypes = [];
    this.m_varyingNames = [];
    this.m_varyingTypes = [];
    this.m_fragFunctionBlocks = [];
    this.m_vertFunctionBlocks = [];
    this.m_textureSampleTypes = [];
    this.m_texturePrecises = [];
    this.m_textureMacroNames = [];
    this.m_texturePrecise = "";
    this.m_textureFlags = [];
    this.m_vertObjMat = false;
    this.m_vertViewMat = false;
    this.m_vertProjMat = false;
    this.m_fragObjMat = false;
    this.m_fragViewMat = false;
    this.m_fragProjMat = false;
    this.m_vertHeadCode = "";
    this.m_vertMainCode = "";
    this.m_fragHeadCode = "";
    this.m_fragMainCode = "";
    this.m_uniqueNSKeyString = "";
    this.m_uniqueNSKeysTotal = 10;
    this.m_use2DMap = false;
    /**
     * 记录 shader 预编译信息
     */

    this.m_preCompileInfo = null;
    this.fragHeadCodeUnlock = true;
    this.fragMainCodeUnlock = true;
    this.vertHeadCodeUnlock = true;
    this.vertMainCodeUnlock = true;
    this.gamma = true;
    this.autoBuildHeadCodeEnabled = true;
    this.mathDefineEanbled = true;
    this.normalEnabled = false;
    this.normalMapEnabled = false;
    this.mapLodEnabled = false;
    this.derivatives = false;
    this.vertMatrixInverseEnabled = false;
    this.vtxUVTransfromEnabled = false;
    this.fragMatrixInverseEnabled = false;
    let self = this;
    self.uniform = uniform;
  }

  getUniqueNSKeyID() {
    throw Error("can not use this function !!!");
    return this.uniform.getUniqueNSKeyID();
  }

  getUniqueNSKeyString() {
    let ns = this.m_uniqueNSKeyString;
    if (this.vtxUVTransfromEnabled) ns += "VtxUVT";
    if (this.normalEnabled) ns += "Nor";
    return this.uniform.getUniqueNSKeyString() + ns;
  }

  reset() {
    this.m_vertObjMat = true;
    this.m_vertViewMat = true;
    this.m_vertProjMat = true;
    this.m_fragObjMat = false;
    this.m_fragViewMat = false;
    this.m_fragProjMat = false;
    this.fragHeadCodeUnlock = true;
    this.fragMainCodeUnlock = true;
    this.vertHeadCodeUnlock = true;
    this.vertMainCodeUnlock = true;
    this.gamma = true;
    this.autoBuildHeadCodeEnabled = true;
    this.m_use2DMap = false;
    this.m_vertHeadCode = "";
    this.m_vertMainCode = "";
    this.m_fragHeadCode = "";
    this.m_fragMainCode = "";
    this.m_uniqueNSKeyString = "";
    this.m_vertExt = [];
    this.m_fragExt = [];
    this.m_vertLayoutNames = [];
    this.m_vertLayoutTypes = [];
    this.m_fragOutputPrecises = [];
    this.m_fragOutputNames = [];
    this.m_fragOutputTypes = [];
    this.m_varyingNames = [];
    this.m_varyingTypes = [];
    this.m_vertUniformNames = [];
    this.m_vertUniformTypes = [];
    this.m_fragUniformNames = [];
    this.m_fragUniformTypes = [];
    this.m_fragFunctionBlocks = [];
    this.m_vertFunctionBlocks = [];
    this.m_defineNames = [];
    this.m_defineValues = [];
    this.m_textureSampleTypes = [];
    this.m_texturePrecises = [];
    this.m_textureMacroNames = [];
    this.m_textureFlags = [];
    this.m_texturePrecise = "";
    this.mathDefineEanbled = true;
    this.normalEnabled = false;
    this.normalMapEnabled = false;
    this.mapLodEnabled = false;
    this.vertMatrixInverseEnabled = false;
    this.fragMatrixInverseEnabled = false;
    this.vtxUVTransfromEnabled = false;
    this.m_preCompileInfo = null;
    this.uniform.reset();
  }

  addUniqueNSKeyString(key) {
    this.m_uniqueNSKeyString += key;
  }
  /**
   * 预编译信息
   * @returns 返回预编译信息
   */


  getPreCompileInfo() {
    let info = this.m_preCompileInfo;
    this.m_preCompileInfo = null;
    return info;
  }

  useHighPrecious() {
    this.m_preciousCode = "precision highp float;";
  }

  useMediumPrecious() {
    this.m_preciousCode = "precision mediump float;";
  }

  useLowPrecious() {
    this.m_preciousCode = "precision lowp float;";
  }

  addDefine(name, value = "1") {
    if (!this.m_defineNames.includes(name)) {
      this.m_defineNames.push(name);
      this.m_defineValues.push(value);
      return true;
    }

    return false;
  }

  addVertLayout(type, name) {
    if (!this.m_vertLayoutNames.includes(name)) {
      this.m_vertLayoutNames.push(name);
      this.m_vertLayoutTypes.push(type);
    }
  }

  addFragOutputHighp(type, name) {
    if (!this.m_fragOutputNames.includes(name)) {
      this.m_fragOutputPrecises.push("highp");
      this.m_fragOutputNames.push(name);
      this.m_fragOutputTypes.push(type);
    }
  }

  addFragOutput(type, name) {
    if (!this.m_fragOutputNames.includes(name)) {
      this.m_fragOutputPrecises.push("");
      this.m_fragOutputNames.push(name);
      this.m_fragOutputTypes.push(type);
    }
  }

  addVarying(type, name) {
    if (!this.m_varyingNames.includes(name)) {
      this.m_varyingNames.push(name);
      this.m_varyingTypes.push(type);
    }
  }

  addVertUniform(type, name, arrayLength = 0) {
    if (!this.m_vertUniformNames.includes(name)) {
      if (arrayLength > 0) {
        this.m_vertUniformNames.push(name + "[" + arrayLength + "]");
      } else {
        this.m_vertUniformNames.push(name);
      }

      this.m_vertUniformTypes.push(type);
    }
  }

  addVertUniformParam(unifromParam) {
    this.addVertUniform(unifromParam.type, unifromParam.name, unifromParam.arrayLength);
  }

  addFragUniform(type, name, arrayLength = 0) {
    if (!this.m_fragUniformNames.includes(name)) {
      if (arrayLength > 0) {
        this.m_fragUniformNames.push(name + "[" + arrayLength + "]");
      } else {
        this.m_fragUniformNames.push(name);
      }

      this.m_fragUniformTypes.push(type);
    }
  }

  addFragUniformParam(unifromParam) {
    this.addFragUniform(unifromParam.type, unifromParam.name, unifromParam.arrayLength);
  }

  addVertAndFragUniform(type, name, arrayLength = 0) {
    this.addVertUniform(type, name, arrayLength);
    this.addFragUniform(type, name, arrayLength);
  }

  addFragFunction(codeBlock) {
    this.m_fragFunctionBlocks.push(codeBlock);
  }

  addVertFunction(codeBlock) {
    this.m_vertFunctionBlocks.push(codeBlock);
  }

  useTexturePreciseHighp() {
    this.m_texturePrecise = "highp";
  }

  addTextureSample2D(macroName = "", map2DEnabled = true, fragEnabled = true, vertEnabled = false) {
    if (macroName == "" || !this.m_textureMacroNames.includes(macroName)) {
      this.m_textureSampleTypes.push("sampler2D");
      this.m_textureMacroNames.push(macroName);
      this.m_texturePrecises.push(this.m_texturePrecise);
      let flag = 0;
      if (fragEnabled) flag |= 2;
      if (vertEnabled) flag |= 4;
      this.m_textureFlags.push(flag);
      this.m_texturePrecise = "";

      if (map2DEnabled) {
        this.m_use2DMap = true;
      }
    }
  }

  addTextureSampleCube(macroName = "", fragEnabled = true, vertEnabled = false) {
    if (macroName == "" || !this.m_textureMacroNames.includes(macroName)) {
      this.m_textureSampleTypes.push("samplerCube");
      this.m_textureMacroNames.push(macroName);
      this.m_texturePrecises.push(this.m_texturePrecise);
      let flag = 0;
      if (fragEnabled) flag |= 2;
      if (vertEnabled) flag |= 4;
      this.m_textureFlags.push(flag);
      this.m_texturePrecise = "";
    }
  }

  addTextureSample3D(macroName = "", fragEnabled = true, vertEnabled = false) {
    if (macroName == "" || !this.m_textureMacroNames.includes(macroName)) {
      this.m_textureSampleTypes.push("sampler3D");
      this.m_textureMacroNames.push(macroName);
      this.m_texturePrecises.push(this.m_texturePrecise);
      let flag = 0;
      if (fragEnabled) flag |= 2;
      if (vertEnabled) flag |= 4;
      this.m_textureFlags.push(flag);
      this.m_texturePrecise = "";
    }
  }

  isHaveTexture() {
    return this.m_textureSampleTypes.length > 0;
  }

  isHaveTexture2D() {
    return this.m_use2DMap;
  }
  /**
   * vertex shader 使用 空间变换矩阵
   * @param objMatEnabled object space(local space) to wrold space matrix4
   * @param viewMatEnabled world space to view space matrix4
   * @param projMatEnabled view space to projective space matrix4
   */


  useVertSpaceMats(objMatEnabled = true, viewMatEnabled = true, projMatEnabled = true) {
    this.m_vertObjMat = objMatEnabled;
    this.m_vertViewMat = viewMatEnabled;
    this.m_vertProjMat = projMatEnabled;
  }
  /**
   * fragment shader 使用 空间变换矩阵
   * @param objMatEnabled object space(local space) to wrold space matrix4
   * @param viewMatEnabled world space to view space matrix4
   * @param projMatEnabled view space to projective space matrix4
   */


  useFragSpaceMats(objMatEnabled = true, viewMatEnabled = true, projMatEnabled = true) {
    this.m_fragObjMat = objMatEnabled;
    this.m_fragViewMat = viewMatEnabled;
    this.m_fragProjMat = projMatEnabled;
  }

  addVertExtend(code) {
    this.m_vertExt.push(code);
  }

  addFragExtend(code) {
    this.m_fragExt.push(code);
  }

  addVertHeadCode(code) {
    if (code != "") this.m_vertHeadCode += "\n" + code;
  }

  addVertMainCode(code) {
    if (code != "") this.m_vertMainCode += "\n" + code;
  }

  addFragHeadCode(code) {
    if (code != "") this.m_fragHeadCode += "\n" + code;
  }

  addFragMainCode(code) {
    if (code != "") this.m_fragMainCode += "\n" + code;
  }

  addShaderObject(shaderObj) {
    if (this.fragHeadCodeUnlock) this.addFragHeadCode(shaderObj.frag_head);
    if (this.fragMainCodeUnlock) this.addFragMainCode(shaderObj.frag_body);
    if (this.vertHeadCodeUnlock) this.addVertHeadCode(shaderObj.vert_head);
    if (this.vertMainCodeUnlock) this.addVertMainCode(shaderObj.vert_body);
  }

  addShaderObjectHead(shaderObj) {
    if (this.fragHeadCodeUnlock) this.addFragHeadCode(shaderObj.frag_head);
    if (this.vertHeadCodeUnlock) this.addVertMainCode(shaderObj.vert_head);
  }

  autoBuildHeadCode() {
    this.addVertLayout("vec3", "a_vs");

    if (this.m_use2DMap || this.m_vertLayoutNames.includes("a_uvs")) {
      this.addVertLayout("vec2", "a_uvs");
      this.addVarying("vec2", "v_uv");
    }

    if (this.normalEnabled || this.normalMapEnabled || this.m_vertLayoutNames.includes("a_nvs")) {
      this.addVertLayout("vec3", "a_nvs");
      this.addVarying("vec3", "v_worldNormal");
      this.addVarying("vec3", "v_worldPosition");
      this.addDefine("VOX_USE_NORMAL");
      this.vertMatrixInverseEnabled = true;
    } // 保证 顶点shader 中 vtx数据的顺序 a_vs -> a_uvs -> a_nvs


    let words = ["a_vs", "a_uvs", "a_nvs"];
    let nameList = [];
    let typeList = [];

    for (; words.length > 0;) {
      let i = this.m_vertLayoutNames.indexOf(words[0]);

      if (i >= 0) {
        nameList.push(this.m_vertLayoutNames[i]);
        typeList.push(this.m_vertLayoutTypes[i]);
        this.m_vertLayoutNames.splice(i, 1);
        this.m_vertLayoutTypes.splice(i, 1);
      }

      words.shift();
    }

    this.m_vertLayoutNames = nameList.concat(this.m_vertLayoutNames);
    this.m_vertLayoutTypes = typeList.concat(this.m_vertLayoutTypes);

    if (this.vtxUVTransfromEnabled) {
      this.addDefine("VOX_VTX_TRANSFORM_PARAM_INDEX", "0");
    }
  }

  buildFragCode() {
    if (this.autoBuildHeadCodeEnabled) {
      this.autoBuildHeadCode();
    }

    if (this.m_fragOutputNames.length < 1) {
      this.addFragOutput("vec4", "FragColor0");
    }

    let i = 0;
    let len = 0;
    let code = "";

    if (RendererDevice_1.default.FRAG_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED || RendererDevice_1.default.IsMobileWeb()) {
      this.useHighPrecious();
    }

    if (RendererDevice_1.default.IsWebGL2()) {
      code += this.m_versionDeclare;
    }

    this.m_preCompileInfo = new ShaderCompileInfo_1.default();
    this.m_preCompileInfo.info = "\n//##COMPILE_INFO_BEGIN"; // complie info, for example: uniform info

    this.m_preCompileInfo.info += "\n//##COMPILE_INFO_END";
    i = 0;
    len = this.m_fragExt.length;

    for (; i < len; i++) {
      code += "\n" + this.m_fragExt[i];
    }

    if (RendererDevice_1.default.IsWebGL1()) {
      if (this.m_fragOutputNames.length > 1) {
        code += "\n#extension GL_EXT_draw_buffers: require";
      }

      if (this.normalMapEnabled || this.derivatives) {
        code += "\n#extension GL_OES_standard_derivatives : enable";
      }

      if (this.mapLodEnabled) {
        code += "\n#extension GL_EXT_shader_texture_lod : enable";
      }
    }

    if (RendererDevice_1.default.IsMobileWeb()) {
      code += "\nprecision highp float;";
    } else {
      code += "\n" + this.m_preciousCode;
    }

    if (RendererDevice_1.default.IsWebGL2()) {
      code += "\n#define VOX_GLSL_ES3 1";
      code += "\n#define VOX_IN in";

      if (this.mapLodEnabled) {
        code += "\n#define VOX_TextureCubeLod textureLod";
        code += "\n#define VOX_Texture2DLod textureLod";
      }

      code += "\n#define VOX_Texture2D texture";
      code += "\n#define VOX_TextureCube texture";
    } else {
      code += "\n#define VOX_GLSL_ES2 1";
      code += "\n#define VOX_IN varying";

      if (this.mapLodEnabled) {
        code += "\n#define VOX_TextureCubeLod textureCubeLodEXT";
        code += "\n#define VOX_Texture2DLod texture2DLodEXT";
      }

      code += "\n#define VOX_TextureCube textureCube";
      code += "\n#define VOX_Texture2D texture2D";
    }

    if (this.mathDefineEanbled) {
      code += ShaderCode_1.MathShaderCode.BasePredefined;
    }

    len = this.m_defineNames.length;

    for (i = 0; i < len; i++) {
      if (this.m_defineValues[i] != "") {
        code += "\n#define " + this.m_defineNames[i] + " " + this.m_defineValues[i];
      } else {
        code += "\n#define " + this.m_defineNames[i] + " 1";
      }
    }

    i = 0;
    len = this.m_textureMacroNames.length;

    for (; i < len; i++) {
      if (this.m_textureMacroNames[i] != "" && (this.m_textureFlags[i] & 2) != 0) {
        code += "\n#define " + this.m_textureMacroNames[i] + " u_sampler" + i + "";
      }
    }

    if (this.m_use2DMap) {
      code += "\n#define VOX_USE_2D_MAP 1";
    }

    i = 0;
    len = this.m_textureSampleTypes.length;

    for (; i < len; i++) {
      if ((this.m_textureFlags[i] & 2) != 0) {
        if (this.m_texturePrecises[i] == "") {
          code += "\nuniform " + this.m_textureSampleTypes[i] + " u_sampler" + i + ";";
        } else {
          code += "\nuniform " + this.m_texturePrecises[i] + " " + this.m_textureSampleTypes[i] + " u_sampler" + i + ";";
        }
      }
    }

    i = 0;
    len = this.m_fragUniformTypes.length;

    for (; i < len; i++) {
      code += "\nuniform " + this.m_fragUniformTypes[i] + " " + this.m_fragUniformNames[i] + ";";
    }

    if (this.m_fragObjMat) code += "\nuniform mat4 u_objMat;";
    if (this.m_fragViewMat) code += "\nuniform mat4 u_viewMat;";
    if (this.m_fragProjMat) code += "\nuniform mat4 u_projMat;";
    len = this.m_varyingNames.length;

    if (RendererDevice_1.default.IsWebGL2()) {
      for (i = 0; i < len; i++) {
        code += "\nin " + this.m_varyingTypes[i] + " " + this.m_varyingNames[i] + ";";
      }
    } else {
      for (i = 0; i < len; i++) {
        code += "\nvarying " + this.m_varyingTypes[i] + " " + this.m_varyingNames[i] + ";";
      }
    }

    code += ShaderCode_1.ShaderCode.BasePredefined;

    if (this.fragMatrixInverseEnabled && RendererDevice_1.default.IsWebGL1()) {
      this.addVertFunction(GLSLConverter_1.default.__glslInverseMat3);
      this.addVertFunction(GLSLConverter_1.default.__glslInverseMat4);
    }

    code += this.m_fragHeadCode;
    i = 0;
    len = this.m_fragFunctionBlocks.length;

    for (; i < len; i++) {
      code += "\n" + this.m_fragFunctionBlocks[i];
    }

    i = 0;
    len = this.m_fragOutputNames.length;

    if (RendererDevice_1.default.IsWebGL2()) {
      for (; i < len; i++) {
        if (this.m_fragOutputPrecises[i] != "") {
          code += "\nlayout(location = " + i + ") out " + this.m_fragOutputPrecises[i] + " " + this.m_fragOutputTypes[i] + " " + this.m_fragOutputNames[i] + ";";
        } else {
          code += "\nlayout(location = " + i + ") out " + this.m_fragOutputTypes[i] + " " + this.m_fragOutputNames[i] + ";";
        }
      }
    } else {
      if (len == 1) {
        code += "\n#define " + this.m_fragOutputNames[i] + " gl_FragColor";
      }
    } // 检测是否有 main函数


    let haveMainName = false;
    let index = this.m_fragMainCode.indexOf("{");

    if (index > 0) {
      let subStr = this.m_fragMainCode.slice(0, index);
      haveMainName = subStr.indexOf(" main") > 0;

      if (!haveMainName) {
        haveMainName = this.m_fragMainCode.indexOf(" main") > 0;
      }
    }

    if (haveMainName) {
      code += this.m_fragMainCode;
    } else {
      code += "\nvoid main() {\n";
      code += this.m_fragMainCode;
      code += "\n}\n";
    }

    len = this.m_fragOutputNames.length;

    if (RendererDevice_1.default.IsWebGL1()) {
      if (len > 1) {
        for (i = 0; i < len; i++) {
          let tempReg = new RegExp(this.m_fragOutputNames[i], "g");
          code = code.replace(tempReg, "gl_FragData[" + i + "]");
        }
      }
    }

    return code;
  }

  buildVertCode() {
    let i = 0;
    let len = 0;
    let code = "";

    if (RendererDevice_1.default.VERT_SHADER_PRECISION_GLOBAL_HIGHP_ENABLED) {
      this.useHighPrecious();
    }

    if (RendererDevice_1.default.IsWebGL2()) {
      code += this.m_versionDeclare;
    }

    i = 0;
    len = this.m_vertExt.length;

    for (; i < len; i++) {
      code += "\n" + this.m_vertExt[i];
    }

    if (RendererDevice_1.default.IsMobileWeb()) {
      code += "\nprecision highp float;";
    } else {
      code += "\n" + this.m_preciousCode;
    }

    if (RendererDevice_1.default.IsWebGL2()) {
      code += "\n#define VOX_GLSL_ES3 1";
      code += "\n#define VOX_IN in";

      if (this.mapLodEnabled) {
        code += "\n#define VOX_TextureCubeLod textureLod";
        code += "\n#define VOX_Texture2DLod textureLod";
      }

      code += "\n#define VOX_Texture2D texture";
      code += "\n#define VOX_TextureCube texture";
    } else {
      code += "\n#define VOX_GLSL_ES2 1";
      code += "\n#define VOX_IN varying";

      if (this.mapLodEnabled) {
        code += "\n#define VOX_TextureCubeLod textureCubeLodEXT";
        code += "\n#define VOX_Texture2DLod texture2DLodEXT";
      }

      code += "\n#define VOX_TextureCube textureCube";
      code += "\n#define VOX_Texture2D texture2D";
    }

    if (RendererDevice_1.default.IsWebGL2()) {
      code += "\n#define VOX_OUT out";
    } else {
      code += "\n#define VOX_OUT varying";
    }

    if (this.mathDefineEanbled) {
      code += ShaderCode_1.MathShaderCode.BasePredefined;
    }

    len = this.m_defineNames.length;

    for (i = 0; i < len; i++) {
      if (this.m_defineValues[i] != "") {
        code += "\n#define " + this.m_defineNames[i] + " " + this.m_defineValues[i];
      } else {
        code += "\n#define " + this.m_defineNames[i];
      }
    } //if (this.m_use2DMap) {
    //    code += "\n#define VOX_USE_2D_MAP 1";
    //}


    i = 0;
    len = this.m_textureMacroNames.length;

    for (; i < len; i++) {
      if (this.m_textureMacroNames[i] != "" && (this.m_textureFlags[i] & 4) != 0) {
        code += "\n#define " + this.m_textureMacroNames[i] + " u_sampler" + i + "";
      }
    }

    if (this.m_use2DMap) {
      code += "\n#define VOX_USE_2D_MAP 1";
    }

    i = 0;
    len = this.m_textureSampleTypes.length;

    for (; i < len; i++) {
      if ((this.m_textureFlags[i] & 4) != 0) {
        if (this.m_texturePrecises[i] == "") {
          code += "\nuniform " + this.m_textureSampleTypes[i] + " u_sampler" + i + ";";
        } else {
          code += "\nuniform " + this.m_texturePrecises[i] + " " + this.m_textureSampleTypes[i] + " u_sampler" + i + ";";
        }
      }
    }

    len = this.m_vertLayoutNames.length;

    if (RendererDevice_1.default.IsWebGL2()) {
      for (i = 0; i < len; i++) {
        code += "\nlayout(location = " + i + ") in " + this.m_vertLayoutTypes[i] + " " + this.m_vertLayoutNames[i] + ";";
      }
    } else {
      for (i = 0; i < len; i++) {
        code += "\nattribute " + this.m_vertLayoutTypes[i] + " " + this.m_vertLayoutNames[i] + ";";
      }
    }

    len = this.m_vertUniformTypes.length;

    for (i = 0; i < len; i++) {
      code += "\nuniform " + this.m_vertUniformTypes[i] + " " + this.m_vertUniformNames[i] + ";";
    }

    if (this.m_vertObjMat) code += "\nuniform mat4 u_objMat;";
    if (this.m_vertViewMat) code += "\nuniform mat4 u_viewMat;";
    if (this.m_vertProjMat) code += "\nuniform mat4 u_projMat;";
    len = this.m_varyingNames.length;

    if (RendererDevice_1.default.IsWebGL2()) {
      for (i = 0; i < len; i++) {
        code += "\nout " + this.m_varyingTypes[i] + " " + this.m_varyingNames[i] + ";";
      }
    } else {
      for (i = 0; i < len; i++) {
        code += "\nvarying " + this.m_varyingTypes[i] + " " + this.m_varyingNames[i] + ";";
      }
    }

    code += ShaderCode_1.ShaderCode.BasePredefined;
    code += ShaderCode_1.ShaderCode.VertPredefined;

    if (this.vertMatrixInverseEnabled && RendererDevice_1.default.IsWebGL1()) {
      this.addVertFunction(GLSLConverter_1.default.__glslInverseMat3);
      this.addVertFunction(GLSLConverter_1.default.__glslInverseMat4);
    }

    code += this.m_vertHeadCode;
    i = 0;
    len = this.m_vertFunctionBlocks.length;

    for (; i < len; i++) {
      code += "\n" + this.m_vertFunctionBlocks[i];
    } // 检测是否有 main函数


    let haveMainName = false;
    let index = this.m_vertMainCode.indexOf("{");

    if (index > 0) {
      let subStr = this.m_vertMainCode.slice(0, index);
      haveMainName = subStr.indexOf(" main") > 0;

      if (!haveMainName) {
        haveMainName = this.m_vertMainCode.indexOf(" main") > 0;
      }
    }

    if (haveMainName) {
      code += this.m_vertMainCode;
    } else {
      code += "\nvoid main() {\n";
      code += this.m_vertMainCode;
      code += "\n}\n";
    }

    return code;
  }

}

exports.default = ShaderCodeBuilder;

/***/ }),

/***/ "4cf7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

const TextureProxyType_1 = __webpack_require__("7918");
/**
 * 本类作基础纹理对象的对象池
 */


class TexturePool {
  constructor() {
    this.m_imgTexList = [];
    this.m_bytesTexList = [];
    this.m_floatTexList = [];
    this.m_wrapperTexList = [];
  }

  addTexture(texture) {
    switch (texture.getType()) {
      case TextureProxyType_1.TextureProxyType.Image:
        this.m_imgTexList.push(texture);
        break;

      case TextureProxyType_1.TextureProxyType.Bytes:
        this.m_bytesTexList.push(texture);
        break;

      case TextureProxyType_1.TextureProxyType.Float:
        this.m_floatTexList.push(texture);
        break;

      case TextureProxyType_1.TextureProxyType.Wrapper:
        this.m_wrapperTexList.push(texture);
        break;

      default:
        break;
    }
  }

  getTexture(type) {
    switch (type) {
      case TextureProxyType_1.TextureProxyType.Image:
        if (this.m_imgTexList.length > 0) {
          return this.m_imgTexList.pop();
        }

        break;

      case TextureProxyType_1.TextureProxyType.Bytes:
        if (this.m_bytesTexList.length > 0) {
          return this.m_bytesTexList.pop();
        }

        break;

      case TextureProxyType_1.TextureProxyType.Float:
        if (this.m_floatTexList.length > 0) return this.m_floatTexList.pop();
        break;

      case TextureProxyType_1.TextureProxyType.Wrapper:
        if (this.m_wrapperTexList.length > 0) return this.m_wrapperTexList.pop();
        break;

      default:
        break;
    }

    return null;
  }

}

exports.TexturePool = TexturePool;
exports.default = TexturePool;

/***/ }),

/***/ "4efa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

const SpecularMode_1 = __webpack_require__("839a");

const ShadowMode_1 = __webpack_require__("a9f4");

class ShaderTextureBuilder {
  constructor(codeBuilder) {
    this.m_coderBuilder = null;
    this.m_uniform = null;
    this.m_texList = [];
    this.m_coderBuilder = codeBuilder;
    this.m_uniform = codeBuilder.uniform;
  }

  getCodeBuilder() {
    return this.m_coderBuilder;
  }

  reset() {
    this.m_texList = [];
  }

  getTextures() {
    return this.m_texList;
  }

  getTexturesTotal() {
    return this.m_texList.length;
  }
  /**
   * add diffuse map uniform code
   */


  addDiffuseMap(tex) {
    if (tex != null) {
      this.m_uniform.addDiffuseMap();
      this.m_texList.push(tex);
    }
  }
  /**
   * add normal map uniform code
   */


  addNormalMap(tex) {
    if (tex != null) {
      this.m_uniform.addNormalMap();
      this.m_texList.push(tex);
    }
  }
  /**
   * add parallax map uniform code
   * @param parallaxParamIndex parallax map parameter uniform data array index
   */


  addParallaxMap(tex, parallaxParamIndex) {
    if (tex != null) {
      this.m_uniform.addParallaxMap(parallaxParamIndex);
      this.m_texList.push(tex);
    }
  }
  /**
   * add displacement map uniform code
   * @param parallaxParamIndex vec4 param array index in the vertex shader
   */


  addDisplacementMap(tex, displacementParamIndex) {
    if (tex != null) {
      this.m_uniform.addDisplacementMap(displacementParamIndex);
      this.m_texList.push(tex);
    }
  }
  /**
   * add specular map uniform code
   * @param specularMode is SpecularMode type value, the default is SpecularMode.Default
   */


  addSpecularMap(tex, specularMode = SpecularMode_1.SpecularMode.Default) {
    if (tex != null) {
      this.m_uniform.addSpecularMap(specularMode);
      this.m_texList.push(tex);
    }
  }
  /**
   * add shadow map uniform code
   * @param shadowMode is shadowMode type value, the default is ShadowMode.VSM
   */


  addShadowMap(tex, shadowMode = ShadowMode_1.ShadowMode.VSM) {
    if (tex != null) {
      this.m_uniform.addShadowMap(shadowMode);
      this.m_texList.push(tex);
    }
  }
  /**
   * add env specular cube map uniform code
   * @param cubeMap yes or no, the default is true
   */


  addSpecularEnvMap(tex, cubeMap = true) {
    if (tex != null) {
      this.m_uniform.addSpecularEnvMap(cubeMap);
      this.m_texList.push(tex);
    }
  }
  /**
   * add ambient occlusion map uniform code
   */


  addAOMap(tex) {
    if (tex != null) {
      this.m_uniform.addAOMap();
      this.m_texList.push(tex);
    }
  }
  /**
   * add roughness map uniform code
   */


  addRoughnessMap(tex) {
    if (tex != null) {
      this.m_uniform.addRoughnessMap();
      this.m_texList.push(tex);
    }
  }
  /**
   * add metalness map uniform code
   */


  addMetalnessMap(tex) {
    if (tex != null) {
      this.m_uniform.addMetalnessMap();
      this.m_texList.push(tex);
    }
  }
  /**
   * add ao, roughness, metalness map uniform code
   */


  addARMMap(tex) {
    if (tex != null) {
      this.m_uniform.addARMMap();
      this.m_texList.push(tex);
    }
  }
  /**
   * add sampler2d texture uniform code
   * @param tex 2d IRenderTexture instance
   * @param macroName shader code macro define name, the default vaule is empty string
   * @param map2DEnabled texture 2d enabled, the default vaule is true
   * @param fragEnabled fragment shader applying enabled, the default vaule is true
   * @param vertEnabled vertex shader applying enabled, the default vaule is false
   */


  add2DMap(tex, macroName = "", map2DEnabled = true, fragEnabled = true, vertEnabled = false) {
    if (tex != null) {
      this.m_uniform.add2DMap(macroName, map2DEnabled, fragEnabled, vertEnabled);
      this.m_texList.push(tex);
    }
  }
  /**
   * add sampleCube texture uniform code
   * @param tex cube IRenderTexture instance
   * @param macroName shader code macro define name, the default vaule is empty string
   * @param fragEnabled fragment shader applying enabled, the default vaule is true
   * @param vertEnabled vertex shader applying enabled, the default vaule is false
   */


  addCubeMap(tex, macroName = "", fragEnabled = true, vertEnabled = false) {
    if (tex != null) {
      this.m_uniform.addCubeMap(macroName, fragEnabled, vertEnabled);
      this.m_texList.push(tex);
    }
  }
  /**
   * add sample3D texture uniform code
   * @param tex 3d IRenderTexture instance
   * @param macroName shader code macro define name, the default vaule is empty string
   * @param fragEnabled fragment shader applying enabled, the default vaule is true
   * @param vertEnabled vertex shader applying enabled, the default vaule is false
   */


  add3DMap(tex, macroName = "", fragEnabled = true, vertEnabled = false) {
    if (tex != null) {
      this.m_uniform.add3DMap(macroName, fragEnabled, vertEnabled);
      this.m_texList.push(tex);
    }
  }

}

exports.ShaderTextureBuilder = ShaderTextureBuilder;

/***/ }),

/***/ "519e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const MeshBase_1 = __importDefault(__webpack_require__("cb29"));

const ROVertexBuffer_1 = __importDefault(__webpack_require__("e7d2"));

const AABB_1 = __importDefault(__webpack_require__("fecb"));

const SurfaceNormalCalc_1 = __importDefault(__webpack_require__("35fa"));

class DataMesh extends MeshBase_1.default {
  constructor(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    super(bufDataUsage);
    this.m_initIVS = null;
    this.m_boundsChanged = true;
    this.m_vs = null;
    this.m_uvs = null;
    this.m_nvs = null;
    this.m_cvs = null;
    this.m_tvs = null;
    this.m_btvs = null;
    this.m_rayTester = null;
    this.m_boundsVersion = -2;
    this.autoBuilding = true;
    this.vsStride = 3;
    this.uvsStride = 2;
    this.nvsStride = 3;
    this.cvsStride = 3;
  }

  setRayTester(rayTester) {
    this.m_rayTester = rayTester;
  }
  /**
   * set vertex position data
   * @param vs vertex position buffer Float32Array
   */


  setVS(vs) {
    this.m_vs = vs;
    this.m_boundsChanged = true;
    return this;
  }
  /**
   * @returns vertex position buffer Float32Array
   */


  getVS() {
    return this.m_vs;
  }
  /**
   * set vertex uv data
   * @param vs vertex uv buffer Float32Array
   */


  setUVS(uvs) {
    this.m_uvs = uvs;
    return this;
  }
  /**
   * @returns vertex uv buffer Float32Array
   */


  getUVS() {
    return this.m_uvs;
  }
  /**
   * set vertex normal data
   * @param vs vertex normal buffer Float32Array
   */


  setNVS(nvs) {
    this.m_nvs = nvs;
    return this;
  }
  /**
   * @returns vertex normal buffer Float32Array
   */


  getNVS() {
    return this.m_nvs;
  }
  /**
   * set vertex tangent data
   * @param vs vertex tangent buffer Float32Array
   */


  setTVS(tvs) {
    this.m_tvs = tvs;
    return this;
  }
  /**
   * @returns vertex tangent buffer Float32Array
   */


  getTVS() {
    return this.m_tvs;
  }
  /**
   * set vertex bitangent data
   * @param vs vertex bitangent buffer Float32Array
   */


  setBTVS(btvs) {
    this.m_btvs = btvs;
    return this;
  }
  /**
   * set vertex color(r,g,b) data
   * @param vs vertex color(r,g,b) buffer Float32Array
   */


  setCVS(cvs) {
    this.m_cvs = cvs;
    return this;
  }
  /**
   * @returns vertex bitangent buffer Float32Array
   */


  getBTVS() {
    return this.m_btvs;
  }

  setIVS(ivs) {
    this.m_initIVS = ivs;
    this.m_ivs = ivs;
    this.m_boundsChanged = true;
    return this;
  }

  initializeFromGeometry(geom) {
    this.m_vs = geom.getVS();
    this.m_uvs = geom.getUVS();
    this.m_nvs = geom.getNVS();
    this.m_tvs = geom.getTVS();
    this.m_btvs = geom.getBTVS();
    this.m_cvs = geom.getCVS();
    this.m_ivs = geom.getIVS();
    this.m_initIVS = this.m_ivs;
    this.m_boundsChanged = true;
    this.initialize();
  }

  initialize() {
    if (this.m_vs != null) {
      if (this.autoBuilding) {
        if (this.bounds == null) {
          this.bounds = new AABB_1.default();
          this.bounds.addFloat32Arr(this.m_vs);
          this.bounds.update();
        } else if (this.m_boundsChanged || this.m_boundsVersion == this.bounds.version) {
          this.bounds.reset(); // 如果重新init, 但是版本号却没有改变，说明bounds需要重新计算

          this.bounds.addFloat32Arr(this.m_vs);
          this.bounds.update();
        }
      }

      this.m_boundsVersion = this.bounds.version;
      this.m_boundsChanged = false;
      this.m_ivs = this.m_initIVS;
      ROVertexBuffer_1.default.Reset();
      ROVertexBuffer_1.default.AddFloat32Data(this.m_vs, this.vsStride);

      if (this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_UVS_INDEX)) {
        ROVertexBuffer_1.default.AddFloat32Data(this.m_uvs, this.uvsStride);
      } else {
        console.warn("DataMesh hasn't uv data.");
      }

      if (this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_NVS_INDEX)) {
        if (this.m_nvs == null) {
          let trisNumber = this.m_ivs.length / 3;
          this.m_nvs = new Float32Array(this.m_vs.length);
          SurfaceNormalCalc_1.default.ClacTrisNormal(this.m_vs, this.m_vs.length, trisNumber, this.m_ivs, this.m_nvs);
        }

        ROVertexBuffer_1.default.AddFloat32Data(this.m_nvs, this.nvsStride);
      } else {
        console.warn("DataMesh hasn't normal(nvs) data.");
      }

      if (this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_CVS_INDEX)) {
        ROVertexBuffer_1.default.AddFloat32Data(this.m_cvs, this.cvsStride);
      } else {
        console.warn("DataMesh hasn't color(cvs) data.");
      }

      if (this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_TVS_INDEX)) {
        ROVertexBuffer_1.default.AddFloat32Data(this.m_tvs, 3);
        ROVertexBuffer_1.default.AddFloat32Data(this.m_btvs, 3);
      }

      ROVertexBuffer_1.default.vbWholeDataEnabled = this.vbWholeDataEnabled;
      this.vtCount = this.m_ivs.length;

      if (this.autoBuilding) {
        this.vtxTotal = this.m_vs.length / this.vsStride;
        this.updateWireframeIvs();
        this.vtCount = this.m_ivs.length;
        this.trisNumber = this.vtCount / 3;
      }

      if (this.m_vbuf != null) {
        ROVertexBuffer_1.default.UpdateBufData(this.m_vbuf);
      } else {
        let u = this.getBufDataUsage();
        let f = this.getBufSortFormat();
        this.m_vbuf = ROVertexBuffer_1.default.CreateBySaveData(u, f);

        if (this.vbWholeDataEnabled) {
          this.m_vbuf = ROVertexBuffer_1.default.CreateBySaveData(u, f);
        } else {
          this.m_vbuf = ROVertexBuffer_1.default.CreateBySaveDataSeparate(u);
        }
      }

      this.m_vbuf.setUintIVSData(this.m_ivs);
      this.buildEnd();
    }
  }
  /**
   * 射线和自身的相交检测(多面体或几何函数(例如球体))
   * @rlpv            表示物体坐标空间的射线起点
   * @rltv            表示物体坐标空间的射线朝向
   * @outV            如果检测相交存放物体坐标空间的交点
   * @boundsHit       表示是否包围盒体已经和射线相交了
   * @return          返回值 -1 表示不会进行检测,1表示相交,0表示不相交
   */


  testRay(rlpv, rltv, outV, boundsHit) {
    if (this.m_rayTester != null) {
      return this.m_rayTester.testRay(rlpv, rltv, outV, boundsHit);
    }

    return -1;
  }

  __$destroy() {
    if (this.isResFree()) {
      this.bounds = null;

      if (this.m_rayTester != null) {
        this.m_rayTester.destroy();
        this.m_rayTester = null;
      }

      this.m_vs = null;
      this.m_uvs = null;
      this.m_nvs = null;
      this.m_cvs = null;
      this.m_tvs = null;
      this.m_btvs = null;
      this.m_initIVS = null;

      super.__$destroy();
    }
  }

}

exports.default = DataMesh;

/***/ }),

/***/ "5216":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MaterialPipeType;

(function (MaterialPipeType) {
  MaterialPipeType[MaterialPipeType["ENV_LIGHT_PARAM"] = 0] = "ENV_LIGHT_PARAM";
  MaterialPipeType[MaterialPipeType["ENV_AMBIENT_LIGHT"] = 1] = "ENV_AMBIENT_LIGHT";
  MaterialPipeType[MaterialPipeType["FOG"] = 2] = "FOG";
  MaterialPipeType[MaterialPipeType["FOG_EXP2"] = 3] = "FOG_EXP2";
  MaterialPipeType[MaterialPipeType["VSM_SHADOW"] = 4] = "VSM_SHADOW";
  MaterialPipeType[MaterialPipeType["GLOBAL_LIGHT"] = 5] = "GLOBAL_LIGHT";
})(MaterialPipeType || (MaterialPipeType = {}));

exports.MaterialPipeType = MaterialPipeType;

/***/ }),

/***/ "52e0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

const TextureProxyType_1 = __webpack_require__("7918");

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TextureTarget_1 = __importDefault(__webpack_require__("5deb"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class BytesCubeTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight) {
    super(texWidth, texHeight, false);
    this.m_imgDataList = null;
    this.m_texTarget = TextureTarget_1.default.TEXTURE_CUBE;
    this.mipmapEnabled = true;
    this.m_type = TextureProxyType_1.TextureProxyType.BytesCube;
  }

  toAlphaFormat() {
    this.srcFormat = TextureFormat_1.default.ALPHA;
    this.internalFormat = TextureFormat_1.default.ALPHA;
    this.unpackAlignment = 1;
  }

  toRedFormat() {
    this.srcFormat = TextureFormat_1.default.RED;
    this.internalFormat = TextureFormat_1.default.RED;
    this.unpackAlignment = 1;
  }

  toRGBFormat() {
    this.srcFormat = TextureFormat_1.default.RGB;
    this.internalFormat = TextureFormat_1.default.RGB;
    this.unpackAlignment = 1;
  }

  toRGBAFormat() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.unpackAlignment = 4;
  }

  setDataFromBytesToFaceAt(index, bytes, pw, ph, miplevel = 0) {
    if (this.m_imgDataList == null) {
      this.m_imgDataList = [null, null, null, null, null, null];
    }

    if (pw > 0 && ph > 0) {
      if (index == 0 && miplevel < 1) {
        this.m_texWidth = pw;
        this.m_texHeight = ph;
        this.m_miplevel = miplevel;
      }

      if (this.m_imgDataList[index] == null) {
        this.m_imgDataList[index] = new Array(16);
      }

      let arr = this.m_imgDataList[index];
      arr[miplevel] = {
        width: pw,
        height: ph,
        imgData: bytes,
        miplevel: miplevel
      };
      this.m_haveRData = arr[miplevel].imgData != null;
    }
  }

  uploadData(texRes) {
    let gl = texRes.getRC();
    let imo = null;
    let width = this.getWidth();
    let height = this.getHeight();
    let pw;
    let ph;

    for (let i = 0; i < 6; ++i) {
      let arr = this.m_imgDataList[i];

      if (this.mipmapEnabled && this.m_generateMipmap) {
        imo = arr[0];
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, TextureFormat_1.default.ToGL(gl, this.internalFormat), width, height, 0, TextureFormat_1.default.ToGL(gl, this.srcFormat), TextureDataType_1.default.ToGL(gl, this.dataType), imo.imgData);
      } else {
        pw = width;
        ph = height;
        let j = 0;

        for (; pw > 0 || ph > 0;) {
          if (arr[j] != null) {
            imo = arr[j];
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, TextureFormat_1.default.ToGL(gl, this.internalFormat), pw, ph, 0, TextureFormat_1.default.ToGL(gl, this.srcFormat), TextureDataType_1.default.ToGL(gl, this.dataType), imo.imgData);
          }

          if (pw > 0) pw >>= 1;
          if (ph > 0) ph >>= 1;
          ++j;
        }
      }
    }

    this.version = 0;
  }

  toString() {
    return "[BytesCubeTextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      this.version = 0;

      if (this.m_imgDataList != null) {
        for (let i = 0; i < 6; ++i) {
          if (this.m_imgDataList[i] != null) {
            this.m_imgDataList[i].imgData = null;
          }
        }
      }

      console.log("BytesCubeTextureProxy::destroy(), destroy a BytesCubeTextureProxy instance...");

      super.__$destroy();
    }
  }

}

exports.default = BytesCubeTextureProxy;

/***/ }),

/***/ "557f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureTarget_1 = __importDefault(__webpack_require__("5deb"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class Texture3DProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight, tex3DDepth = 1, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_bytes = null;
    this.m_tex3DDepth = 1;
    this.internalFormat = TextureFormat_1.default.R8;
    this.srcFormat = TextureFormat_1.default.RED;
    this.m_tex3DDepth = tex3DDepth;
    this.m_texTarget = TextureTarget_1.default.TEXTURE_3D;
    this.m_type = TextureProxyType_1.TextureProxyType.Texture3D;
    this.unpackAlignment = 1;
  }

  getDepth() {
    return this.m_tex3DDepth;
  }

  uploadFromTypedArray(bytesData, miplevel = 0) {
    if (!this.isGpuEnabled()) {
      this.m_bytes = bytesData;
      this.m_miplevel = miplevel;
      this.m_haveRData = true;
    }
  }

  uploadData(texRes) {
    if (this.m_bytes != null) {
      let gl = texRes.getRC();
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texImage3D(gl.TEXTURE_3D, // target
      0, // level
      TextureFormat_1.default.ToGL(gl, this.internalFormat), // internalformat,DEFAULT: gl.R8
      this.m_texWidth, // width
      this.m_texHeight, // height
      this.m_tex3DDepth, // depth
      0, // border
      TextureFormat_1.default.ToGL(gl, this.srcFormat), // format,DEFAULT: gl.RED
      gl.UNSIGNED_BYTE, // type
      this.m_bytes // pixels
      );
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      this.m_bytes = null;
      console.log("Texture3DProxy::destroy(), destroy a Texture3DProxy instance...");

      super.__$destroy();
    }
  }

  toString() {
    return "[Texture3DProxy(width=" + this.getWidth() + ",height=" + this.getHeight() + ",depth=" + this.getDepth() + ")]";
  }

}

exports.default = Texture3DProxy;

/***/ }),

/***/ "5d04":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TexturePool_1 = __importDefault(__webpack_require__("4cf7"));

const ImageTextureProxy_1 = __importDefault(__webpack_require__("5e78"));

const BytesTextureProxy_1 = __importDefault(__webpack_require__("fe7f"));

const Uint16TextureProxy_1 = __importDefault(__webpack_require__("9f3e"));

const FloatTextureProxy_1 = __importDefault(__webpack_require__("f928"));

const FloatCubeTextureProxy_1 = __importDefault(__webpack_require__("eaee"));

const BytesCubeTextureProxy_1 = __importDefault(__webpack_require__("52e0"));

const ImageCubeTextureProxy_1 = __importDefault(__webpack_require__("d314"));

const Texture3DProxy_1 = __importDefault(__webpack_require__("557f"));

const TextureResSlot_1 = __importDefault(__webpack_require__("da6a"));

const RTTTextureStore_1 = __webpack_require__("ccdf");
/**
 * 本类作为所有基础纹理对象的管理类,只允许在RendererInstance之上的类中使用
 */


class TextureBlock {
  constructor() {
    this.m_texPool = new TexturePool_1.default();
    this.m_rttStore = null;
    this.m_renderProxy = null;
    this.m_texLoaders = [];
    this.m_clearDelay = 128;
  }

  addTexLoader(texLoader) {
    if (texLoader != null) {
      let i = 0;
      let il = this.m_texLoaders.length;

      for (; i < il; ++i) {
        if (texLoader == this.m_texLoaders[i]) {
          break;
        }
      }

      if (i >= il) {
        this.m_texLoaders.push(texLoader);
      }
    }
  }

  removeTexLoader(texLoader) {
    if (texLoader != null) {
      let i = 0;
      let il = this.m_texLoaders.length;

      for (; i < il; ++i) {
        if (texLoader == this.m_texLoaders[i]) {
          this.m_texLoaders.slice(i, 1);
          break;
        }
      }
    }
  }
  /**
   * 设置当前的渲染器
   * @param renderProxy 当前的渲染器
   */


  setRenderer(renderProxy) {
    this.m_renderProxy = renderProxy;
    TextureResSlot_1.default.GetInstance().setRenderProxy(renderProxy);

    if (this.m_rttStore == null && renderProxy != null) {
      this.m_rttStore = new RTTTextureStore_1.RTTTextureStore(renderProxy);
    }
  }

  getRTTStrore() {
    return this.m_rttStore;
  }

  createWrapperTex(pw, ph, powerof2Boo = false) {
    return this.m_rttStore.createWrapperTex(pw, ph, powerof2Boo);
  }

  createRTTTex2D(pw, ph, powerof2Boo = false) {
    let tex = this.m_rttStore.createRTTTex2D(pw, ph, powerof2Boo);

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createImageTex2D(pw, ph, powerof2Boo = false) {
    let tex = this.m_texPool.getTexture(TextureProxyType_1.TextureProxyType.Image);

    if (tex == null) {
      tex = new ImageTextureProxy_1.default(pw, ph, powerof2Boo);
    }

    tex.__$setRenderProxy(this.m_renderProxy);

    tex.mipmapEnabled = true;
    tex.setWrap(TextureConst_1.default.WRAP_REPEAT);
    return tex;
  }

  createHalfFloatTex2D(pw, ph, powerof2Boo = false) {
    let tex = this.m_texPool.getTexture(TextureProxyType_1.TextureProxyType.Float);

    if (tex == null) {
      tex = new FloatTextureProxy_1.default(pw, ph, powerof2Boo);
    }

    tex.__$setRenderProxy(this.m_renderProxy);

    tex.srcFormat = TextureFormat_1.default.RGBA;
    tex.dataType = TextureDataType_1.default.HALF_FLOAT_OES; //tex.srcFormat = TextureFormat.RGBA16F;
    //tex.dataType = TextureDataType.FLOAT;

    return tex;
  }

  createFloatTex2D(pw, ph, powerof2Boo = false) {
    let tex = this.m_texPool.getTexture(TextureProxyType_1.TextureProxyType.Float);

    if (tex == null) {
      tex = new FloatTextureProxy_1.default(pw, ph, powerof2Boo);
    }

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createUint16Tex2D(pw, ph, powerof2Boo = false) {
    return new Uint16TextureProxy_1.default(pw, ph, powerof2Boo);
  }

  createFloatCubeTex(pw, ph, powerof2Boo = false) {
    return new FloatCubeTextureProxy_1.default(pw, ph);
  }

  createBytesTex(texW, texH) {
    let tex = this.m_texPool.getTexture(TextureProxyType_1.TextureProxyType.Bytes);

    if (tex == null) {
      tex = new BytesTextureProxy_1.default(texW, texH);
    }

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createBytesCubeTex(texW, texH) {
    let tex = new BytesCubeTextureProxy_1.default(texW, texH);

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createImageCubeTex(texW, texH) {
    let tex = new ImageCubeTextureProxy_1.default(texW, texH);

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createTex3D(texW, texH, depth = 1) {
    if (depth < 1) {
      depth = 1;
    }

    let tex = new Texture3DProxy_1.default(texW, texH, depth);

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createRGBATex2D(pw, ph, color) {
    pw = pw > 1 ? pw : 1;
    ph = ph > 1 ? ph : 1;
    let tot = pw * ph;
    let tex = this.createBytesTex(pw, ph);
    let bytes = new Uint8Array(tot * 4);
    let pr = Math.round(color.r * 255.0);
    let pg = Math.round(color.g * 255.0);
    let pb = Math.round(color.b * 255.0);
    let pa = Math.round(color.a * 255.0);
    let k = 0;
    let fs = [pr, pg, pb, pa];

    for (let i = 0; i < tot; ++i) {
      bytes.set(fs, k);
      k += 4;
    }

    tex.setDataFromBytes(bytes, 0, pw, ph, 0, 0, false);

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
    return tex;
  }

  createAlphaTex2D(pw, ph, alpha) {
    pw = pw > 1 ? pw : 1;
    ph = ph > 1 ? ph : 1;
    let size = pw * ph;
    let tex = this.createBytesTex(pw, ph);
    tex.toAlphaFormat();
    let bytes = new Uint8Array(size);
    let value = Math.round(alpha * 255.0);
    bytes.fill(value, 0, size);
    tex.setDataFromBytes(bytes, 0, pw, ph, 0, 0, false);

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createAlphaTexBytes2D(pw, ph, bytes) {
    let tex = this.createBytesTex(pw, ph);
    tex.setDataFromBytes(bytes, 0, pw, ph, 0, 0, false);
    tex.toAlphaFormat();

    tex.__$setRenderProxy(this.m_renderProxy);

    return tex;
  }
  /**
   * get a system cube rtt texture
   * @param i rtt texture index in the system
   */


  getCubeRTTTextureAt(i) {
    return this.m_rttStore.getCubeRTTTextureAt(i);
  }

  createCubeRTTTextureAt(i, pw, ph) {
    return this.m_rttStore.createCubeRTTTextureAt(i, pw, ph);
  }

  getRTTTextureAt(i) {
    return this.m_rttStore.getRTTTextureAt(i);
  }

  createRTTTextureAt(i, pw, ph) {
    return this.m_rttStore.createRTTTextureAt(i, pw, ph);
  }

  getDepthTextureAt(i) {
    return this.m_rttStore.getDepthTextureAt(i);
  }

  createDepthTextureAt(i, pw, ph) {
    return this.m_rttStore.createDepthTextureAt(i, pw, ph);
  }

  getRTTFloatTextureAt(i) {
    return this.m_rttStore.getRTTFloatTextureAt(i);
  }

  createRTTFloatTextureAt(i, pw, ph) {
    return this.m_rttStore.createRTTFloatTextureAt(i, pw, ph);
  }

  run() {
    let i = 0;
    let il = this.m_texLoaders.length;

    for (; i < il; ++i) {
      this.m_texLoaders[i].run();
    }

    if (this.m_clearDelay < 1) {
      /**
       * 准备释放回收 texture resource.
       */
      let tex;
      this.m_clearDelay = 128;
      let freeMap = TextureResSlot_1.default.GetInstance().getFreeResUidMap();
      let total = 32;

      for (const [key, value] of freeMap) {
        if (total < 1) {
          break;
        }

        total--;

        if (value > 2) {
          freeMap.delete(key);
          tex = TextureResSlot_1.default.GetInstance().removeTextureByUid(key);

          if (tex != null) {
            this.m_texPool.addTexture(tex);
          } else {
            console.warn("TextureBlock remove a texture(uid=" + key + ") error.");
          }

          console.log("TextureBlock remove a texture: ", tex);
        } else {
          freeMap.set(key, value + 1);
        }
      }
    }

    this.m_clearDelay--;
  }

}

exports.TextureBlock = TextureBlock;

/***/ }),

/***/ "5deb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class TextureTarget {
  static GetValue(rc, param) {
    switch (param) {
      case TextureTarget.TEXTURE_2D:
        return rc.TEXTURE_2D;
        break;

      case TextureTarget.TEXTURE_2D_ARRAY:
        return rc.TEXTURE_2D_ARRAY;
        break;

      case TextureTarget.TEXTURE_CUBE:
        return rc.TEXTURE_CUBE_MAP;
        break;

      case TextureTarget.TEXTURE_3D:
        return rc.TEXTURE_3D;
        break;

      default:
        break;
    }

    return rc.TEXTURE_2D;
  }

}

TextureTarget.TEXTURE_2D = 20;
TextureTarget.TEXTURE_2D_ARRAY = 22;
TextureTarget.TEXTURE_SHADOW_2D = 23;
TextureTarget.TEXTURE_CUBE = 25;
TextureTarget.TEXTURE_3D = 30;
exports.default = TextureTarget;

/***/ }),

/***/ "5e78":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const ImgTexData_1 = __importDefault(__webpack_require__("7181"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class ImageTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_texData = null;
    this.m_texDatas = null;
    this.m_texDatasLen = 0;
    this.mipmapEnabled = true;
    this.minFilter = TextureConst_1.default.LINEAR_MIPMAP_LINEAR;
    this.m_type = TextureProxyType_1.TextureProxyType.Image;
  }

  getTexData() {
    return this.m_texData;
  }
  /**
   * 设置纹理原始数据，可以对纹理局部或者整体(rebuild = true)更新
   * @param img value from: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap
   * @param miplevel mipmaps level
  */


  setDataFromImage(img, miplevel = 0, offsetx = 0, offsety = 0, rebuild = false) {
    if (img != null && img.width > 0 && img.height > 0) {
      this.m_haveRData = true;
      if (miplevel < 0) miplevel = 0;
      if (miplevel > 15) miplevel = 15;

      if (miplevel >= this.m_texDatasLen) {
        this.m_texDatasLen = miplevel + 1;
      }

      let td = this.m_texData;

      if (td != null) {
        if (this.m_texData.miplevel != miplevel) {
          if (this.m_texDatas == null) {
            this.m_texDatas = [this.m_texData, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
          }

          td = this.m_texDatas[miplevel];

          if (td == null) {
            td = ImgTexData_1.default.Create();
            td.miplevel = miplevel;
            rebuild = true;
            this.m_texDatas[miplevel] = td;
          }
        } else if (this.isGpuEnabled()) {
          td.status = 0;
        }
      } else {
        td = this.m_texData = ImgTexData_1.default.Create();
        td.miplevel = miplevel;
        rebuild = true;
        this.m_texWidth = img.width;
        this.m_texHeight = img.height;
      }

      if (td.data != img || td.offsetx != offsetx || td.offsety != offsety) {
        if (miplevel == 0) {
          this.m_texWidth = img.width;
          this.m_texHeight = img.height;
        }

        td.data = img;
        td.status = 0; // 0表示 更新纹理数据而不会重新开辟空间, 1表示需要重新开辟空间并更新纹理数据, -1表示不需要更新

        if (td.width < img.width || td.height < img.height || rebuild) {
          td.width = img.width;
          td.height = img.height;
          td.status = 1;
        }

        td.offsetx = offsetx;
        td.offsety = offsety;
      }

      this.version++;
    }
  }

  uploadData(texRes) {
    if (this.m_texData != null) {
      this.dataUploadToGpu(texRes.getRC(), this.m_texData, this.m_texDatas, true);
    }

    this.version = 0;
  }

  __$updateToGpu(texRes) {
    // 这里之所以用这种方式判断，是为了运行时支持多 gpu context
    if (this.version > 0 && texRes.hasResUid(this.getResUid())) {
      if (this.m_texData != null) {
        let gl = texRes.getRC();

        this.__$updateToGpuBegin(texRes);

        this.dataUploadToGpu(gl, this.m_texData, this.m_texDatas);

        this.__$buildParam(gl);

        this.m_generateMipmap = true;
      }
    }
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      this.version = 0;

      if (this.m_texDatas != null) {
        for (let i = 0; i < this.m_texDatasLen; ++i) {
          ImgTexData_1.default.Restore(this.m_texDatas[i]);
        }

        this.m_texDatasLen = 0;
        this.m_texDatas = null;
        this.m_texData = null;
      }

      if (this.m_texData != null) {
        ImgTexData_1.default.Restore(this.m_texData);
        this.m_texData = null;
      }

      super.__$destroy();
    }
  }

  toString() {
    return "[ImageTextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = ImageTextureProxy;

/***/ }),

/***/ "644c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class MaterialConst {
  static GetTypeByTypeNS(tns) {
    const mc = MaterialConst;

    switch (tns) {
      case "mat4":
        return mc.SHADER_MAT4;
        break;

      case "mat3":
        return mc.SHADER_MAT3;
        break;

      case "mat2":
        return mc.SHADER_MAT2;
        break;

      case "float":
        return mc.SHADER_FLOAT;
        break;

      case "int":
        return mc.SHADER_INT;
        break;

      case "vec4":
        return mc.SHADER_VEC4;
        break;

      case "vec3":
        return mc.SHADER_VEC3;
        break;

      case "vec2":
        return mc.SHADER_VEC2;
        break;

      case "vec4[]":
        return mc.SHADER_VEC4FV;
        break;

      case "vec3[]":
        return mc.SHADER_VEC3FV;
        break;

      case "vec2[]":
        return mc.SHADER_VEC2FV;
        break;

      case "sampler2D":
        return mc.SHADER_SAMPLER2D;
        break;

      case "sampler3D":
        return mc.SHADER_SAMPLER3D;
        break;

      case "samplerCube":
        return mc.SHADER_SAMPLERCUBE;
        break;

      default:
        break;
    }

    return MaterialConst.SHADER_UNDEFINED;
  }

  static GetTypeNSByType(type) {
    const mc = MaterialConst;

    switch (type) {
      case mc.SHADER_MAT4:
        return "mat4";
        break;

      case mc.SHADER_MAT3:
        return "mat3";
        break;

      case mc.SHADER_MAT2:
        return "mat2";
        break;

      case mc.SHADER_FLOAT:
        return "float";
        break;

      case mc.SHADER_VEC4:
        return "vec4";

      case mc.SHADER_VEC3:
        return "vec3";
        break;

      case mc.SHADER_VEC2:
        return "vec2";
        break;

      case mc.SHADER_SAMPLER2D:
        return "sampler2D";
        break;

      case mc.SHADER_SAMPLER3D:
        return "sampler3D";
        break;

      case mc.SHADER_SAMPLERCUBE:
        return "samplerCube";
        break;

      case mc.SHADER_UNDEFINED:
        return "undefined";
        break;

      default:
        break;
    }

    return "";
  }

} // for glsl shader auto build


MaterialConst.ATTRINS_VTX_VS = "a_vs";
MaterialConst.ATTRINS_VTX_UVS = "a_uvs";
MaterialConst.ATTRINS_VTX_NVS = "a_nvs";
MaterialConst.ATTRINS_VTX_CVS = "a_cvs"; //

MaterialConst.UNIFORMNS_OBJ_MAT_NS = "u_objMat";
MaterialConst.UNIFORMNS_VIEW_MAT_NS = "u_viewMat";
MaterialConst.UNIFORMNS_PROJ_MAT_NS = "u_projMat"; // 取值范围3001(包括3001) 到 3255(包括3255)

MaterialConst.SHADER_UNDEFINED = 3010;
MaterialConst.SHADER_VEC2 = 3011;
MaterialConst.SHADER_VEC3 = 3012;
MaterialConst.SHADER_VEC4 = 3013;
MaterialConst.SHADER_VEC2FV = 3014;
MaterialConst.SHADER_VEC3FV = 3015;
MaterialConst.SHADER_VEC4FV = 3016;
MaterialConst.SHADER_MAT2 = 3017;
MaterialConst.SHADER_MAT3 = 3018;
MaterialConst.SHADER_MAT4 = 3019;
MaterialConst.SHADER_FLOAT = 3020;
MaterialConst.SHADER_INT = 3021;
MaterialConst.SHADER_MAT2FV = 3022;
MaterialConst.SHADER_MAT3FV = 3023;
MaterialConst.SHADER_MAT4FV = 3024;
MaterialConst.SHADER_SAMPLER2D = 3031;
MaterialConst.SHADER_SAMPLERCUBE = 3032;
MaterialConst.SHADER_SAMPLER3D = 3033;
MaterialConst.SHADER_PRECISION_LOWP = 3101;
MaterialConst.SHADER_PRECISION_MEDIUMP = 3111;
MaterialConst.SHADER_PRECISION_HIGHP = 3121; // texture uniform name define

MaterialConst.UNIFORM_TEX_SAMPLER2D = "sampler2D";
MaterialConst.UNIFORM_TEX_SAMPLERCUBE = "samplerCube";
MaterialConst.UNIFORM_TEX_SAMPLER3D = "sampler3D";
MaterialConst.UNIFORMNS_TEX_SAMPLER_0 = "u_sampler0";
MaterialConst.UNIFORMNS_TEX_SAMPLER_1 = "u_sampler1";
MaterialConst.UNIFORMNS_TEX_SAMPLER_2 = "u_sampler2";
MaterialConst.UNIFORMNS_TEX_SAMPLER_3 = "u_sampler3";
MaterialConst.UNIFORMNS_TEX_SAMPLER_4 = "u_sampler4";
MaterialConst.UNIFORMNS_TEX_SAMPLER_5 = "u_sampler5";
MaterialConst.UNIFORMNS_TEX_SAMPLER_6 = "u_sampler6";
MaterialConst.UNIFORMNS_TEX_SAMPLER_7 = "u_sampler7";
MaterialConst.UNIFORMNS_TEX_SAMPLER_LIST = [MaterialConst.UNIFORMNS_TEX_SAMPLER_0, MaterialConst.UNIFORMNS_TEX_SAMPLER_1, MaterialConst.UNIFORMNS_TEX_SAMPLER_2, MaterialConst.UNIFORMNS_TEX_SAMPLER_3, MaterialConst.UNIFORMNS_TEX_SAMPLER_4, MaterialConst.UNIFORMNS_TEX_SAMPLER_5, MaterialConst.UNIFORMNS_TEX_SAMPLER_6, MaterialConst.UNIFORMNS_TEX_SAMPLER_7];
exports.default = MaterialConst;

/***/ }),

/***/ "68aa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class RawTexData {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.data = null;
    this.miplevel = 0; // 0表示 更新纹理数据而不会重新开辟空间, 1表示需要重新开辟空间并更新纹理数据, -1表示不需要更新

    this.status = 1;
    this.offsetx = 0;
    this.offsety = 0;
  }

  updateToGpu(gl, samplerTarget, interType, format, type, force) {
    if (this.status == 1 || force) {
      gl.texImage2D(samplerTarget, this.miplevel, interType, this.width, this.height, 0, format, type, this.data);
    } else if (this.status == 0) {
      gl.texSubImage2D(samplerTarget, this.miplevel, this.offsetx, this.offsety, this.width, this.height, format, type, this.data);
    }

    this.status = -1;
  }

  static Create() {
    if (RawTexData.s_list.length > 0) {
      return RawTexData.s_list.pop();
    }

    return new RawTexData();
  }

  static Restore(tsd) {
    if (tsd != null) {
      tsd.data = null;
      RawTexData.s_list.push(tsd);
    }
  }

}

RawTexData.s_list = [];
exports.default = RawTexData;

/***/ }),

/***/ "69ed":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ShaderCodeType;

(function (ShaderCodeType) {
  ShaderCodeType["VertHead"] = "vertHead";
  ShaderCodeType["VertBody"] = "vertBody";
  ShaderCodeType["FragHead"] = "fragHead";
  ShaderCodeType["FragBody"] = "fragBody";
})(ShaderCodeType || (ShaderCodeType = {}));

exports.ShaderCodeType = ShaderCodeType;

/***/ }),

/***/ "6c6b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MaterialBase_1 = __importDefault(__webpack_require__("0fc4"));

const ShaderCodeBuffer_1 = __importDefault(__webpack_require__("faa5"));

class MaterialShaderBuffer extends ShaderCodeBuffer_1.default {
  constructor() {
    super();
    this.m_uniqueName = "";
    this.decorator = null;
  }

  initialize(texEnabled) {
    super.initialize(texEnabled);
    console.log("MaterialShaderBuffer::initialize()... texEnabled: " + texEnabled);
    this.m_uniqueName = "MS_"; // this.m_hasTex = texEnabled;

    if (texEnabled) this.m_uniqueName += "Tex";
  }

  createTextureList() {
    this.m_texBuilder.reset();
    this.decorator.buildTextureList(this.m_texBuilder);
    return this.m_texBuilder.getTextures();
  }

  buildShader() {
    if (this.decorator.vertUniform != null) {
      this.decorator.vertUniform.use(this.m_coder);
    }

    this.decorator.buildShader(this.m_coder);
  }

  getShaderCodeObjectUUID() {
    return this.decorator.getShaderCodeObjectUUID();
  }

  getShaderCodeObject() {
    return this.decorator.getShaderCodeObject();
  }

  getUniqueShaderName() {
    let ns = this.m_uniqueName + this.decorator.getUniqueName();

    if (this.decorator.vertUniform != null) {
      ns += this.decorator.vertUniform.getUniqueNSKeyString();
    }

    return ns;
  }

}

class Material extends MaterialBase_1.default {
  constructor() {
    super();
    this.m_decorator = null;
    if (Material.s_shdBufins == null) Material.s_shdBufins = new MaterialShaderBuffer();
  }

  buildBuf() {
    let buf = Material.s_shdBufins;
    let decorator = this.m_decorator;
    buf.decorator = decorator;
    decorator.buildBufParams();
    buf.vertColorEnabled = decorator.vertColorEnabled;
    buf.premultiplyAlpha = decorator.premultiplyAlpha;
    buf.shadowReceiveEnabled = decorator.shadowReceiveEnabled;
    buf.lightEnabled = decorator.lightEnabled;
    buf.fogEnabled = decorator.fogEnabled;
    buf.envAmbientLightEnabled = decorator.envAmbientLightEnabled;
    buf.brightnessOverlayEnabeld = decorator.brightnessOverlayEnabeld;
    buf.glossinessEnabeld = decorator.glossinessEnabeld;
    buf.buildPipelineParams(); // buf.vertUniform = this.vertUniform;

    let list = buf.createTextureList(); //if(this.vertUniform != null) this.vertUniform.getTextures(buf.getShaderCodeBuilder(), list);

    let vertUniform = decorator.vertUniform;
    if (vertUniform != null) vertUniform.getTextures(buf.getShaderCodeBuilder(), list);
    buf.getTexturesFromPipeline(list);
    console.log(decorator, "texture list: ", list);
    super.setTextureList(list); //buf.texturesTotal = list.length;
  }

  getCodeBuf() {
    return Material.s_shdBufins;
  }

  setTextureList(texList) {
    // throw Error("Illegal operations !!!");
    console.error("Illegal operations !!!");
  }

  setDecorator(decorator) {
    this.m_decorator = decorator;
  }

  getDecorator() {
    return this.m_decorator;
  }

  createSelfUniformData() {
    let sud = this.m_decorator.createUniformData(); // if(this.vertUniform != null && sud != null) {
    //     this.vertUniform.buildShaderUniformData(sud);
    // }

    return sud;
  }

  destroy() {
    super.destroy();
    this.m_decorator = null;
  }

}

Material.s_shdBufins = null;
exports.Material = Material;

/***/ }),

/***/ "6e01":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class MathConst {
  static Clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  static IsPowerOf2(value) {
    return (value & value - 1) == 0;
  }

  static CalcCeilPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
  }

  static CalcNearestCeilPow2(int_n) {
    return Math.pow(2, Math.round(Math.log(int_n) / Math.LN2));
  }

  static CalcFloorCeilPow2(int_n) {
    return Math.pow(2, Math.floor(Math.log(int_n) / Math.LN2));
  }

  static DegreeToRadian(degree) {
    return MathConst.MATH_PI_OVER_180 * degree;
  }

  static Log2(f) {
    return Math.log(f) / Math.LN2;
  }

  static GetMaxMipMapLevel(width, height) {
    return Math.round(MathConst.Log2(Math.max(width, height)) + 1);
  }

  static SafeACos(x) {
    if (x <= -1.0) {
      return MathConst.MATH_PI;
    }

    if (x >= 1.0) {
      return 0.0;
    }

    return Math.acos(x);
  }

  static GetNearestCeilPow2(int_n) {
    let x = 1;

    while (x < int_n) {
      x <<= 1;
    }

    return x;
  } // ccw is positive


  static GetMinRadian(a1, a0) {
    a0 %= MathConst.MATH_2PI;
    a1 %= MathConst.MATH_2PI;

    if (a0 < a1) {
      a0 = MathConst.MATH_2PI - a1 + a0;
      if (a0 > MathConst.MATH_PI) return a0 - MathConst.MATH_2PI;
      return a0;
    } else if (a0 > a1) {
      a1 = MathConst.MATH_2PI - a0 + a1;
      if (a1 > MathConst.MATH_PI) return MathConst.MATH_2PI - a1;
      return -a1;
    }

    return 0.0;
  }
  /**
   * get the directional angle offset degree value: dst_angle_degree = src_angle_degree + directional_angle_offset_degree_value
   * @param a0 src angle degree
   * @param a1 dst angle degree
   * @returns directional angle offset degree value
   */


  static GetMinDegree(a0, a1) {
    let angle = 0;

    if (a1 >= 270 && a0 < 90) {
      angle = (a1 - (a0 + 360)) % 180;
    } else if (a1 <= 90 && a0 >= 270) {
      angle = (a1 + 360 - a0) % 180;
    } else {
      angle = a1 - a0; //  if (Math.abs(angle) > 180) {
      //      angle -= 360;
      //  }

      if (angle > 180) {
        angle -= 360;
        angle %= 360;
      } else if (angle < -180) {
        angle += 360;
        angle %= 360;
      }
    }

    return angle;
  }

  static GetDegreeByXY(dx, dy) {
    if (Math.abs(dx) < 0.00001) {
      if (dy >= 0) return 270;else return 90;
    }

    let angle = Math.atan(dy / dx) * 180 / Math.PI;

    if (dx >= 0) {
      return angle;
    } else {
      return 180 + angle;
    } //  if (dy > 0 && dx > 0) {
    //      return angle
    //  } else if (dy < 0 && dx >= 0) {
    //      return 360 + angle;
    //  } else {
    //      return dx > 0 ? angle : 180 + angle;
    //  }

  }

  static GetRadianByXY(dx, dy) {
    if (Math.abs(dx) < MathConst.MATH_MIN_POSITIVE) {
      if (dy >= 0) return MathConst.MATH_1PER2PI;else return MathConst.MATH_3PER2PI;
    }

    let rad = Math.atan(dy / dx);

    if (dx >= 0) {
      return rad;
    } else {
      return MathConst.MATH_PI + rad;
    }
  }

  static GetRadianByCos(cosv, dx, dy) {
    var rad = Math.acos(cosv); //Math.atan(dy/dx);

    if (dx >= 0) {
      return rad;
    } else {
      return MathConst.MATH_PI + rad;
    }
  }

}

MathConst.MATH_MIN_POSITIVE = 1e-5;
MathConst.MATH_MAX_NEGATIVE = -1e-5;
MathConst.MATH_MAX_POSITIVE = 0xffffffe;
MathConst.MATH_MIN_NEGATIVE = -0xffffffe;
MathConst.MATH_1_OVER_255 = 1.0 / 255.0;
MathConst.MATH_PI = Math.PI;
MathConst.MATH_2PI = MathConst.MATH_PI * 2.0;
MathConst.MATH_3PER2PI = MathConst.MATH_PI * 1.5;
MathConst.MATH_1PER2PI = MathConst.MATH_PI * 0.5;
MathConst.MATH_1_OVER_PI = 1.0 / MathConst.MATH_PI;
MathConst.MATH_1_OVER_360 = 1.0 / 360.0;
MathConst.MATH_1_OVER_180 = 1.0 / 180.0;
MathConst.MATH_180_OVER_PI = 180.0 / MathConst.MATH_PI;
MathConst.MATH_PI_OVER_180 = MathConst.MATH_PI / 180.0;
MathConst.MATH_LN2 = 0.6931471805599453;
exports.default = MathConst;

/***/ }),

/***/ "710f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ROVtxBufUidStore {
  constructor() {
    this.m_useidList = [];
    this.m_removeidList = [];

    if (ROVtxBufUidStore.s_ins != null) {
      throw Error("ROVtxBufUidStore is a singleton class!!");
    }

    ROVtxBufUidStore.s_ins = this;
  }

  static GetInstance() {
    return ROVtxBufUidStore.s_ins;
  }

  __$getRemovedListLen() {
    return this.m_removeidList.length;
  }

  __$getRemovedList() {
    return this.m_removeidList;
  }

  __$attachAt(index) {
    if (index < this.m_useidList.length) {
      ++this.m_useidList[index];
    } else {
      // 这里的内存管理需要优化
      let i = this.m_useidList.length;

      for (; i <= index; ++i) {
        this.m_useidList.push(0);
      }

      ++this.m_useidList[index];
    } //console.log("ROVtxBufUidStore::__$attachAt() list["+index+"]: "+this.m_useidList[index]);

  }

  __$detachAt(index) {
    --this.m_useidList[index]; //console.log("ROVtxBufUidStore::__$detachAt() list["+index+"]: "+this.m_useidList[index]);

    if (this.m_useidList[index] < 1) {
      this.m_useidList[index] = 0;
      console.log("ROVtxBufUidStore::__$detachAt(" + index + ") tex useCount value is 0.");
      this.m_removeidList.push(index);
    }
  }

  getAttachCountAt(uid) {
    if (uid < this.m_useidList.length) {
      return this.m_useidList[uid];
    }

    return 0;
  }

  getAttachAllCount() {
    let total = 0;
    let i = 0;
    let len = this.m_useidList.length;

    for (; i < len; ++i) {
      if (this.m_useidList[i] > 0) {
        total += this.m_useidList[i];
      }
    }

    return total;
  }

}

ROVtxBufUidStore.s_ins = null;
exports.default = ROVtxBufUidStore;

/***/ }),

/***/ "7181":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ImgTexData {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.data = null;
    this.miplevel = 0; // 0表示 更新纹理数据而不会重新开辟空间, 1表示需要重新开辟空间并更新纹理数据, -1表示不需要更新

    this.status = 1;
    this.offsetx = 0;
    this.offsety = 0;
  }

  updateToGpu(gl, samplerTarget, interType, format, type, force) {
    if (this.status == 1 || force) {
      gl.texImage2D(samplerTarget, this.miplevel, interType, format, type, this.data);
    } else if (this.status == 0) {
      gl.texSubImage2D(samplerTarget, this.miplevel, this.offsetx, this.offsety, format, type, this.data);
    }

    this.status = -1;
  }

  static Create() {
    if (ImgTexData.s_list.length > 0) {
      return ImgTexData.s_list.pop();
    }

    return new ImgTexData();
  }

  static Restore(tsd) {
    if (tsd != null) {
      tsd.data = null;
      ImgTexData.s_list.push(tsd);
    }
  }

}

ImgTexData.s_list = [];
exports.default = ImgTexData;

/***/ }),

/***/ "722e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class RenderFilter {}

RenderFilter.NEAREST = 4001;
RenderFilter.LINEAR = 4002;
RenderFilter.LINEAR_MIPMAP_LINEAR = 4003;
RenderFilter.NEAREST_MIPMAP_NEAREST = 4004;
RenderFilter.LINEAR_MIPMAP_NEAREST = 4005;
RenderFilter.NEAREST_MIPMAP_LINEAR = 4006;
exports.default = RenderFilter;

/***/ }),

/***/ "78e9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MaterialConst_1 = __importDefault(__webpack_require__("644c"));

class UniformLine {
  constructor() {
    this.type = -1;
    this.typeName = "";
    this.name = "";
    this.isArray = false;
    this.arrLength = 0;
    this.isTex = false;
    this.location = null;
  }

  parseCode(codeStr) {
    const SEMICOLON = ";";
    let i = codeStr.indexOf(SEMICOLON);

    if (i < 0) {
      return false;
    }

    const SPACE = " ";
    codeStr = codeStr.replace(/^\s*|\s*$/g, "");
    if (i > 0) codeStr = codeStr.slice(0, i);
    let arr = codeStr.split(SPACE);
    this.typeName = arr[arr.length - 2];
    this.name = arr[arr.length - 1];
    i = this.name.indexOf("[");
    this.isArray = i > 0;
    this.arrLength = 0;

    if (this.isArray) {
      this.arrLength = parseInt(this.name.slice(i + 1, this.name.indexOf("]", i + 1)));
      this.name = this.name.slice(0, i);
      this.typeName += "[]";
    }

    this.type = MaterialConst_1.default.GetTypeByTypeNS(this.typeName); //console.log("#### this.type: ",this.type,", this.typeName: ",this.typeName);

    if (this.type < 0) {
      return false;
    }

    this.isTex = this.type == MaterialConst_1.default.SHADER_SAMPLER2D || this.type == MaterialConst_1.default.SHADER_SAMPLERCUBE || this.type == MaterialConst_1.default.SHADER_SAMPLER3D;
    return true;
  }

}

exports.default = UniformLine;

/***/ }),

/***/ "7918":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TextureProxyType;

(function (TextureProxyType) {
  TextureProxyType[TextureProxyType["Default"] = 0] = "Default";
  /**
   * for DepthTextureProxy class
   */

  TextureProxyType[TextureProxyType["Depth"] = 1] = "Depth";
  /**
   * for WrapperTextureProxy class
   */

  TextureProxyType[TextureProxyType["Wrapper"] = 2] = "Wrapper";
  /**
   * for RTTTextureProxy class
   */

  TextureProxyType[TextureProxyType["RTT"] = 3] = "RTT";
  /**
   * for ImageTextureProxy class
   */

  TextureProxyType[TextureProxyType["Image"] = 4] = "Image";
  /**
   * for FloatTextureProxy class
   */

  TextureProxyType[TextureProxyType["Float"] = 5] = "Float";
  /**
   * for Uint16TextureProxy class
   */

  TextureProxyType[TextureProxyType["Uint16"] = 6] = "Uint16";
  /**
   * for FloatCubeTextureProxy class
   */

  TextureProxyType[TextureProxyType["FloatCube"] = 7] = "FloatCube";
  /**
   * for BytesTextureProxy class
   */

  TextureProxyType[TextureProxyType["Bytes"] = 8] = "Bytes";
  /**
   * for BytesCubeTextureProxy class
   */

  TextureProxyType[TextureProxyType["BytesCube"] = 9] = "BytesCube";
  /**
   * for ImageCubeTextureProxy class
   */

  TextureProxyType[TextureProxyType["ImageCube"] = 10] = "ImageCube";
  /**
   * for Texture3DProxy class
   */

  TextureProxyType[TextureProxyType["Texture3D"] = 11] = "Texture3D";
})(TextureProxyType || (TextureProxyType = {}));

exports.TextureProxyType = TextureProxyType;

/***/ }),

/***/ "7a04":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufID_1 = __importDefault(__webpack_require__("f044"));

class VtxSeparatedBuf {
  constructor() {
    this.m_uid = -1;
    this.m_total = 0;
    this.layoutBit = 0x0;
    this.m_fOffsetList = null; //private m_pOffsetList:number[] = null;

    this.m_f32List = null;
    this.m_f32SizeList = null; //private m_f32PreSizeList: number[] = null;

    this.m_f32ChangedList = null;
    this.m_f32Bufs = null;
    this.m_bufersTotal = 0;
    this.m_uid = VtxBufID_1.default.CreateNewID();
  }

  getUid() {
    return this.m_uid;
  }

  getType() {
    return 1;
  } // private m_stepFloatsTotal: number = 0;


  getBuffersTotal() {
    return this.m_bufersTotal;
  }

  getAttribsTotal() {
    return this.m_bufersTotal;
  }

  getF32DataAt(index) {
    return this.m_f32List[index];
  }

  setF32DataAt(index, float32Arr, stepFloatsTotal, setpOffsets) {
    if (index < 1) this.m_bufersTotal = 1;else this.m_bufersTotal = index + 1;

    if (this.m_f32List == null) {
      this.m_f32List = [null, null, null, null, null, null, null, null];
      this.m_f32ChangedList = [false, false, false, false, false, false, false, false];
      this.m_f32SizeList = [0, 0, 0, 0, 0, 0, 0, 0]; //this.m_f32PreSizeList = [0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.m_f32List[index] = float32Arr;

    if (this.m_f32Bufs != null && float32Arr != null) {
      this.m_f32ChangedList[index] = true;
    }

    if (setpOffsets != null) this.m_fOffsetList = setpOffsets; // console.log("VtxSeparatedBuf::setF32DataAt(), this.m_bufersTotal: ",this.m_bufersTotal);

    if (float32Arr != null) {
      this.m_f32SizeList[index] = float32Arr.length;
    }
  }

  setData4fAt(vertexI, attribI, px, py, pz, pw) {
    vertexI *= this.m_fOffsetList[attribI];
    this.m_f32List[attribI][vertexI++] = px;
    this.m_f32List[attribI][vertexI++] = py;
    this.m_f32List[attribI][vertexI++] = pz;
    this.m_f32List[attribI][vertexI++] = pw;
  }

  setData3fAt(vertexI, attribI, px, py, pz) {
    vertexI *= this.m_fOffsetList[attribI];
    this.m_f32List[attribI][vertexI++] = px;
    this.m_f32List[attribI][vertexI++] = py;
    this.m_f32List[attribI][vertexI++] = pz;
  }

  setData2fAt(vertexI, attribI, px, py) {
    vertexI *= this.m_fOffsetList[attribI];
    this.m_f32List[attribI][vertexI++] = px;
    this.m_f32List[attribI][vertexI++] = py;
  }

  destroy() {
    this.m_f32List = null;
    this.m_f32ChangedList = null;
    this.m_f32SizeList = null; //this.m_f32PreSizeList = null;

    console.log("VtxSeparatedBuf::__$destroy()... ", this);
    this.m_f32List = null;
  }

  toString() {
    return "VtxSeparatedBuf(uid = " + this.m_uid + ")";
  }

}

exports.default = VtxSeparatedBuf;

/***/ }),

/***/ "7b0e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererConst_1 = __importDefault(__webpack_require__("bbf4"));

class Entity3DNode {
  constructor() {
    this.uid = -1;
    this.rstatus = 0;
    /**
     * project occlusion culling test enabled
     */

    this.pcoEnabled = false;
    this.drawEnabled = true;
    this.prev = null;
    this.next = null;
    this.entity = null;
    this.bounds = null;
    this.rayTestState = 0;
    this.rpoNode = null;
    this.spaceId = -1; // 记录上一次摄像机裁剪自身的状态

    this.camVisiSt = 0; // 记录摄像机可见状态,大于0表示不可见

    this.camVisi = RendererConst_1.default.CAMERA_VISIBLE_ENABLE;
  }

  reset() {
    this.rayTestState = 0;
    this.uid = -1;
    this.rstatus = 0;
    this.pcoEnabled = false;
    this.drawEnabled = true;
    this.prev = null;
    this.next = null;
    this.entity = null;
    this.bounds = null;
    this.rpoNode = null;
    this.spaceId = -1;
    this.camVisi = 0;
  }

  static GetFreeId() {
    if (Entity3DNode.m_freeIds.length > 0) {
      return Entity3DNode.m_freeIds.pop();
    }

    return -1;
  }

  static GetByUid(uid) {
    if (uid > -1 && uid < Entity3DNode.m_nodesLen) {
      return Entity3DNode.m_nodes[uid];
    }

    return null;
  }

  static SetCamVisiByUid(uid, status) {
    Entity3DNode.m_nodes[uid].camVisi = status;
  }

  static GetCamVisiByUid(uid) {
    return Entity3DNode.m_nodes[uid].camVisi;
  }

  static Create() {
    let node = null;
    let index = Entity3DNode.GetFreeId();

    if (index >= 0) {
      node = Entity3DNode.m_nodes[index];
      node.uid = index;
      Entity3DNode.m_flags[index] = Entity3DNode.s_b;
    } else {
      // create a new nodeIndex
      node = new Entity3DNode();
      Entity3DNode.m_nodes.push(node);
      Entity3DNode.m_flags.push(Entity3DNode.s_b);
      node.uid = Entity3DNode.m_nodesLen;
      Entity3DNode.m_nodesLen++;
    }

    return node;
  }

  static Restore(pnode) {
    if (pnode != null && pnode.uid >= 0 && Entity3DNode.m_flags[pnode.uid] == Entity3DNode.s_b) {
      Entity3DNode.m_freeIds.push(pnode.uid);
      Entity3DNode.m_flags[pnode.uid] = Entity3DNode.s_f;
      pnode.reset();
    }
  }

} // busy


Entity3DNode.s_b = 1; // free

Entity3DNode.s_f = 0;
Entity3DNode.m_nodesLen = 0;
Entity3DNode.m_nodes = [];
Entity3DNode.m_flags = [];
Entity3DNode.m_freeIds = [];
exports.default = Entity3DNode;

/***/ }),

/***/ "81ce":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class GLSLConverter {
  static Es2VtxShderToES3(glslStr) {
    let codeStr = glslStr; //attribute

    const ATTRIBUTE = "attribute"; //const POSY_OUTPUT = "out";
    //const POSY_INPUT = "in";

    const VARYING = "varying ";
    let i = codeStr.indexOf(ATTRIBUTE);
    let j = 0;

    while (i >= 0) {
      codeStr = codeStr.slice(0, i) + "layout(location=" + j + ") in" + codeStr.slice(i + 9);
      i = codeStr.indexOf(ATTRIBUTE);
      j++;
    }

    let regex = new RegExp(VARYING, "g");
    codeStr = codeStr.replace(regex, "out "); //i = codeStr.indexOf(ATTRIBUTE);

    return "#version 300 es\n" + codeStr;
  }

  static Es2FragShderToES3(glslStr) {
    let codeStr = glslStr; //attribute

    const GL1_OUTPUT = "gl_FragColor";
    const VARYING = "varying ";
    let i = codeStr.indexOf(GL1_OUTPUT);
    let j = 0;
    let outFragColor = "FragColorOut_" + j;
    if (i >= 0) codeStr = codeStr.slice(0, i) + outFragColor + codeStr.slice(i + 12);
    i = codeStr.indexOf("void ");
    codeStr = codeStr.slice(0, i) + "out vec4 " + outFragColor + ";\n" + codeStr.slice(i);
    let regex = new RegExp(VARYING, "g");
    codeStr = codeStr.replace(regex, "in ");
    regex = new RegExp(" texture2D", "g");
    codeStr = codeStr.replace(regex, " texture");
    regex = new RegExp(" textureCube", "g");
    codeStr = codeStr.replace(regex, " texture");
    return "#version 300 es\n" + codeStr;
  }

  static Es3VtxShaderToES2(codeStr) {
    const regExp0 = /^#.+(\bes|core\b)/;
    codeStr = codeStr.replace(regExp0, "");
    const regExp1 = /\blayout\b.+\bin\b/g;
    codeStr = codeStr.replace(regExp1, "attribute");
    const regExp2 = /\bout\b/g;
    codeStr = codeStr.replace(regExp2, "varying");
    const regExp3 = /\btexture\b/g;
    codeStr = codeStr.replace(regExp3, "texture2D");

    if (codeStr.indexOf("#version") >= 0) {
      codeStr = codeStr.replace("#version", "//#version");
    } //*


    let j = 0;
    let k = 0;
    let i = codeStr.indexOf("inverse(");

    if (i < 0) {
      i = codeStr.indexOf("inverse (");
    }

    let subStr = "";
    let invMat3Boo = false;
    let invMat4Boo = false;

    while (i > 3) {
      j = codeStr.indexOf(")", i + 2); //get var name

      subStr = codeStr.slice(i + 2, j);

      if (subStr.indexOf("mat3") > 0) {
        invMat3Boo = true;
      } else {
        // 去除空格,得到实际的变量名
        subStr = subStr.replace(/\s+/g, "");
        j = subStr.indexOf("(");
        subStr = subStr.slice(j + 1); // 查找第一次定义的地方

        j = codeStr.indexOf(subStr, 1); // 查找在这位置前面的最近的mat or vec字符                

        k = codeStr.lastIndexOf("mat", j);

        if (k > 0) {
          subStr = codeStr.slice(k, j);
          subStr = subStr.replace(/\s+/g, "");

          switch (subStr) {
            case "mat3":
              invMat3Boo = true;
              break;

            case "mat4":
              invMat4Boo = true;
              break;
          }
        }
      }

      i = codeStr.indexOf("inverse(", i + 5);

      if (i < 0) {
        i = codeStr.indexOf("inverse (", i + 5);
      }

      if (invMat3Boo && invMat4Boo) {
        break;
      }
    }

    j = 0;
    i = codeStr.indexOf("transpose(");

    if (i < 0) {
      i = codeStr.indexOf("transpose (");
    }

    subStr = "";
    let trsMat3Boo = false;
    let trsMat4Boo = false;

    while (i > 3) {
      j = codeStr.indexOf(")", i + 2);
      subStr = codeStr.slice(i + 2, j + 1);

      if (subStr.indexOf("mat3") > 0) {
        trsMat3Boo = true;
      } else {
        // 去除空格,得到实际的变量名
        subStr = subStr.replace(/\s+/g, "");
        j = subStr.indexOf("(");
        subStr = subStr.slice(j + 1); // 查找第一次定义的地方

        j = codeStr.indexOf(subStr, 1); // 查找在这位置前面的最近的mat or vec字符                

        k = codeStr.lastIndexOf("mat", j);

        if (k > 0) {
          subStr = codeStr.slice(k, j);
          subStr = subStr.replace(/\s+/g, ""); //trace("Var Name B: "+subStr);

          switch (subStr) {
            case "mat3":
              trsMat3Boo = true;
              break;

            case "mat4":
              trsMat4Boo = true;
              break;
          }
        }
      }

      i = codeStr.indexOf("transpose(", i + 5);

      if (i < 0) {
        i = codeStr.indexOf("transpose (", i + 5);
      }

      if (trsMat3Boo && trsMat4Boo) {
        //trsMat3Boo = trsMat4Boo = true;
        break;
      }
    }

    if (invMat3Boo || invMat4Boo) {
      i = codeStr.indexOf("void ");

      if (i > 10) {
        if (invMat3Boo && invMat4Boo) {
          codeStr = codeStr.slice(0, i) + GLSLConverter.__glslInverseMat3 + GLSLConverter.__glslInverseMat4 + codeStr.slice(i);
        } else if (invMat3Boo) {
          codeStr = codeStr.slice(0, i) + GLSLConverter.__glslInverseMat3 + codeStr.slice(i);
        } else if (invMat4Boo) {
          codeStr = codeStr.slice(0, i) + GLSLConverter.__glslInverseMat4 + codeStr.slice(i);
        }
      }
    }

    if (trsMat3Boo || trsMat4Boo) {
      i = codeStr.indexOf("void ");

      if (i > 10) {
        if (trsMat3Boo && trsMat4Boo) {
          codeStr = codeStr.slice(0, i) + GLSLConverter.__glslTransposeMat3 + GLSLConverter.__glslTransposeMat4 + codeStr.slice(i);
        } else if (trsMat3Boo) {
          codeStr = codeStr.slice(0, i) + GLSLConverter.__glslTransposeMat3 + codeStr.slice(i);
        } else if (trsMat4Boo) {
          codeStr = codeStr.slice(0, i) + GLSLConverter.__glslTransposeMat4 + codeStr.slice(i);
        }
      }
    }

    return codeStr;
  }

  static Es3FragShaderToES2(codeStr) {
    const regExp0 = /^#.+(\bes|core\b)/;
    codeStr = codeStr.replace(regExp0, ""); // 防止函数中的in 被替换
    //const regExpFuncIn:RegExp = /\b in \b/g;

    const regExpFuncIn = new RegExp(" in ", "g");
    codeStr = codeStr.replace(regExpFuncIn, "_fref_");
    const regExp1 = /\bin\b/g;
    codeStr = codeStr.replace(regExp1, "varying"); // 防止函数中的in 被替换

    const regExpToFuncIn = new RegExp("_fref_", "g");
    codeStr = codeStr.replace(regExpToFuncIn, " in "); //codeStr = codeStr.replace(regExp1, "varying");

    const regExp2 = /\btexture\b/g;
    codeStr = codeStr.replace(regExp2, "texture2D");
    const regExp3 = /" "/g;
    let shaderStr = codeStr; // 替换 frag (layout) out

    const semicolon = ";";
    const out_flag = "layout";
    let i = shaderStr.indexOf(out_flag);
    let j = 0;
    let t = 0;
    let subStr = "";
    let keyName = "";
    let keyIndex = 0;
    let tempReg = null;
    let keys = [];
    let indexList = [];

    while (i >= 0) {
      j = shaderStr.indexOf(semicolon, i + 1);
      subStr = shaderStr.slice(i + 1, j);
      keyName = subStr.slice(subStr.lastIndexOf(" ") + 1);
      keyIndex = subStr.indexOf(")");
      i = subStr.lastIndexOf("=", keyIndex) + 1;
      subStr = subStr.slice(i + 1, keyIndex);
      keyIndex = parseInt(subStr.replace(regExp3, ""));
      keys.push(keyName);
      indexList.push(keyIndex);
      i = shaderStr.indexOf(out_flag, j);
    }

    let len = keys.length;

    if (len > 0) {
      tempReg = /layout/g;
      codeStr = codeStr.replace(tempReg, "//layout");

      if (len > 1) {
        i = 0;

        while (i < len) {
          tempReg = new RegExp(keys[i], "g");
          codeStr = codeStr.replace(tempReg, "gl_FragData[" + indexList[i] + "]");
          ++i;
        }
      } else {
        tempReg = new RegExp(keyName, "g");
        codeStr = codeStr.replace(tempReg, "gl_FragColor");
      }
    } else {
      i = shaderStr.indexOf("out ");

      if (i > 0) {
        j = shaderStr.indexOf(semicolon, i + 1);
        subStr = shaderStr.slice(i + 1, j);
        keyName = subStr.slice(subStr.lastIndexOf(" ") + 1);
        tempReg = new RegExp(keyName, "g");
        codeStr = codeStr.replace(tempReg, "gl_FragColor");
        tempReg = /\bout\b/g;
        codeStr = codeStr.replace(tempReg, "//out");
      }
    }

    if (len > 1) {
      codeStr = "#extension GL_EXT_draw_buffers: require\n" + codeStr;
    }

    if (codeStr.indexOf("#version") >= 0) {
      codeStr = codeStr.replace("#version", "//#version");
    } // correct samplerCube sampler


    i = 0; ///*

    for (let k = 0; k < 16; ++k) {
      i = codeStr.indexOf("samplerCube ", i);

      if (i > 0) {
        j = codeStr.indexOf(";", i);
        subStr = shaderStr.slice(i + 12, j);
        keyName = "";
        let arr = subStr.split(" ");

        for (let t = 0; t < 16; ++t) {
          if (arr[t] != "") {
            // find samplerCube uniform name
            keyName = arr[t];
            break;
          }
        }

        for (len = 0; len < 16; ++len) {
          j = codeStr.indexOf(keyName, j + 1);

          if (j > 0) {
            t = codeStr.lastIndexOf("texture2D", j - 1);

            if (t < 0) {
              break;
            }

            subStr = codeStr.slice(t, j);
            codeStr = codeStr.slice(0, t) + "textureCube(" + codeStr.slice(j);
          } else {
            break;
          }

          j += 2;
        }
      } else {
        break;
      }

      i += 4;
    } //*/


    return codeStr;
  }

}

GLSLConverter.__glslTransposeMat3 = `
    mat3 transpose(mat3 m) {
        return mat3(m[0][0],m[1][0],m[2][0],
            m[0][1],m[1][1],m[2][1],
            m[0][2],m[1][2],m[2][2]);
    }
    `;
GLSLConverter.__glslTransposeMat4 = `
    mat4 transpose(mat4 m) {
        return mat4(m[0][0],m[1][0],m[2][0],m[3][0],
            m[0][1],m[1][1],m[2][1],m[3][1],
            m[0][2],m[1][2],m[2][2],m[3][2],
            m[0][3],m[1][3],m[2][3],m[3][3]);
    }
    `;
GLSLConverter.__glslInverseMat3 = `
    mat3 inverse(mat3 m) {
        float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];
        float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];
        float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];  
        float b01 = a22 * a11 - a12 * a21;
        float b11 = -a22 * a10 + a12 * a20;
        float b21 = a21 * a10 - a11 * a20;  
        float det = a00 * b01 + a01 * b11 + a02 * b21;  
        return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
                    b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
                    b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
    }
    `;
GLSLConverter.__glslInverseMat4 = `
    mat4 inverse(mat4 m) {
        float
            a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
            a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
            a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
            a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        return mat4(
            a11 * b11 - a12 * b10 + a13 * b09,
            a02 * b10 - a01 * b11 - a03 * b09,
            a31 * b05 - a32 * b04 + a33 * b03,
            a22 * b04 - a21 * b05 - a23 * b03,
            a12 * b08 - a10 * b11 - a13 * b07,
            a00 * b11 - a02 * b08 + a03 * b07,
            a32 * b02 - a30 * b05 - a33 * b01,
            a20 * b05 - a22 * b02 + a23 * b01,
            a10 * b10 - a11 * b08 + a13 * b06,
            a01 * b08 - a00 * b10 - a03 * b06,
            a30 * b04 - a31 * b02 + a33 * b00,
            a21 * b02 - a20 * b04 - a23 * b00,
            a11 * b07 - a10 * b09 - a12 * b06,
            a00 * b09 - a01 * b07 + a02 * b06,
            a31 * b01 - a30 * b03 - a32 * b00,
            a20 * b03 - a21 * b01 + a22 * b00) / det;
        }
    `;
exports.default = GLSLConverter;

/***/ }),

/***/ "8333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class RenderMaskBitfield {}

RenderMaskBitfield.COLOR_BUFFER_BIT = 131;
RenderMaskBitfield.DEPTH_BUFFER_BIT = 132;
RenderMaskBitfield.STENCIL_BUFFER_BIT = 133;
exports.default = RenderMaskBitfield;

/***/ }),

/***/ "839a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SpecularMode;

(function (SpecularMode) {
  /**
   * 使用设置的纯色 rgb 作为镜面光的颜色系数
   */
  SpecularMode[SpecularMode["Default"] = 1] = "Default";
  /**
   * 使用 之前计算出来的 片段 color rgb 作为镜面光的颜色系数
   */

  SpecularMode[SpecularMode["FragColor"] = 2] = "FragColor";
  /**
   * 使用 SpecularMap color rgb 作为镜面光的颜色系数
   */

  SpecularMode[SpecularMode["SpecularMapColor"] = 3] = "SpecularMapColor";
})(SpecularMode || (SpecularMode = {}));

exports.SpecularMode = SpecularMode;

/***/ }),

/***/ "85b6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class WrapperTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_tex = null;
    this.m_type = TextureProxyType_1.TextureProxyType.Wrapper;
  }
  /**
   * @returns 返回自己的 纹理资源 unique id, 这个id会被对应的资源管理器使用, 此方法子类不可以覆盖
   */


  getResUid() {
    return this.m_tex.getResUid();
  } // gpu texture buf size


  getBufWidth() {
    return this.m_tex.getBufWidth();
  }

  getBufHeight() {
    return this.m_tex.getBufHeight();
  } // logic texture size


  getWidth() {
    return this.m_tex.getWidth();
  }

  getHeight() {
    return this.m_tex.getHeight();
  }
  /**
   * @returns 返回true, 表示当前纹理对象是渲染直接使用其对应的显存资源的对象
   *          返回false, 表示不能直接使用对应的显存资源
   */


  isDirect() {
    return false;
  }

  getAttachTex() {
    return this.m_tex;
  }

  attachTex(tex) {
    if (this.m_tex != tex) {
      if (this.m_tex != null) {
        this.m_tex.__$detachThis();
      }

      if (tex != null) {
        tex.__$attachThis();
      }

      this.m_tex = tex;
    }
  }

  detachTex() {
    if (this.m_tex != null) {
      this.m_tex.__$detachThis();
    }

    this.m_tex = null;
  }
  /**
   * 被引用计数加一
   */


  __$attachThis() {
    super.__$attachThis();

    if (this.m_tex != null) {
      this.m_tex.__$attachThis();
    }
  }
  /**
   * 被引用计数减一
   */


  __$detachThis() {
    super.__$detachThis();

    if (this.m_tex != null) {
      this.m_tex.__$detachThis();
    }
  }
  /**
   * This function only be be called by the renderer inner system.
   */


  __$$use(resTex) {
    this.m_tex.__$$use(resTex);
  }
  /**
   * @returns the texture gpu resource is enabled or not.
   */


  isGpuEnabled() {
    return this.m_tex.isGpuEnabled();
  }
  /**
   * @returns The fragment processor texture sampler type.
   */


  getSampler() {
    return this.m_tex.getSampler();
  }

  __$updateToGpu(texRes) {
    this.m_tex.__$updateToGpu(texRes);
  }
  /**
   * This function only be be called by the renderer inner system.
   * if sub class override this function, it must does call this function.
   */


  __$$upload(texRes) {
    this.m_tex.__$$upload(texRes);
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      if (this.m_tex != null) {
        this.m_tex.__$detachThis();
      }

      this.m_tex = null;

      super.__$destroy();
    }
  }
  /**
   * @returns the texture data is enough or not.
   */


  isDataEnough() {
    return this.m_tex.isDataEnough();
  }
  /**
   * @returns return value is TextureConst.TEXTURE_2D or TextureConst.TEXTURE_CUBE or TextureConst.TEXTURE_3D
   */


  getTargetType() {
    return this.m_tex.getTargetType();
  }

}

exports.default = WrapperTextureProxy;

/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8a0a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const BitConst_1 = __importDefault(__webpack_require__("ca6c"));

class VtxBufConst {
  //
  static ToGL(gl, param) {
    const vbc = VtxBufConst;

    switch (param) {
      case vbc.VTX_STATIC_DRAW:
        return gl.STATIC_DRAW;
        break;

      case vbc.VTX_DYNAMIC_DRAW:
        return gl.DYNAMIC_DRAW;
        break;

      case vbc.VTX_STREAM_DRAW:
        return gl.STREAM_DRAW;
        break;

      case vbc.VTX_STATIC_READ:
        return gl.STATIC_READ;
        break;

      case vbc.VTX_DYNAMIC_READ:
        return gl.DYNAMIC_READ;
        break;

      case vbc.VTX_STREAM_READ:
        return gl.STREAM_READ;
        break;

      case vbc.VTX_STATIC_COPY:
        return gl.STATIC_COPY;
        break;

      case vbc.VTX_DYNAMIC_COPY:
        return gl.DYNAMIC_COPY;
        break;

      case vbc.VTX_STREAM_COPY:
        return gl.STREAM_COPY;
        break;

      default:
        break;
    }

    return gl.STATIC_DRAW;
  }

  static GetVBufTypeByNS(pns) {
    const vbc = VtxBufConst;

    switch (pns) {
      case vbc.VBUF_VS_NS:
        return vbc.VBUF_VS;
        break;

      case vbc.VBUF_UVS_NS:
        return vbc.VBUF_UVS;
        break;

      case vbc.VBUF_NVS_NS:
        return vbc.VBUF_NVS;
        break;

      case vbc.VBUF_CVS_NS:
        return vbc.VBUF_CVS;
        break;
      ///////////////////

      case vbc.VBUF_VS2_NS:
        return vbc.VBUF_VS2;
        break;

      case vbc.VBUF_UVS2_NS:
        return vbc.VBUF_UVS2;
        break;

      case VtxBufConst.VBUF_NVS2_NS:
        return VtxBufConst.VBUF_NVS2;
        break;

      case vbc.VBUF_CVS2_NS:
        return vbc.VBUF_CVS2;
        break;

      case vbc.VBUF_TVS_NS:
        return vbc.VBUF_TVS;
        break;

      case vbc.VBUF_TVS2_NS:
        return vbc.VBUF_TVS2;
        break;

      default:
    }

    return -1;
  }

  static GetVBufNSByType(type) {
    const vbc = VtxBufConst;

    switch (type) {
      case vbc.VBUF_VS:
        return vbc.VBUF_VS_NS;
        break;

      case vbc.VBUF_UVS:
        return vbc.VBUF_UVS_NS;
        break;

      case vbc.VBUF_NVS:
        return vbc.VBUF_NVS_NS;
        break;

      case vbc.VBUF_CVS:
        return vbc.VBUF_CVS_NS;
        break;
      ///////////////////

      case vbc.VBUF_VS2:
        return vbc.VBUF_VS2_NS;
        break;

      case vbc.VBUF_UVS2:
        return vbc.VBUF_UVS2_NS;
        break;

      case vbc.VBUF_NVS2:
        return vbc.VBUF_NVS2_NS;
        break;

      case vbc.VBUF_CVS2:
        return vbc.VBUF_CVS2_NS;
        break;

      case vbc.VBUF_TVS:
        return vbc.VBUF_TVS_NS;
        break;

      case vbc.VBUF_TVS2:
        return vbc.VBUF_TVS2_NS;
        break;

      default:
    }

    return "";
  }

  static GetVBufAttributeTypeByNS(pns) {
    return VtxBufConst.GetVBufTypeByNS(pns) - 3000;
  }

  static GetVBufAttributeTypeByVBufType(vbufType) {
    return vbufType - 3000;
  }

}

VtxBufConst.VTXTYPE_GL_POINTS = 101;
VtxBufConst.VTXTYPE_GL_LINES = 102;
VtxBufConst.VTXTYPE_GL_LINE_STRIP = 103;
VtxBufConst.VTXTYPE_GL_TRIANGLES = 111;
VtxBufConst.VTX_STATIC_DRAW = 0;
VtxBufConst.VTX_DYNAMIC_DRAW = 1;
VtxBufConst.VTX_STREAM_DRAW = 2;
VtxBufConst.VTX_STATIC_READ = 3;
VtxBufConst.VTX_DYNAMIC_READ = 4;
VtxBufConst.VTX_STREAM_READ = 5;
VtxBufConst.VTX_STATIC_COPY = 6;
VtxBufConst.VTX_DYNAMIC_COPY = 7;
VtxBufConst.VTX_STREAM_COPY = 8;
VtxBufConst.VBUF_VS = 3001;
VtxBufConst.VBUF_UVS = 3002;
VtxBufConst.VBUF_NVS = 3003;
VtxBufConst.VBUF_CVS = 3004;
VtxBufConst.VBUF_TVS = 3005;
VtxBufConst.VBUF_VS2 = 3006;
VtxBufConst.VBUF_UVS2 = 3007;
VtxBufConst.VBUF_NVS2 = 3008;
VtxBufConst.VBUF_CVS2 = 3009;
VtxBufConst.VBUF_TVS2 = 3010;
VtxBufConst.VBUF_VS_INDEX = BitConst_1.default.BIT_ONE_0;
VtxBufConst.VBUF_UVS_INDEX = BitConst_1.default.BIT_ONE_1;
VtxBufConst.VBUF_NVS_INDEX = BitConst_1.default.BIT_ONE_2;
VtxBufConst.VBUF_CVS_INDEX = BitConst_1.default.BIT_ONE_3;
VtxBufConst.VBUF_TVS_INDEX = BitConst_1.default.BIT_ONE_4;
VtxBufConst.VBUF_VS2_INDEX = BitConst_1.default.BIT_ONE_5;
VtxBufConst.VBUF_UVS2_INDEX = BitConst_1.default.BIT_ONE_6;
VtxBufConst.VBUF_NVS2_INDEX = BitConst_1.default.BIT_ONE_7;
VtxBufConst.VBUF_CVS2_INDEX = BitConst_1.default.BIT_ONE_8;
VtxBufConst.VBUF_TVS2_INDEX = BitConst_1.default.BIT_ONE_9; // name

VtxBufConst.VBUF_VS_NS = "a_vs";
VtxBufConst.VBUF_VS2_NS = "a_vs2";
VtxBufConst.VBUF_UVS_NS = "a_uvs";
VtxBufConst.VBUF_UVS2_NS = "a_uvs2";
VtxBufConst.VBUF_NVS_NS = "a_nvs";
VtxBufConst.VBUF_NVS2_NS = "a_nvs2";
VtxBufConst.VBUF_CVS_NS = "a_cvs";
VtxBufConst.VBUF_CVS2_NS = "a_cvs2";
VtxBufConst.VBUF_TVS_NS = "a_tvs";
VtxBufConst.VBUF_TVS2_NS = "a_tvs2";

class VtxNormalType {}

VtxNormalType.FLAT = 210;
VtxNormalType.GOURAND = 310;
exports.VtxNormalType = VtxNormalType;
exports.default = VtxBufConst;

/***/ }),

/***/ "8d98":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class TextureConst {
  static GetConst(gl, param) {
    switch (param) {
      case TextureConst.NEAREST:
        return gl.NEAREST;
        break;

      case TextureConst.LINEAR:
        return gl.LINEAR;
        break;

      case TextureConst.LINEAR_MIPMAP_LINEAR:
        return gl.LINEAR_MIPMAP_LINEAR;
        break;

      case TextureConst.NEAREST_MIPMAP_NEAREST:
        return gl.NEAREST_MIPMAP_NEAREST;
        break;

      case TextureConst.LINEAR_MIPMAP_NEAREST:
        return gl.LINEAR_MIPMAP_NEAREST;
        break;

      case TextureConst.NEAREST_MIPMAP_LINEAR:
        return gl.NEAREST_MIPMAP_LINEAR;
        break;

      case TextureConst.WRAP_REPEAT:
        return gl.REPEAT;
        break;

      case TextureConst.WRAP_CLAMP_TO_EDGE:
        return gl.CLAMP_TO_EDGE;
        break;

      case TextureConst.WRAP_MIRRORED_REPEAT:
        return gl.MIRRORED_REPEAT;
        break;

      default:
        break;
    }

    return -1;
  }

}

TextureConst.WRAP_REPEAT = 3001;
TextureConst.WRAP_CLAMP_TO_EDGE = 3002;
TextureConst.WRAP_MIRRORED_REPEAT = 3003;
TextureConst.NEAREST = 4001;
TextureConst.LINEAR = 4002;
TextureConst.LINEAR_MIPMAP_LINEAR = 4003;
TextureConst.NEAREST_MIPMAP_NEAREST = 4004;
TextureConst.LINEAR_MIPMAP_NEAREST = 4005;
TextureConst.NEAREST_MIPMAP_LINEAR = 4006;
exports.default = TextureConst;

/***/ }),

/***/ "8e17":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const v_m_180pk = 180.0 / Math.PI;
const v_m_minp = 1e-7;

class Vector3D {
  constructor(px = 0.0, py = 0.0, pz = 0.0, pw = 1.0) {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.w = 0.0;
    this.x = px;
    this.y = py;
    this.z = pz;
    this.w = pw;
  }

  clone() {
    return new Vector3D(this.x, this.y, this.z, this.w);
  }

  setTo(px, py, pz, pw = 1.0) {
    this.x = px;
    this.y = py;
    this.z = pz;
    this.w = pw;
    return this;
  }

  fromArray(arr, offset = 0) {
    this.x = arr[offset];
    this.y = arr[offset + 1];
    this.z = arr[offset + 2];
    return this;
  }

  toArray(arr, offset = 0) {
    arr[offset] = this.x;
    arr[offset + 1] = this.y;
    arr[offset + 2] = this.z;
    return this;
  }

  fromArray4(arr, offset = 0) {
    this.x = arr[offset];
    this.y = arr[offset + 1];
    this.z = arr[offset + 2];
    this.w = arr[offset + 3];
    return this;
  }

  toArray4(arr, offset = 0) {
    arr[offset] = this.x;
    arr[offset + 1] = this.y;
    arr[offset + 2] = this.z;
    arr[offset + 3] = this.w;
    return this;
  }

  setXYZ(px, py, pz) {
    this.x = px;
    this.y = py;
    this.z = pz;
    return this;
  }

  copyFrom(v3) {
    this.x = v3.x;
    this.y = v3.y;
    this.z = v3.z;
    return this;
  }

  dot(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  }

  multBy(a) {
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
    return this;
  }

  normalize() {
    let d = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    if (d > v_m_minp) {
      this.x /= d;
      this.y /= d;
      this.z /= d;
    }

    return this;
  }

  normalizeTo(a) {
    let d = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    if (d > v_m_minp) {
      a.x = this.x / d;
      a.y = this.y / d;
      a.z = this.z / d;
    } else {
      a.x = this.x;
      a.y = this.y;
      a.z = this.z;
    }
  }

  scaleVector(s) {
    this.x *= s.x;
    this.y *= s.y;
    this.z *= s.z;
    return this;
  }

  scaleBy(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  equalsXYZ(a) {
    return Math.abs(this.x - a.x) < v_m_minp && Math.abs(this.y - a.y) < v_m_minp && Math.abs(this.z - a.z) < v_m_minp;
  }

  equalsAll(a) {
    return Math.abs(this.x - a.x) < v_m_minp && Math.abs(this.y - a.y) < v_m_minp && Math.abs(this.z - a.z) < v_m_minp && Math.abs(this.w - a.w) < v_m_minp;
  }

  project() {
    let t = 1.0 / this.w;
    this.x *= t;
    this.y *= t;
    this.z *= t;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  getLengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  addBy(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  }

  subtractBy(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  }

  subtract(a) {
    return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
  }

  add(a) {
    return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z);
  }

  crossProduct(a) {
    return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
  }

  crossBy(a) {
    let px = this.y * a.z - this.z * a.y;
    let py = this.z * a.x - this.x * a.z;
    let pz = this.x * a.y - this.y * a.x;
    this.x = px;
    this.y = py;
    this.z = pz;
    return this;
  }

  reflectBy(nv) {
    let idotn2 = (this.x * nv.x + this.y * nv.y + this.z * nv.z) * 2.0;
    this.x = this.x - idotn2 * nv.x;
    this.y = this.y - idotn2 * nv.y;
    this.z = this.z - idotn2 * nv.z;
    return this;
  }

  scaleVecTo(va, scale) {
    this.x = va.x * scale;
    this.y = va.y * scale;
    this.z = va.z * scale;
    return this;
  }

  subVecsTo(va, vb) {
    this.x = va.x - vb.x;
    this.y = va.y - vb.y;
    this.z = va.z - vb.z;
    return this;
  }

  addVecsTo(va, vb) {
    this.x = va.x + vb.x;
    this.y = va.y + vb.y;
    this.z = va.z + vb.z;
    return this;
  }

  crossVecsTo(va, vb) {
    this.x = va.y * vb.z - va.z * vb.y;
    this.y = va.z * vb.x - va.x * vb.z;
    this.z = va.x * vb.y - va.y * vb.x;
    return this;
  }

  toString() {
    return "Vector3D(" + this.x + "" + this.y + "" + this.z + ")";
  }
  /**
   * 右手法则(为正)
   */


  static Cross(a, b, result) {
    result.x = a.y * b.z - a.z * b.y;
    result.y = a.z * b.x - a.x * b.z;
    result.z = a.x * b.y - a.y * b.x;
  } // (va1 - va0) 叉乘 (vb1 - vb0), 右手法则(为正)


  static CrossSubtract(va0, va1, vb0, vb1, result) {
    v_m_v0.x = va1.x - va0.x;
    v_m_v0.y = va1.y - va0.y;
    v_m_v0.z = va1.z - va0.z;
    v_m_v1.x = vb1.x - vb0.x;
    v_m_v1.y = vb1.y - vb0.y;
    v_m_v1.z = vb1.z - vb0.z;
    va0 = v_m_v0;
    vb0 = v_m_v1;
    result.x = va0.y * vb0.z - va0.z * vb0.y;
    result.y = va0.z * vb0.x - va0.x * vb0.z;
    result.z = va0.x * vb0.y - va0.y * vb0.x;
  }

  static Subtract(a, b, result) {
    result.x = a.x - b.x;
    result.y = a.y - b.y;
    result.z = a.z - b.z;
  }

  static DistanceSquared(a, b) {
    v_m_v0.x = a.x - b.x;
    v_m_v0.y = a.y - b.y;
    v_m_v0.z = a.z - b.z;
    return v_m_v0.getLengthSquared();
  }

  static DistanceXYZ(x0, y0, z0, x1, y1, z1) {
    v_m_v0.x = x0 - x1;
    v_m_v0.y = y0 - y1;
    v_m_v0.z = z0 - z1;
    return v_m_v0.getLength();
  }

  static Distance(v0, v1) {
    v_m_v0.x = v0.x - v1.x;
    v_m_v0.y = v0.y - v1.y;
    v_m_v0.z = v0.z - v1.z;
    return v_m_v0.getLength();
  }
  /**
   * get angle degree between two Vector3D objects
   * @param v0 src Vector3D object
   * @param v1 dst Vector3D object
   * @returns angle degree
   */


  static AngleBetween(v0, v1) {
    v0.normalizeTo(v_m_v0);
    v1.normalizeTo(v_m_v1);
    return Math.acos(v_m_v0.dot(v_m_v1)) * v_m_180pk;
  }
  /**
   * get angle radian between two Vector3D objects
   * @param v0 src Vector3D object
   * @param v1 dst Vector3D object
   * @returns angle radian
   */


  static RadianBetween(v0, v1) {
    v0.normalizeTo(v_m_v0);
    v1.normalizeTo(v_m_v1);
    return Math.acos(v_m_v0.dot(v_m_v1));
  }

  static RadianBetween2(v0, v1) {
    //  // c^2 = a^2 + b^2 - 2*a*b * cos(x)
    //  // cos(x) = (a^2 + b^2 - c^2) / 2*a*b
    let pa = v0.getLengthSquared();
    let pb = v1.getLengthSquared();
    v_m_v0.x = v0.x - v1.x;
    v_m_v0.y = v0.y - v1.y;
    v_m_v0.z = v0.z - v1.z;
    return Math.acos((pa + pb - v_m_v0.getLengthSquared()) / (2.0 * Math.sqrt(pa) * Math.sqrt(pb)));
  }

  static Reflect(iv, nv, rv) {
    let idotn2 = (iv.x * nv.x + iv.y * nv.y + iv.z * nv.z) * 2.0;
    rv.x = iv.x - idotn2 * nv.x;
    rv.y = iv.y - idotn2 * nv.y;
    rv.z = iv.z - idotn2 * nv.z;
  }
  /**
   * 逆时针转到垂直
   */


  static VerticalCCWOnXOY(v) {
    const x = v.x;
    v.x = -v.y;
    v.y = x;
  }
  /**
   * 顺时针转到垂直
   */


  static VerticalCWOnXOY(v) {
    const y = v.y;
    v.y = -v.x;
    v.x = y;
  }

}

Vector3D.X_AXIS = new Vector3D(1, 0, 0);
Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
Vector3D.ZERO = new Vector3D(0, 0, 0);
Vector3D.ONE = new Vector3D(1, 1, 1);
exports.default = Vector3D;
const v_m_v0 = new Vector3D();
const v_m_v1 = new Vector3D();

/***/ }),

/***/ "9666":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

const ShaderData_1 = __importDefault(__webpack_require__("acfe"));

class MaterialResource {
  static CreateShdData(unique_name_str, vshdsrc, fshdSrc, adaptationShaderVersion, preCompileInfo) {
    //console.log("MaterialResource.CreateShdData() begin...");
    if (MaterialResource.s_shdDataDict.has(unique_name_str)) {
      return MaterialResource.s_shdDataDict.get(unique_name_str);
    }

    let p = new ShaderData_1.default();
    p.adaptationShaderVersion = adaptationShaderVersion;
    p.preCompileInfo = preCompileInfo;
    p.initialize(unique_name_str, vshdsrc, fshdSrc);
    MaterialResource.s_shdDataList[p.getUid()] = p;
    ++MaterialResource.s_shdDataListLen;
    MaterialResource.s_shdDataDict.set(unique_name_str, p);

    if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
      console.log("MaterialResource.Create() a new ShaderProgram: ", p.toString());
    }

    return p;
  }

  static FindData(unique_name_str) {
    if (MaterialResource.s_shdDataDict.has(unique_name_str)) {
      return MaterialResource.s_shdDataDict.get(unique_name_str);
    }

    return null;
  }

}

MaterialResource.s_shdDataDict = new Map();
MaterialResource.s_shdDataList = [];
MaterialResource.s_shdDataListLen = 0;
exports.default = MaterialResource;

/***/ }),

/***/ "9c4d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2019-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Runner {
  constructor() {
    this.prev = null;
    this.next = null;
    this.flag = 0;
    this.target = null;
  }

  reset() {
    this.flag = 0;
    this.target = null;
  }

}

class RunnerLinker {
  constructor() {
    this.m_begin = null;
    this.m_end = null;
  }

  destroy() {
    this.clear();
  }

  clear() {
    this.m_begin = this.m_end = null;
  }

  getBegin() {
    return this.m_begin;
  }

  isEmpty() {
    return this.m_begin == this.m_end && this.m_end == null;
  }

  addNode(node) {
    if (this.m_begin == null) {
      this.m_end = this.m_begin = node;
    } else {
      if (this.m_end.prev != null) {
        this.m_end.next = node;
        node.prev = this.m_end;
        this.m_end = node;
      } else {
        this.m_begin.next = node;
        node.prev = this.m_end;
        this.m_end = node;
      }
    }

    this.m_end.next = null;
  }

  removeNode(node) {
    if (node == this.m_begin) {
      if (node == this.m_end) {
        this.m_begin = this.m_end = null;
      } else {
        this.m_begin = node.next;
        this.m_begin.prev = null;
      }
    } else if (node == this.m_end) {
      this.m_end = node.prev;
      this.m_end.next = null;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }

    node.prev = null;
    node.next = null;
  }

}

class RunnableQueue {
  constructor() {
    this.m_linker = new RunnerLinker();
    this.m_freeIds = [];
    this.m_runners = [new Runner()];
  }

  getFreeId() {
    if (this.m_freeIds.length > 0) {
      return this.m_freeIds.pop();
    }

    let runner = new Runner();
    runner.flag = this.m_runners.length;
    this.m_runners.push(runner);
    return runner.flag;
  }

  addRunner(runner) {
    if (runner != null && runner.getRunFlag() < 1) {
      let i = this.getFreeId();
      let pr = this.m_runners[i];
      pr.flag = i;
      pr.target = runner;
      runner.setRunFlag(i);
      this.m_linker.addNode(pr);
    }
  }

  removeRunner(runner) {
    if (runner != null && runner.getRunFlag() > 0) {
      let i = runner.getRunFlag();
      this.m_freeIds.push(i);
      let pr = this.m_runners[i];
      pr.flag = i;
      pr.target = null;
      runner.setRunFlag(0);
      this.m_linker.removeNode(pr);
    }
  }

  run() {
    let ro = this.m_linker.getBegin();
    let next = ro;

    while (next != null) {
      ro = next;
      next = ro.next;

      if (ro.target.isRunning()) {
        ro.target.run();
      }
    }
  }

  destroy() {
    let ro = this.m_linker.getBegin();
    let next = ro;

    while (next != null) {
      ro = next;
      next = ro.next;
      ro.target = null;
    }

    this.m_linker.clear();
  }

}

exports.default = RunnableQueue;

/***/ }),

/***/ "9f3e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const RawDataTextureProxy_1 = __importDefault(__webpack_require__("df25"));

class Uint16TextureProxy extends RawDataTextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_type = TextureProxyType_1.TextureProxyType.Uint16;
    this.minFilter = TextureConst_1.default.LINEAR;
    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT;
  } //  OES_texture_half_float, HALF_FLOAT_OES


  toHalfFloatOes() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.unpackAlignment = 4; // 8 bytes

    this.dataType = TextureDataType_1.default.HALF_FLOAT_OES;
  }

  toUShort565() {
    this.srcFormat = TextureFormat_1.default.RGB;
    this.internalFormat = TextureFormat_1.default.RGB; //UNSIGNED_SHORT_5_6_5

    this.unpackAlignment = 3; // 2 bytes

    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT_5_6_5;
  }

  toUShort4444() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA; //UNSIGNED_SHORT_4_4_4_4

    this.unpackAlignment = 4; // 2 bytes

    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT_4_4_4_4;
  }

  toUShort5551() {
    //UNSIGNED_SHORT_5_5_5_1
    this.unpackAlignment = 4; // 2 bytes

    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT_5_5_5_1;
  }

  toUShort() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT; //UNSIGNED_SHORT
  }

  toAlphaFormat() {
    if (this.dataType == TextureDataType_1.default.UNSIGNED_SHORT) {
      this.srcFormat = TextureFormat_1.default.ALPHA;
      this.internalFormat = TextureFormat_1.default.ALPHA;
      this.unpackAlignment = 1;
    }
  }

  toRedFormat() {
    if (this.dataType == TextureDataType_1.default.UNSIGNED_SHORT) {
      this.srcFormat = TextureFormat_1.default.RED;
      this.internalFormat = TextureFormat_1.default.RED;
      this.unpackAlignment = 1;
    }
  }

  toRGBFormat() {
    if (this.dataType == TextureDataType_1.default.UNSIGNED_SHORT) {
      this.srcFormat = TextureFormat_1.default.RGB;
      this.internalFormat = TextureFormat_1.default.RGB;
      this.unpackAlignment = 3;
    }
  }

  toRGBAFormat() {
    if (this.dataType == TextureDataType_1.default.UNSIGNED_SHORT) {
      this.srcFormat = TextureFormat_1.default.RGBA;
      this.internalFormat = TextureFormat_1.default.RGBA;
      this.unpackAlignment = 4;
    }
  }

  uploadFromBytes(bytes, miplevel = 0, imgWidth = -1, imgHeight = -1, offsetx = 0, offsety = 0, rebuild = false) {
    super.setDataFromBytes(bytes, miplevel, imgWidth, imgHeight, offsetx, offsety, rebuild);
  }

  setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel = 0) {
    super.setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel);
  }

  getPixels(px, py, pw, ph, outBytes) {
    super.getPixels(px, py, pw, ph, outBytes);
  }

  toString() {
    return "[Uint16TextureProxy(width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = Uint16TextureProxy;

/***/ }),

/***/ "a156":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

const ShdProgram_1 = __importDefault(__webpack_require__("20ef"));

class ShaderProgramBuilder {
  constructor(rcuid) {
    this.m_shdDict = new Map();
    this.m_shdList = [];
    this.m_shdListLen = 0;
    this.m_sharedUniformList = [];
    this.m_rcuid = -1;
    this.m_rcuid = rcuid;
  }
  /**
   * @returns return renderer context unique id
   */


  getRCUid() {
    return this.m_rcuid;
  }
  /**
   * 这里的program生成过程已经能适配多GPU context的情况了
   */


  create(shdData) {
    // console.log("this.Create() begin...");
    let uns = shdData.getUniqueShaderName();

    if (this.m_shdDict.has(uns)) {
      return this.m_shdDict.get(uns);
    }

    let p = new ShdProgram_1.default(this.m_shdListLen);
    p.setShdData(shdData);
    this.m_shdList[p.getUid()] = p;
    this.m_sharedUniformList[p.getUid()] = null;
    ++this.m_shdListLen;
    this.m_shdDict.set(uns, p);

    if (RendererDevice_1.default.SHADERCODE_TRACE_ENABLED) {
      console.log("this.Create() a new ShdProgram: ", p.toString());
    }

    return p;
  }

  findShdProgramByUid(uid) {
    return this.m_shdList[uid];
  }

  findShdProgram(unique_name_str) {
    if (this.m_shdDict.has(unique_name_str)) {
      return this.m_shdDict.get(unique_name_str);
    }

    return null;
  }

  findShdProgramByShdData(shdData) {
    if (shdData != null) {
      if (this.m_shdDict.has(shdData.getUniqueShaderName())) {
        return this.m_shdDict.get(shdData.getUniqueShaderName());
      }
    }

    return null;
  }

  hasUid(resUid) {
    return this.m_shdList[resUid] != null;
  }

  getTotal() {
    return this.m_shdListLen;
  }

  containsUid(uid) {
    return uid > -1 && uid < this.m_shdListLen;
  }

}

exports.ShaderProgramBuilder = ShaderProgramBuilder;

/***/ }),

/***/ "a221":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "a80a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Entity3DNodeLinker {
  constructor() {
    this.m_begin = null;
    this.m_end = null;
  }

  destroy() {
    this.clear();
  }

  clear() {
    this.m_begin = this.m_end = null;
  }

  getBegin() {
    return this.m_begin;
  }

  isEmpty() {
    return this.m_begin == this.m_end && this.m_end == null;
  }

  addNode(node) {
    if (this.m_begin == null) {
      this.m_end = this.m_begin = node;
    } else {
      if (this.m_end.prev != null) {
        this.m_end.next = node;
        node.prev = this.m_end;
        this.m_end = node;
      } else {
        this.m_begin.next = node;
        node.prev = this.m_end;
        this.m_end = node;
      }
    }

    this.m_end.next = null;
  }

  removeNode(node) {
    if (node == this.m_begin) {
      if (node == this.m_end) {
        this.m_begin = this.m_end = null;
      } else {
        this.m_begin = node.next;
        this.m_begin.prev = null;
      }
    } else if (node == this.m_end) {
      this.m_end = node.prev;
      this.m_end.next = null;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }

    node.prev = null;
    node.next = null;
  }

}

exports.default = Entity3DNodeLinker;

/***/ }),

/***/ "a9f4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ShadowMode;

(function (ShadowMode) {
  /**
   * default shadow mode
   */
  ShadowMode[ShadowMode["Default"] = 1] = "Default";
  /**
   * vsm shadow mode
   */

  ShadowMode[ShadowMode["VSM"] = 1] = "VSM";
})(ShadowMode || (ShadowMode = {}));

exports.ShadowMode = ShadowMode;

/***/ }),

/***/ "ab73":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class ShadowVSMParams {
  constructor() {
    this.type = "vec4";
    this.data = null;
    /**
     * uniform name string
     */

    this.name = "u_vsmParams";
    /**
     * uniform array length
     */

    this.arrayLength = 3;
  }

}

class EnvLightParam {
  constructor() {
    this.type = "vec4";
    this.data = new Float32Array([0.1, 0.1, 0.1, 1.0, 1.0, 0.1, 600.0, 3500.0, 0.3, 0.0, 0.9, 0.0005, 0.0, 0.0, 800.0, 800.0, -500.0, -500.0, 1000.0, 1000.0 // env ambient area width, height
    ]);
    /**
     * uniform name string
     */

    this.name = "u_envLightParams";
    /**
     * uniform array length
     */

    this.arrayLength = 5;
  }

}
/**
 * shadow view matatrix4 float32array data
 */


class ShadowMat4UniformParam {
  constructor() {
    this.type = "mat4";
    this.data = null;
    /**
     * uniform name string
     */

    this.name = "u_shadowMat";
    /**
     * uniform array length
     */

    this.arrayLength = 0;
  }

}
/**
 * stage param shader uniform name string, vec4: [2.0/stageWidth,2.0/stageHeight, stageWidth,stageHeight]
 */


class StageUniformParam {
  constructor() {
    this.type = "vec4";
    this.data = null;
    /**
     * uniform name string
     */

    this.name = "u_stageParam";
    /**
     * uniform array length
     */

    this.arrayLength = 0;
  }

}
/**
 * view port param shader uniform name string, vec4: [viewPortX, viewPortY, viewPortWidth, viewPortHeight]
 */


class ViewUniformParam {
  constructor() {
    this.type = "vec4";
    this.data = null;
    /**
     * uniform name string
     */

    this.name = "u_viewParam";
    /**
     * uniform array length
     */

    this.arrayLength = 0;
  }

}
/**
 * camera frustrum param shader uniform name string,vec4: [camera zNear,camera zFar, camera nearPlaneHalfW, camera nearPlaneHalfH]
 */


class FrustumUniformParam {
  constructor() {
    this.type = "vec4";
    this.data = null;
    /**
     * uniform name string
     */

    this.name = "u_frustumParam";
    /**
     * uniform array length
     */

    this.arrayLength = 0;
  }

}
/**
 * camera world position param shader uniform name string,vec4: [x, y, z, w]
 */


class CameraPosUniformParam {
  constructor() {
    this.type = "vec4";
    this.data = null;
    /**
     * uniform name string
     */

    this.name = "u_cameraPosition";
    /**
     * uniform array length
     */

    this.arrayLength = 0;
  }

}

class GlobalLightUniform {
  constructor() {
    this.type = "vec4";
    this.positionName = "u_lightPositions";
    this.colorName = "u_lightColors";
  }

}

class UniformConst {}
/**
 * object local space to world space matrix shader uniform name string
 */


UniformConst.LocalTransformMatUNS = "u_objMat";
/**
 * camera view matrix shader uniform name string
 */

UniformConst.CameraViewMatUNS = "u_viewMat";
/**
 * camera projective matrix shader uniform name string
 */

UniformConst.CameraProjectiveMatUNS = "u_projMat";
/**
 * camera frustrum param shader uniform name string,vec4: [camera zNear,camera zFar, camera nearPlaneHalfW, camera nearPlaneHalfH]
 */

UniformConst.FrustumParam = new FrustumUniformParam();
/**
 * camera world position param shader uniform name string,vec4: [x, y, z, w]
 */

UniformConst.CameraPosParam = new CameraPosUniformParam();
/**
 * stage param shader uniform name string, vec4: [2.0/stageWidth,2.0/stageHeight, stageWidth,stageHeight]
 */

UniformConst.StageParam = new StageUniformParam();
/**
 * view port param shader uniform name string, vec4: [viewPortX, viewPortY, viewPortWidth, viewPortHeight]
 */

UniformConst.ViewportParam = new ViewUniformParam();
UniformConst.ShadowMatrix = new ShadowMat4UniformParam();
UniformConst.ShadowVSMParams = new ShadowVSMParams();
UniformConst.GlobalLight = new GlobalLightUniform();
UniformConst.EnvLightParams = new EnvLightParam();
exports.default = UniformConst;

/***/ }),

/***/ "abdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class OrientationType {}

OrientationType.AXIS_ANGLE = 0;
OrientationType.QUATERNION = 1;
OrientationType.EULER_ANGLES = 2;
exports.default = OrientationType;

/***/ }),

/***/ "acaa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const RTTTextureProxy_1 = __importDefault(__webpack_require__("cfaf"));

class DepthTextureProxy extends RTTTextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.srcFormat = TextureFormat_1.default.DEPTH_COMPONENT;
    this.internalFormat = TextureFormat_1.default.DEPTH_COMPONENT;
    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT;
    this.m_generateMipmap = false;
    this.m_haveRData = true;
    this.mipmapEnabled = false;
    this.m_type = TextureProxyType_1.TextureProxyType.Depth;
  }

  toDepthUnsignedInt() {
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.srcFormat = TextureFormat_1.default.DEPTH_COMPONENT;
    this.internalFormat = TextureFormat_1.default.DEPTH_COMPONENT;
    this.dataType = TextureDataType_1.default.UNSIGNED_INT;
    this.m_generateMipmap = false;
    this.m_haveRData = true;
    this.mipmapEnabled = false;
  }

  toDepthUnsignedShort() {
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.srcFormat = TextureFormat_1.default.DEPTH_COMPONENT;
    this.internalFormat = TextureFormat_1.default.DEPTH_COMPONENT;
    this.dataType = TextureDataType_1.default.UNSIGNED_SHORT;
    this.m_generateMipmap = false;
    this.m_haveRData = true;
    this.mipmapEnabled = false;
  }

  toDepthAndStencil() {
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.srcFormat = TextureFormat_1.default.DEPTH_STENCIL;
    this.internalFormat = TextureFormat_1.default.DEPTH_STENCIL;
    this.dataType = TextureDataType_1.default.UNSIGNED_INT_24_8_WEBGL;
    this.m_generateMipmap = false;
    this.mipmapEnabled = false;
    this.m_haveRData = true;
  }

  uploadData(texRes) {
    console.log("DepthTextureProxy uploadData()...");
    let gl = texRes.getRC();
    gl.texImage2D(this.m_sampler, 0, TextureFormat_1.default.ToGL(gl, this.internalFormat), this.m_texWidth, this.m_texHeight, 0, TextureFormat_1.default.ToGL(gl, this.srcFormat), TextureDataType_1.default.ToGL(gl, this.dataType), null);
  }

  toString() {
    return "[DepthTextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = DepthTextureProxy;

/***/ }),

/***/ "acfe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

const GLSLConverter_1 = __importDefault(__webpack_require__("81ce"));

const ShaderCodeParser_1 = __importDefault(__webpack_require__("fc07"));

class ShaderData {
  constructor() {
    this.m_uid = -1;
    this.adaptationShaderVersion = true;
    this.preCompileInfo = null;
    this.m_vshdCode = "";
    this.m_fshdCode = "";
    this.m_shdUniqueName = "";
    this.m_texTotal = 0;
    this.m_uniforms = null; // identify use texture

    this.m_useTex = false; // web gl 1.0, attribute namestring list

    this.m_attriNSList = null;
    this.m_attriSizeList = null;
    this.m_aLocationTypes = null;
    this.m_uniformDict = new Map();
    this.m_layoutTypes = null;
    this.m_haveCommonUniform = false;
    this.m_layoutBit = 0x0;
    this.m_mid = 0x0;
    this.m_fragOutputTotal = 1;
    this.m_texUniformNames = null; // recode shader uniform including status

    this.dataUniformEnabled = false;
    this.m_uid = ShaderData.s_uid++;
  }

  getVSCodeStr() {
    return this.m_vshdCode;
  }

  getFSCodeStr() {
    return this.m_fshdCode;
  }

  getLocationTypes() {
    return this.m_layoutTypes;
  }

  getLayoutBit() {
    return this.m_layoutBit;
  }

  getMid() {
    return this.m_mid;
  }

  getFragOutputTotal() {
    return this.m_fragOutputTotal;
  }

  parseCode(vshdsrc, fshdSrc) {
    ShaderData.s_codeParser.reset();
    ShaderData.s_codeParser.parseVShaderCode(vshdsrc);
    ShaderData.s_codeParser.parseFShaderCode(fshdSrc);
    this.m_fragOutputTotal = ShaderData.s_codeParser.fragOutputTotal;
    this.m_uniforms = ShaderData.s_codeParser.uniforms;
  }

  initialize(unique_ns, vshdsrc, fshdSrc) {
    this.m_shdUniqueName = unique_ns;

    if (this.adaptationShaderVersion && this.preCompileInfo == null) {
      if (RendererDevice_1.default.IsWebGL1()) {
        vshdsrc = GLSLConverter_1.default.Es3VtxShaderToES2(vshdsrc);
        fshdSrc = GLSLConverter_1.default.Es3FragShaderToES2(fshdSrc);
      }
    } // 直接使用 preCompileInfo 中的 uniform / attribute 等等关键信息


    if (this.preCompileInfo != null) {}

    this.parseCode(vshdsrc, fshdSrc);
    let pattributes = ShaderData.s_codeParser.attributes;
    let i = 0;
    let len = pattributes.length;
    let attri = null;
    this.m_attriNSList = [];
    this.m_attriSizeList = [];
    this.m_layoutBit = 0x0;
    let locationsTotal = 0;
    let layoutTypes = this.m_layoutTypes = [];

    while (i < len) {
      attri = pattributes[i];

      if (attri != null) {
        this.m_attriNSList.push(attri.name);
        this.m_attriSizeList.push(attri.typeSize);
        locationsTotal += 1;
        let vbufType = VtxBufConst_1.default.GetVBufTypeByNS(attri.name);

        if (vbufType >= 3001 && vbufType <= 3010) {
          this.m_layoutBit |= 1 << vbufType - 3001; //BitConst.BIT_ONE_0;
        } else {
          locationsTotal -= 1;
          vbufType = 0;
        }
        /*
        switch (vbufType) {
            case VtxBufConst.VBUF_VS:
                //mid += mid * 131 + 1;
                this.m_layoutBit |= BitConst.BIT_ONE_0;
                break;
            case VtxBufConst.VBUF_UVS:
                //mid += mid * 131 + 2;
                this.m_layoutBit |= BitConst.BIT_ONE_1;
                break;
            case VtxBufConst.VBUF_NVS:
                //mid += mid * 131 + 3;
                this.m_layoutBit |= BitConst.BIT_ONE_2;
                break;
            case VtxBufConst.VBUF_CVS:
                //mid += mid * 131 + 4;
                this.m_layoutBit |= BitConst.BIT_ONE_3;
                break;
            case VtxBufConst.VBUF_TVS:
                //mid += mid * 131 + 5;
                this.m_layoutBit |= BitConst.BIT_ONE_4;
                break;
              case VtxBufConst.VBUF_VS2:
                //mid += mid * 131 + 6;
                this.m_layoutBit |= BitConst.BIT_ONE_5;
                break;
            case VtxBufConst.VBUF_UVS2:
                //mid += mid * 131 + 7;
                this.m_layoutBit |= BitConst.BIT_ONE_6;
                break;
            case VtxBufConst.VBUF_NVS2:
                //mid += mid * 131 + 8;
                this.m_layoutBit |= BitConst.BIT_ONE_7;
                break;
            case VtxBufConst.VBUF_CVS2:
                //mid += mid * 131 + 9;
                this.m_layoutBit |= BitConst.BIT_ONE_8;
                break;
            case VtxBufConst.VBUF_TVS2:
                //mid += mid * 131 + 11;
                this.m_layoutBit |= BitConst.BIT_ONE_9;
                break;
            default:
                locationsTotal -= 1;
                vbufType = 0;
                break;
        }
        //*/


        if (vbufType > 0) {
          layoutTypes.push(VtxBufConst_1.default.GetVBufAttributeTypeByVBufType(vbufType));
        }
      }

      ++i;
    }

    let mid = (locationsTotal << 11) + this.m_layoutBit;

    if (!ShaderData.s_midMap.has(mid)) {
      ShaderData.s_midMap.set(mid, ShaderData.s_mid);
      ShaderData.s_mid++;
    }

    this.m_mid = ShaderData.s_midMap.get(mid); // console.log("shader data, this.m_mid: ",this.m_mid, "locationsTotal: ",locationsTotal);

    this.m_texTotal = ShaderData.s_codeParser.texTotal;
    this.m_useTex = this.m_texTotal > 0;

    if (this.m_useTex) {
      this.m_texUniformNames = ShaderData.s_codeParser.texUniformNameListStr.split(",");
    }

    this.m_haveCommonUniform = this.m_texTotal < this.m_uniforms.length;
    this.m_vshdCode = vshdsrc;
    this.m_fshdCode = fshdSrc;
    this.m_shdUniqueName = unique_ns;
  }

  getAttriSizeList() {
    return this.m_attriSizeList;
  }

  getTexUniformNames() {
    return this.m_texUniformNames;
  }

  getUniforms() {
    return this.m_uniforms;
  }

  haveCommonUniform() {
    return this.m_haveCommonUniform;
  }

  getAttriNSList() {
    return this.m_attriNSList;
  }

  getUid() {
    return this.m_uid;
  }

  getTexTotal() {
    return this.m_texTotal;
  } // use texture true or false


  haveTexture() {
    return this.m_useTex;
  }

  getLocationsTotal() {
    return this.m_aLocationTypes.length;
  }

  getUniformTypeNameByNS(ns) {
    let uniform = this.m_uniformDict.get(ns);

    if (uniform != null) {
      return uniform.typeName;
    }

    return "";
  }

  getUniformTypeByNS(ns) {
    let uniform = this.m_uniformDict.get(ns);

    if (uniform != null) {
      return uniform.type;
    }

    return 0;
  }

  hasUniformByName(ns) {
    return this.m_uniformDict.has(ns);
  }

  getUniformLengthByNS(ns) {
    if (this.m_uniformDict.has(ns)) {
      this.m_uniformDict.get(ns).arrLength;
    }

    return 0;
  }

  getUniqueShaderName() {
    return this.m_shdUniqueName;
  }

  destroy() {
    this.m_texTotal = 0;
  }

}

ShaderData.s_uid = 0;
ShaderData.s_codeParser = new ShaderCodeParser_1.default();
ShaderData.s_midMap = new Map();
ShaderData.s_mid = 1;
exports.default = ShaderData;

/***/ }),

/***/ "af29":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RenderFilter_1 = __importDefault(__webpack_require__("722e"));

const RenderMaskBitfield_1 = __importDefault(__webpack_require__("8333"));

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const Color4_1 = __importDefault(__webpack_require__("3930"));

const FrameBufferType_1 = __importDefault(__webpack_require__("baae"));

const RendererState_1 = __importDefault(__webpack_require__("29ef"));

class FBOInstance {
  constructor(renderer, texStroe) {
    this.m_backBufferColor = new Color4_1.default();
    this.m_adapter = null;
    this.m_rproxy = null;
    this.m_rcontext = null;
    this.m_bgColor = new Color4_1.default();
    this.m_renderer = null;
    this.m_runFlag = true;
    this.m_fboIndex = -1;
    this.m_fboType = -1;
    this.m_initW = 128;
    this.m_initH = 128;
    this.m_enableDepth = true;
    this.m_enableStencil = false;
    this.m_multisampleLevel = 0;
    this.m_gMateiral = null;
    this.m_gRState = -1;
    this.m_gRColorMask = -1;
    this.m_rindexs = [];
    this.m_texs = [null, null, null, null, null, null, null, null];
    this.m_texStore = null;
    this.m_texsTot = 0;
    this.m_synFBOSizeWithViewport = true;
    this.m_fboSizeFactor = 1.0;
    this.m_clearDepth = 256.0;
    this.m_clearColorBoo = true;
    this.m_clearDepthBoo = true;
    this.m_clearStencilBoo = false;
    this.m_viewportLock = false;
    this.m_texUnlock = false;
    this.m_tmaterialUniformUpdate = false;
    /**
     * unique name string
     */

    this.uns = "FBOInstance";
    this.m_renderer = renderer;
    this.m_texStore = texStroe;
    this.m_rproxy = renderer.getRenderProxy();
    this.m_adapter = this.m_rproxy.getRenderAdapter();
    this.m_rcontext = renderer.getRendererContext();
  }
  /**
   * @returns 获取当前FBOInstance所持有的 FBO 对象的 unique id (也就是序号)
   */


  getFBOUid() {
    return this.m_fboIndex;
  }
  /**
   * 设置当前 FBO控制的渲染过程中所需要的 renderer process 序号(id)列表
   */


  setRProcessIDList(processIDlist) {
    if (processIDlist != null) {
      if (processIDlist.length < 1) {
        throw Error("processIDlist.length < 1, but it must: processIDlist.length >= 1");
      }

      this.m_rindexs = processIDlist.slice(0);
    }
  }
  /**
   * 设置当前 FBO控制的渲染过程中所需要的 renderer process 序号(id)列表
   */


  setRProcessList(list) {
    if (list.length < 1) {
      throw Error("list.length < 1, but must: list.length >= 1");
    }

    this.m_rindexs = new Array(list.length);

    for (let i = 0; i < list.length; ++i) {
      this.m_rindexs[i] = list[i].getRPIndex();
    }
  }

  getRProcessIDAt(i) {
    return this.m_rindexs[i];
  }

  getStage3D() {
    return this.m_rproxy.getStage3D();
  }

  getCamera() {
    if (this.m_rproxy != null) {
      return this.m_rproxy.getCamera();
    }

    return null;
  }

  lockViewport() {
    this.m_viewportLock = true;
  }

  unlockViewport() {
    this.m_viewportLock = false;
  }

  updateCamera() {
    if (this.m_rproxy != null) {
      this.m_rproxy.updateCamera();
    }
  }

  updateCameraDataFromCamera(cam) {
    if (this.m_rproxy != null) {
      this.m_rproxy.updateCameraDataFromCamera(cam);
    }
  } ////////////////////////////////////////////////////// render state conctrl


  useGlobalRenderState(state) {
    this.m_rcontext.useGlobalRenderState(state);
  }

  useGlobalRenderStateByName(stateNS) {
    this.m_rcontext.useGlobalRenderStateByName(stateNS);
  }

  setGlobalRenderState(state) {
    this.m_gRState = state;
  }

  setGlobalRenderStateByName(stateNS) {
    this.m_gRState = this.m_rcontext.getRenderStateByName(stateNS);
  }

  lockRenderState(state = -1) {
    if (this.m_gRState >= 0 || state >= 0) {
      this.m_rcontext.useGlobalRenderState(state < 0 ? this.m_gRState : state);
    } else {
      this.m_rproxy.lockRenderState();
    }
  }

  unlockRenderState() {
    this.m_rproxy.unlockRenderState();
  } ////////////////////////////////////////////////////// render color mask conctrl


  useGlobalRenderColorMask(colorMask) {
    this.m_rcontext.useGlobalRenderColorMask(colorMask);
  }

  useGlobalRenderColorMaskByName(colorMaskNS) {
    this.m_rcontext.useGlobalRenderColorMaskByName(colorMaskNS);
  }

  setGlobalRenderColorMask(colorMask) {
    this.m_gRColorMask = colorMask;
  }

  setGlobalRenderColorMaskByName(colorMaskNS) {
    this.m_gRColorMask = this.m_rcontext.getRenderColorMaskByName(colorMaskNS);
  }

  lockColorMask(colorMask = -1) {
    if (this.m_gRColorMask >= 0 || colorMask >= 0) {
      this.m_rcontext.useGlobalRenderColorMask(colorMask < 0 ? this.m_gRColorMask : colorMask);
    } else {
      this.m_rproxy.lockRenderColorMask();
    }
  }

  unlockRenderColorMask() {
    this.m_rcontext.useGlobalRenderColorMask(RendererState_1.default.COLOR_MASK_ALL_TRUE);
    this.m_rproxy.unlockRenderColorMask();
  } ////////////////////////////////////////////////////// material conctrl


  useGlobalMaterial(m, texUnlock = false, materialUniformUpdate = false) {
    this.m_texUnlock = texUnlock;
    this.m_tmaterialUniformUpdate = materialUniformUpdate;
    this.m_rcontext.useGlobalMaterial(m, this.m_texUnlock, materialUniformUpdate);
  }
  /**
   *
   * @param material MaterialBase 子类的实例
   * @param texUnlock 是否锁定并使用 material 自身所带的纹理数据
   */


  setGlobalMaterial(material, texUnlock = false, materialUniformUpdate = false) {
    this.m_texUnlock = texUnlock;
    this.m_tmaterialUniformUpdate = materialUniformUpdate;

    if (this.m_gMateiral != material) {
      if (this.m_gMateiral != null) {
        this.m_gMateiral.__$detachThis();
      }

      if (material != null) {
        material.__$attachThis();
      }

      this.m_gMateiral = material;
    }
  }

  lockMaterial() {
    if (this.m_gMateiral != null) {
      this.m_rcontext.useGlobalMaterial(this.m_gMateiral, this.m_texUnlock, this.m_tmaterialUniformUpdate);
    } else {
      this.m_rcontext.lockMaterial();
    }
  }

  unlockMaterial() {
    this.m_rcontext.unlockMaterial();
  }

  updateGlobalMaterialUniform() {
    this.m_rcontext.updateMaterialUniform(this.m_gMateiral);
  }

  clearDepth(clearDepth = 1.0) {
    this.m_adapter.clearFBODepthAt(this.m_fboIndex, clearDepth);
  }

  synFBOSizeWithViewport() {
    this.m_synFBOSizeWithViewport = true;
  }

  asynFBOSizeWithViewport() {
    this.m_synFBOSizeWithViewport = false;
  } // if synFBOSizeWithViewport is true, fbo size = factor * view port size;


  setFBOSizeFactorWithViewPort(factor) {
    this.m_fboSizeFactor = factor;
  }

  createViewportSizeFBOAt(fboIndex, enableDepth = false, enableStencil = false, multisampleLevel = 0) {
    if (this.m_fboIndex < 0) {
      this.m_fboIndex = fboIndex;
      this.m_fboType = FrameBufferType_1.default.FRAMEBUFFER;
      this.m_initW = this.m_adapter.getViewportWidth();
      this.m_initH = this.m_adapter.getViewportHeight();
      this.m_enableDepth = enableDepth;
      this.m_enableStencil = enableStencil;
      this.m_multisampleLevel = multisampleLevel;
      this.m_adapter.createFBOAt(fboIndex, this.m_fboType, this.m_initW, this.m_initH, enableDepth, enableStencil, multisampleLevel);
    }
  }

  createFBO(enableDepth, enableStencil, multisampleLevel = 0) {
    this.m_enableDepth = enableDepth;
    this.m_enableStencil = enableStencil;
    this.m_multisampleLevel = multisampleLevel;
    this.m_adapter.createFBOAt(this.m_fboIndex, this.m_fboType, this.m_initW, this.m_initH, enableDepth, enableStencil, multisampleLevel);
  }
  /**
   * 创建一个指定序号的 FBO(FrameBufferObject) 渲染运行时管理对象,
   * renderer中一个序号只会对应一个唯一的 FBO 对象实例
   * @param fboIndex FBO 对象的序号
   * @param enableDepth FBO 对象的depth读写是否开启
   * @param enableStencil FBO 对象的stencil读写是否开启
   * @param multisampleLevel FBO 对象的multisample level
   */


  createAutoSizeFBOAt(fboIndex, enableDepth = false, enableStencil = false, multisampleLevel = 0) {
    if (fboIndex >= 0 && this.m_fboIndex < 0) {
      this.m_fboType = FrameBufferType_1.default.FRAMEBUFFER;
      this.m_initW = 512;
      this.m_initH = 512;
      this.m_fboIndex = fboIndex;
      this.createFBO(enableDepth, enableStencil, multisampleLevel);
    }
  }
  /**
   * 创建一个指定序号的 FBO(FrameBufferObject) 渲染运行时管理对象,
   * renderer中一个序号只会对应一个唯一的 FBO 对象实例
   * @param fboIndex FBO 对象的序号
   * @param width FBO 对象的viewport width, if width < 1, viewport width is stage width;
   * @param height FBO 对象的viewport height, if height < 1, viewport width is stage height;
   * @param enableDepth FBO 对象的depth读写是否开启
   * @param enableStencil FBO 对象的stencil读写是否开启
   * @param multisampleLevel FBO 对象的multisample level
   */


  createFBOAt(fboIndex, width, height, enableDepth = false, enableStencil = false, multisampleLevel = 0) {
    if (fboIndex >= 0 && this.m_fboIndex < 0) {
      this.m_fboType = FrameBufferType_1.default.FRAMEBUFFER;
      this.m_initW = width;
      this.m_initH = height;
      this.m_fboIndex = fboIndex;
      if (this.m_initW < 1) this.m_initW = this.m_adapter.getRCanvasWidth();
      if (this.m_initH < 1) this.m_initH = this.m_adapter.getRCanvasHeight();
      this.createFBO(enableDepth, enableStencil, multisampleLevel);
    }
  }
  /**
   * 创建一个指定序号的 read FBO(FrameBufferObject) 渲染运行时管理对象,
   * renderer中一个序号只会对应一个唯一的 FBO 对象实例
   * @param fboIndex FBO 对象的序号
   * @param width FBO 对象的viewport width, if width < 1, viewport width is stage width;
   * @param height FBO 对象的viewport height, if height < 1, viewport width is stage height;
   * @param enableDepth FBO 对象的depth读写是否开启
   * @param enableStencil FBO 对象的stencil读写是否开启
   * @param multisampleLevel FBO 对象的multisample level
   */


  createReadFBOAt(fboIndex, width, height, enableDepth = false, enableStencil = false, multisampleLevel = 0) {
    if (fboIndex >= 0 && this.m_fboIndex < 0) {
      this.m_fboType = FrameBufferType_1.default.READ_FRAMEBUFFER;
      this.m_initW = width;
      this.m_initH = height;
      this.m_fboIndex = fboIndex;
      if (this.m_initW < 1) this.m_initW = this.m_adapter.getRCanvasWidth();
      if (this.m_initH < 1) this.m_initH = this.m_adapter.getRCanvasHeight();
      this.createFBO(enableDepth, enableStencil, multisampleLevel);
    }
  }
  /**
   * 创建一个指定序号的 draw FBO(FrameBufferObject) 渲染运行时管理对象,
   * renderer中一个序号只会对应一个唯一的 FBO 对象实例
   * @param fboIndex FBO 对象的序号
   * @param width FBO 对象的viewport width, if width < 1, viewport width is stage width;
   * @param height FBO 对象的viewport height, if height < 1, viewport width is stage height;
   * @param enableDepth FBO 对象的depth读写是否开启
   * @param enableStencil FBO 对象的stencil读写是否开启
   * @param multisampleLevel FBO 对象的multisample level
   */


  createDrawFBOAt(fboIndex, width, height, enableDepth = false, enableStencil = false, multisampleLevel = 0) {
    if (fboIndex >= 0 && this.m_fboIndex < 0) {
      this.m_fboType = FrameBufferType_1.default.DRAW_FRAMEBUFFER;
      this.m_initW = width;
      this.m_initH = height;
      this.m_fboIndex = fboIndex;
      if (this.m_initW < 1) this.m_initW = this.m_adapter.getRCanvasWidth();
      if (this.m_initH < 1) this.m_initH = this.m_adapter.getRCanvasHeight();
      this.createFBO(enableDepth, enableStencil, multisampleLevel);
    }
  }

  resizeFBO(fboBufferWidth, fboBufferHeight) {
    if (this.m_initW != fboBufferWidth || this.m_initH != fboBufferHeight) {
      this.m_initW = fboBufferWidth;
      this.m_initH = fboBufferHeight;
      this.m_adapter.resizeFBOAt(this.m_fboIndex, fboBufferWidth, fboBufferHeight);
    }
  }
  /**
   * @returns get framebuffer output attachment texture by attachment index
   */


  getRTTAt(i) {
    return this.m_texs[i];
  }

  enableMipmapRTTAt(i) {
    this.m_texs[i].enableMipmap();
  }

  generateMipmapTextureAt(i) {
    this.m_texs[i].generateMipmap(this.m_rproxy.Texture);
  }
  /**
   * 设置渲染到纹理的目标纹理对象(可由用自行创建)和framebuffer output attachment index
   * @param rttTexProxy 作为渲染到目标的目标纹理对象
   * @param outputIndex framebuffer output attachment index
   */


  setRenderToTexture(texture, outputIndex = 0) {
    if (outputIndex == 0) {
      this.m_texsTot = 1;
    } else if (this.m_texsTot < outputIndex + 1) {
      this.m_texsTot = outputIndex + 1;
    }

    this.m_texs[outputIndex] = texture;
    return texture;
  }
  /**
   * 设置渲染到纹理的目标纹理对象(普通 RTT 纹理类型的目标纹理)和framebuffer output attachment index
   * @param systemRTTTexIndex 作为渲染到目标的目标纹理对象在系统普通rtt 纹理中的序号(0 -> 15)
   * @param outputIndex framebuffer output attachment index
   */


  setRenderToRTTTextureAt(systemRTTTexIndex, outputIndex = 0) {
    this.setRenderToTexture(this.m_texStore.getRTTTextureAt(systemRTTTexIndex), outputIndex);
  }
  /**
   * 设置渲染到纹理的目标纹理对象(Float RTT 纹理类型的目标纹理)和framebuffer output attachment index
   * @param systemFloatRTTTexIndex 作为渲染到目标的目标纹理对象在系统float rtt 纹理中的序号(0 -> 15)
   * @param outputIndex framebuffer output attachment index
   */


  setRenderToFloatTextureAt(systemFloatRTTTexIndex, outputIndex = 0) {
    this.setRenderToTexture(this.m_texStore.getRTTFloatTextureAt(systemFloatRTTTexIndex), outputIndex);
  }
  /**
   * 设置渲染到纹理的目标纹理对象(half Float RTT 纹理类型的目标纹理)和framebuffer output attachment index
   * @param systemFloatRTTTexIndex 作为渲染到目标的目标纹理对象在系统float rtt 纹理中的序号(0 -> 15)
   * @param outputIndex framebuffer output attachment index
   */


  setRenderToHalfFloatTexture(texture, outputIndex = 0) {
    if (texture == null) {
      texture = this.m_texStore.createRTTTex2D(128, 128, false);

      texture.__$setRenderProxy(this.m_rproxy);

      texture.internalFormat = TextureFormat_1.default.RGBA16F;
      texture.srcFormat = TextureFormat_1.default.RGBA;
      texture.dataType = TextureDataType_1.default.FLOAT;
      texture.minFilter = TextureConst_1.default.LINEAR;
      texture.magFilter = TextureConst_1.default.LINEAR;

      texture.__$setRenderProxy(this.m_rproxy);
    }

    return this.setRenderToTexture(texture, outputIndex);
  }
  /**
   * 设置渲染到纹理的目标纹理对象(RGBA RTT 纹理类型的目标纹理)和framebuffer output attachment index
   * @param systemFloatRTTTexIndex 作为渲染到目标的目标纹理对象在系统float rtt 纹理中的序号(0 -> 15)
   * @param outputIndex framebuffer output attachment index
   */


  setRenderToRGBATexture(texture, outputIndex = 0) {
    if (texture == null) texture = this.createRGBATexture();
    return this.setRenderToTexture(texture, outputIndex);
  }
  /**
   * 设置渲染到纹理的目标纹理对象(depth RTT 纹理类型的目标纹理)和framebuffer output attachment index
   * @param systemDepthRTTTexIndex 作为渲染到目标的目标纹理对象在系统depth rtt 纹理中的序号(0 -> 15)
   * @param outputIndex framebuffer output attachment index
   */


  setRenderToDepthTextureAt(systemDepthRTTTexIndex, outputIndex = 0) {
    return this.setRenderToTexture(this.m_texStore.getDepthTextureAt(systemDepthRTTTexIndex), outputIndex);
  }

  createRGBATexture() {
    let texture = this.m_texStore.createRTTTex2D(32, 32, false);
    texture.internalFormat = TextureFormat_1.default.RGBA;
    texture.srcFormat = TextureFormat_1.default.RGBA;
    texture.dataType = TextureDataType_1.default.UNSIGNED_BYTE;
    texture.minFilter = TextureConst_1.default.LINEAR;
    texture.magFilter = TextureConst_1.default.LINEAR;

    texture.__$setRenderProxy(this.m_rproxy);

    return texture;
  }

  setClearState(clearColorBoo = true, clearDepthBoo = true, clearStencilBoo = false) {
    this.m_clearColorBoo = clearColorBoo;
    this.m_clearDepthBoo = clearDepthBoo;
    this.m_clearStencilBoo = clearStencilBoo;
  }

  setRenderToBackBuffer() {
    this.m_rproxy.setClearColor(this.m_backBufferColor);
    this.m_rcontext.setRenderToBackBuffer();
  }

  setClearDepth(depth) {
    this.m_clearDepth = depth;
  }

  getClearDepth() {
    return this.m_adapter.getClearDepth();
  }

  getViewportX() {
    return this.m_adapter.getViewportX();
  }

  getViewportY() {
    return this.m_adapter.getViewportY();
  }

  getViewportWidth() {
    return this.m_adapter.getViewportWidth();
  }

  getViewportHeight() {
    return this.m_adapter.getViewportHeight();
  }

  getFBOWidth() {
    return this.m_adapter.getFBOWidthAt(this.m_fboIndex);
  }

  getFBOHeight() {
    return this.m_adapter.getFBOHeightAt(this.m_fboIndex);
  }

  resetAttachmentMask(boo) {
    this.m_adapter.resetFBOAttachmentMask(boo);
  }

  setAttachmentMaskAt(index, boo) {
    this.m_adapter.setFBOAttachmentMaskAt(index, boo);
  }

  setClearRGBColor3f(pr, pg, pb) {
    this.m_bgColor.setRGB3f(pr, pg, pb);
  }

  setClearColorEnabled(boo) {
    this.m_clearColorBoo = boo;
  }

  setClearDepthEnabled(boo) {
    this.m_clearDepthBoo = boo;
  }

  setClearStencilEnabled(boo) {
    this.m_clearStencilBoo = boo;
  }

  setClearUint24Color(colorUint24, alpha = 1.0) {
    this.m_bgColor.setRGBUint24(colorUint24);
    this.m_bgColor.a = alpha;
  }

  setClearRGBAColor4f(pr, pg, pb, pa) {
    this.m_bgColor.setRGBA4f(pr, pb, pg, pa);
  }
  /**
   * @param			clearType, it is IRenderProxy.COLOR or IRenderProxy.DEPTH or IRenderProxy.STENCIL or IRenderProxy.DEPTH_STENCIL
   */


  blitFrom(fboIns, mask_bitfiled = RenderMaskBitfield_1.default.COLOR_BUFFER_BIT, filter = RenderFilter_1.default.NEAREST, clearType = -1, clearIndex = 0, dataArr = null) {
    if (this.m_fboIndex >= 0) {
      this.m_adapter.setBlitFboSrcRect(0, 0, fboIns.getFBOWidth(), fboIns.getFBOHeight());
      this.m_adapter.setBlitFboSrcRect(0, 0, this.getFBOWidth(), this.getFBOHeight());
      this.m_adapter.blitFBO(fboIns.getFBOUid(), this.m_fboIndex, mask_bitfiled, filter, clearType, clearIndex, dataArr);
    }
  }

  blitColorFrom(fboIns, filter = RenderFilter_1.default.NEAREST, clearType = -1, clearIndex = 0, dataArr = null) {
    if (this.m_fboIndex >= 0) {
      this.m_adapter.setBlitFboSrcRect(0, 0, fboIns.getFBOWidth(), fboIns.getFBOHeight());
      this.m_adapter.setBlitFboSrcRect(0, 0, this.getFBOWidth(), this.getFBOHeight());
      this.m_adapter.blitFBO(fboIns.getFBOUid(), this.m_fboIndex, RenderMaskBitfield_1.default.COLOR_BUFFER_BIT, filter, clearType, clearIndex, dataArr);
    }
  }

  blitDepthFrom(fboIns, filter = RenderFilter_1.default.NEAREST, clearType = -1, clearIndex = 0, dataArr = null) {
    if (this.m_fboIndex >= 0) {
      this.m_adapter.setBlitFboSrcRect(0, 0, fboIns.getFBOWidth(), fboIns.getFBOHeight());
      this.m_adapter.setBlitFboSrcRect(0, 0, this.getFBOWidth(), this.getFBOHeight());
      this.m_adapter.blitFBO(fboIns.getFBOUid(), this.m_fboIndex, RenderMaskBitfield_1.default.COLOR_BUFFER_BIT | RenderMaskBitfield_1.default.DEPTH_BUFFER_BIT, filter, clearType, clearIndex, dataArr);
    }
  }

  blitColorAndDepthFrom(fboIns, filter = RenderFilter_1.default.NEAREST, clearType = -1, clearIndex = 0, dataArr = null) {
    if (this.m_fboIndex >= 0) {
      this.m_adapter.setBlitFboSrcRect(0, 0, fboIns.getFBOWidth(), fboIns.getFBOHeight());
      this.m_adapter.setBlitFboSrcRect(0, 0, this.getFBOWidth(), this.getFBOHeight());
      this.m_adapter.blitFBO(fboIns.getFBOUid(), this.m_fboIndex, RenderMaskBitfield_1.default.COLOR_BUFFER_BIT | RenderMaskBitfield_1.default.DEPTH_BUFFER_BIT, filter, clearType, clearIndex, dataArr);
    }
  }

  blitStencilFrom(fboIns, filter = RenderFilter_1.default.NEAREST, clearType = -1, clearIndex = 0, dataArr = null) {
    if (this.m_fboIndex >= 0) {
      this.m_adapter.setBlitFboSrcRect(0, 0, fboIns.getFBOWidth(), fboIns.getFBOHeight());
      this.m_adapter.setBlitFboSrcRect(0, 0, this.getFBOWidth(), this.getFBOHeight());
      this.m_adapter.blitFBO(fboIns.getFBOUid(), this.m_fboIndex, RenderMaskBitfield_1.default.STENCIL_BUFFER_BIT, filter, clearType, clearIndex, dataArr);
    }
  }

  renderToTextureAt(i, attachmentIndex = 0) {
    this.m_adapter.setRenderToTexture(this.m_texs[i], this.m_enableDepth, this.m_enableStencil, attachmentIndex);
    this.m_adapter.useFBO(this.m_clearColorBoo, this.m_clearDepthBoo, this.m_clearStencilBoo);
  }

  runBeginDo() {
    if (this.m_runFlag) {
      this.m_runFlag = false;
      this.m_rproxy.rshader.resetRenderState();
      this.m_rproxy.getClearRGBAColor4f(this.m_backBufferColor);

      if (this.m_viewportLock) {
        this.m_adapter.lockViewport();
      } else {
        this.m_adapter.unlockViewport();
      }

      this.m_adapter.bindFBOAt(this.m_fboIndex, this.m_fboType);

      if (this.m_synFBOSizeWithViewport) {
        this.m_adapter.synFBOSizeWithViewport();
        this.m_adapter.setFBOSizeFactorWithViewPort(this.m_fboSizeFactor);
      } else {
        this.m_adapter.asynFBOSizeWithViewport();
      }

      if (this.m_clearDepth < 128.0) {
        this.m_adapter.setClearDepth(this.m_clearDepth);
      }

      this.m_rproxy.setClearColor(this.m_bgColor);
      let i = 0;

      for (; i < this.m_texsTot; ++i) {
        this.m_adapter.setRenderToTexture(this.m_texs[i], this.m_enableDepth, this.m_enableStencil, i);
      }

      this.m_adapter.useFBO(this.m_clearColorBoo, this.m_clearDepthBoo, this.m_clearStencilBoo);

      if (this.m_gMateiral != null) {
        this.m_rcontext.useGlobalMaterial(this.m_gMateiral, this.m_texUnlock, this.m_tmaterialUniformUpdate);
      } else {
        this.m_rcontext.unlockMaterial();
      }
    }
  }

  run(lockRenderState = false, lockMaterial = false, autoEnd = true, autoRunBegin = true) {
    if (lockRenderState) this.lockRenderState();
    if (lockMaterial && !autoRunBegin) this.lockMaterial();

    if (this.m_fboIndex >= 0) {
      if (autoRunBegin) this.runBeginDo();

      if (this.m_rindexs != null) {
        // rendering running
        for (let i = 0, len = this.m_rindexs.length; i < len; ++i) {
          this.m_renderer.runAt(this.m_rindexs[i]);
        }
      }
    } // this.m_runFlag = true;


    if (lockRenderState) this.unlockRenderState();

    if (lockMaterial) {
      this.unlockMaterial();
    }

    if (autoEnd) {
      this.runEnd();
    }
  }

  runAt(index, autoRunBegin = true) {
    if (this.m_fboIndex >= 0 && this.m_rindexs != null) {
      if (index == 0 && autoRunBegin) {
        this.runBeginDo();
      } else {
        this.m_runFlag = true;
      }

      this.m_renderer.runAt(this.m_rindexs[index]);
    }
  }
  /**
   * 单独绘制可渲染对象, 可能是使用了 global material也可能没有。这种方式比较耗性能,只能用在特殊的地方。
   * @param entity 需要指定绘制的 IRenderEntity 实例
   * @param useGlobalUniform 是否使用当前 global material 所携带的 uniform, default value: false
   * @param forceUpdateUniform 是否强制更新当前 global material 所对应的 shader program 的 uniform, default value: true
   */


  drawEntity(entity, useGlobalUniform = false, forceUpdateUniform = true) {
    if (!this.m_runFlag) {
      this.m_renderer.drawEntity(entity, useGlobalUniform, forceUpdateUniform);
    }
  }

  runBegin() {
    if (this.m_fboIndex >= 0 && this.m_rindexs != null) {
      this.m_runFlag = true;
      this.runBeginDo();
    }
  }

  runEnd() {
    this.m_rproxy.setClearColor(this.m_backBufferColor);
    this.m_runFlag = true;

    if (this.m_viewportLock) {
      this.m_adapter.unlockViewport();
    }
  }

  useCamera(camera, syncCamView = false) {
    this.m_renderer.useCamera(camera, syncCamView);
  }

  useMainCamera() {
    this.m_renderer.useMainCamera();
  }

  reset() {
    this.setGlobalMaterial(null);
    let i = 0;

    for (; i < this.m_texsTot; ++i) {
      this.m_texs[i] = null;
    }

    this.m_runFlag = false;
    this.m_fboIndex = -1;
    this.m_texsTot = 0;
    this.m_rindexs = [];
  }

  clone() {
    let ins = new FBOInstance(this.m_renderer, this.m_texStore);
    ins.m_fboSizeFactor = this.m_fboSizeFactor;
    ins.m_bgColor.copyFrom(this.m_bgColor);
    ins.m_fboIndex = this.m_fboIndex;
    ins.m_fboType = this.m_fboType;
    ins.m_clearDepth = this.m_clearDepth;
    ins.m_texsTot = this.m_texsTot;
    ins.m_enableDepth = this.m_enableDepth;
    ins.m_enableStencil = this.m_enableStencil;
    ins.m_synFBOSizeWithViewport = this.m_synFBOSizeWithViewport;
    ins.m_initW = this.m_initW;
    ins.m_initH = this.m_initH;
    ins.m_multisampleLevel = this.m_multisampleLevel;
    let i = 0;

    for (; i < this.m_texsTot; ++i) {
      ins.m_texs[i] = ins.m_texs[i];
    }

    if (this.m_rindexs != null) {
      let len = this.m_rindexs.length;
      let list = new Array(len);

      for (i = 0; i < len; ++i) {
        list[i] = this.m_rindexs[i];
      }

      ins.setRProcessIDList(list);
    }

    return ins;
  }

}

exports.default = FBOInstance;

/***/ }),

/***/ "af68":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RSEntityFlag_1 = __importDefault(__webpack_require__("11e6"));

const Entity3DNode_1 = __importDefault(__webpack_require__("7b0e"));

class EntityNodeQueue {
  constructor() {
    this.m_listLen = 0;
    this.m_ids = [];
    this.m_list = [];
    this.m_entieies = [];
    this.m_fs = []; // free id list

    this.m_fids = [];
  }

  getFreeId() {
    if (this.m_fids.length > 0) {
      return this.m_fids.pop();
    }

    return -1;
  }

  createNode() {
    let node;
    let index = this.getFreeId();

    if (index >= 0) {
      this.m_fs[index] = 1;
      node = this.m_list[index];
      node.spaceId = index;
      return node;
    } else {
      // create a new nodeIndex
      index = this.m_listLen;
      node = Entity3DNode_1.default.Create();
      this.m_list.push(node);
      this.m_entieies.push(null);
      node.spaceId = index; //node.distanceFlag = false;

      this.m_fs.push(1);
      this.m_ids.push(index);
      this.m_fs.push(1);
      this.m_listLen++;
      return node;
    }
  }

  restoreId(id) {
    if (id > 0 && this.m_fs[id] == 1) {
      this.m_fids.push(id);
      this.m_fs[id] = 0;
      this.m_entieies[id] = null;
    }
  } // 可以添加真正被渲染的实体也可以添加只是为了做检测的实体(不允许有material)


  addEntity(entity) {
    let node = this.createNode();
    this.m_entieies[node.spaceId] = entity;
    node.entity = entity;
    entity.__$rseFlag = RSEntityFlag_1.default.AddSpaceUid(entity.__$rseFlag, node.spaceId);
    return node;
  }

  initialize(total) {
    if (total > 0) {
      for (let i = 0; i < total; i++) {
        let node = this.createNode();
        this.m_entieies[node.spaceId] = null;
      }
    }
  }

  getNodeByEntity(entity) {
    if (RSEntityFlag_1.default.TestSpaceContains(entity.__$rseFlag)) {
      let uid = RSEntityFlag_1.default.GetSpaceUid(entity.__$rseFlag);

      if (this.m_entieies[uid] == entity) {
        return this.m_list[uid];
      }
    }

    return null;
  }

  removeEntity(entity) {
    if (RSEntityFlag_1.default.TestSpaceContains(entity.__$rseFlag)) {
      let uid = RSEntityFlag_1.default.GetSpaceUid(entity.__$rseFlag);

      if (this.m_entieies[uid] == entity) {
        this.m_list[uid].reset();
        this.restoreId(uid);
        entity.__$rseFlag = RSEntityFlag_1.default.RemoveSpaceUid(entity.__$rseFlag);
      }
    }
  }

}

exports.default = EntityNodeQueue;

/***/ }),

/***/ "b3bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ShaderUniformData {
  constructor() {
    this.uns = "";
    this.types = null;
    this.uniformSize = 0;
    this.uniformNameList = null;
    this.locations = null;
    this.dataList = null;
    this.calcModels = null;
    this.always = true;
    this.next = null;
  } // for fast data's operation


  getDataRefFromUniformName(ns) {
    if (this.uniformNameList != null) {
      let list = this.uniformNameList;
      let len = list.length;

      for (let i = 0; i < len; ++i) {
        if (ns == list[i]) {
          return this.dataList[i];
        }
      }
    }

    return null;
  } // for fast data's operation


  setDataRefFromUniformName(ns, dataRef) {
    if (this.uniformNameList != null) {
      let list = this.uniformNameList;
      let len = list.length;

      for (let i = 0; i < len; ++i) {
        if (ns == list[i]) {
          this.dataList[i] = dataRef;
          break;
        }
      }
    }
  } //


  copyDataFromProbe(probe) {
    this.types = [];

    for (let i = 0; i < probe.uniformsTotal; ++i) {
      this.types.push(probe.uniformTypes[i]);
    }

    this.uniformSize = probe.uniformsTotal;
  }

  destroy() {
    let i = 0;
    let len = this.dataList.length;

    for (; i < len; ++i) {
      this.dataList[i] = null;
    }

    if (this.calcModels != null) {
      len = this.calcModels.length;

      for (i = 0; i < len; ++i) {
        this.calcModels[i].destroy();
        this.calcModels[i] = null;
      }
    }

    this.dataList = null;
    this.types = null;
    this.locations = null;
    this.calcModels = null;
  }

}

exports.default = ShaderUniformData;

/***/ }),

/***/ "b4ea":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ImageTextureLoader_1 = __importDefault(__webpack_require__("f63b"));

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const ShaderCodeUUID_1 = __webpack_require__("f3a2");

exports.ShaderCodeUUID = ShaderCodeUUID_1.ShaderCodeUUID;

const ShaderLib_1 = __webpack_require__("c052");

exports.ShaderCodeConfigure = ShaderLib_1.ShaderCodeConfigure;
exports.ShaderCodeType = ShaderLib_1.ShaderCodeType;
exports.IShaderLibConfigure = ShaderLib_1.IShaderLibConfigure;
exports.IShaderLibListener = ShaderLib_1.IShaderLibListener;

const MaterialContextParam_1 = __webpack_require__("4301");

exports.MaterialContextParam = MaterialContextParam_1.MaterialContextParam;
/**
 * 实现 material 构造 pipeline 的上下文
 */

class MaterialContext {
  constructor() {
    this.m_initFlag = true;
    this.m_texLoader = null;
    this.m_rscene = null;
    /**
     * 全局的灯光模块
     */

    this.lightModule = null;
    /**
     * 全局的环境参数
     */

    this.envLightModule = null;
    /**
     * vsm 阴影
     */

    this.vsmModule = null;
    /**
     * material 构造material流水线, 这是一个默认的material pipeline
     */

    this.pipeline = null;
  }

  addShaderLibListener(listener) {
    if (MaterialContext.ShaderLib != null) {
      MaterialContext.ShaderLib.setListener(listener);
    }
  }

  getTextureLoader() {
    return this.m_texLoader;
  }

  isTextureLoadedAll() {
    return this.m_texLoader.isLoadedAll();
  }

  getTextureByUrl(purl, wrapRepeat = true, mipmapEnabled = true) {
    let tex = null;
    let suffix = purl.slice(purl.lastIndexOf(".") + 1);
    suffix = suffix.toLocaleLowerCase();

    switch (suffix) {
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
        tex = this.m_texLoader.getImageTexByUrl(purl);
        tex.mipmapEnabled = mipmapEnabled;
        if (wrapRepeat) tex.setWrap(TextureConst_1.default.WRAP_REPEAT);
        break;

      default:
        console.warn("texture resource data type is undefined.");
        break;
    }

    return tex;
  }

  createShaderLibConfig() {
    return {
      shaderCodeConfigures: [],
      version: ""
    };
  }

  buildConfigure(param, shaderLibConfigure) {
    if (shaderLibConfigure == null) {
      let libConfig = this.createShaderLibConfig();

      if (param == null) {
        param = new MaterialContextParam_1.MaterialContextParam();
      } // param.loadAllShaderCode = true;


      if (param.loadAllShaderCode) {
        let configure = MaterialContext.ShaderLib.createShaderCodeConfigure(param);

        if (configure != null) {
          libConfig.shaderCodeConfigures.push(configure);
        }
      }

      shaderLibConfigure = libConfig;
    }

    return shaderLibConfigure;
  }

  initialize(rscene, param = null, shaderLibConfigure = null) {
    if (this.m_initFlag) {
      shaderLibConfigure = this.buildConfigure(param, shaderLibConfigure);
      this.m_initFlag = false;
      this.m_rscene = rscene;
      this.m_texLoader = new ImageTextureLoader_1.default(this.m_rscene.textureBlock);
      let selfT = this;

      if (param == null) {
        param = new MaterialContextParam_1.MaterialContextParam();
      }

      this.m_param = param;
      if (param.shaderLibVersion != "") shaderLibConfigure.version = param.shaderLibVersion;
      MaterialContext.ShaderLib.initialize(shaderLibConfigure, param.shaderCodeBinary);

      if (param.loadAllShaderCode) {
        MaterialContext.ShaderLib.addAllShaderCodeObject();
      }

      this.initPipes(this.m_param);
      selfT.pipeline = this.createPipeline();
      this.initEnd(param);

      if (!param.loadAllShaderCode) {
        let listener = MaterialContext.ShaderLib.getListener();

        if (listener != null) {
          listener.shaderLibLoadComplete(0, 0);
        }
      }
    }
  }

  initPipes(param) {}

  initEnd(param) {}

  hasShaderCodeObjectWithUUID(uuid) {
    return MaterialContext.ShaderLib.hasShaderCodeObjectWithUUID(uuid);
  }

  addShaderCodeObject(uuid, shaderCodeObject) {
    MaterialContext.ShaderLib.addShaderCodeObject(uuid, shaderCodeObject);
  }

  addPipeline(pipeline) {
    if (pipeline != null && pipeline != this.pipeline) {
      if (this.lightModule != null) pipeline.addPipe(this.lightModule);
      if (this.envLightModule != null) pipeline.addPipe(this.envLightModule);
      if (this.vsmModule != null) pipeline.addPipe(this.vsmModule);
    }
  }

  createPipeline() {
    let pipeline = this.m_rscene.materialBlock.createMaterialPipeline(MaterialContext.ShaderLib);
    if (this.lightModule != null) pipeline.addPipe(this.lightModule);
    if (this.envLightModule != null) pipeline.addPipe(this.envLightModule);
    if (this.vsmModule != null) pipeline.addPipe(this.vsmModule);
    return pipeline;
  }

  run() {
    if (this.vsmModule != null && this.m_param.vsmEnabled) {
      this.vsmModule.run();
    }
  }

  destroy() {
    this.m_rscene = null;
  }

}
/**
 * shader code management module
 */


MaterialContext.ShaderLib = new ShaderLib_1.ShaderLib();
exports.MaterialContext = MaterialContext;

/***/ }),

/***/ "baae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class FrameBufferType {}

FrameBufferType.FRAMEBUFFER = 71;
FrameBufferType.DRAW_FRAMEBUFFER = 72;
FrameBufferType.READ_FRAMEBUFFER = 73;
exports.default = FrameBufferType;

/***/ }),

/***/ "bbf4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class RendererConst {}

RendererConst.CAMERA_VISIBLE_ENABLE = 0;
RendererConst.CAMERA_VISIBLE_DISABLE = 1;
exports.default = RendererConst;

/***/ }),

/***/ "c052":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const ShaderCodeUUID_1 = __webpack_require__("f3a2");

const ShaderCodeObject_1 = __webpack_require__("cc55");

const ShaderCodeType_1 = __webpack_require__("69ed");

exports.ShaderCodeType = ShaderCodeType_1.ShaderCodeType;

const ShaderCodeConfigure_1 = __webpack_require__("28a9");

exports.ShaderCodeConfigure = ShaderCodeConfigure_1.ShaderCodeConfigure;

const IShaderLibConfigure_1 = __webpack_require__("a221");

exports.IShaderLibConfigure = IShaderLibConfigure_1.IShaderLibConfigure;

const FileIO_1 = __webpack_require__("ca2f");

const IShaderLibListener_1 = __webpack_require__("12e2");

exports.IShaderLibListener = IShaderLibListener_1.IShaderLibListener;

class ShaderCodeConfigureLib {
  constructor() {
    this.m_map = new Map();
    this.m_uuidList = [];
  }

  addConfigureWithUUID(uuid, configure) {
    if (uuid != "" && !this.m_map.has(uuid)) {
      this.m_map.set(uuid, configure);
      this.m_uuidList.push(uuid);
    }
  }

  getConfigureWithUUID(uuid) {
    return this.m_map.get(uuid);
  }

  getUUIDList() {
    return this.m_uuidList;
  }

  getUUIDListLength() {
    return this.m_uuidList.length;
  }

}

class ShaderCodeObjectLoader {
  constructor(configure) {
    this.m_loadingTotal = 0;
    this.m_shaderCodeObject = new ShaderCodeObject_1.ShaderCodeObject();
    this.m_configure = null;
    this.version = "";
    this.m_configure = configure;
  }

  decodeUint8Arr(u8array) {
    return new TextDecoder("utf-8").decode(u8array);
  }

  encodeUint8Arr(code) {
    return new TextEncoder().encode(code);
  }

  loadedShdCode(code, type, loadedCallback) {
    this.m_loadingTotal++;

    if (this.m_configure.buildBinaryFile && !this.m_configure.binary) {
      let u8arr = this.encodeUint8Arr(code);

      for (let i = 0; i < u8arr.length; ++i) {
        u8arr[i] = 222 - u8arr[i];
      }

      ShaderCodeObjectLoader.s_fileIO.downloadBinFile(u8arr, type + "", "bin");
    }

    switch (type) {
      case ShaderCodeType_1.ShaderCodeType.VertHead:
        this.m_shaderCodeObject.vert_head = code;
        break;

      case ShaderCodeType_1.ShaderCodeType.VertBody:
        this.m_shaderCodeObject.vert_body = code;
        break;

      case ShaderCodeType_1.ShaderCodeType.FragHead:
        this.m_shaderCodeObject.frag_head = code;
        break;

      case ShaderCodeType_1.ShaderCodeType.FragBody:
        this.m_shaderCodeObject.frag_body = code;
        break;

      default:
        console.error("loaded error shader code data.");
        break;
    }

    if (this.m_loadingTotal == this.m_configure.types.length) {
      loadedCallback(this.m_configure.uuid, this.m_shaderCodeObject);
      this.m_shaderCodeObject = null;
      this.m_configure = null;
    }
  }

  async loadBinCode(url, type, loadedCallback) {
    const reader = new FileReader();

    reader.onload = e => {
      //target.loaded(<ArrayBuffer>reader.result, this.uuid);
      let u8arr = new Uint8Array(reader.result);

      for (let i = 0; i < u8arr.length; ++i) {
        u8arr[i] = 222 - u8arr[i];
      }

      this.loadedShdCode(this.decodeUint8Arr(u8arr), type, loadedCallback);
    };

    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "blob";

    request.onload = e => {
      if (request.status <= 206) {
        reader.readAsArrayBuffer(request.response);
      } else {
        console.error("loading binary shader code url error: ", url);
      }
    };

    request.onerror = e => {
      console.error("loading binary shader code url error: ", url);
    };

    request.send();
  }

  loadTextCode(url, type, loadedCallback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = () => {
      if (request.status <= 206) {
        this.loadedShdCode(request.responseText, type, loadedCallback);
      } else {
        console.error("loading shader code url error: ", url);
      }
    };

    request.onerror = e => {
      console.error("loading shader code url error: ", url);
    };

    request.send();
  }

  loadCode(url, type, loadedCallback) {
    if (this.m_configure.binary) {
      this.loadBinCode(url, type, loadedCallback);
    } else {
      this.loadTextCode(url, type, loadedCallback);
    }
  }

  load(loadedCallback) {
    this.m_loadingTotal = 0;

    if (this.m_configure.urls == null) {
      let version = this.version != "" ? this.version + "/" : "";
      let suffix = this.m_configure.binary ? ".bin" : ".glsl";

      for (let i = 0; i < this.m_configure.types.length; ++i) {
        let url = "static/shader/" + version + "glsl/" + this.m_configure.uuid + "/" + this.m_configure.types[i] + suffix;
        this.loadCode(url, this.m_configure.types[i], loadedCallback);
      }
    } else {
      for (let i = 0; i < this.m_configure.urls.length; ++i) {
        let url = this.m_configure.urls[i];
        this.loadCode(url, this.m_configure.types[i], loadedCallback);
      }
    }
  }

}

ShaderCodeObjectLoader.s_fileIO = new FileIO_1.FileIO();

class ShaderLib {
  constructor() {
    this.m_loadingTotal = 0;
    this.m_loadedTotal = 0;
    this.m_loadStatusMap = new Map();
    this.m_shaderCodeMap = new Map();
    this.m_configLib = null;
    this.m_listener = null;
    this.m_version = "";
  }

  setListener(listener) {
    this.m_listener = listener;
  }

  getListener() {
    return this.m_listener;
  }

  initialize(shaderLibConfigure = null, binary = false) {
    if (this.m_configLib == null) {
      this.m_configLib = new ShaderCodeConfigureLib();
      let configure;
      let list = null;

      if (shaderLibConfigure != null) {
        list = shaderLibConfigure.shaderCodeConfigures;
        this.m_version = shaderLibConfigure.version;
      }

      if (list != null) {
        for (let i = 0; i < list.length; ++i) {
          configure = list[i];

          if (configure != null) {
            this.m_configLib.addConfigureWithUUID(configure.uuid, configure);
          }
        }
      } else {
        configure = new ShaderCodeConfigure_1.ShaderCodeConfigure();
        configure.uuid = ShaderCodeUUID_1.ShaderCodeUUID.PBR;
        configure.types = [ShaderCodeType_1.ShaderCodeType.VertHead, ShaderCodeType_1.ShaderCodeType.VertBody, ShaderCodeType_1.ShaderCodeType.FragHead, ShaderCodeType_1.ShaderCodeType.FragBody];
        configure.binary = binary;
        this.m_configLib.addConfigureWithUUID(configure.uuid, configure);
      }
    }
  }

  addAllShaderCodeObject() {
    if (this.m_configLib.getUUIDListLength() > 0) {
      let uuidList = this.m_configLib.getUUIDList();

      for (let i = 0; i < uuidList.length; ++i) {
        this.addShaderCodeObjectWithUUID(uuidList[i]);
      }
    } else {
      if (this.m_listener != null) this.m_listener.shaderLibLoadComplete(0, 0);
    }
  }

  hasShaderCodeObjectWithUUID(uuid) {
    return this.m_shaderCodeMap.has(uuid);
  }

  addShaderCodeObjectWithUUID(uuid) {
    if (!this.m_shaderCodeMap.has(uuid) && !this.m_loadStatusMap.has(uuid)) {
      this.m_loadingTotal++;
      let loader = new ShaderCodeObjectLoader(this.m_configLib.getConfigureWithUUID(uuid));
      loader.version = this.m_version;
      loader.load((uuid, shaderCodeobject) => {
        this.m_shaderCodeMap.set(uuid, shaderCodeobject);
        this.m_loadedTotal++;
        if (this.m_listener != null) this.m_listener.shaderLibLoadComplete(this.m_loadingTotal, this.m_loadedTotal);
      });
    }
  }

  addShaderCodeObject(uuid, shaderCodeObject) {
    if (shaderCodeObject != null && shaderCodeObject.uuid == "" + uuid && !this.m_shaderCodeMap.has(uuid)) {
      this.m_shaderCodeMap.set(uuid, shaderCodeObject);
    }
  }

  getShaderCodeObjectWithUUID(uuid) {
    let obj = null;

    if (this.m_shaderCodeMap.has(uuid)) {
      obj = this.m_shaderCodeMap.get(uuid);
    }

    return obj;
  }

  createShaderCodeConfigure(param) {
    let configure;
    let baseUrl = "static/shader/" + (param.shaderLibVersion != "" ? param.shaderLibVersion + "/" : "");
    baseUrl += "glsl/";
    let uuid = ShaderCodeUUID_1.ShaderCodeUUID.None;

    if (param.lambertMaterialEnabled) {
      uuid = ShaderCodeUUID_1.ShaderCodeUUID.Lambert;
    } else if (param.pbrMaterialEnabled) {
      uuid = ShaderCodeUUID_1.ShaderCodeUUID.PBR;
    }

    if (uuid != ShaderCodeUUID_1.ShaderCodeUUID.None) {
      configure = new ShaderCodeConfigure_1.ShaderCodeConfigure();
      configure.uuid = uuid;
      configure.buildBinaryFile = param.buildBinaryFile;
      baseUrl += configure.uuid + "/";

      if (param.shaderCodeBinary) {
        if (param.shaderFileNickname) {
          configure.urls = [baseUrl + "glsl01.bin", baseUrl + "glsl02.bin", baseUrl + "glsl03.bin", baseUrl + "glsl04.bin"];
        }
      }

      configure.binary = param.shaderCodeBinary;
    }

    return configure;
  }

}

exports.ShaderLib = ShaderLib;

/***/ }),

/***/ "c164":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class MathShaderCode {
  constructor() {}

}

MathShaderCode.BasePredefined = `
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
`;
exports.MathShaderCode = MathShaderCode;

class ShaderCode {
  constructor() {}

}

ShaderCode.BasePredefined = `
vec4 localPosition = vec4(0.0,0.0,0.0,1.0);
vec4 worldPosition = vec4(0.0,0.0,0.0,1.0);
// view space position
vec4 viewPosition = vec4(0.0,0.0,0.0,1.0);
vec3 worldNormal = vec3(0.0, 0.0, 1.0);
`;
ShaderCode.FragPredefined = `
`;
ShaderCode.FragDefined = `
`;
ShaderCode.VertPredefined = `
// origin world position
vec4 oWorldPosition = vec4(0.0,0.0,0.0,1.0);
`;
ShaderCode.VertDefined = `
`;
exports.ShaderCode = ShaderCode;

/***/ }),

/***/ "c497":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

class RendererParam {
  constructor(div = null) {
    this.m_matrix4AllocateSize = 8192;
    this.m_mainDiv = null;
    this.m_renderContextAttri = {
      depth: true,
      premultipliedAlpha: false,
      alpha: true,
      antialias: false,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance" //"default"

    };
    this.m_tickUpdateTime = 20; // delay 50 ms

    this.m_polygonOffsetEnabled = false;
    this.m_ditherEnabled = false; // display 3d view buf size auto sync window size

    this.autoSyncRenderBufferAndWindowSize = true;
    this.maxWebGLVersion = 2;
    this.cameraPerspectiveEnabled = true; // event flow control enable

    this.evtFlowEnabled = false; // x: fov, y: near, z: far

    this.camProjParam = new Vector3D_1.default(45.0, 10.0, 5000.0);
    this.camPosition = new Vector3D_1.default(2000.0, 2000.0, 2000.0);
    this.camLookAtPos = new Vector3D_1.default(0.0, 0.0, 0.0);
    this.camUpDirect = new Vector3D_1.default(0.0, 1.0, 0.0);
    this.batchEnabled = true;
    this.processFixedState = false;
    this.m_mainDiv = div;
    this.autoSyncRenderBufferAndWindowSize = div == null;
  }
  /**
   * @param   tickUpdateTime default value 50 ms delay
   */


  setTickUpdateTime(tickUpdateTime) {
    tickUpdateTime = Math.round(tickUpdateTime);
    this.m_tickUpdateTime = tickUpdateTime > 5 ? tickUpdateTime : 5;
  }

  getTickUpdateTime() {
    return this.m_tickUpdateTime;
  }

  setPolygonOffsetEanbled(polygonOffsetEnabled) {
    this.m_polygonOffsetEnabled = polygonOffsetEnabled;
  }

  getPolygonOffsetEanbled() {
    return this.m_polygonOffsetEnabled;
  }

  setDitherEanbled(ditherEnabled) {
    this.m_ditherEnabled = ditherEnabled;
  }

  getDitherEanbled() {
    return this.m_ditherEnabled;
  }

  getDiv() {
    return this.m_mainDiv;
  }

  getRenderContextAttri() {
    return this.m_renderContextAttri;
  }

  setAttriDepth(boo) {
    this.m_renderContextAttri.depth = boo;
  }

  setAttriStencil(boo) {
    this.m_renderContextAttri.stencil = boo;
  }

  setAttriAlpha(boo) {
    this.m_renderContextAttri.alpha = boo;
  }

  setAttriPremultipliedAlpha(boo) {
    this.m_renderContextAttri.premultipliedAlpha = boo;
  }

  setAttriAntialias(boo) {
    this.m_renderContextAttri.antialias = boo;
  }

  setAttripreserveDrawingBuffer(boo) {
    this.m_renderContextAttri.preserveDrawingBuffer = boo;
  }

  setAttriHightPowerPreference(boo) {
    this.m_renderContextAttri.powerPreference = boo ? "high-performance" : "default";
  }

  setMatrix4AllocateSize(total) {
    if (total < 1024) {
      total = 1024;
    }

    this.m_matrix4AllocateSize = total;
  }

  getMatrix4AllocateSize() {
    return this.m_matrix4AllocateSize;
  }
  /**
   * @param fov_angle_degree the default value is 45.0
   * @param near the default value is 10.0
   * @param far the default value is 5000.0
   */


  setCamProject(fov_angle_degree, near, far) {
    if (near >= far) {
      throw Error("Error Camera cear > far !!!");
    }

    this.camProjParam.setTo(fov_angle_degree, near, far);
  } //  setCamOrthoProject(bottom:number, top:number, left:number, right:number, near:number, far:number):void
  //  {
  //      if(near >= far)
  //      {
  //          throw Error("Error Camera cear > far !!!");
  //      }
  //      this.camProjParam.setTo(0.0,near,far);
  //      this.camOrthoParam.x = bottom;
  //      this.camOrthoParam.y = top;
  //      this.camOrthoParam.z = left;
  //      this.camOrthoParam.w = right;
  //  }


  setCamPosition(px, py, pz) {
    this.camPosition.setTo(px, py, pz);
  }

  setCamLookAtPos(px, py, pz) {
    this.camLookAtPos.setTo(px, py, pz);
  }

  setCamUpDirect(px, py, pz) {
    this.camUpDirect.setTo(px, py, pz);
  }

}

exports.default = RendererParam;

/***/ }),

/***/ "c51d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

const Matrix4_1 = __importDefault(__webpack_require__("18c7"));

const Plane_1 = __importDefault(__webpack_require__("e214"));

const AABB_1 = __importDefault(__webpack_require__("fecb"));

class CameraBase {
  constructor() {
    this.version = 0;
    this.matUProbe = null;
    this.ufrustumProbe = null;
    this.uniformEnabled = false;
    this.name = "Camera"; //

    this.m_tempV = new Vector3D_1.default();
    this.m_tempV1 = new Vector3D_1.default();
    this.m_initRV = new Vector3D_1.default();
    this.m_initUP = new Vector3D_1.default();
    this.m_lookRHEnabled = true; //

    this.m_matrix = new Matrix4_1.default();
    this.m_viewMat = new Matrix4_1.default();
    this.m_viewInvertMat = new Matrix4_1.default();
    this.m_vpMat = new Matrix4_1.default();
    this.m_tempMat = new Matrix4_1.default();
    this.m_projMat = new Matrix4_1.default();
    this.m_camPos = new Vector3D_1.default();
    this.m_lookAtPos = new Vector3D_1.default();
    this.m_up = new Vector3D_1.default();
    this.m_lookDirectNV = new Vector3D_1.default();
    this.m_lookAtDirec = new Vector3D_1.default(); //

    this.m_nearPlaneWidth = 1.0;
    this.m_nearPlaneHeight = 1.0; //

    this.m_viewX = 0.0;
    this.m_viewY = 0.0;
    this.m_viewW = 800.0;
    this.m_viewH = 600.0;
    this.m_viewHalfW = 400.0;
    this.m_viewHalfH = 300.0;
    this.m_fovRadian = 0.0;
    this.m_aspect = 1.0;
    this.m_zNear = 0.1;
    this.m_zFar = 1000.0;
    this.m_b = 0.0;
    this.m_t = 0.0;
    this.m_l = 0.0;
    this.m_r = 0.0;
    this.m_perspectiveEnabled = false;
    this.m_project2Enabled = false;
    this.m_rightHandEnabled = true;
    this.m_rotV = new Vector3D_1.default(0.0, 0.0, 0.0);
    this.m_viewFieldZoom = 1.0;
    this.m_changed = true;
    this.m_unlock = true;
    this.m_tempNV = new Vector3D_1.default();
    this.m_tempUPV = new Vector3D_1.default();
    this.m_tempRV = new Vector3D_1.default();
    this.m_tempCamPos = new Vector3D_1.default();
    this.m_tempLookAtPos = new Vector3D_1.default();
    this.m_rotDegree = 0.0;
    this.m_rotAxis = new Vector3D_1.default();
    this.m_rotPivotPoint = null;
    this.m_axisRotEnabled = false;
    this.m_frustumWAABB = new AABB_1.default();
    this.m_invViewMat = null;
    this.m_nearPlaneHalfW = 0.5;
    this.m_nearPlaneHalfH = 0.5;
    this.m_nearWCV = new Vector3D_1.default();
    this.m_farWCV = new Vector3D_1.default();
    this.m_wNV = new Vector3D_1.default(); // 4 far point, 4 near point 

    this.m_wFrustumVtxArr = [new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), null, null, null]; // world space front,back ->(view space -z,z), world space left,right ->(view space -x,x),world space top,bottm ->(view space y,-y)

    this.m_wFruPlaneList = [new Plane_1.default(), new Plane_1.default(), new Plane_1.default(), new Plane_1.default(), new Plane_1.default(), new Plane_1.default()];
    this.m_fpNVArr = [new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default(), new Vector3D_1.default()];
    this.m_fpDisArr = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    this.m_viewMatrix = null;
  } // 不允许外界修改camera数据


  lock() {
    this.m_unlock = false;
  } // 允许外界修改camera数据


  unlock() {
    this.m_unlock = true;
  }

  lookAtLH(camPos, lookAtPos, up) {
    if (this.m_unlock) {
      this.m_camPos.copyFrom(camPos);
      this.m_lookAtPos.copyFrom(lookAtPos);
      this.m_up.copyFrom(up);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = false;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize();
      this.m_initUP.copyFrom(up);
      this.m_initUP.normalize();
      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_initRV);
      this.m_initRV.normalize();
      this.m_changed = true;
    }
  }

  lookAtRH(camPos, lookAtPos, up) {
    if (this.m_unlock) {
      this.m_camPos.copyFrom(camPos);
      this.m_lookAtPos.copyFrom(lookAtPos);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize();
      Vector3D_1.default.Cross(this.m_lookAtDirec, up, this.m_initRV);
      Vector3D_1.default.Cross(this.m_initRV, this.m_lookAtDirec, this.m_initUP);
      this.m_initUP.normalize();
      this.m_initRV.normalize();
      this.m_up.copyFrom(this.m_initUP);
      this.m_changed = true;
    }
  }

  getLookAtLHToCamera(camera) {
    camera.lookAtLH(this.m_camPos, this.m_lookAtPos, this.m_up);
  }

  getLookAtRHToCamera(camera) {
    camera.lookAtRH(this.m_camPos, this.m_lookAtPos, this.m_up);
  }
  /**
   * left-hand axis perspective projection
   * @param fovRadian radian value
   * @param aspect the value is the view port width / height
   * @param zNear the camera near plane distance
   * @param zFar the camera far plane distance
   */


  perspectiveLH(fovRadian, aspect, zNear, zFar) {
    if (this.m_unlock) {
      this.m_project2Enabled = false;
      this.m_aspect = aspect;
      this.m_fovRadian = fovRadian;
      this.m_zNear = zNear;
      this.m_zFar = zFar;
      this.m_projMat.perspectiveLH(fovRadian, aspect, zNear, zFar);
      this.m_viewFieldZoom = Math.tan(fovRadian * 0.5);
      this.m_perspectiveEnabled = true;
      this.m_rightHandEnabled = false;
      this.m_changed = true;
    }
  }
  /**
   * right-hand axis perspective projection
   * @param fovRadian radian value
   * @param aspect the value is the view port width / height
   * @param zNear the camera near plane distance
   * @param zFar the camera far plane distance
   */


  perspectiveRH(fovRadian, aspect, zNear, zFar) {
    if (this.m_unlock) {
      this.m_aspect = aspect;
      this.m_fovRadian = fovRadian;
      this.m_zNear = zNear;
      this.m_zFar = zFar;
      this.m_projMat.perspectiveRH(fovRadian, aspect, zNear, zFar);
      this.m_viewFieldZoom = Math.tan(fovRadian * 0.5);
      this.m_project2Enabled = false;
      this.m_perspectiveEnabled = true;
      this.m_rightHandEnabled = true;
      this.m_changed = true;
    }
  }

  perspectiveRH2(fovRadian, pw, ph, zNear, zFar) {
    if (this.m_unlock) {
      this.m_aspect = pw / ph;
      this.m_fovRadian = fovRadian;
      this.m_zNear = zNear;
      this.m_zFar = zFar;
      this.m_projMat.perspectiveRH2(fovRadian, pw, ph, zNear, zFar);
      this.m_viewFieldZoom = Math.tan(fovRadian * 0.5);
      this.m_perspectiveEnabled = true;
      this.m_project2Enabled = true;
      this.m_rightHandEnabled = true;
      this.m_changed = true;
    }
  }

  getAspect() {
    return this.m_aspect;
  }

  getViewFieldZoom() {
    return this.m_viewFieldZoom;
  }

  orthoRH(zNear, zFar, b, t, l, r) {
    if (this.m_unlock) {
      this.m_zNear = zNear;
      this.m_zFar = zFar;
      this.m_b = b;
      this.m_t = t;
      this.m_l = l;
      this.m_r = r;
      this.m_projMat.orthoRH(b, t, l, r, zNear, zFar);
      this.m_perspectiveEnabled = false;
      this.m_rightHandEnabled = true;
      this.m_changed = true;
    }
  }

  orthoLH(zNear, zFar, b, t, l, r) {
    if (this.m_unlock) {
      this.m_zNear = zNear;
      this.m_zFar = zFar;
      this.m_b = b;
      this.m_t = t;
      this.m_l = l;
      this.m_r = r;
      this.m_projMat.orthoLH(b, t, l, r, zNear, zFar);
      this.m_perspectiveEnabled = false;
      this.m_rightHandEnabled = false;
      this.m_changed = true;
    }
  }

  isPerspectiveEnabled() {
    return this.m_perspectiveEnabled;
  }

  isRightHandEnabled() {
    return this.m_rightHandEnabled;
  }

  setViewXY(px, py) {
    if (this.m_unlock) {
      this.m_viewX = px;
      this.m_viewY = py;
    }
  }

  setViewSize(pw, ph) {
    if (this.m_unlock) {
      if (pw != this.m_viewW || ph != this.m_viewH) {
        this.m_viewW = pw;
        this.m_viewH = ph;
        this.m_viewHalfW = pw * 0.5;
        this.m_viewHalfH = ph * 0.5; //console.log("setViewSize, pw:"+pw+",ph:"+ph);

        if (this.m_perspectiveEnabled) {
          if (this.m_project2Enabled) {
            if (this.m_rightHandEnabled) this.perspectiveRH2(this.m_fovRadian, pw, ph, this.m_zNear, this.m_zFar);
          } else {
            if (this.m_rightHandEnabled) this.perspectiveRH(this.m_fovRadian, pw / ph, this.m_zNear, this.m_zFar);else this.perspectiveLH(this.m_fovRadian, pw / ph, this.m_zNear, this.m_zFar);
          }
        } else {
          this.orthoRH(this.m_zNear, this.m_zFar, -0.5 * ph, 0.5 * ph, -0.5 * pw, 0.5 * pw);
        }
      }
    }
  }

  getViewX() {
    return this.m_viewX;
  }

  getViewY() {
    return this.m_viewY;
  }

  getViewWidth() {
    return this.m_viewW;
  }

  getViewHeight() {
    return this.m_viewH;
  }

  translation(v3) {
    if (this.m_unlock) {
      this.m_camPos.copyFrom(v3);
      this.m_lookAtPos.x = v3.x + this.m_lookAtDirec.x;
      this.m_lookAtPos.y = v3.y + this.m_lookAtDirec.y;
      this.m_lookAtPos.z = v3.z + this.m_lookAtDirec.z;
      this.m_changed = true;
    }
  }

  translationXYZ(px, py, pz) {
    this.m_tempV.setXYZ(px, py, pz);

    if (this.m_unlock && Vector3D_1.default.DistanceSquared(this.m_camPos, this.m_tempV) > 0.00001) {
      this.m_camPos.setTo(px, py, pz);
      this.m_lookAtPos.x = px + this.m_lookAtDirec.x;
      this.m_lookAtPos.y = py + this.m_lookAtDirec.y;
      this.m_lookAtPos.z = pz + this.m_lookAtDirec.z;
      this.m_changed = true;
    }
  }

  forward(dis) {
    if (this.m_unlock) {
      this.m_camPos.x += this.m_lookDirectNV.x * dis;
      this.m_camPos.y += this.m_lookDirectNV.y * dis;
      this.m_camPos.z += this.m_lookDirectNV.z * dis;
      this.m_lookAtPos.x = this.m_camPos.x + this.m_lookAtDirec.x;
      this.m_lookAtPos.y = this.m_camPos.y + this.m_lookAtDirec.y;
      this.m_lookAtPos.z = this.m_camPos.z + this.m_lookAtDirec.z;
      this.m_changed = true;
    }
  }
  /**
   * 在平行于远平面的平面上滑动， 垂直于此平面的方向上不变
   * @param dx 摄像机 view 空间内 x方向偏移量
   * @param dy 摄像机 view 空间内 y方向偏移量
   */


  slideViewOffsetXY(dx, dy) {
    if (this.m_unlock) {
      this.m_tempV.setXYZ(dx, dy, 0);
      this.m_invViewMat.transformVectorSelf(this.m_tempV);
      dx = this.m_tempV.x - this.m_camPos.x;
      dy = this.m_tempV.y - this.m_camPos.y;
      let dz = this.m_tempV.z - this.m_camPos.z;
      this.m_camPos.x += dx;
      this.m_camPos.y += dy;
      this.m_camPos.z += dz;
      this.m_lookAtPos.x += dx;
      this.m_lookAtPos.y += dy;
      this.m_lookAtPos.z += dz;
      this.m_changed = true;
    }
  }

  forwardFixPos(dis, pos) {
    if (this.m_unlock) {
      this.m_camPos.x = pos.x + this.m_lookDirectNV.x * dis;
      this.m_camPos.y = pos.y + this.m_lookDirectNV.y * dis;
      this.m_camPos.z = pos.z + this.m_lookDirectNV.z * dis;
      this.m_lookAtPos.x = this.m_camPos.x + this.m_lookAtDirec.x;
      this.m_lookAtPos.y = this.m_camPos.y + this.m_lookAtDirec.y;
      this.m_lookAtPos.z = this.m_camPos.z + this.m_lookAtDirec.z;
      this.m_changed = true;
    }
  }

  swingHorizontalWithAxis(rad, axis) {
    if (this.m_unlock) {
      this.m_tempMat.identity();

      if (axis != null) {
        this.m_tempMat.appendRotation(rad * MathConst_1.default.MATH_PI_OVER_180, axis);
      } else {
        this.m_tempMat.appendRotation(rad * MathConst_1.default.MATH_PI_OVER_180, Vector3D_1.default.Y_AXIS);
      }

      this.m_lookAtDirec.x = this.m_camPos.x - this.m_lookAtPos.x;
      this.m_lookAtDirec.y = this.m_camPos.y - this.m_lookAtPos.y;
      this.m_lookAtDirec.z = this.m_camPos.z - this.m_lookAtPos.z;
      this.m_tempMat.transformVectorSelf(this.m_lookAtDirec);
      this.m_camPos.x = this.m_lookAtDirec.x + this.m_lookAtPos.x;
      this.m_camPos.y = this.m_lookAtDirec.y + this.m_lookAtPos.y;
      this.m_camPos.z = this.m_lookAtDirec.z + this.m_lookAtPos.z;
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      this.m_tempMat.transformVectorSelf(this.m_initRV);
      this.m_initRV.normalize(); //Vector3D.Cross(this.m_lookAtDirec, this.m_up, this.m_initRV);

      Vector3D_1.default.Cross(this.m_initRV, this.m_lookAtDirec, this.m_up);
      this.m_up.normalize();
      this.m_changed = true;
    }
  }

  swingHorizontal(degree) {
    if (this.m_unlock) {
      this.m_tempMat.identity();
      this.m_tempMat.appendRotation(degree * MathConst_1.default.MATH_PI_OVER_180, this.m_up);
      this.m_lookAtDirec.x = this.m_camPos.x - this.m_lookAtPos.x;
      this.m_lookAtDirec.y = this.m_camPos.y - this.m_lookAtPos.y;
      this.m_lookAtDirec.z = this.m_camPos.z - this.m_lookAtPos.z;
      this.m_tempMat.transformVectorSelf(this.m_lookAtDirec);
      this.m_camPos.x = this.m_lookAtDirec.x + this.m_lookAtPos.x;
      this.m_camPos.y = this.m_lookAtDirec.y + this.m_lookAtPos.y;
      this.m_camPos.z = this.m_lookAtDirec.z + this.m_lookAtPos.z;
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_initRV);
      this.m_initRV.normalize();
      this.m_changed = true;
    }
  }

  swingVertical(degree) {
    if (this.m_unlock) {
      this.m_tempMat.identity();
      this.m_tempMat.appendRotation(degree * MathConst_1.default.MATH_PI_OVER_180, this.m_initRV);
      this.m_lookAtDirec.x = this.m_camPos.x - this.m_lookAtPos.x;
      this.m_lookAtDirec.y = this.m_camPos.y - this.m_lookAtPos.y;
      this.m_lookAtDirec.z = this.m_camPos.z - this.m_lookAtPos.z;
      this.m_tempMat.transformVectorSelf(this.m_lookAtDirec);
      this.m_camPos.x = this.m_lookAtDirec.x + this.m_lookAtPos.x;
      this.m_camPos.y = this.m_lookAtDirec.y + this.m_lookAtPos.y;
      this.m_camPos.z = this.m_lookAtDirec.z + this.m_lookAtPos.z;
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      Vector3D_1.default.Cross(this.m_initRV, this.m_lookAtDirec, this.m_up);
      this.m_up.normalize();
      this.m_initUP.copyFrom(this.m_up);
      this.m_changed = true;
    }
  }

  setPosition(v3) {
    if (this.m_unlock) {
      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_tempV);
      let dot = this.m_tempV.dot(this.m_initUP);
      this.m_tempV1.copyFrom(this.m_initUP);
      this.m_tempV1.scaleBy(dot);
      this.m_tempV.subtractBy(this.m_tempV1); //m_tempV.y = 0;

      this.m_camPos.copyFrom(v3);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      Vector3D_1.default.Cross(this.m_tempV, this.m_lookAtDirec, this.m_up);
      this.m_up.normalize();
      this.m_changed = true;
    }
  }

  setPositionXYZ(px, py, pz) {
    if (this.m_unlock) {
      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_tempV);
      var dot = this.m_tempV.dot(this.m_initUP);
      this.m_tempV1.copyFrom(this.m_initUP);
      this.m_tempV1.scaleBy(dot);
      this.m_tempV.subtractBy(this.m_tempV1);
      this.m_camPos.setTo(px, py, pz);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      Vector3D_1.default.Cross(this.m_tempV, this.m_lookAtDirec, this.m_up);
      this.m_up.normalize();
      this.m_changed = true;
    }
  }

  setLookPosXYZFixUp(px, py, pz) {
    if (this.m_unlock) {
      this.m_lookAtPos.setTo(px, py, pz);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_initRV);
      this.m_initRV.normalize();
      this.m_changed = true;
    }
  }

  setPositionXYZFixUp(px, py, pz) {
    if (this.m_unlock) {
      this.m_camPos.setTo(px, py, pz);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize(); //

      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_initRV);
      this.m_initRV.normalize();
      this.m_changed = true;
    }
  }

  setPositionFixUp(v3) {
    if (this.m_unlock) {
      this.m_camPos.copyFrom(v3);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookRHEnabled = true;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize();
      Vector3D_1.default.Cross(this.m_lookAtDirec, this.m_up, this.m_initRV);
      this.m_initRV.normalize();
      this.m_changed = true;
    }
  }

  copyFrom(tarCam) {
    let pv = tarCam.getPosition();
    this.m_camPos.copyFrom(pv);
    pv = tarCam.getLookAtPosition();
    this.m_lookAtPos.copyFrom(pv);
    this.setZNear(tarCam.getZNear());
    this.setZFar(tarCam.getZFar());
    this.setNearPlaneWidth(tarCam.getNearPlaneWidth());
    this.setNearPlaneHeight(tarCam.getNearPlaneHeight());
    this.setPerspectiveEnabled(tarCam.getPerspectiveEnabled());
    this.m_viewInvertMat.copyFrom(tarCam.getViewInvMatrix());
  } // view space axis z


  getNV() {
    this.m_tempNV.copyFrom(this.m_lookDirectNV);
    return this.m_tempNV;
  } // view space axis y


  getUV() {
    this.m_tempUPV.copyFrom(this.m_up);
    return this.m_tempUPV;
  } // view space axis x


  getRV() {
    this.m_tempRV.copyFrom(this.m_initRV);
    return this.m_tempRV;
  }

  getPosition() {
    this.m_tempCamPos.copyFrom(this.m_camPos);
    return this.m_tempCamPos;
  }

  getLookAtPosition() {
    this.m_tempLookAtPos.copyFrom(this.m_lookAtPos);
    return this.m_tempLookAtPos;
  }

  setLookAtPosition(pv) {
    if (this.m_unlock) {
      this.m_lookAtPos.copyFrom(pv);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize();
      this.m_changed = true;
    }
  }

  setLookAtXYZ(px, py, pz) {
    if (this.m_unlock) {
      this.m_lookAtPos.setTo(px, py, pz);
      this.m_lookAtDirec.x = this.m_lookAtPos.x - this.m_camPos.x;
      this.m_lookAtDirec.y = this.m_lookAtPos.y - this.m_camPos.y;
      this.m_lookAtDirec.z = this.m_lookAtPos.z - this.m_camPos.z;
      this.m_lookDirectNV.copyFrom(this.m_lookAtDirec);
      this.m_lookDirectNV.normalize();
      this.m_changed = true;
    }
  }

  getPerspectiveEnabled() {
    return this.m_perspectiveEnabled;
  }

  setPerspectiveEnabled(boo) {
    this.m_perspectiveEnabled = boo;
  }

  appendRotationByAxis(degree, axis, pivotPoint = null) {
    if (this.m_unlock) {
      this.m_rotDegree = degree;
      this.m_changed = true;
      this.m_rotAxis.copyFrom(axis);
      this.m_rotPivotPoint = pivotPoint;
      this.m_axisRotEnabled = true;
    }
  }

  setRotationX(degree) {
    this.m_rotV.x = degree;
    this.m_changed = true;
    this.m_axisRotEnabled = false;
  }

  getRotationX() {
    return this.m_rotV.x;
  }

  setRotationY(degree) {
    this.m_rotV.y = degree;
    this.m_changed = true;
    this.m_axisRotEnabled = false;
  }

  getRotationY() {
    return this.m_rotV.y;
  }

  setRotationZ(degree) {
    this.m_rotV.z = degree;
    this.m_changed = true;
    this.m_axisRotEnabled = false;
  }

  getRotationZ() {
    return this.m_rotV.z;
  }

  setRotationXYZ(rx, ry, rz) {
    if (this.m_unlock) {
      this.m_rotV.setXYZ(rx, ry, rz);
      this.m_changed = true;
      this.m_axisRotEnabled = false;
    }
  }

  screenXYToViewXYZ(px, py, outV) {
    px -= this.m_viewX;
    py -= this.m_viewY;

    if (this.m_perspectiveEnabled) {
      px = this.m_nearPlaneWidth * (px - this.m_viewHalfW) / this.m_viewHalfW;
      py = this.m_nearPlaneHeight * (this.m_viewHalfH - py) / this.m_viewHalfH;
    }

    outV.setTo(px, py, -this.m_zNear); //
  }

  screenXYToWorldXYZ(px, py, outV) {
    px -= this.m_viewX;
    py -= this.m_viewY;

    if (this.m_perspectiveEnabled) {
      px = 0.5 * this.m_nearPlaneWidth * (px - this.m_viewHalfW) / this.m_viewHalfW;
      py = 0.5 * this.m_nearPlaneHeight * (this.m_viewHalfH - py) / this.m_viewHalfH;
    }

    outV.setTo(px, py, -this.m_zNear);
    outV.w = 1.0;
    this.m_viewInvertMat.transformVectorSelf(outV);
  }

  getWorldPickingRayByScreenXY(screenX, screenY, ray_pos, ray_tv) {
    //console.log("screenX,screenY: ",screenX,screenY,this.m_viewHalfW,this.m_viewHalfH);
    screenX -= this.m_viewX;
    screenY -= this.m_viewY;

    if (this.m_perspectiveEnabled) {
      screenX = 0.5 * this.m_nearPlaneWidth * (screenX - this.m_viewHalfW) / this.m_viewHalfW;
      screenY = 0.5 * this.m_nearPlaneHeight * (screenY - this.m_viewHalfH) / this.m_viewHalfH;
      ray_pos.setTo(screenX, screenY, -this.m_zNear);
      ray_pos.w = 1.0;
      this.m_viewInvertMat.transformVectorSelf(ray_pos);
      ray_tv.copyFrom(ray_pos);
      ray_tv.subtractBy(this.m_camPos);
      ray_tv.normalize();
    } else {
      screenX -= this.m_viewHalfW;
      screenY -= this.m_viewHalfH;
      ray_pos.setTo(screenX, screenY, -this.m_zNear);
      ray_pos.w = 1.0;
      this.m_viewInvertMat.transformVectorSelf(ray_pos);
      ray_tv.copyFrom(this.m_lookDirectNV);
    }
  }

  calcScreenNormalizeXYByWorldPos(pv3, scPV3) {
    scPV3.copyFrom(pv3);
    this.m_vpMat.transformVectorSelf(scPV3);
    scPV3.x /= scPV3.w;
    scPV3.y /= scPV3.w;
  }

  worldPosToScreen(pv) {
    this.m_viewMat.transformVector3Self(pv);
    this.m_projMat.transformVectorSelf(pv);
    pv.x /= pv.w;
    pv.y /= pv.w;
    pv.x *= this.m_viewHalfW;
    pv.y *= this.m_viewHalfH;
    pv.x += this.m_viewX;
    pv.y += this.m_viewY;
  } // 计算3D空间的球体在屏幕空间的最小包围矩形, outV的x,y表示矩形的x和y;outV的z和w表示宽和高,取值为像素数


  calcViewRectByWorldSphere(pv, radius, outV) {
    this.m_viewMat.transformVector3Self(pv);
    radius *= 1.15;
    outV.x = pv.x - radius;
    outV.y = pv.y - radius;
    outV.z = pv.z;
    pv.x += radius;
    pv.y += radius;
    this.m_projMat.transformPerspV4Self(outV);
    this.m_projMat.transformPerspV4Self(pv);
    pv.z = 1.0 / pv.w;
    outV.z = pv.x * pv.z;
    outV.w = pv.y * pv.z;
    outV.z *= this.m_viewHalfW;
    outV.w *= this.m_viewHalfH;
    outV.x *= pv.z;
    outV.y *= pv.z;
    outV.x *= this.m_viewHalfW;
    outV.y *= this.m_viewHalfH;
    outV.z = outV.z - outV.x;
    outV.w = outV.w - outV.y;
    outV.x += this.m_viewX;
    outV.y += this.m_viewY;
  } // 计算3D空间的球体在屏幕空间的最小包围矩形, outV的x,y表示矩形的x和y;outV的z和w表示宽和高,取值0.0 - 1.0之间


  calcScreenRectByWorldSphere(pv, radius, outV) {
    this.m_viewMat.transformVector3Self(pv);
    radius *= 1.15;
    outV.x = pv.x - radius;
    outV.y = pv.y - radius;
    pv.x += radius;
    pv.y += radius;
    this.m_projMat.transformPerspV4Self(outV);
    this.m_projMat.transformPerspV4Self(pv);
    pv.z = 1.0 / pv.w;
    outV.z = pv.x * pv.z;
    outV.w = pv.y * pv.z;
    outV.x *= pv.z;
    outV.y *= pv.z;
    outV.z = outV.z - outV.x;
    outV.w = outV.w - outV.y;
  }

  getInvertViewMatrix() {
    return this.m_invViewMat;
  }

  getZNear() {
    return this.m_zNear;
  }

  setZNear(value) {
    this.m_zNear = value;
  }

  getZFar() {
    return this.m_zFar;
  }

  setZFar(value) {
    this.m_zFar = value;
  }

  getNearPlaneWidth() {
    return this.m_nearPlaneWidth;
  }

  setNearPlaneWidth(value) {
    this.m_nearPlaneWidth = value;
  }

  getNearPlaneHeight() {
    return this.m_nearPlaneHeight;
  }

  setNearPlaneHeight(value) {
    this.m_nearPlaneHeight = value;
  }

  getFov() {
    return this.m_fovRadian;
  }

  __calcTestParam() {
    if (this.m_invViewMat == null) this.m_invViewMat = new Matrix4_1.default(); //Matrix4Pool.GetMatrix();

    this.m_invViewMat.copyFrom(this.m_viewMat);
    this.m_invViewMat.invert(); //

    let plane = null;
    let halfMinH = this.m_viewHalfH;
    let halfMinW = this.m_viewHalfW;
    let halfMaxH = this.m_viewHalfH;
    let halfMaxW = this.m_viewHalfW;

    if (this.m_perspectiveEnabled) {
      let tanv = Math.tan(this.m_fovRadian * 0.5);
      halfMinH = this.m_zNear * tanv;
      halfMinW = halfMinH * this.m_aspect;
      halfMaxH = this.m_zFar * tanv;
      halfMaxW = halfMaxH * this.m_aspect;
    } //console.log("CameraBase::__calcTestParam(), (halfMinW, halfMinH): "+halfMinW+", "+halfMinH);


    this.m_nearPlaneHalfW = halfMinW;
    this.m_nearPlaneHalfH = halfMinH; // inner view space

    this.m_nearWCV.setTo(0, 0, -this.m_zNear);
    this.m_farWCV.setTo(0, 0, -this.m_zFar);
    this.m_invViewMat.transformVectorSelf(this.m_nearWCV);
    this.m_invViewMat.transformVectorSelf(this.m_farWCV);
    this.m_wNV.x = this.m_farWCV.x - this.m_nearWCV.x;
    this.m_wNV.y = this.m_farWCV.y - this.m_nearWCV.y;
    this.m_wNV.z = this.m_farWCV.z - this.m_nearWCV.z;
    this.m_wNV.normalize(); // front face

    plane = this.m_wFruPlaneList[0];
    plane.nv.copyFrom(this.m_wNV);
    plane.distance = plane.nv.dot(this.m_farWCV);
    plane.position.copyFrom(this.m_farWCV); // back face

    plane = this.m_wFruPlaneList[1];
    plane.nv.copyFrom(this.m_wFruPlaneList[0].nv);
    plane.distance = plane.nv.dot(this.m_nearWCV);
    plane.position.copyFrom(this.m_nearWCV); //

    this.m_wFrustumVtxArr[8] = this.m_nearWCV;
    this.m_wFrustumVtxArr[9] = this.m_farWCV;
    this.m_wFrustumVtxArr[11] = this.m_wNV; // far face

    this.m_wFrustumVtxArr[0].setTo(-halfMaxW, -halfMaxH, -this.m_zFar);
    this.m_wFrustumVtxArr[1].setTo(halfMaxW, -halfMaxH, -this.m_zFar);
    this.m_wFrustumVtxArr[2].setTo(halfMaxW, halfMaxH, -this.m_zFar);
    this.m_wFrustumVtxArr[3].setTo(-halfMaxW, halfMaxH, -this.m_zFar); // near face

    this.m_wFrustumVtxArr[4].setTo(-halfMinW, -halfMinH, -this.m_zNear);
    this.m_wFrustumVtxArr[5].setTo(halfMinW, -halfMinH, -this.m_zNear);
    this.m_wFrustumVtxArr[6].setTo(halfMinW, halfMinH, -this.m_zNear);
    this.m_wFrustumVtxArr[7].setTo(-halfMinW, halfMinH, -this.m_zNear); //

    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[0]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[1]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[2]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[3]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[4]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[5]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[6]);
    this.m_invViewMat.transformVectorSelf(this.m_wFrustumVtxArr[7]); //

    this.m_frustumWAABB.max.setTo(-9999999, -9999999, -9999999);
    this.m_frustumWAABB.min.setTo(9999999, 9999999, 9999999);

    for (let i = 0; i < 8; ++i) {
      this.m_frustumWAABB.addPosition(this.m_wFrustumVtxArr[i]);
    }

    this.m_frustumWAABB.updateFast(); //let abCV = m_frustumWAABB.getCenter();
    // bottom

    let v0 = this.m_wFrustumVtxArr[0];
    let v1 = this.m_wFrustumVtxArr[4];
    this.m_tempV.x = v0.x - v1.x;
    this.m_tempV.y = v0.y - v1.y;
    this.m_tempV.z = v0.z - v1.z;
    v0 = this.m_wFrustumVtxArr[1];
    v1 = this.m_wFrustumVtxArr[5];
    this.m_tempV1.x = v0.x - v1.x;
    this.m_tempV1.y = v0.y - v1.y;
    this.m_tempV1.z = v0.z - v1.z;
    plane = this.m_wFruPlaneList[3];
    Vector3D_1.default.Cross(this.m_tempV1, this.m_tempV, plane.nv);
    plane.nv.normalize();
    plane.distance = plane.nv.dot(v0);
    plane.position.copyFrom(v0); // top

    v0 = this.m_wFrustumVtxArr[3];
    v1 = this.m_wFrustumVtxArr[7];
    this.m_tempV.x = v0.x - v1.x;
    this.m_tempV.y = v0.y - v1.y;
    this.m_tempV.z = v0.z - v1.z;
    v0 = this.m_wFrustumVtxArr[2];
    v1 = this.m_wFrustumVtxArr[6];
    this.m_tempV1.x = v0.x - v1.x;
    this.m_tempV1.y = v0.y - v1.y;
    this.m_tempV1.z = v0.z - v1.z;
    plane = this.m_wFruPlaneList[2];
    Vector3D_1.default.Cross(this.m_tempV1, this.m_tempV, plane.nv);
    plane.nv.normalize();
    plane.distance = plane.nv.dot(v0);
    plane.position.copyFrom(v0); // left

    v0 = this.m_wFrustumVtxArr[0];
    v1 = this.m_wFrustumVtxArr[4];
    this.m_tempV.x = v0.x - v1.x;
    this.m_tempV.y = v0.y - v1.y;
    this.m_tempV.z = v0.z - v1.z;
    v0 = this.m_wFrustumVtxArr[3];
    v1 = this.m_wFrustumVtxArr[7];
    this.m_tempV1.x = v0.x - v1.x;
    this.m_tempV1.y = v0.y - v1.y;
    this.m_tempV1.z = v0.z - v1.z;
    plane = this.m_wFruPlaneList[4];
    Vector3D_1.default.Cross(this.m_tempV, this.m_tempV1, plane.nv);
    plane.nv.normalize();
    plane.distance = plane.nv.dot(v0);
    plane.position.copyFrom(v0); // right

    v0 = this.m_wFrustumVtxArr[1];
    v1 = this.m_wFrustumVtxArr[5];
    this.m_tempV.x = v0.x - v1.x;
    this.m_tempV.y = v0.y - v1.y;
    this.m_tempV.z = v0.z - v1.z;
    v0 = this.m_wFrustumVtxArr[2];
    v1 = this.m_wFrustumVtxArr[6];
    this.m_tempV1.x = v0.x - v1.x;
    this.m_tempV1.y = v0.y - v1.y;
    this.m_tempV1.z = v0.z - v1.z;
    plane = this.m_wFruPlaneList[5];
    Vector3D_1.default.Cross(this.m_tempV, this.m_tempV1, plane.nv);
    plane.nv.normalize();
    plane.distance = plane.nv.dot(v0);
    plane.position.copyFrom(v0);
    this.m_fpNVArr[0].copyFrom(this.m_wFruPlaneList[0].nv);
    this.m_fpNVArr[1].copyFrom(this.m_wFruPlaneList[1].nv);
    this.m_fpNVArr[1].scaleBy(-1.0);
    this.m_fpNVArr[2].copyFrom(this.m_wFruPlaneList[2].nv);
    this.m_fpNVArr[3].copyFrom(this.m_wFruPlaneList[3].nv);
    this.m_fpNVArr[3].scaleBy(-1.0);
    this.m_fpNVArr[4].copyFrom(this.m_wFruPlaneList[4].nv);
    this.m_fpNVArr[4].scaleBy(-1.0);
    this.m_fpNVArr[5].copyFrom(this.m_wFruPlaneList[5].nv); //

    this.m_fpDisArr[0] = this.m_wFruPlaneList[0].distance;
    this.m_fpDisArr[1] = -this.m_wFruPlaneList[1].distance;
    this.m_fpDisArr[2] = this.m_wFruPlaneList[2].distance;
    this.m_fpDisArr[3] = -this.m_wFruPlaneList[3].distance;
    this.m_fpDisArr[4] = -this.m_wFruPlaneList[4].distance;
    this.m_fpDisArr[5] = this.m_wFruPlaneList[5].distance;
  }

  getWordFrustumWAABB() {
    return this.m_frustumWAABB;
  }

  getWordFrustumWAABBCenter() {
    return this.m_frustumWAABB.center;
  }

  getWordFrustumVtxArr() {
    return this.m_wFrustumVtxArr;
  }

  getWordFrustumPlaneArr() {
    return this.m_wFruPlaneList;
  }

  visiTestSphere2(w_cv, radius) {
    let boo = this.m_fpNVArr[0].dot(w_cv) - this.m_fpDisArr[0] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[1].dot(w_cv) - this.m_fpDisArr[1] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[2].dot(w_cv) - this.m_fpDisArr[2] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[3].dot(w_cv) - this.m_fpDisArr[3] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[4].dot(w_cv) - this.m_fpDisArr[4] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[5].dot(w_cv) - this.m_fpDisArr[5] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    return true;
  }

  visiTestSphere3(w_cv, radius, farROffset) {
    let boo = this.m_fpNVArr[0].dot(w_cv) - this.m_fpDisArr[0] + farROffset - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[1].dot(w_cv) - this.m_fpDisArr[1] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[2].dot(w_cv) - this.m_fpDisArr[2] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[3].dot(w_cv) - this.m_fpDisArr[3] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[4].dot(w_cv) - this.m_fpDisArr[4] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[5].dot(w_cv) - this.m_fpDisArr[5] - radius > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    return true;
  }

  visiTestPosition(pv) {
    let boo = this.m_fpNVArr[0].dot(pv) - this.m_fpDisArr[0] > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[1].dot(pv) - this.m_fpDisArr[1] > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[2].dot(pv) - this.m_fpDisArr[2] > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[3].dot(pv) - this.m_fpDisArr[3] > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[4].dot(pv) - this.m_fpDisArr[4] > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    boo = this.m_fpNVArr[5].dot(pv) - this.m_fpDisArr[5] > MathConst_1.default.MATH_MIN_POSITIVE;
    if (boo) return false;
    return true;
  }

  visiTestPlane(nv, distance) {
    let f0 = nv.dot(this.m_wFruPlaneList[0].position) - distance;
    let f1 = f0 * (nv.dot(this.m_wFruPlaneList[1].position) - distance);
    if (f1 < MathConst_1.default.MATH_MIN_POSITIVE) return true;
    f1 = f0 * (nv.dot(this.m_wFruPlaneList[2].position) - distance);
    if (f1 < MathConst_1.default.MATH_MIN_POSITIVE) return true;
    f1 = f0 * (nv.dot(this.m_wFruPlaneList[3].position) - distance);
    if (f1 < MathConst_1.default.MATH_MIN_POSITIVE) return true;
    f1 = f0 * (nv.dot(this.m_wFruPlaneList[4].position) - distance);
    if (f1 < MathConst_1.default.MATH_MIN_POSITIVE) return true;
    f1 = f0 * (nv.dot(this.m_wFruPlaneList[5].position) - distance);
    if (f1 < MathConst_1.default.MATH_MIN_POSITIVE) return true;
    return false;
  } //this.m_wFruPlaneList
  // frustum intersect sphere in wrod space


  visiTestSphere(w_cv, radius) {
    let boo = this.m_frustumWAABB.sphereIntersect(w_cv, radius); //

    if (boo) {
      let pf0 = this.m_wFruPlaneList[0].intersectSphere(w_cv, radius);
      let pf1 = this.m_wFruPlaneList[1].intersectSphere(w_cv, radius); //trace("0 pf0,pf1: "+pf0+","+pf1);

      if (pf0 * pf1 >= 0) {
        //this.intersectBoo
        //trace("TT A0");
        if (this.m_wFruPlaneList[0].intersectBoo || this.m_wFruPlaneList[1].intersectBoo) {} else {
          return false;
        }
      }

      pf0 = this.m_wFruPlaneList[2].intersectSphere(w_cv, radius);
      pf1 = this.m_wFruPlaneList[3].intersectSphere(w_cv, radius); //trace("1 pf0,pf1: "+pf0+","+pf1);

      if (pf0 * pf1 >= 0) {
        //trace("TT A1");
        if (this.m_wFruPlaneList[2].intersectBoo || this.m_wFruPlaneList[3].intersectBoo) {} else {
          return false;
        }
      }

      pf0 = this.m_wFruPlaneList[4].intersectSphere(w_cv, radius);
      pf1 = this.m_wFruPlaneList[5].intersectSphere(w_cv, radius);

      if (pf0 * pf1 >= 0) {
        //trace("TT A2");
        if (this.m_wFruPlaneList[4].intersectBoo || this.m_wFruPlaneList[5].intersectBoo) {} else {
          return false;
        }
      }

      return true;
    }

    return false;
  } // visibility test
  // 可见性检测这边可以做的更精细，例如上一帧检测过的对象如果摄像机没有移动而且它自身也没有位置等变化，就可以不用检测
  // 例如精细检测可以分类: 圆球，圆柱体，长方体 等不同的检测模型计算方式会有区别


  visiTestAABB(ab) {
    //trace("ro.bounds.getCenter(): "+ro.bounds.getCenter()+","+ro.bounds.getRadius());
    //return m_frustumWAABB.sphereIntersectFast(ro.bounds.getCenter(),ro.bounds.getRadius());
    let w_cv = ab.center;
    let radius = ab.radius;
    let boo = this.m_frustumWAABB.sphereIntersect(w_cv, radius); //

    if (boo) {
      let pf0 = this.m_wFruPlaneList[0].intersectSphere(w_cv, radius);
      let pf1 = this.m_wFruPlaneList[1].intersectSphere(w_cv, radius);

      if (pf0 * pf1 >= 0) {
        if (this.m_wFruPlaneList[0].intersectBoo || this.m_wFruPlaneList[1].intersectBoo) {} else {
          return false;
        }
      }

      pf0 = this.m_wFruPlaneList[2].intersectSphere(w_cv, radius);
      pf1 = this.m_wFruPlaneList[3].intersectSphere(w_cv, radius);

      if (pf0 * pf1 >= 0) {
        if (this.m_wFruPlaneList[2].intersectBoo || this.m_wFruPlaneList[3].intersectBoo) {} else {
          return false;
        }
      }

      pf0 = this.m_wFruPlaneList[4].intersectSphere(w_cv, radius);
      pf1 = this.m_wFruPlaneList[5].intersectSphere(w_cv, radius);

      if (pf0 * pf1 >= 0) {
        if (this.m_wFruPlaneList[4].intersectBoo || this.m_wFruPlaneList[5].intersectBoo) {} else {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  setViewMatrix(viewMatrix) {
    this.m_viewMatrix = viewMatrix;
    this.m_changed = true;
  }

  update() {
    if (this.m_changed) {
      this.version++;
      this.m_changed = false;

      if (this.m_viewMatrix == null) {
        if (this.m_axisRotEnabled) {
          this.m_matrix.appendRotationPivot(this.m_rotDegree * MathConst_1.default.MATH_PI_OVER_180, this.m_rotAxis, this.m_rotPivotPoint);
        } else {
          this.m_matrix.identity();
          this.m_matrix.appendRotationEulerAngle(this.m_rotV.x * MathConst_1.default.MATH_PI_OVER_180, this.m_rotV.y * MathConst_1.default.MATH_PI_OVER_180, this.m_rotV.z * MathConst_1.default.MATH_PI_OVER_180);
        }

        if (this.m_lookRHEnabled) {
          this.m_viewMat.lookAtRH(this.m_camPos, this.m_lookAtPos, this.m_up);
        } else {
          this.m_viewMat.lookAtLH(this.m_camPos, this.m_lookAtPos, this.m_up);
        }

        this.m_viewMat.append(this.m_matrix);
      } else {
        this.m_viewMat.copyFrom(this.m_viewMatrix);
      }

      if (this.m_project2Enabled) {
        this.m_nearPlaneWidth = this.m_zNear * Math.tan(this.m_fovRadian * 0.5) * 2.0;
        this.m_nearPlaneHeight = this.m_nearPlaneWidth / this.m_aspect;
      } else {
        this.m_nearPlaneHeight = this.m_zNear * Math.tan(this.m_fovRadian * 0.5) * 2.0;
        this.m_nearPlaneWidth = this.m_aspect * this.m_nearPlaneHeight;
      }

      this.m_viewInvertMat.copyFrom(this.m_viewMat);
      this.m_viewInvertMat.invert(); //

      this.m_vpMat.identity();
      this.m_vpMat.copyFrom(this.m_viewMat);
      this.m_vpMat.append(this.m_projMat);

      this.__calcTestParam(); // very very important !!!


      this.updateUniformData();
    }
  }

  updateCamMatToUProbe(uniformProbe) {
    if (uniformProbe.isEnabled()) {
      uniformProbe.update();
      uniformProbe.getFS32At(0).set(this.m_viewMat.getLocalFS32(), 0);
      uniformProbe.getFS32At(1).set(this.m_projMat.getLocalFS32(), 0);
    }
  }

  updateUniformData() {
    if (this.uniformEnabled) {
      this.updateCamMatToUProbe(this.matUProbe);
      this.ufrustumProbe.setVec4DataAt(0, this.m_zNear, this.m_zFar, this.m_nearPlaneHalfW, this.m_nearPlaneHalfH);
      this.ufrustumProbe.update();
      this.ucameraPosProbe.setVec4DataAt(0, this.m_camPos.x, this.m_camPos.y, this.m_camPos.z, 1.0);
      this.ucameraPosProbe.update();
    }
  }

  destroy() {}

  lookRHEnabled() {
    return this.m_lookRHEnabled;
  }

  lookLHEnabled() {
    return !this.m_lookRHEnabled;
  }

  getVPMatrix() {
    return this.m_vpMat;
  }

  getViewMatrix() {
    return this.m_viewMat;
  }

  getViewInvMatrix() {
    return this.m_viewInvertMat;
  }

  getProjectMatrix() {
    return this.m_projMat;
  }

}

exports.default = CameraBase;

/***/ }),

/***/ "c807":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

exports.Vector3D = Vector3D_1.default;

const Matrix4_1 = __importDefault(__webpack_require__("18c7"));

exports.Matrix4 = Matrix4_1.default;

const Color4_1 = __importDefault(__webpack_require__("3930"));

exports.Color4 = Color4_1.default;

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

exports.RendererDevice = RendererDevice_1.default;

const RendererState_1 = __importDefault(__webpack_require__("29ef"));

exports.RendererState = RendererState_1.default;

const RendererParam_1 = __importDefault(__webpack_require__("c497"));

exports.RendererParam = RendererParam_1.default;

const CoSimpleRendererScene_1 = __importDefault(__webpack_require__("3efb"));

exports.CoSimpleRendererScene = CoSimpleRendererScene_1.default;

const RawMesh_1 = __importDefault(__webpack_require__("1d40"));

const DisplayEntity_1 = __importDefault(__webpack_require__("402a"));

const Default3DMaterial_1 = __importDefault(__webpack_require__("f63e"));

const ShaderMaterial_1 = __importDefault(__webpack_require__("131b"));

const RenderableMaterialBlock_1 = __webpack_require__("1b95");

const RenderableEntityBlock_1 = __webpack_require__("251a");

const MaterialContextParam_1 = __webpack_require__("4301");

exports.MaterialContextParam = MaterialContextParam_1.MaterialContextParam;

const MaterialContext_1 = __webpack_require__("b4ea");

const ShaderCodeUUID_1 = __webpack_require__("f3a2");

exports.ShaderCodeUUID = ShaderCodeUUID_1.ShaderCodeUUID;

const MaterialPipeType_1 = __webpack_require__("5216");

exports.MaterialPipeType = MaterialPipeType_1.MaterialPipeType;

const Line3DMaterial_1 = __importDefault(__webpack_require__("32cc"));

function createVec3(px = 0.0, py = 0.0, pz = 0.0, pw = 1.0) {
  return new Vector3D_1.default(px, py, pz, pw);
}

exports.createVec3 = createVec3;

function createMat4(pfs32 = null, index = 0) {
  return new Matrix4_1.default(pfs32, index);
}

exports.createMat4 = createMat4;

function createColor4(pr = 1.0, pg = 1.0, pb = 1.0, pa = 1.0) {
  return new Color4_1.default(pr, pg, pb, pa);
}

exports.createColor4 = createColor4;

function applySceneBlock(rsecne) {
  let rscene = rsecne;

  if (rscene.materialBlock == null) {
    let materialBlock = new RenderableMaterialBlock_1.RenderableMaterialBlock();
    materialBlock.initialize();
    rscene.materialBlock = materialBlock;
  }

  if (rscene.entityBlock == null) {
    let entityBlock = new RenderableEntityBlock_1.RenderableEntityBlock();
    entityBlock.initialize();
    rscene.entityBlock = entityBlock;
  }
}

exports.applySceneBlock = applySceneBlock;

function createRendererSceneParam(div = null) {
  return new RendererParam_1.default(div);
}

exports.createRendererSceneParam = createRendererSceneParam;
let __$$$RenderScene = null;

function createRendererScene(rparam = null, renderProcessesTotal = 3, sceneBlockEnabled = true) {
  let sc = new CoSimpleRendererScene_1.default();

  if (rparam != null) {
    sc.initialize(rparam, 3);

    if (sceneBlockEnabled) {
      applySceneBlock(sc);
    }
  }

  __$$$RenderScene = sc;
  return sc;
}

exports.createRendererScene = createRendererScene;

function setRendererScene(rs) {
  __$$$RenderScene = rs;
}

exports.setRendererScene = setRendererScene;

function getRendererScene() {
  return __$$$RenderScene;
}

exports.getRendererScene = getRendererScene; // function createDataMesh(): IDataMesh {
// 	return new DataMesh();
// }

function createRawMesh() {
  return new RawMesh_1.default();
}

exports.createRawMesh = createRawMesh; // function createDataMeshFromModel(model: CoGeomDataType, material: MaterialBase = null, vbWhole: boolean = false): IDataMesh {
// 	const dataMesh = new DataMesh();
// 	dataMesh.vbWholeDataEnabled = vbWhole;
// 	dataMesh.setVS(model.vertices);
// 	dataMesh.setUVS(model.uvsList[0]);
// 	dataMesh.setNVS(model.normals);
// 	dataMesh.setIVS(model.indices);
// 	if(material != null) {
// 		dataMesh.setVtxBufRenderData(material);
// 		dataMesh.initialize();
// 	}
// 	return dataMesh;
// }

function createDefaultMaterial(normalEnabled = false) {
  let m = new Default3DMaterial_1.default();
  m.normalEnabled = normalEnabled;
  return m;
}

exports.createDefaultMaterial = createDefaultMaterial;

function createShaderMaterial(shd_uniqueName) {
  return new ShaderMaterial_1.default(shd_uniqueName);
}

exports.createShaderMaterial = createShaderMaterial; // function createDisplayEntityFromModel(model: CoGeomDataType, material: MaterialBase = null, vbWhole: boolean = false): ITransformEntity {
// 	if (material == null) {
// 		material = new Default3DMaterial();
// 		material.initializeByCodeBuf();
// 	}
// 	if (material.getCodeBuf() == null || material.getBufSortFormat() < 0x1) {
// 		throw Error("the material does not call the initializeByCodeBuf() function. !!!");
// 	}
// 	const dataMesh = new DataMesh();
// 	dataMesh.vbWholeDataEnabled = vbWhole;
// 	dataMesh.setVS(model.vertices);
// 	dataMesh.setUVS(model.uvsList[0]);
// 	dataMesh.setNVS(model.normals);
// 	dataMesh.setIVS(model.indices);
// 	dataMesh.setVtxBufRenderData(material);
// 	dataMesh.initialize();
// 	const entity = new DisplayEntity();
// 	entity.setMesh(dataMesh);
// 	entity.setMaterial(material);
// 	return entity;
// }

function createDisplayEntity() {
  return new DisplayEntity_1.default();
}

exports.createDisplayEntity = createDisplayEntity;

function createFreeAxis3DEntity(minV, maxV, transform = null) {
  let material = new Line3DMaterial_1.default(false);
  material.initializeByCodeBuf(false);
  let vs = new Float32Array([minV.x, 0, 0, maxV.x, 0, 0, 0, minV.y, 0, 0, maxV.y, 0, 0, 0, minV.z, 0, 0, maxV.z]);
  let colors = new Float32Array([1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1]);
  let mesh = new RawMesh_1.default();
  mesh.ivsEnabled = false;
  mesh.aabbEnabled = true;
  mesh.reset();
  mesh.setBufSortFormat(material.getBufSortFormat());
  mesh.addFloat32Data(vs, 3);
  mesh.addFloat32Data(colors, 3);
  mesh.initialize();
  mesh.toArraysLines();
  mesh.vtCount = Math.floor(vs.length / 3); // mesh.setPolyhedral( false );

  let axis = new DisplayEntity_1.default(transform);
  axis.setMaterial(material);
  axis.setMesh(mesh);
  return axis;
}

exports.createFreeAxis3DEntity = createFreeAxis3DEntity;

function createAxis3DEntity(size = 100.0, transform = null) {
  if (size < 0.0001) size = 0.0001;
  return createFreeAxis3DEntity(new Vector3D_1.default(), new Vector3D_1.default(size, size, size), transform);
}

exports.createAxis3DEntity = createAxis3DEntity;

function createCrossAxis3DEntity(size = 100.0, transform = null) {
  if (size < 0.0001) size = 0.0001;
  size *= 0.5;
  return createFreeAxis3DEntity(new Vector3D_1.default(-size, -size, -size), new Vector3D_1.default(size, size, size), transform);
}

exports.createCrossAxis3DEntity = createCrossAxis3DEntity;

function createMaterialContext() {
  return new MaterialContext_1.MaterialContext();
}

exports.createMaterialContext = createMaterialContext;

function creatMaterialContextParam() {
  return new MaterialContextParam_1.MaterialContextParam();
}

exports.creatMaterialContextParam = creatMaterialContextParam;

/***/ }),

/***/ "ca2f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class FileIO {
  constructor() {}

  downloadBinFile(binData, file_name, suffix = "vrd") {
    var downloadBlob, downloadURL; //console.log("downloadBinFile, binData: ", binData);

    downloadBlob = function (data, fileName, mimeType) {
      var blob, url;
      blob = new Blob([data], {
        type: mimeType
      });
      url = window.URL.createObjectURL(blob);
      downloadURL(url, fileName);
      setTimeout(function () {
        return window.URL.revokeObjectURL(url);
      }, 1000);
    };

    downloadURL = function (data, fileName) {
      var a;
      a = document.createElement('a');
      a.href = data;
      a.download = fileName;
      document.body.appendChild(a);
      a.style = 'display: none';
      a.click();
      a.remove();
    };

    downloadBlob(binData, file_name + '.' + suffix, 'application/octet-stream');
  }

}

exports.FileIO = FileIO;

/***/ }),

/***/ "ca6c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class BitConst {
  static PushThreeBitValueToInt(target, value) {
    return (target << 3) + value;
  }

  static PopThreeBitValueFromInt(target) {
    BitConst.value = 7 & target;
    return target >> 3;
  }

  static ContainsBit(target, bit) {
    return (bit & target) > 0;
  }

  static RemoveBit(target, bit) {
    return ~bit & target;
  }

  static AddBit(target, bit) {
    return bit | target;
  }

  static AssembleFromIntArray(intArray) {
    let bit = 0x0;
    let len = intArray.length;

    for (let i = 0; i < len; ++i) {
      if (intArray[i] > 0) {
        bit |= 1 << i;
      }
    }

    return bit;
  }

}

BitConst.BIT_ZERO = 0;
BitConst.BIT_ONE_0 = 1; //0b1

BitConst.BIT_ONE_1 = 1 << 1; //0b10

BitConst.BIT_ONE_2 = 1 << 2; //0b100

BitConst.BIT_ONE_3 = 1 << 3; //0b1000

BitConst.BIT_ONE_4 = 1 << 4; //0b10000

BitConst.BIT_ONE_5 = 1 << 5; //0b100000

BitConst.BIT_ONE_6 = 1 << 6; //0b1000000

BitConst.BIT_ONE_7 = 1 << 7; //0b10000000

BitConst.BIT_ONE_8 = 1 << 8; //0b100000000

BitConst.BIT_ONE_9 = 1 << 9; //0b1000000000

BitConst.BIT_ONE_10 = 1 << 10; //0b10000000000

BitConst.BIT_ONE_11 = 1 << 11; //0b100000000000

BitConst.value = 0;
exports.default = BitConst;

/***/ }),

/***/ "cb29":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const VtxBufConst_2 = __webpack_require__("8a0a");

const ROVertexBuffer_1 = __importDefault(__webpack_require__("e7d2"));

const RenderConst_1 = __webpack_require__("e08e");
/**
 * mesh(Polygon face convex mesh or Parametric geometry Objecct:):
 *      1.基于面(例如三角面)描述的多面体实体(Polygon face geometry mesh,for example: triangle mesh)
 *      2.基于空间几何方程描述的空间几何体(Parametric geometry Objecct,for example: Sphere(px,py,pz,radius))
*/


class MeshBase {
  constructor(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    this.m_bufDataUsage = 0;
    this.m_bufDataList = null;
    this.m_bufDataStepList = null;
    this.m_bufStatusList = null;
    this.m_bufTypeList = null;
    this.m_bufSizeList = null;
    this.m_polyhedral = true; //private m_isDyn:boolean = false;
    // very important!!!

    this.m_layoutBit = 0x0;
    this.m_transMatrix = null;
    this.m_vbuf = null;
    this.m_ivbuf = null;
    this.m_ivs = null; // setIVtxBuffer(ivbuf: ROIVertexBuffer): void {
    // }

    /**
     * 强制更新 vertex indices buffer 数据, 默认值为false
     */

    this.forceUpdateIVS = false;
    /**
     * 是否启用线框模式数据, 默认值为false
     */

    this.wireframe = false;
    /**
     * vtx positons bounds AABB in the local space
     */

    this.bounds = null;
    this.normalType = VtxBufConst_2.VtxNormalType.GOURAND;
    this.normalScale = 1.0;
    this.vtxTotal = 0;
    this.trisNumber = 0; //RenderDrawMode

    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLES; //  vtx postion in data stream used count

    this.vtCount = 0;
    this.vbWholeDataEnabled = true;
    this.drawInsBeginIndex = 0;
    this.drawInsStride = 0;
    this.drawInsTotal = 0;
    this.m_attachCount = 0;
    this.m_bufDataUsage = bufDataUsage; //this.m_isDyn = bufDataUsage == VtxBufConst.VTX_DYNAMIC_DRAW;
  }

  isUVSEnabled() {
    return this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_UVS_INDEX);
  }

  isNVSEnabled() {
    return this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_NVS_INDEX);
  }

  isCVSEnabled() {
    return this.isVBufEnabledAt(VtxBufConst_1.default.VBUF_CVS_INDEX);
  }

  toElementsTriangles() {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLES; // this.setPolyhedral(true);
  }

  toElementsTriangleStrip() {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLE_STRIP;
  }

  toElementsTriangleFan() {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLE_FAN;
  }

  toElementsInstancedTriangles() {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_INSTANCED_TRIANGLES;
  }

  toArraysLines() {
    this.drawMode = RenderConst_1.RenderDrawMode.ARRAYS_LINES;
    this.setPolyhedral(false);
  }

  toArraysLineStrip() {
    this.drawMode = RenderConst_1.RenderDrawMode.ARRAYS_LINE_STRIP;
    this.setPolyhedral(false);
  }

  toArraysPoints() {
    this.drawMode = RenderConst_1.RenderDrawMode.ARRAYS_POINTS;
    this.setPolyhedral(false);
  }

  toElementsLines() {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_LINES;
    this.setPolyhedral(false);
  }

  toDisable() {
    this.drawMode = RenderConst_1.RenderDrawMode.DISABLE;
    this.setPolyhedral(false);
  }

  createIVSBYSize(size) {
    return size > 65535 ? new Uint32Array(size) : new Uint16Array(size);
  }

  createIVSByArray(arr) {
    return arr.length > 65535 ? new Uint32Array(arr) : new Uint16Array(arr);
  }

  createWireframeIvs(ivs = null) {
    if (ivs == null) ivs = this.m_ivs;

    if (ivs !== null) {
      let len = ivs.length * 2;
      let wivs = len <= 65536 ? new Uint16Array(len) : new Uint32Array(len);
      let a;
      let b;
      let c;
      let k = 0;

      for (let i = 0, l = ivs.length; i < l; i += 3) {
        a = ivs[i + 0];
        b = ivs[i + 1];
        c = ivs[i + 2];
        wivs[k] = a;
        wivs[k + 1] = b;
        wivs[k + 2] = b;
        wivs[k + 3] = c;
        wivs[k + 4] = c;
        wivs[k + 5] = a;
        k += 6;
      }

      return wivs;
    }

    return null;
  }

  updateWireframeIvs() {
    this.toElementsTriangles();

    if (this.wireframe) {
      let wivs = this.createWireframeIvs();

      if (wivs != null) {
        this.m_ivs = this.createWireframeIvs();
      }

      this.toElementsLines();
    }
  }

  buildEnd() {
    this.m_vbuf.setBufTypeList(this.m_bufTypeList);
    this.m_vbuf.setBufSizeList(this.m_bufSizeList);
    this.m_bufDataList = ROVertexBuffer_1.default.BufDataList;
    this.m_bufDataStepList = ROVertexBuffer_1.default.BufDataStepList;
    this.m_bufStatusList = ROVertexBuffer_1.default.BufStatusList;
  }

  setTransformMatrix(matrix) {
    this.m_transMatrix = matrix;
  }

  getTransformMatrix() {
    return this.m_transMatrix;
  }
  /**
   * @return 返回true是则表示这是基于三角面的可渲染多面体, 返回false则是一个数学方程描述的几何体(例如球体).
   *         如果是多面体实体,则可以进行三角面的相关计算等操作, 如果不是则需要进行相关的几何算法计算.
   */


  isPolyhedral() {
    return this.m_polyhedral;
  } // 设置自身是否是多面体实体，根据实际需要改变相关的状态值


  setPolyhedral(polyhedral) {
    this.m_polyhedral = polyhedral;
  }
  /**
   * 射线和自身的相交检测(多面体或几何函数(例如球体))
   * @rlpv            表示物体坐标空间的射线起点
   * @rltv            表示物体坐标空间的射线朝向
   * @outV            如果检测相交存放物体坐标空间的交点
   * @boundsHit       表示是否包围盒体已经和射线相交了
   * @return          返回值 -1 表示不会进行检测,1表示相交,0表示不相交
   */


  testRay(rlpv, rltv, outV, boundsHit) {
    return -1;
  }

  rebuild() {
    if (this.m_vbuf == null) {
      if (this.m_bufDataList != null) {
        console.log("MeshBase::rebuild()...");
        ROVertexBuffer_1.default.Reset();
        let i = 0;
        let len = this.m_bufDataList.length;

        for (; i < len; ++i) {
          ROVertexBuffer_1.default.AddFloat32Data(this.m_bufDataList[i], this.m_bufDataStepList[i], this.m_bufStatusList[i]);
        }

        this.m_vbuf = ROVertexBuffer_1.default.CreateBySaveData(this.getBufDataUsage());

        if (this.m_ivs != null) {
          this.m_vbuf.setUintIVSData(this.m_ivs);
          this.vtCount = this.m_ivs.length;
        }
      }
    }
  }

  __$attachIVBuf() {
    return this.m_ivbuf;
  }

  __$detachIVBuf(ivbuf) {
    if (this.m_vbuf != ivbuf) {
      throw Error("Fatal Error!");
    } // ROVertexBuffer.__$$DetachAt(this.m_vbuf.getUid());

  }

  __$attachVBuf() {
    if (this.m_vbuf == null) {
      // rebuild vbuf;
      this.rebuild();
    }

    ROVertexBuffer_1.default.__$$AttachAt(this.m_vbuf.getUid());

    return this.m_vbuf;
  }

  __$detachVBuf(vbuf) {
    if (this.m_vbuf != vbuf) {
      throw Error("Fatal Error!");
    }

    ROVertexBuffer_1.default.__$$DetachAt(this.m_vbuf.getUid());
  }

  isGeomDynamic() {
    return true;
  }

  getBufDataUsage() {
    return this.m_bufDataUsage;
  }
  /**
   * @returns vertex position buffer Float32Array
   */


  getVS() {
    return null;
  }
  /**
   * @returns vertex uv buffer Float32Array
   */


  getUVS() {
    return null;
  }
  /**
   * @returns vertex normal buffer Float32Array
   */


  getNVS() {
    return null;
  }
  /**
   * @returns vertex vtx color(r,g,b) buffer Float32Array
   */


  getCVS() {
    return null;
  }
  /**
   * @returns vertex indices buffer Uint16Array or Uint32Array
   */


  getIVS() {
    return this.m_ivs;
  }

  setVtxBufRenderData(vtxData) {
    if (vtxData != null) {
      this.m_bufTypeList = vtxData.getBufTypeList();
      this.m_bufSizeList = vtxData.getBufSizeList();
      this.setBufSortFormat(vtxData.getBufSortFormat());
    }
  }
  /**
   * @param layoutBit vertex shader vertex attributes layout bit status.
   *                  the value of layoutBit comes from the material shdder program.
   */


  setBufSortFormat(layoutBit) {
    if (layoutBit < 1) {
      console.error("vertex layoutBit is the error value(0x" + layoutBit.toString(16) + ") in MeshBase::setBufSortFormat(), the material instance must initialize.");
    }

    this.m_layoutBit = layoutBit;
  }

  getBufSortFormat() {
    return this.m_layoutBit;
  }

  setBufTypeList(list) {
    this.m_bufTypeList = list;
  }

  setBufSizeList(list) {
    this.m_bufSizeList = list;
  }

  getBufTypeList() {
    return this.m_bufTypeList;
  }

  getBufSizeList() {
    return this.m_bufSizeList;
  }

  isVBufEnabledAt(i) {
    return (i & this.m_layoutBit) > 0;
  }

  __$attachThis() {
    ++this.m_attachCount; //console.log("MeshBase::__$attachThis() this.m_attachCount: "+this.m_attachCount);
  }

  __$detachThis() {
    if (this.m_attachCount == 1) {
      --this.m_attachCount; //console.log("MeshBase::__$detachThis() this.m_attachCount: "+this.m_attachCount);

      this.__$dispose();
    } else {
      --this.m_attachCount; //console.log("MeshBase::__$detachThis() this.m_attachCount: "+this.m_attachCount);
    }

    if (this.m_attachCount < 1) {
      this.m_attachCount = 0;
    }
  }

  getAttachCount() {
    return this.m_attachCount;
  } // 释放被外部对象持有的资源


  __$dispose() {
    if (this.getAttachCount() < 1 && this.m_vbuf != null) {
      //console.log("MeshBase::__$dispose()... this.m_attachCount: "+this.m_attachCount);
      ROVertexBuffer_1.default.__$$DetachAt(this.m_vbuf.getUid());

      this.m_vbuf = null;
    }
  }

  isEnabled() {
    return this.m_vbuf != null;
  }

  isResFree() {
    return this.getAttachCount() < 1 && this.m_vbuf == null;
  }
  /**
   * really destroy this instance all data
   */


  __$destroy() {
    if (this.isResFree()) {
      //console.log("MeshBase::__$destroy()... this.m_attachCount: "+this.m_attachCount);
      this.m_ivs = null;
      this.m_bufDataList = null;
      this.m_bufDataStepList = null;
      this.m_bufStatusList = null;
      this.trisNumber = 0;
      this.m_transMatrix = null;
      this.m_bufTypeList = null;
      this.m_bufSizeList = null;
    }
  }

  toString() {
    return "[MeshBase()]";
  }

}

exports.default = MeshBase;

/***/ }),

/***/ "cc48":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SpaceCullingMask;

(function (SpaceCullingMask) {
  SpaceCullingMask[SpaceCullingMask["NONE"] = 0] = "NONE"; // 需要做摄像机的可见剔除

  SpaceCullingMask[SpaceCullingMask["CAMERA"] = 1] = "CAMERA"; // project occlusion volume

  SpaceCullingMask[SpaceCullingMask["POV"] = 2] = "POV"; // 包含在遮挡体内部的不会进行遮挡剔除计算

  SpaceCullingMask[SpaceCullingMask["INNER_POV_PASS"] = 3] = "INNER_POV_PASS"; // 摄像机和POV都要做遮挡剔除

  SpaceCullingMask[SpaceCullingMask["CAMERA_AND_POV"] = 4] = "CAMERA_AND_POV";
})(SpaceCullingMask || (SpaceCullingMask = {}));

exports.SpaceCullingMask = SpaceCullingMask;

/***/ }),

/***/ "cc55":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class ShaderCodeObject {
  constructor() {
    this.vert = "";
    this.vert_head = "";
    this.vert_body = "";
    this.frag = "";
    this.frag_head = "";
    this.frag_body = "";
    this.uuid = "";
  }

}

exports.ShaderCodeObject = ShaderCodeObject;

/***/ }),

/***/ "cc7a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EulerOrder;

(function (EulerOrder) {
  EulerOrder[EulerOrder["XYZ"] = 0] = "XYZ";
  EulerOrder[EulerOrder["YZX"] = 1] = "YZX";
  EulerOrder[EulerOrder["ZXY"] = 2] = "ZXY";
  EulerOrder[EulerOrder["XZY"] = 3] = "XZY";
  EulerOrder[EulerOrder["YXZ"] = 4] = "YXZ";
  EulerOrder[EulerOrder["ZYX"] = 5] = "ZYX";
})(EulerOrder || (EulerOrder = {}));

exports.EulerOrder = EulerOrder;

/***/ }),

/***/ "ccdf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const RTTTextureProxy_1 = __importDefault(__webpack_require__("cfaf"));

const DepthTextureProxy_1 = __importDefault(__webpack_require__("acaa"));

const WrapperTextureProxy_1 = __importDefault(__webpack_require__("85b6"));

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));
/**
 * 本类作为所有RTT纹理对象的管理类
 */


class RTTTextureStore {
  constructor(renderProxy) {
    this.m_renderProxy = null; // reusable rtt texture resources for one renderer context

    this.m_rttTexs = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    this.m_rttCubeTexs = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    this.m_rttFloatTexs = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    this.m_rttDepthTexs = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    this.m_renderProxy = renderProxy;
  }

  getRenderProxy() {
    return this.m_renderProxy;
  }

  createWrapperTex(pw, ph, powerof2Boo = false) {
    let tex = new WrapperTextureProxy_1.default(pw, ph, powerof2Boo);
    return tex;
  }

  createRTTTex2D(pw, ph, powerof2Boo = false) {
    let tex = new RTTTextureProxy_1.default(pw, ph, powerof2Boo);
    return tex;
  }

  createDepthTex2D(pw, ph, powerof2Boo = false) {
    let tex = new DepthTextureProxy_1.default(pw, ph, powerof2Boo);
    return tex;
  }

  getCubeRTTTextureAt(i) {
    if (this.m_rttCubeTexs[i] != null) {
      this.m_rttCubeTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttCubeTexs[i];
    }

    this.m_rttCubeTexs[i] = this.createRTTTex2D(32, 32);
    this.m_rttCubeTexs[i].toCubeTexture();
    this.m_rttCubeTexs[i].name = "sys_cube_rttTex_" + i;
    this.m_rttCubeTexs[i].minFilter = TextureConst_1.default.LINEAR;
    this.m_rttCubeTexs[i].magFilter = TextureConst_1.default.LINEAR;

    this.m_rttCubeTexs[i].__$setRenderProxy(this.m_renderProxy);

    return this.m_rttCubeTexs[i];
  }

  createCubeRTTTextureAt(i, pw, ph) {
    pw = pw > 1 ? pw : 1;
    ph = ph > 1 ? ph : 1;

    if (this.m_rttCubeTexs[i] != null) {
      this.m_rttCubeTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttCubeTexs[i];
    }

    this.m_rttCubeTexs[i] = this.createRTTTex2D(pw, ph);
    this.m_rttCubeTexs[i].toCubeTexture();
    this.m_rttCubeTexs[i].name = "sys_cube_rttTex_" + i;
    this.m_rttCubeTexs[i].minFilter = TextureConst_1.default.LINEAR;
    this.m_rttCubeTexs[i].magFilter = TextureConst_1.default.LINEAR;

    this.m_rttCubeTexs[i].__$setRenderProxy(this.m_renderProxy);

    return this.m_rttCubeTexs[i];
  }

  getRTTTextureAt(i) {
    if (this.m_rttTexs[i] != null) {
      this.m_rttTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttTexs[i];
    }

    this.m_rttTexs[i] = this.createRTTTex2D(32, 32);
    this.m_rttTexs[i].to2DTexture();
    this.m_rttTexs[i].name = "sys_rttTex_" + i;
    this.m_rttTexs[i].minFilter = TextureConst_1.default.LINEAR;
    this.m_rttTexs[i].magFilter = TextureConst_1.default.LINEAR;

    this.m_rttTexs[i].__$setRenderProxy(this.m_renderProxy);

    return this.m_rttTexs[i];
  }

  createRTTTextureAt(i, pw, ph) {
    pw = pw > 1 ? pw : 1;
    ph = ph > 1 ? ph : 1;

    if (this.m_rttTexs[i] != null) {
      this.m_rttTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttTexs[i];
    }

    this.m_rttTexs[i] = this.createRTTTex2D(pw, ph);
    this.m_rttTexs[i].to2DTexture();
    this.m_rttTexs[i].name = "sys_rttTex_" + i;
    this.m_rttTexs[i].minFilter = TextureConst_1.default.LINEAR;
    this.m_rttTexs[i].magFilter = TextureConst_1.default.LINEAR;

    this.m_rttTexs[i].__$setRenderProxy(this.m_renderProxy);

    return this.m_rttTexs[i];
  }

  getDepthTextureAt(i) {
    if (this.m_rttDepthTexs[i] != null) {
      this.m_rttDepthTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttDepthTexs[i];
    }

    this.m_rttDepthTexs[i] = this.createDepthTex2D(64, 64);
    this.m_rttDepthTexs[i].to2DTexture();
    this.m_rttDepthTexs[i].name = "sys_depthTex_" + i;
    this.m_rttDepthTexs[i].minFilter = TextureConst_1.default.NEAREST;
    this.m_rttDepthTexs[i].magFilter = TextureConst_1.default.NEAREST;

    this.m_rttDepthTexs[i].__$setRenderProxy(this.m_renderProxy);

    return this.m_rttDepthTexs[i];
  }

  createDepthTextureAt(i, pw, ph) {
    pw = pw > 1 ? pw : 1;
    ph = ph > 1 ? ph : 1;

    if (this.m_rttDepthTexs[i] != null) {
      this.m_rttDepthTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttDepthTexs[i];
    }

    this.m_rttDepthTexs[i] = this.createDepthTex2D(pw, ph);
    this.m_rttDepthTexs[i].to2DTexture();
    this.m_rttDepthTexs[i].name = "sys_depthTex_" + i;

    this.m_rttDepthTexs[i].__$setRenderProxy(this.m_renderProxy);

    return this.m_rttDepthTexs[i];
  }

  getRTTFloatTextureAt(i) {
    if (this.m_rttFloatTexs[i] != null) {
      this.m_rttFloatTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttFloatTexs[i];
    }

    let tex = this.createRTTTex2D(64, 64);
    tex.to2DTexture();
    this.m_rttFloatTexs[i] = tex;
    this.m_rttFloatTexs[i].name = "sys_rttFloatTex_" + i;
    tex.internalFormat = TextureFormat_1.default.RGBA16F;
    tex.srcFormat = TextureFormat_1.default.RGBA;
    tex.dataType = TextureDataType_1.default.FLOAT;
    tex.minFilter = TextureConst_1.default.NEAREST;
    tex.magFilter = TextureConst_1.default.NEAREST;

    if (RendererDevice_1.default.IsWebGL1()) {
      tex.dataType = TextureDataType_1.default.HALF_FLOAT_OES;
    }

    this.m_rttFloatTexs[i].__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

  createRTTFloatTextureAt(i, pw, ph) {
    pw = pw > 1 ? pw : 1;
    ph = ph > 1 ? ph : 1;

    if (this.m_rttFloatTexs[i] != null) {
      this.m_rttFloatTexs[i].__$setRenderProxy(this.m_renderProxy);

      return this.m_rttFloatTexs[i];
    }

    let tex = this.createRTTTex2D(pw, ph);
    tex.to2DTexture();
    this.m_rttFloatTexs[i] = tex;
    this.m_rttFloatTexs[i].name = "sys_rttFloatTex_" + i;
    tex.internalFormat = TextureFormat_1.default.RGBA16F;
    tex.srcFormat = TextureFormat_1.default.RGBA;
    tex.dataType = TextureDataType_1.default.FLOAT;
    tex.minFilter = TextureConst_1.default.NEAREST;
    tex.magFilter = TextureConst_1.default.NEAREST;

    if (RendererDevice_1.default.IsWebGL1()) {
      tex.dataType = TextureDataType_1.default.HALF_FLOAT_OES;
    }

    this.m_rttFloatTexs[i].__$setRenderProxy(this.m_renderProxy);

    return tex;
  }

}

exports.RTTTextureStore = RTTTextureStore;

/***/ }),

/***/ "cfaf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureTarget_1 = __importDefault(__webpack_require__("5deb"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class RTTTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_type = TextureProxyType_1.TextureProxyType.RTT;
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
  }

  to2DTexture() {
    this.m_texTarget = TextureTarget_1.default.TEXTURE_2D;
  }

  toCubeTexture() {
    this.m_texTarget = TextureTarget_1.default.TEXTURE_CUBE;
  }

  setSize(fboTextureWidth, fboTextureHeight) {
    this.m_texWidth = fboTextureWidth;
    this.m_texHeight = fboTextureHeight;
  }

  enableMipmap() {
    this.minFilter = TextureConst_1.default.LINEAR_MIPMAP_LINEAR;
    this.magFilter = TextureConst_1.default.LINEAR;
    this.mipmapEnabled = true;
  }

  disableMipmap() {
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.mipmapEnabled = false;
  }

  uploadFromFbo(texResource, fboWidth, fboHeight) {
    let gl = texResource.getRC();
    let mEnabled = this.mipmapEnabled;
    this.mipmapEnabled = false;

    if (!texResource.hasResUid(this.getResUid())) {
      this.m_sampler = TextureTarget_1.default.GetValue(gl, this.m_texTarget);
      this.createTexBuf(texResource);
      texResource.bindToGpu(this.getResUid());
      this.bindTexture(gl, fboWidth, fboHeight);
      this.m_haveRData = true;
      this.m_texWidth = fboWidth;
      this.m_texHeight = fboHeight;

      this.__$buildParam(gl);
    } else if (this.getBufWidth() != fboWidth || this.getBufHeight() != fboHeight) {
      texResource.bindToGpu(this.getResUid());
      this.bindTexture(gl, fboWidth, fboHeight);
      this.m_texWidth = fboWidth;
      this.m_texHeight = fboHeight;

      this.__$buildParam(gl);
    }

    this.mipmapEnabled = mEnabled;
  }

  bindTexture(rgl, fboWidth, fboHeight) {
    let interType = TextureFormat_1.default.ToGL(rgl, this.internalFormat);
    let format = TextureFormat_1.default.ToGL(rgl, this.srcFormat);
    let type = TextureDataType_1.default.ToGL(rgl, this.dataType); //console.log(this,", fboWidth, fboHeight: ",fboWidth, fboHeight, interType,format);

    switch (this.m_texTarget) {
      case TextureTarget_1.default.TEXTURE_2D:
        rgl.texImage2D(rgl.TEXTURE_2D, 0, interType, fboWidth, fboHeight, 0, format, type, null);
        break;

      case TextureTarget_1.default.TEXTURE_CUBE:
        for (let i = 0; i < 6; ++i) {
          rgl.texImage2D(rgl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, interType, fboWidth, fboHeight, 0, format, type, null);
        }

        break;

      case TextureTarget_1.default.TEXTURE_SHADOW_2D:
        rgl.texImage2D(rgl.TEXTURE_2D, 0, rgl.DEPTH_COMPONENT16, fboWidth, fboHeight, 0, rgl.DEPTH_COMPONENT, rgl.FLOAT, null);
        break;

      default:
        break;
    }
  }

  toString() {
    return "[RTTTextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = RTTTextureProxy;

/***/ }),

/***/ "d08b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class VtxBufRenderData {
  constructor() {}

  getBufSortFormat() {
    return 0x7;
  }

  getBufTypeList() {
    return [1, 2, 3];
  }

  getBufSizeList() {
    return [3, 2, 3];
  }

}

exports.VtxBufRenderData = VtxBufRenderData;

/***/ }),

/***/ "d314":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

const TextureProxyType_1 = __webpack_require__("7918");

const TextureTarget_1 = __importDefault(__webpack_require__("5deb"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class ImageCubeTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight) {
    super(texWidth, texHeight, false);
    this.m_imgDataList = null;
    this.m_texTarget = TextureTarget_1.default.TEXTURE_CUBE;
    this.m_type = TextureProxyType_1.TextureProxyType.ImageCube;
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.dataType = TextureDataType_1.default.UNSIGNED_BYTE;
    this.mipmapEnabled = true;
  }

  setDataFromImageToFaceAt(index, img, miplevel = 0) {
    if (img != null) {
      if (this.m_imgDataList == null) {
        this.m_imgDataList = [null, null, null, null, null, null];
      }

      if (img.width > 0 && img.height > 0) {
        if (index == 0) {
          this.m_texWidth = img.width;
          this.m_texHeight = img.height;
          this.m_miplevel = miplevel;
        }

        this.m_imgDataList[index] = {
          imgData: img,
          miplevel: miplevel
        };
        this.m_haveRData = this.m_imgDataList[index] != null;
      }
    }
  }

  uploadData(texRes) {
    let gl = texRes.getRC();
    let imo = null;

    for (let i = 0; i < 6; ++i) {
      imo = this.m_imgDataList[i];
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.m_miplevel, TextureFormat_1.default.ToGL(gl, this.internalFormat), TextureFormat_1.default.ToGL(gl, this.srcFormat), TextureDataType_1.default.ToGL(gl, this.dataType), imo.imgData);
    }
  }

  toString() {
    return "[ImageCubeTextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      if (this.m_imgDataList != null) {
        for (let i = 0; i < 6; ++i) {
          if (this.m_imgDataList[i] != null) {
            this.m_imgDataList[i].imgData = null;
          }
        }
      }

      console.log("ImageCubeTextureProxy::destroy(), destroy a ImageCubeTextureProxy instance...");

      super.__$destroy();
    }
  }

}

exports.default = ImageCubeTextureProxy;

/***/ }),

/***/ "d7e2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2019-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));
/**
 * 在 renderer process 中 通过和摄像机之间的距离, 对可渲染对象渲染先后顺序的排序
 */


class CameraDsistanceSorter {
  constructor(rc) {
    this.m_rc = null;
    this.m_rc = rc;
  }

  sortRODisplay(nodes, nodesTotal) {
    let camPos = this.m_rc.getCamera().getPosition();

    for (let i = 0; i < nodesTotal; ++i) {
      nodes[i].value = -Vector3D_1.default.DistanceSquared(nodes[i].bounds.center, camPos); //nodes[i].value = nodes[i].pos.y;
    }

    return 0;
  }

}

exports.default = CameraDsistanceSorter;

/***/ }),

/***/ "da6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class TextureResSlot {
  constructor() {
    this.m_texResource = null;
    this.m_bufferUpdater = null;
    this.m_textureTotal = 0;
    this.m_textureMap = new Map();
    this.m_freeMap = new Map();
    this.m_texUid = 0;
    this.m_freeUids = [];

    if (TextureResSlot.s_ins != null) {
      throw Error("This Class is a singleton class!!!");
    }

    TextureResSlot.s_ins = null;
  }

  static GetInstance() {
    if (TextureResSlot.s_ins != null) {
      return TextureResSlot.s_ins;
    }

    TextureResSlot.s_ins = new TextureResSlot();
    return TextureResSlot.s_ins;
  }

  getFreeUid() {
    if (this.m_freeUids.length > 0) {
      return this.m_freeUids.pop();
    }

    let uid = this.m_texUid++;
    return uid;
  }
  /**
   * 将texture实例添加到统一管理的 TextureResSlot中
   * 这个函数不允许其他地方调用
   */


  __$$addTexture(texture) {
    if (texture != null && !this.m_textureMap.has(texture.getUid())) {
      this.m_textureMap.set(texture.getUid(), texture);
      this.m_textureTotal++;
    }
  }

  getTextureByUid(uid) {
    return this.m_textureMap.get(uid);
  }

  hasTextureByUid(uid) {
    return this.m_textureMap.has(uid);
  }

  removeTextureByUid(uid) {
    if (this.m_textureMap.has(uid)) {
      let tex = this.m_textureMap.get(uid);

      if (tex.getAttachCount() < 1) {
        if (this.m_freeMap.has(uid)) {
          this.m_freeMap.delete(uid);
        }

        tex.__$destroy();

        tex.__$$removeFromSlot();

        this.m_textureMap.delete(uid);
        this.m_freeUids.push(uid);
        this.m_textureTotal--;
        return tex;
      }
    }

    return null;
  }
  /**
   * @returns get runtime all textures amount
   */


  getTextureTotal() {
    return this.m_textureTotal;
  }

  setRenderProxy(renderProxy) {
    this.m_texResource = renderProxy.Texture;
  }

  setBufferUpdater(bufferUpdater) {
    this.m_bufferUpdater = bufferUpdater;
  }

  getFreeResUidMap() {
    return this.m_freeMap;
  }

  isGpuEnabledByResUid(resUid) {
    return this.m_texResource.hasResUid(resUid);
  } // 先使用map hash拦截的方式,来决定buf和renderer context避免重复的单次关联


  addRenderBuffer(buf, bufResUid) {
    if (this.m_bufferUpdater != null) {
      this.m_bufferUpdater.__$addBuf(buf, bufResUid);
    }
  }

  addFreeUid(uid) {
    this.m_freeMap.set(uid, 0);
  }

  removeFreeUid(uid) {
    if (this.m_freeMap.has(uid)) {
      this.m_freeMap.delete(uid);
    }
  }

}

TextureResSlot.s_ins = null;
exports.default = TextureResSlot;

/***/ }),

/***/ "dc2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/
// 只是用于视觉表现上的渲染控制, 而和transform或者非渲染的逻辑无关
// 一个 RODisplay 和一个 IRPODisplay一一对应, 一个RODisplay也只会和一个renderer相关联

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RenderConst_1 = __webpack_require__("e08e");

const RendererState_1 = __importDefault(__webpack_require__("29ef"));

class RODisplay {
  constructor() {
    this.m_uid = 0;
    this.m_partGroup = null;
    this.m_trans = null;
    this.m_material = null; // 只是持有引用不做任何管理操作

    this.m_matFS32 = null;
    this.name = "RODisplay"; // render yes or no

    this.visible = true;
    this.ivsIndex = 0;
    this.ivsCount = 0; // only use in drawElementsInstanced()...

    this.trisNumber = 0;
    this.insCount = 0;
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLES;
    this.vbuf = null;
    this.ivbuf = null; // record render state: shadowMode(one byte) + depthTestMode(one byte) + blendMode(one byte) + cullFaceMode(one byte)
    // its value come from: RendererState.CreateRenderState("default", CullFaceMode.BACK,RenderBlendMode.NORMAL,DepthTestMode.OPAQUE);

    this.renderState = RendererState_1.default.NORMAL_STATE;
    this.rcolorMask = RendererState_1.default.COLOR_MASK_ALL_TRUE; // mouse interaction enabled flag

    this.mouseEnabled = false; // 只能由渲染系统内部调用

    this.__$ruid = -1; // 用于关联IRPODisplay对象

    this.__$rpuid = -1; // 用于关联RPONode对象

    this.__$$rsign = RenderConst_1.DisplayRenderSign.NOT_IN_RENDERER;
    this.__$$runit = null;
    this.m_uid = RODisplay.s_uid++;
  }

  getVtxResUid() {
    let v = 131 + this.vbuf.getUid();

    if (this.ivbuf == null) {
      return v;
    }

    console.log("RODisplay::getVtxResUid() apply this.ivbuf now.....");
    return v * 131 + this.ivbuf.getUid();
  }

  getVtxResVer() {
    let v = 131 + this.vbuf.version;

    if (this.ivbuf == null) {
      return v;
    }

    return v = v * 131 + this.ivbuf.version;
  } // draw parts group: [ivsCount0,ivsIndex0, ivsCount1,ivsIndex1, ivsCount2,ivsIndex2, ...]


  getPartGroup() {
    return this.m_partGroup;
  }

  createPartGroup(partsTotal) {
    if (partsTotal < 1) {
      partsTotal = 1;
    }

    this.m_partGroup = new Uint16Array(partsTotal * 2);
  }

  setDrawPartAt(index, ivsIndex, ivsCount) {
    index *= 2;
    this.m_partGroup[index] = ivsCount;
    this.m_partGroup[++index] = ivsIndex;
  }

  getUid() {
    return this.m_uid;
  }

  setTransform(trans) {
    this.m_trans = trans;
    this.m_matFS32 = trans.getLocalFS32();
  }

  getTransform() {
    return this.m_trans;
  }

  getMatrixFS32() {
    return this.m_matFS32;
  }

  enableDrawInstanced(offset, instanceCount) {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_INSTANCED_TRIANGLES;
    this.ivsIndex = offset;
    this.insCount = instanceCount;
  }

  disableDrawInstanced() {
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLES;
  }

  getMaterial() {
    return this.m_material;
  }

  setMaterial(m) {
    if (this.m_material != null) {
      if (this.m_material != m) {
        this.m_material.__$detachThis();

        if (m != null) {
          m.__$attachThis();
        }
      }
    }

    this.m_material = m;
  }

  copyFrom(display) {
    this.vbuf = display.vbuf;
    this.ivsIndex = display.ivsIndex;
    this.ivsCount = display.ivsCount;
    this.setMaterial(display.getMaterial());
  }

  toString() {
    return "RODisplay(name=" + this.name + ",uid=" + this.getUid() + ", __$ruid=" + this.__$ruid + ")";
  }

  destroy() {
    // 如果只有自己持有 this.m_material, 则destroy this.m_material
    // 这里还需要优化
    if (this.m_material != null) {
      this.m_material.__$detachThis();

      this.m_material.destroy();
      this.m_material = null;
    }

    this.m_matFS32 = null;
    this.vbuf = null;
    this.__$ruid = -1;
    this.__$rpuid = -1;
    this.__$$rsign = RenderConst_1.DisplayRenderSign.NOT_IN_RENDERER;
    this.ivsIndex = 0;
    this.ivsCount = 0;
    this.m_partGroup = null;
    this.__$$runit = null;
  }

  static GetFreeId() {
    if (RODisplay.m_freeIdList.length > 0) {
      return RODisplay.m_freeIdList.pop();
    }

    return -1;
  }

  static GetByUid(uid) {
    return RODisplay.m_unitList[uid];
  }

  static IsEnabledByUid(uid) {
    return RODisplay.m_unitFlagList[uid] == RODisplay.s_FLAG_BUSY;
  }

  static Create() {
    let unit = null;
    let index = RODisplay.GetFreeId(); //console.log("RODisplay::Create(), RODisplay.m_unitList.length: "+RODisplay.m_unitList.length);

    if (index >= 0) {
      unit = RODisplay.m_unitList[index];
      RODisplay.m_unitFlagList[index] = RODisplay.s_FLAG_BUSY;
    } else {
      unit = new RODisplay();
      RODisplay.m_unitList.push(unit);
      RODisplay.m_unitFlagList.push(RODisplay.s_FLAG_BUSY);
      RODisplay.m_unitListLen++;
    }

    return unit;
  }

  static Restore(pdisp) {
    if (pdisp != null && RODisplay.m_unitFlagList[pdisp.getUid()] == RODisplay.s_FLAG_BUSY) {
      let uid = pdisp.getUid();
      RODisplay.m_freeIdList.push(uid);
      RODisplay.m_unitFlagList[uid] = RODisplay.s_FLAG_FREE;
      pdisp.destroy();
    }
  }

}

RODisplay.s_uid = 0;
RODisplay.s_FLAG_BUSY = 1;
RODisplay.s_FLAG_FREE = 0;
RODisplay.m_unitFlagList = [];
RODisplay.m_unitListLen = 0;
RODisplay.m_unitList = [];
RODisplay.m_freeIdList = [];
exports.default = RODisplay;

/***/ }),

/***/ "df25":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const RawTexData_1 = __importDefault(__webpack_require__("68aa"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class RawDataTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_bytes = null;
    this.m_subDataList = null;
    this.m_texDatasLen = 0;
    this.m_texData = null;
    this.m_texDatas = null;
    this.minFilter = TextureConst_1.default.LINEAR;
  }
  /**
   * 设置 Bytes 纹理的纹理数据
   */


  setDataFromBytes(bytes, miplevel = 0, imgWidth = -1, imgHeight = -1, offsetx = 0, offsety = 0, rebuild = false) {
    if (bytes != null && imgWidth > 0 && imgHeight > 0) {
      if (miplevel < 0) miplevel = 0;
      if (miplevel > 15) miplevel = 15;

      if (miplevel >= this.m_texDatasLen) {
        this.m_texDatasLen = miplevel + 1;
      }

      this.m_haveRData = true;
      let td = this.m_texData;

      if (td != null) {
        if (this.m_texData.miplevel != miplevel) {
          if (this.m_texDatas == null) this.m_texDatas = [this.m_texData, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
          td = this.m_texDatas[miplevel];

          if (td == null) {
            td = RawTexData_1.default.Create();
            td.miplevel = miplevel;
            rebuild = true;
            this.m_texDatas[miplevel] = td;
          }
        }
      } else {
        this.m_texData = td = RawTexData_1.default.Create();
        td.miplevel = miplevel;
        rebuild = true;
      }

      if (td.data != bytes || td.offsetx != offsetx || td.offsety != offsety) {
        if (miplevel == 0) {
          this.m_texWidth = imgWidth;
          this.m_texHeight = imgHeight;
          this.m_bytes = bytes;
        }

        td.data = bytes;
        td.status = 0; // 0表示 更新纹理数据而不会重新开辟空间, 1表示需要重新开辟空间并更新纹理数据, -1表示不需要更新

        if (td.width < imgWidth || td.height < imgHeight || rebuild) {
          td.width = imgWidth;
          td.height = imgHeight;
          td.status = 1;
        }

        td.offsetx = offsetx;
        td.offsety = offsety;
      }

      this.version++;
    } else {
      console.error("bytes != null: " + (bytes != null) + ",imgWidth > 0: " + (imgWidth > 0) + ",imgHeight > 0: " + (imgHeight > 0));
    }
  }

  uploadData(texRes) {
    if (this.m_texData != null) {
      this.dataUploadToGpu(texRes.getRC(), this.m_texData, this.m_texDatas, true);
    }
  }

  __$updateToGpu(texRes) {
    // 这里之所以用这种方式判断，是为了运行时支持多 gpu context
    //console.log("RawDataTexture,__$updateToGpu, version: ",this.version,",resHas("+this.getResUid()+"):",texRes.hasResUid(this.getResUid()));
    if (this.version > 0 && texRes.hasResUid(this.getResUid())) {
      let gl = texRes.getRC();
      let len = this.m_subDataList != null ? this.m_subDataList.length : 0;

      this.__$updateToGpuBegin(texRes);

      if (len > 0) {
        let i = 0;
        let d = null;
        let interType = TextureFormat_1.default.ToGL(gl, this.internalFormat);
        let format = TextureFormat_1.default.ToGL(gl, this.srcFormat);
        let type = TextureDataType_1.default.ToGL(gl, this.dataType);

        for (; i < len; ++i) {
          d = this.m_subDataList.pop();
          d.updateToGpu(gl, this.m_sampler, interType, format, type, false);
          RawTexData_1.default.Restore(d);
        } //concole.log("#####upload sub texture pix data!");

      }

      if (this.m_texData != null) {
        this.dataUploadToGpu(gl, this.m_texData, this.m_texDatas);

        this.__$buildParam(gl);

        this.m_generateMipmap = true;
      }

      this.__$updateToGpuEnd(gl);
    }
  } // 对mipmap level 的纹理数据的部分更新


  setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel = 0) {
    if (this.m_subDataList == null) {
      this.m_subDataList = [];
    }

    let d = RawTexData_1.default.Create();
    d.data = bytes;
    d.status = 0;
    d.miplevel = miplevel;
    d.offsetx = px;
    d.offsety = py;
    d.width = twidth;
    d.height = theight; //console.log("setPartDataFromeBytes, pos("+px+","+py+"),size("+twidth+","+twidth+")");

    this.m_subDataList.push(d);
    this.version++;
  }

  getPixels(px, py, pw, ph, outBytes) {
    if (this.m_bytes != null && outBytes != null) {
      let segSize = this.unpackAlignment;
      let s = pw * ph * segSize;

      if (outBytes.length == s) {
        let i = py;
        let j = px;
        let i_max = i + ph;
        let j_max = j + pw;
        let k = 0;

        switch (this.srcFormat) {
          case TextureFormat_1.default.ALPHA:
            for (; i < i_max; ++i) {
              for (j = px; j < j_max; ++j) {
                s = i * this.m_texWidth + j;
                outBytes[k] = this.m_bytes[s];
                k++;
              }
            }

            break;

          case TextureFormat_1.default.RGBA:
            for (; i < i_max; ++i) {
              for (j = px; j < j_max; ++j) {
                s = (i * this.m_texWidth + j) * segSize;
                outBytes[k] = this.m_bytes[s];
                outBytes[k + 1] = this.m_bytes[s + 1];
                outBytes[k + 2] = this.m_bytes[s + 2];
                outBytes[k + 3] = this.m_bytes[s + 3];
                k++;
              }
            }

            break;

          case TextureFormat_1.default.RGB:
            for (; i < i_max; ++i) {
              for (j = px; j < j_max; ++j) {
                s = (i * this.m_texWidth + j) * segSize;
                outBytes[k] = this.m_bytes[s];
                outBytes[k + 1] = this.m_bytes[s + 1];
                outBytes[k + 2] = this.m_bytes[s + 2];
                k++;
              }
            }

            break;

          default:
            break;
        }
      } else {
        console.warn("outBytes.length != (pw * ph * pixelSegSize)");
      }
    }
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      this.version = 0;

      if (this.m_texDatas != null) {
        for (let i = 0; i < this.m_texDatasLen; ++i) {
          RawTexData_1.default.Restore(this.m_texDatas[i]);
        }

        this.m_texDatasLen = 0;
        this.m_texDatas = null;
        this.m_texData = null;
      }

      if (this.m_texData != null) {
        RawTexData_1.default.Restore(this.m_texData);
        this.m_texData = null;
      }

      this.m_bytes = null;
      console.log("RawDataTextureProxy::destroy(), destroy a RawDataTextureProxy instance...");

      super.__$destroy();
    }
  }

  toString() {
    return "[RawDataTextureProxy(width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = RawDataTextureProxy;

/***/ }),

/***/ "e08e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class RenderDrawMode {}

RenderDrawMode.ELEMENTS_TRIANGLES = 1;
RenderDrawMode.ELEMENTS_TRIANGLE_STRIP = 2;
RenderDrawMode.ELEMENTS_TRIANGLE_FAN = 3;
RenderDrawMode.ELEMENTS_INSTANCED_TRIANGLES = 4;
RenderDrawMode.ARRAYS_LINES = 5;
RenderDrawMode.ARRAYS_LINE_STRIP = 6;
RenderDrawMode.ARRAYS_POINTS = 7;
RenderDrawMode.ELEMENTS_LINES = 8;
RenderDrawMode.DISABLE = 0;
exports.RenderDrawMode = RenderDrawMode; // blend mode

class RenderBlendMode {}

RenderBlendMode.NORMAL = 1;
RenderBlendMode.OPAQUE = 1;
RenderBlendMode.TRANSPARENT = 2;
RenderBlendMode.ALPHA_ADD = 3;
RenderBlendMode.ADD = 4;
RenderBlendMode.ADD_LINEAR = 5;
RenderBlendMode.INVERSE_ALPHA = 6;
RenderBlendMode.BLAZE = 7;
RenderBlendMode.OVERLAY = 8;
RenderBlendMode.OVERLAY2 = 8;
RenderBlendMode.DISABLE = 0;
exports.RenderBlendMode = RenderBlendMode;
/**
 * gl.NEVER:           Never pass.
 * gl.LESS:            Pass if (ref & mask) <  (stencil & mask).
 * gl.EQUAL:           Pass if (ref & mask) =  (stencil & mask).
 * gl.LEQUAL:          Pass if (ref & mask) <= (stencil & mask).
 * gl.GREATER:         Pass if (ref & mask) >  (stencil & mask).
 * gl.NOTEQUAL:        Pass if (ref & mask) != (stencil & mask).
 * gl.GEQUAL:          Pass if (ref & mask) >= (stencil & mask).
 * gl.ALWAYS:          Always pass.
 */

class GLStencilFunc {}

GLStencilFunc.NEVER = 1;
GLStencilFunc.LESS = 1;
GLStencilFunc.EQUAL = 1;
GLStencilFunc.GREATER = 1;
GLStencilFunc.NOTEQUAL = 1;
GLStencilFunc.GEQUAL = 1;
GLStencilFunc.ALWAYS = 1;
exports.GLStencilFunc = GLStencilFunc;
/**
 * gl.KEEP              Keeps the current value.
 * gl.ZERO              Sets the stencil buffer value to 0.
 * gl.REPLACE           Sets the stencil buffer value to the reference value as specified by WebGLRenderingContext.stencilFunc().
 * gl.INCR              Increments the current stencil buffer value. Clamps to the maximum representable unsigned value.
 * gl.INCR_WRAP         Increments the current stencil buffer value. Wraps stencil buffer value to zero when incrementing the maximum representable unsigned value.
 * gl.DECR              Decrements the current stencil buffer value. Clamps to 0.
 * gl.DECR_WRAP         Decrements the current stencil buffer value. Wraps stencil buffer value to the maximum representable unsigned value when decrementing a stencil buffer value of 0.
 * gl.INVERT            Inverts the current stencil buffer value bitwise.
 */

class GLStencilOp {}

GLStencilOp.KEEP = 1;
GLStencilOp.ZERO = 1;
GLStencilOp.REPLACE = 1;
GLStencilOp.INCR = 1;
GLStencilOp.INCR_WRAP = 1;
GLStencilOp.DECR = 1;
GLStencilOp.DECR_WRAP = 1;
GLStencilOp.INVERT = 1;
exports.GLStencilOp = GLStencilOp;

class GLBlendMode {}

GLBlendMode.ZERO = 1;
GLBlendMode.ONE = 1;
GLBlendMode.SRC_COLOR = 1;
GLBlendMode.DST_COLOR = 1;
GLBlendMode.SRC_ALPHA = 1;
GLBlendMode.DST_ALPHA = 1;
GLBlendMode.ONE_MINUS_SRC_ALPHA = 1;
exports.GLBlendMode = GLBlendMode;

class GLBlendEquation {}

GLBlendEquation.FUNC_ADD = 1;
GLBlendEquation.FUNC_SUBTRACT = 1;
GLBlendEquation.FUNC_REVERSE_SUBTRACT = 1;
GLBlendEquation.MIN_EXT = 1;
GLBlendEquation.MAX_EXT = 1;
GLBlendEquation.MIN = 1;
GLBlendEquation.MAX = 1;
exports.GLBlendEquation = GLBlendEquation;

class CullFaceMode {}

CullFaceMode.BACK = 1;
CullFaceMode.FRONT = 2;
CullFaceMode.FRONT_AND_BACK = 3;
CullFaceMode.NONE = 0;
CullFaceMode.DISABLE = 0;
exports.CullFaceMode = CullFaceMode;

class DepthTestMode {}

DepthTestMode.NEVER = 1; //glDepthMask(false); glDepthFunc(GL_ALWAYS);

DepthTestMode.ALWAYS = 2; //glDepthMask(true); glDepthFunc(GL_LEQUAL);

DepthTestMode.SKY = 3;
DepthTestMode.TRUE_LESS_EQUAL = 3; //glDepthMask(true); glDepthFunc(GL_LESS);

DepthTestMode.OPAQUE = 4;
DepthTestMode.TRUE_LESS = 4; //glDepthMask(false); glDepthFunc(GL_EQUAL);

DepthTestMode.OPAQUE_OVERHEAD = 5;
DepthTestMode.FALSE_EQUAL = 5; //glDepthMask(false); glDepthFunc(GL_LESS);

DepthTestMode.FALSE_LESS = 6;
DepthTestMode.BLEND = 6;
DepthTestMode.BLEND_SORT = 6;
DepthTestMode.TRANSPARENT_SORT = 6; //glDepthMask(TRUE); glDepthFunc(GL_LEQUAL);

DepthTestMode.TRUE_LEQUAL = 7;
DepthTestMode.WIRE_FRAME = 7; //
//glDepthMask(false); glDepthFunc(GL_LEQUAL);

DepthTestMode.FALSE_LEQUAL = 8;
DepthTestMode.DECALS = 8; //glDepthMask(false); glDepthFunc(GL_ALWAYS);

DepthTestMode.NEXT_LAYER = 11;
DepthTestMode.WIRE_FRAME_NEXT = 12; //glDepthMask(true); glDepthFunc(GL_EQUAL);

DepthTestMode.TRUE_EQUAL = 13; //glDepthMask(true); glDepthFunc(GL_GREATER);

DepthTestMode.TRUE_GREATER = 14; //glDepthMask(true); glDepthFunc(GL_GEQUAL);

DepthTestMode.TRUE_GEQUAL = 15;
DepthTestMode.DISABLE = 0;
exports.DepthTestMode = DepthTestMode;
var DisplayRenderSign;

(function (DisplayRenderSign) {
  // 还没有加入 renderer
  DisplayRenderSign[DisplayRenderSign["NOT_IN_RENDERER"] = -1] = "NOT_IN_RENDERER"; // 正在进入 renderer

  DisplayRenderSign[DisplayRenderSign["GO_TO_RENDERER"] = 1] = "GO_TO_RENDERER"; // 真正存在于 renderer, 也就是直接可以在 process 中使用了

  DisplayRenderSign[DisplayRenderSign["LIVE_IN_RENDERER"] = 2] = "LIVE_IN_RENDERER";
})(DisplayRenderSign = exports.DisplayRenderSign || (exports.DisplayRenderSign = {}));

/***/ }),

/***/ "e214":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

const AbsGeomBase_1 = __importDefault(__webpack_require__("f48d"));

class Plane extends AbsGeomBase_1.default {
  constructor() {
    super(...arguments);
    this.nv = new Vector3D_1.default(0.0, 1.0, 0.0);
    this.distance = 0.0;
    this.intersectBoo = false;
  }

  intersectStraightLinePos(straightL, outV) {
    // intersection or parallel
    let td = this.nv.dot(straightL.tv);

    if (td > MathConst_1.default.MATH_MIN_POSITIVE || td < MathConst_1.default.MATH_MAX_NEGATIVE) {
      // intersection
      let dis = this.nv.dot(straightL.position) - this.distance;
      outV.x = straightL.tv.x * 100000.0 + straightL.position.x;
      outV.y = straightL.tv.y * 100000.0 + straightL.position.y;
      outV.z = straightL.tv.z * 100000.0 + straightL.position.z; //

      td = this.nv.dot(outV) - this.distance;
      td = dis / (dis - td);
      outV.subtractBy(straightL.position);
      outV.scaleBy(td);
      outV.addBy(straightL.position);
      return 1;
    }

    td = this.nv.dot(straightL.position) - this.distance;

    if (td <= MathConst_1.default.MATH_MIN_POSITIVE || td >= MathConst_1.default.MATH_MAX_NEGATIVE) {
      // plane contains line
      outV.copyFrom(straightL.position);
      return 2;
    }

    return 0;
  }

  intersectStraightLinePos2(sl_pos, sl_tv, outV) {
    // intersection or parallel
    let td = this.nv.dot(sl_tv);

    if (td > MathConst_1.default.MATH_MIN_POSITIVE || td < MathConst_1.default.MATH_MAX_NEGATIVE) {
      // intersection
      let dis = this.nv.dot(sl_pos) - this.distance;
      outV.x = sl_tv.x * 100000.0 + sl_pos.x;
      outV.y = sl_tv.y * 100000.0 + sl_pos.y;
      outV.z = sl_tv.z * 100000.0 + sl_pos.z; //

      td = this.nv.dot(outV) - this.distance;
      td = dis / (dis - td);
      outV.subtractBy(sl_pos);
      outV.scaleBy(td);
      outV.addBy(sl_pos);
      return 1;
    }

    td = this.nv.dot(sl_pos) - this.distance;

    if (td <= MathConst_1.default.MATH_MIN_POSITIVE || td >= MathConst_1.default.MATH_MAX_NEGATIVE) {
      // plane contains line
      outV.copyFrom(sl_pos);
      return 2;
    }

    return 0;
  }

  intersectRadialLinePos(radL, outV) {
    let dis = this.nv.dot(radL.position) - this.distance;

    if (dis > MathConst_1.default.MATH_MIN_POSITIVE) {
      // radL position in plane positive space
      let td = this.nv.dot(radL.tv);

      if (td < 0.0) {
        // calc intersection position
        return this.intersectStraightLinePos2(radL.position, radL.tv, outV);
      }
    } else if (dis < MathConst_1.default.MATH_MAX_NEGATIVE) {
      // radL position in plane negative space
      let td2 = this.nv.dot(radL.tv);

      if (td2 > 0.0) {
        // calc intersection position
        return this.intersectStraightLinePos2(radL.position, radL.tv, outV);
      }
    } else {
      let td3 = this.nv.dot(radL.tv);

      if (td3 > MathConst_1.default.MATH_MIN_POSITIVE || td3 < MathConst_1.default.MATH_MAX_NEGATIVE) {
        outV.copyFrom(radL.position);
        return 1;
      }

      outV.copyFrom(radL.position);
      return 2;
    }

    return -1;
  }

  intersectRadialLinePos2(rl_pos, rl_tv, outV) {
    let dis = this.nv.dot(rl_pos) - this.distance;

    if (dis > MathConst_1.default.MATH_MIN_POSITIVE) {
      // radL position in plane positive space
      let td = this.nv.dot(rl_tv);

      if (td < 0.0) {
        // calc intersection position
        return this.intersectStraightLinePos2(rl_pos, rl_tv, outV);
      }
    } else if (dis < MathConst_1.default.MATH_MAX_NEGATIVE) {
      // radL position in plane negative space
      let td = this.nv.dot(rl_tv);

      if (td > 0.0) {
        // calc intersection position
        return this.intersectStraightLinePos2(rl_pos, rl_tv, outV);
      }
    } else {
      let td3 = this.nv.dot(rl_tv);

      if (td3 > MathConst_1.default.MATH_MIN_POSITIVE || td3 < MathConst_1.default.MATH_MAX_NEGATIVE) {
        outV.copyFrom(rl_pos);
        return 1;
      }

      outV.copyFrom(rl_pos);
      return 2;
    }

    return -1;
  }

  containsPoint(pos) {
    let f = this.nv.dot(pos) - this.distance;

    if (f > MathConst_1.default.MATH_MIN_POSITIVE) {
      return 1;
    } else if (f < MathConst_1.default.MATH_MAX_NEGATIVE) {
      return -1;
    }

    return 0;
  }

  intersectSphere(cv, radius) {
    this.intersectBoo = false;
    let f = this.nv.dot(cv) - this.distance;

    if (f > MathConst_1.default.MATH_MIN_POSITIVE) {
      this.intersectBoo = f <= radius;
      return 1;
    } else if (f < MathConst_1.default.MATH_MAX_NEGATIVE) {
      this.intersectBoo = -f <= radius;
      return -1;
    }

    return 0;
  }

  intersectAABB(minV, maxV) {
    this.intersectBoo = false;
    let pv = AbsGeomBase_1.default.__tV0;
    pv.setXYZ(maxV.x, minV.y, maxV.z);
    let flag = this.containsPoint(pv);
    pv.setXYZ(maxV.x, minV.y, minV.z);
    flag += this.containsPoint(pv);
    pv.setXYZ(minV.x, minV.y, minV.z);
    flag += this.containsPoint(pv);
    pv.setXYZ(minV.x, minV.y, maxV.z);
    flag += this.containsPoint(pv);
    pv.setXYZ(maxV.x, maxV.y, maxV.z);
    flag += this.containsPoint(pv);
    pv.setXYZ(maxV.x, maxV.y, minV.z);
    flag += this.containsPoint(pv);
    pv.setXYZ(minV.x, maxV.y, minV.z);
    flag += this.containsPoint(pv);
    pv.setXYZ(minV.x, maxV.y, maxV.z);
    flag += this.containsPoint(pv);
    this.intersectBoo = flag < 8;
    if (flag < -7) return -1;
    if (flag > 7) return 1;
    return 0;
  } // 判断一个球体是否和一个平面的负空间相交


  intersectSphNegSpace(cv, radius) {
    //this.intersectBoo = (this.nv.dot(cv) - this.distance - radius) < MathConst.MATH_MIN_POSITIVE;				
    //this.intersectBoo = (this.nv.dot(cv) - this.distance) < radius;				
    this.intersectBoo = Math.abs(this.nv.dot(cv) - this.distance) < radius;
  }

  update() {
    this.nv.normalize();
  }

  updateFast() {
    this.nv.normalize();
  }

  static PlaneIntersectSphere(pnv, pdis, cv, radius) {
    Plane.IntersectBoo = false;
    Plane.IntersectSatus = 0;
    pdis = pnv.dot(cv) - pdis;

    if (pdis > MathConst_1.default.MATH_MIN_POSITIVE) {
      Plane.IntersectBoo = pdis <= radius;
      Plane.IntersectSatus = 1;
    } else if (pdis < MathConst_1.default.MATH_MAX_NEGATIVE) {
      Plane.IntersectBoo = -pdis <= radius;
      Plane.IntersectSatus = -1;
    }
  }

  static CalcPVCloseV(plane, posV, outV) {
    let value = plane.distance - posV.dot(plane.nv);
    outV.setTo(value * plane.nv.x, value * plane.nv.y, value * plane.nv.z);
    outV.addBy(posV);
  }

  static CalcPVCloseV2(pnv, pd, posV, outV) {
    let value = pd - posV.dot(pnv);
    outV.setTo(value * pnv.x, value * pnv.y, value * pnv.z); //outV.scaleBy(value);

    outV.addBy(posV);
  }

  static IntersectionSLV2(planeNV, planeDis, sl_pos, sl_tv, outV) {
    // intersection or parallel
    let td = planeNV.dot(sl_tv);

    if (td > MathConst_1.default.MATH_MIN_POSITIVE || td < MathConst_1.default.MATH_MAX_NEGATIVE) {
      // intersection
      let dis = planeNV.dot(sl_pos) - planeDis;
      outV.x = sl_tv.x * 100000.0 + sl_pos.x;
      outV.y = sl_tv.y * 100000.0 + sl_pos.y;
      outV.z = sl_tv.z * 100000.0 + sl_pos.z; //

      td = planeNV.dot(outV) - planeDis;
      td = dis / (dis - td);
      outV.subtractBy(sl_pos);
      outV.scaleBy(td);
      outV.addBy(sl_pos);
      return 1;
    }

    td = planeNV.dot(sl_pos) - planeDis;

    if (td <= MathConst_1.default.MATH_MIN_POSITIVE || td >= MathConst_1.default.MATH_MAX_NEGATIVE) {
      // plane contains line
      outV.copyFrom(sl_pos);
      return 2;
    }

    return 0;
  }

  toString() {
    return "Plane(position=" + this.position.toString() + ", nv=" + this.nv.toString() + ")";
  }

}

Plane.IntersectBoo = false;
Plane.IntersectSatus = 0;
exports.default = Plane;

/***/ }),

/***/ "e7d2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const ROVtxBufUidStore_1 = __importDefault(__webpack_require__("710f"));

const VtxCombinedBuf_1 = __importDefault(__webpack_require__("f0f0"));

const VtxSeparatedBuf_1 = __importDefault(__webpack_require__("7a04"));

const ROIVertexBuffer_1 = __importDefault(__webpack_require__("febe"));

class ROVertexBuffer extends ROIVertexBuffer_1.default {
  constructor(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    super(bufDataUsage);
    this.m_vtxBuf = null;
    this.m_bufTypeList = null;
    this.m_bufSizeList = null;
  }

  setVtxBuf(vtxBuf) {
    if (vtxBuf != this) {
      this.m_vtxBuf = vtxBuf;

      if (vtxBuf != null) {
        vtxBuf.layoutBit = this.layoutBit;
      }
    }
  }

  setBufDataUsage(bufDataUsage) {
    this.m_bufDataUsage = bufDataUsage;
  }

  getUid() {
    return this.m_uid;
  }

  getType() {
    return this.m_vtxBuf.getType();
  }

  setBufTypeList(list) {
    this.m_bufTypeList = list;
  }

  setBufSizeList(list) {
    this.m_bufSizeList = list;
  }

  getBufTypeList() {
    return this.m_bufTypeList;
  }

  getBufSizeList() {
    return this.m_bufSizeList;
  }

  getIBufStep() {
    return this.m_ibufStep;
  }

  getBufDataUsage() {
    return this.m_bufDataUsage;
  }

  getBuffersTotal() {
    return this.m_vtxBuf.getBuffersTotal();
  }

  getAttribsTotal() {
    return this.m_vtxBuf.getAttribsTotal();
  }

  getF32DataAt(index) {
    return this.m_vtxBuf.getF32DataAt(index);
  }

  getIvsData() {
    return this.m_ivs;
  }

  setF32DataAt(index, float32Arr, stepFloatsTotal, setpOffsets) {
    this.m_vtxBuf.setF32DataAt(index, float32Arr, stepFloatsTotal, setpOffsets);
    this.vertexVer++;
  }

  setUintIVSData(uint16Or32Arr, status = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    if (uint16Or32Arr instanceof Uint16Array) {
      this.m_ibufStep = 2;

      if (uint16Or32Arr.length > 65535) {
        throw Error("its type is not Uint32Array.");
      }
    } else if (uint16Or32Arr instanceof Uint32Array) {
      this.m_ibufStep = 4;
    } else {
      console.error("Error: uint16Or32Arr is not an Uint32Array or an Uint16Array bufferArray instance !!!!");
      return;
    }

    this.m_ivs = uint16Or32Arr;

    if (uint16Or32Arr != null) {
      this.indicesVer++;
    }
  }

  setData4fAt(vertexI, attribI, px, py, pz, pw) {
    if (this.m_vtxBuf != null) {
      this.m_vtxBuf.setData4fAt(vertexI, attribI, px, py, pz, pw);
      this.vertexVer++;
    }
  }

  setData3fAt(vertexI, attribI, px, py, pz) {
    if (this.m_vtxBuf != null) {
      this.m_vtxBuf.setData3fAt(vertexI, attribI, px, py, pz);
      this.vertexVer++;
    }
  }

  setData2fAt(vertexI, attribI, px, py) {
    if (this.m_vtxBuf != null) {
      this.m_vtxBuf.setData2fAt(vertexI, attribI, px, py);
      this.vertexVer++;
    }
  }
  /**
   * this function is only an empty function.
   */


  destroy() {
    super.destroy();
  }

  __$destroy() {
    console.log("ROVertexBuffer::__$destroy()... " + this);
    this.m_vtxBuf.destroy();

    if (this.m_vtxBuf.getType() < 1) {
      ROVertexBuffer.s_combinedBufs.push(this.m_vtxBuf);
    } else {
      ROVertexBuffer.s_separatedBufs.push(this.m_vtxBuf);
    }

    this.m_vtxBuf = null;
    this.m_ivs = null;
    this.bufData = null;
    this.m_bufTypeList = null;
    this.m_bufSizeList = null;
  }

  static GetFreeId() {
    if (ROVertexBuffer.s_freeIdList.length > 0) {
      return ROVertexBuffer.s_freeIdList.pop();
    }

    return -1;
  }

  static GetVtxByUid(uid) {
    return ROVertexBuffer.s_unitList[uid];
  }

  static Create(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    let unit = null;
    let index = ROVertexBuffer.GetFreeId();

    if (index >= 0) {
      unit = ROVertexBuffer.s_unitList[index];
      unit.setBufDataUsage(bufDataUsage);
      ROVertexBuffer.s_unitFlagList[index] = ROVertexBuffer.s_FLAG_BUSY;
    } else {
      unit = new ROVertexBuffer(bufDataUsage);
      ROVertexBuffer.s_unitList.push(unit);
      ROVertexBuffer.s_unitFlagList.push(ROVertexBuffer.s_FLAG_BUSY);
      ROVertexBuffer.s_unitListLen++;
    }

    unit.vertexVer = 0;
    unit.indicesVer = 0;
    unit.version++; //console.log("ROVertexBuffer::Create(), ROVertexBuffer.s_unitList.length: "+ROVertexBuffer.s_unitList.length+", new buf: "+unit);

    ROVertexBuffer.s_vtxStore.__$attachAt(unit.getUid());

    return unit;
  }

  static __$Restore(pobj) {
    if (pobj != null && ROVertexBuffer.s_unitFlagList[pobj.getUid()] == ROVertexBuffer.s_FLAG_BUSY) {
      //console.log("ROVertexBuffer::__$Restore, pobj: "+pobj);
      let uid = pobj.getUid();
      ROVertexBuffer.s_freeIdList.push(uid);
      ROVertexBuffer.s_unitFlagList[uid] = ROVertexBuffer.s_FLAG_FREE;

      pobj.__$destroy();
    }
  }

  static __$$AttachAt(uid) {
    ROVertexBuffer.s_vtxStore.__$attachAt(uid);
  }

  static __$$DetachAt(uid) {
    ROVertexBuffer.s_vtxStore.__$detachAt(uid);
  }

  static Reset() {
    ROVertexBuffer.BufDataList = [];
    ROVertexBuffer.s_stride = 0;
    ROVertexBuffer.BufStatusList = [];
    ROVertexBuffer.BufDataStepList = [];
    ROVertexBuffer.vtxFS32 = null;
    ROVertexBuffer.vbWholeDataEnabled = false;
    ROVertexBuffer.dynBufSegEnabled = false;
    ROVertexBuffer.useBufByIndexEnabled = false;
  }

  static AddFloat32Data(float32Arr, step, status = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    ROVertexBuffer.BufDataList.push(float32Arr);
    ROVertexBuffer.BufDataStepList.push(step);
    ROVertexBuffer.BufStatusList.push(status);
    ROVertexBuffer.s_stride += step;
  }

  static CreateBySaveData(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW, layoutBit = 0x0) {
    let i = 0;
    let k = 0;
    let stride = 0;
    let bufTot = ROVertexBuffer.BufDataStepList.length;
    let offsetList = [];

    for (; i < bufTot; i++) {
      offsetList.push(stride);
      stride += ROVertexBuffer.BufDataStepList[i];
    }

    let tot = ROVertexBuffer.BufDataList[0].length / ROVertexBuffer.BufDataStepList[0];
    let vtxfs32 = new Float32Array(stride * tot);
    let j = 0;
    let segLen = 0;
    let parrf32 = null;
    let subArr = null;

    for (i = 0; i < tot; ++i) {
      k = i * stride;

      for (j = 0; j < bufTot; ++j) {
        segLen = ROVertexBuffer.BufDataStepList[j];
        parrf32 = ROVertexBuffer.BufDataList[j];
        subArr = parrf32.subarray(i * segLen, (i + 1) * segLen);
        vtxfs32.set(subArr, k);
        k += segLen;
      }
    }

    let vb = ROVertexBuffer.Create(bufDataUsage);
    vb.layoutBit = layoutBit;

    if (ROVertexBuffer.s_combinedBufs.length > 0) {
      let vtx = ROVertexBuffer.s_combinedBufs.pop();
      vb.setVtxBuf(vtx);
    } else {
      vb.setVtxBuf(new VtxCombinedBuf_1.default(vb.getBufDataUsage()));
    }

    vb.setF32DataAt(0, vtxfs32, stride, offsetList);
    return vb;
  }

  static CreateVtxCombinedBuf(vtxfs32, bufDataStepList, bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW, layoutBit = 0x0) {
    let i = 0;
    let stride = 0;
    let bufTot = bufDataStepList.length;
    let offsetList = [];

    for (; i < bufTot; i++) {
      offsetList.push(stride);
      stride += bufDataStepList[i];
    }

    let vb = ROVertexBuffer.Create(bufDataUsage);
    vb.layoutBit = layoutBit;

    if (ROVertexBuffer.s_combinedBufs.length > 0) {
      let vtx = ROVertexBuffer.s_combinedBufs.pop();
      vb.setVtxBuf(vtx);
    } else {
      vb.setVtxBuf(new VtxCombinedBuf_1.default(vb.getBufDataUsage()));
    }

    vb.setF32DataAt(0, vtxfs32, stride, offsetList);
    return vb;
  }

  static UpdateCombinedBufData(vb) {
    let i = 0;
    let k = 0;
    let stride = 0;
    let bufTot = ROVertexBuffer.BufDataStepList.length;
    let tot = ROVertexBuffer.BufDataList[0].length / ROVertexBuffer.BufDataStepList[0];
    let vtxfs32 = vb.getF32DataAt(0);
    let newBoo = ROVertexBuffer.s_stride * tot != vtxfs32.length;
    let offsetList = null;

    if (newBoo) {
      offsetList = [];
      vtxfs32 = new Float32Array(ROVertexBuffer.s_stride * tot);

      for (; i < bufTot; i++) {
        offsetList.push(stride);
        stride += ROVertexBuffer.BufDataStepList[i];
      }
    } else {
      stride = ROVertexBuffer.s_stride;
    }

    let j = 0;
    let segLen = 0;
    let parrf32 = null;
    let subArr = null;

    for (i = 0; i < tot; ++i) {
      k = i * stride;

      for (j = 0; j < bufTot; ++j) {
        segLen = ROVertexBuffer.BufDataStepList[j];
        parrf32 = ROVertexBuffer.BufDataList[j];
        subArr = parrf32.subarray(i * segLen, (i + 1) * segLen);
        vtxfs32.set(subArr, k);
        k += segLen;
      }
    }

    if (newBoo) {
      vb.setF32DataAt(0, vtxfs32, stride, offsetList);
    } else {
      vb.setF32DataAt(0, vtxfs32, stride, null);
    }
  }

  static UpdateBufData(vb) {
    if (vb.getType() == 0) {
      ROVertexBuffer.UpdateCombinedBufData(vb);
    } else {
      ROVertexBuffer.UpdateSeparatedBufData(vb);
    }
  }

  static CreateByBufDataSeparate(bufData, bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW, layoutBit = 0x0) {
    let i = 0;
    let stride = 0;
    let bufTot = bufData.getAttributesTotal();
    let offsetList = new Array(bufTot);
    offsetList.fill(0);
    let vb = ROVertexBuffer.Create(bufDataUsage);
    vb.layoutBit = layoutBit;

    if (ROVertexBuffer.s_separatedBufs.length > 0) {
      let vtx = ROVertexBuffer.s_separatedBufs.pop();
      vb.setVtxBuf(vtx);
    } else {
      vb.setVtxBuf(new VtxSeparatedBuf_1.default());
    }

    for (i = 0; i < bufTot; i++) {
      vb.setF32DataAt(i, bufData.getAttributeDataAt(i, 0), stride, offsetList);
    }

    vb.setUintIVSData(bufData.getIndexDataAt(0));
    vb.bufData = bufData;
    return vb;
  }

  static CreateBySaveDataSeparate(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    let i = 0;
    let stride = 0;
    let bufTot = ROVertexBuffer.BufDataStepList.length;
    let offsetList = new Array(bufTot);
    let vb = ROVertexBuffer.Create(bufDataUsage);

    if (ROVertexBuffer.s_separatedBufs.length > 0) {
      let vtx = ROVertexBuffer.s_separatedBufs.pop();
      vb.setVtxBuf(vtx);
    } else {
      vb.setVtxBuf(new VtxSeparatedBuf_1.default());
    }

    for (i = 0; i < bufTot; i++) {
      vb.setF32DataAt(i, ROVertexBuffer.BufDataList[i], stride, offsetList);
    }

    return vb;
  }

  static UpdateSeparatedBufData(vb) {
    let bufTot = ROVertexBuffer.BufDataStepList.length;
    let offsetList = new Array(bufTot); // console.log("ROVertexBuffer::CreateBySaveDataSeparate(), bufTot: "+bufTot);

    for (let i = 0; i < bufTot; i++) {
      vb.setF32DataAt(i, ROVertexBuffer.BufDataList[i], 0, offsetList);
    }

    return vb;
  }

  static GetVtxAttachCountAt(vtxUid) {
    return ROVertexBuffer.s_vtxStore.getAttachCountAt(vtxUid);
  }

  static GetVtxAttachAllCount() {
    return ROVertexBuffer.s_vtxStore.getAttachAllCount();
  }
  /**
   * 放在帧循环中自动定时清理资源 system memory vertex data
   */


  static ClearTest() {
    --ROVertexBuffer.s_timeDelay;

    if (ROVertexBuffer.s_timeDelay < 1) {
      ROVertexBuffer.s_timeDelay = 128; // 管理作为数据

      let store = ROVertexBuffer.s_vtxStore;

      if (store.__$getRemovedListLen() > 0) {
        let list = store.__$getRemovedList();

        let len = list.length;
        let i = 0;
        let vtxUid = 0;
        let vb = null;
        let maxSteps = 32;
        len = len > maxSteps ? maxSteps : len;

        for (; i < len; ++i) {
          vtxUid = list.shift();

          if (store.getAttachCountAt(vtxUid) < 1) {
            console.log("ROVertexBuffer remove a instance, vtxUid: " + vtxUid);
            vb = ROVertexBuffer.GetVtxByUid(vtxUid);

            ROVertexBuffer.__$Restore(vb);
          }
        }
      }
    }
  }

}

ROVertexBuffer.s_combinedBufs = [];
ROVertexBuffer.s_separatedBufs = [];
ROVertexBuffer.s_FLAG_BUSY = 1;
ROVertexBuffer.s_FLAG_FREE = 0;
ROVertexBuffer.s_unitFlagList = [];
ROVertexBuffer.s_unitListLen = 0;
ROVertexBuffer.s_unitList = [];
ROVertexBuffer.s_freeIdList = [];
ROVertexBuffer.s_vtxStore = new ROVtxBufUidStore_1.default();
ROVertexBuffer.s_stride = 0;
ROVertexBuffer.BufDataList = null;
ROVertexBuffer.BufDataStepList = null;
ROVertexBuffer.BufStatusList = null;
ROVertexBuffer.vtxDataFS32 = null;
ROVertexBuffer.vbWholeDataEnabled = false;
ROVertexBuffer.dynBufSegEnabled = false;
ROVertexBuffer.useBufByIndexEnabled = false;
ROVertexBuffer.vtxFS32 = null;
ROVertexBuffer.s_timeDelay = 128;
exports.default = ROVertexBuffer;

/***/ }),

/***/ "eaee":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const TextureTarget_1 = __importDefault(__webpack_require__("5deb"));

const TextureProxy_1 = __importDefault(__webpack_require__("0851"));

class FloatCubeTextureProxy extends TextureProxy_1.default {
  constructor(texWidth, texHeight) {
    super(texWidth, texHeight, false);
    this.m_imgDataList = null;
    this.m_texTarget = TextureTarget_1.default.TEXTURE_CUBE;
    this.m_type = TextureProxyType_1.TextureProxyType.FloatCube;
    this.internalFormat = TextureFormat_1.default.RGBA16F;
    this.dataType = TextureDataType_1.default.FLOAT;
    this.mipmapEnabled = true;
  }

  toAlphaFormat() {
    this.srcFormat = TextureFormat_1.default.ALPHA;
    this.internalFormat = TextureFormat_1.default.ALPHA;
    this.unpackAlignment = 1;
  }

  toRedFormat() {
    this.srcFormat = TextureFormat_1.default.RED;
    this.internalFormat = TextureFormat_1.default.RED;
    this.unpackAlignment = 1;
  }

  toRGBFormat() {
    this.unpackAlignment = 1;
    this.srcFormat = TextureFormat_1.default.RGB;
    this.internalFormat = TextureFormat_1.default.RGB16F;
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.mipmapEnabled = false;
  }

  toRGBAFormat() {
    this.unpackAlignment = 4;
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA16F;
  }

  toRGBFormatFloat32F() {
    this.unpackAlignment = 1;
    this.srcFormat = TextureFormat_1.default.RGB;
    this.internalFormat = TextureFormat_1.default.RGB32F;
    this.minFilter = TextureConst_1.default.NEAREST;
    this.magFilter = TextureConst_1.default.NEAREST;
    this.mipmapEnabled = false;
  }

  toRGBAFormatFloat32F() {
    this.unpackAlignment = 4;
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA32F;
  }

  toRGBAFormatHalfFloat() {
    this.unpackAlignment = 1;
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.dataType = TextureDataType_1.default.HALF_FLOAT;
    this.internalFormat = TextureFormat_1.default.RGBA16F;
  }

  setDataFromBytesToFaceAt(index, bytes, pw, ph, miplevel = 0) {
    if (this.m_imgDataList == null) {
      this.m_imgDataList = [null, null, null, null, null, null];
    }

    if (pw > 0 && ph > 0) {
      if (index == 0 && miplevel < 1) {
        this.m_texWidth = pw;
        this.m_texHeight = ph;
        this.m_miplevel = miplevel;
      }

      if (this.m_imgDataList[index] == null) {
        this.m_imgDataList[index] = new Array(16);
      }

      let arr = this.m_imgDataList[index];
      arr[miplevel] = {
        width: pw,
        height: ph,
        imgData: bytes,
        miplevel: miplevel
      };
      this.m_haveRData = arr[miplevel].imgData != null;
    }
  }

  uploadData(texRes) {
    let gl = texRes.getRC();
    let imo = null;
    let width = this.getWidth();
    let height = this.getHeight();
    let pw;
    let ph;

    for (let i = 0; i < 6; ++i) {
      let arr = this.m_imgDataList[i];

      if (this.mipmapEnabled && this.m_generateMipmap) {
        imo = arr[0];
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, TextureFormat_1.default.ToGL(gl, this.internalFormat), width, height, 0, TextureFormat_1.default.ToGL(gl, this.srcFormat), TextureDataType_1.default.ToGL(gl, this.dataType), imo.imgData);
      } else {
        pw = width;
        ph = height;
        let j = 0;

        for (; pw > 0 || ph > 0;) {
          if (arr[j] != null) {
            imo = arr[j];
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, TextureFormat_1.default.ToGL(gl, this.internalFormat), pw, ph, 0, TextureFormat_1.default.ToGL(gl, this.srcFormat), TextureDataType_1.default.ToGL(gl, this.dataType), imo.imgData);
          }

          if (pw > 0) pw >>= 1;
          if (ph > 0) ph >>= 1;
          ++j;
        }
      }
    }

    this.version = 0;
  }

  toString() {
    return "[FloatCubeTextureProxy(name:" + this.name + ",uid=" + this.getUid() + ",width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

  __$destroy() {
    if (this.getAttachCount() < 1) {
      if (this.m_imgDataList != null) {
        for (let i = 0; i < 6; ++i) {
          if (this.m_imgDataList[i] != null) {
            this.m_imgDataList[i].imgData = null;
          }
        }
      }

      console.log("FloatCubeTextureProxy::destroy(), destroy a FloatCubeTextureProxy instance...");

      super.__$destroy();
    }
  }

}

exports.default = FloatCubeTextureProxy;

/***/ }),

/***/ "ee6e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MaterialBase_1 = __importDefault(__webpack_require__("0fc4"));

const ShaderCodeBuffer_1 = __importDefault(__webpack_require__("faa5"));

class MaterialShaderBuffer extends ShaderCodeBuffer_1.default {
  constructor() {
    super();
    this.m_uniqueName = "";
    this.decorator = null;
    this.vertUniform = null;
  }

  initialize(texEnabled) {
    super.initialize(texEnabled);
    console.log("MaterialShaderBuffer::initialize()... texEnabled: " + texEnabled);
    this.m_uniqueName = "SMS_"; // this.m_hasTex = texEnabled;

    if (texEnabled) this.m_uniqueName += "Tex";
  }

  createTextureList() {
    this.m_texBuilder.reset();
    this.decorator.buildTextureList(this.m_texBuilder);
    return this.m_texBuilder.getTextures();
  }

  buildShader() {
    if (this.vertUniform != null) {
      this.vertUniform.use(this.m_coder);
    }

    this.decorator.buildShader(this.m_coder);
  }

  getUniqueShaderName() {
    // return this.m_uniqueName + this.decorator.getUniqueName();
    let ns = this.m_uniqueName + this.decorator.getUniqueName();

    if (this.vertUniform != null) {
      ns += this.vertUniform.getUniqueNSKeyString();
    }

    return ns;
  }

}

class SimpleMaterial extends MaterialBase_1.default {
  constructor() {
    super();
    this.m_decorator = null;
    this.vertUniform = null;
    if (SimpleMaterial.s_shdBufins == null) SimpleMaterial.s_shdBufins = new MaterialShaderBuffer();
  }

  buildBuf() {
    let buf = SimpleMaterial.s_shdBufins;
    let decorator = this.m_decorator;
    buf.decorator = decorator;
    decorator.buildBufParams();
    buf.vertColorEnabled = decorator.vertColorEnabled;
    buf.shadowReceiveEnabled = decorator.premultiplyAlpha;
    buf.fogEnabled = decorator.fogEnabled;
    buf.buildPipelineParams();
    buf.vertUniform = this.vertUniform;
    let list = buf.createTextureList();
    if (this.vertUniform != null) this.vertUniform.getTextures(buf.getShaderCodeBuilder(), list);
    buf.getTexturesFromPipeline(list);
    console.log(decorator, "texture list: ", list);
    super.setTextureList(list); //buf.texturesTotal = list.length;
  }

  getCodeBuf() {
    return SimpleMaterial.s_shdBufins;
  }

  setTextureList(texList) {
    // throw Error("Illegal operations !!!");
    console.error("Illegal operations !!!");
  }

  setDecorator(decorator) {
    this.m_decorator = decorator;
  }

  getDecorator() {
    return this.m_decorator;
  }

  createSelfUniformData() {
    let sud = this.m_decorator.createUniformData();

    if (this.vertUniform != null && sud != null) {
      this.vertUniform.buildShaderUniformData(sud);
    }

    return sud;
  }

  destroy() {
    super.destroy();
    this.m_decorator = null;
    this.vertUniform = null;
  }

}

SimpleMaterial.s_shdBufins = null;
exports.SimpleMaterial = SimpleMaterial;

/***/ }),

/***/ "f044":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

class VtxBufID {
  static CreateNewID() {
    return VtxBufID.s_uid++;
  }

}

VtxBufID.s_uid = 0;
exports.default = VtxBufID;

/***/ }),

/***/ "f0f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufID_1 = __importDefault(__webpack_require__("f044"));

class VtxCombinedBuf {
  constructor(bufDataUsage) {
    this.m_uid = -1;
    this.m_total = 0;
    this.layoutBit = 0x0;
    this.m_offsetList = null;
    this.m_f32 = null;
    this.m_f32Stride = 0;
    this.m_uid = VtxBufID_1.default.CreateNewID();
  }

  getUid() {
    return this.m_uid;
  }

  getType() {
    return 0;
  }

  getBuffersTotal() {
    return 1;
  }

  getAttribsTotal() {
    return this.m_offsetList.length;
  }

  getF32DataAt(index) {
    return this.m_f32;
  }

  setF32DataAt(index, float32Arr, stepFloatsTotal, setpOffsets) {
    if (setpOffsets != null) this.m_offsetList = setpOffsets;
    this.m_f32Stride = stepFloatsTotal; //console.log("VtxCombinedBuf::setF32DataAt(),"+this+" m_f32.length: "+float32Arr.length+", this.m_f32PreSize: "+this.m_f32PreSize);

    this.m_f32 = float32Arr;
  }

  setData4fAt(vertexI, attribI, px, py, pz, pw) {
    vertexI = this.m_f32Stride * vertexI + this.m_offsetList[attribI];
    this.m_f32[vertexI++] = px;
    this.m_f32[vertexI++] = py;
    this.m_f32[vertexI++] = pz;
    this.m_f32[vertexI++] = pw;
  }

  setData3fAt(vertexI, attribI, px, py, pz) {
    vertexI = this.m_f32Stride * vertexI + this.m_offsetList[attribI]; //console.log("VtxCombinedBuf::setData3fAt(), vertexI: "+vertexI+",this.m_f32Stride: "+this.m_f32Stride);

    this.m_f32[vertexI++] = px;
    this.m_f32[vertexI++] = py;
    this.m_f32[vertexI++] = pz;
  }

  setData2fAt(vertexI, attribI, px, py) {
    vertexI = this.m_f32Stride * vertexI + this.m_offsetList[attribI]; //console.log("VtxCombinedBuf::setData2fAt(), vertexI: "+vertexI+",this.m_f32Stride: "+this.m_f32Stride);

    this.m_f32[vertexI++] = px;
    this.m_f32[vertexI++] = py;
  }

  destroy() {
    console.log("VtxCombinedBuf::__$destroy()... ", this);
    this.m_offsetList = null;
    this.m_f32 = null;
  }

  toString() {
    return "VtxCombinedBuf(uid = " + this.m_uid + ")";
  }

}

exports.default = VtxCombinedBuf;

/***/ }),

/***/ "f208":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ShaderCompileInfo {
  constructor() {
    this.info = "";
  }

}

exports.default = ShaderCompileInfo;

/***/ }),

/***/ "f3a2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * IShaderCodeObject instance uuid
 */

var ShaderCodeUUID;

(function (ShaderCodeUUID) {
  /**
   * nothing shader code object
   */
  ShaderCodeUUID["None"] = "";
  /**
   * the default value is PBR light shader code object that it comes from the system shader lib.
   */

  ShaderCodeUUID["Default"] = "pbr";
  /**
   * lambert light shader code object that it comes from the system shader lib.
   */

  ShaderCodeUUID["Lambert"] = "lambert";
  /**
   * PBR light shader code object that it comes from the system shader lib.
   */

  ShaderCodeUUID["PBR"] = "pbr";
})(ShaderCodeUUID || (ShaderCodeUUID = {}));

exports.ShaderCodeUUID = ShaderCodeUUID;

/***/ }),

/***/ "f48d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

class AbsGeomBase {
  constructor() {
    // unique id
    this.id = -1;
    this.position = new Vector3D_1.default();
  }

  update() {}

  updateFast() {}

}

AbsGeomBase.__tV0 = new Vector3D_1.default();
AbsGeomBase.__tV1 = new Vector3D_1.default();
AbsGeomBase.__tV2 = new Vector3D_1.default();
exports.AbsGeomBase = AbsGeomBase;
exports.default = AbsGeomBase;

/***/ }),

/***/ "f63b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

function generateCanvasMipmapsAt(src) {
  let width = src.width;
  let height = src.height;

  if (width >= 2 || height >= 2) {
    width = width >= 2 ? width / 2 | 0 : 1;
    height = height >= 2 ? height / 2 | 0 : 1;
    return createImageCanvas(src, width, height).canvas;
  }

  return null;
}

function createImageCanvas(img, pw, ph) {
  var canvas = document.createElement('canvas'); //document.body.appendChild(canvas);

  canvas.width = pw;
  canvas.height = ph; //console.log("createImageCanvas(). size: "+canvas.width+","+canvas.height);
  //canvas.style.visibility = "hidden";

  canvas.style.backgroundColor = "transparent";
  canvas.style.display = "block";
  canvas.style.left = '0px';
  canvas.style.top = '0px';
  canvas.style.position = 'absolute';
  let ctx2d = canvas.getContext("2d");
  ctx2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  return {
    canvas: canvas,
    ctx2d: ctx2d
  };
}

function createImageCanvasAlphaOffset(img, pw, ph) {
  var canvas = document.createElement('canvas'); //document.body.appendChild(canvas);

  canvas.width = pw;
  canvas.height = ph; //console.log("createImageCanvasAlphaOffset(). size: "+canvas.width+","+canvas.height);
  //canvas.style.visibility = "hidden";

  canvas.style.backgroundColor = "transparent";
  canvas.style.display = "block";
  canvas.style.left = '0px';
  canvas.style.top = '0px';
  canvas.style.position = 'absolute';
  let ctx2d = canvas.getContext("2d"); //ctx2d.globalAlpha = 1.0;

  ctx2d.globalCompositeOperation = "destination-atop"; //ctx2d.globalCompositeOperation = "multiply";
  //ctx2d.globalCompositeOperation = "destination-over";
  //ctx2d.globalCompositeOperation = "lighter";

  ctx2d.fillStyle = "rgba(255, 255, 255, 1.0)";
  ctx2d.rect(0, 0, canvas.width, canvas.height);
  ctx2d.fill(); //ctx2d.globalCompositeOperation = "copy";

  ctx2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height); //ctx2d.drawImage(img, 0, 0, img.width,img.height,0,0,canvas.width,canvas.height);

  return {
    canvas: canvas,
    ctx2d: ctx2d
  };
}

class ImgResUnit {
  constructor(purl, mipLv) {
    this.m_url = "";
    this.m_img = null;
    this.m_loaded = false;
    this.m_mipLv = 0;
    this.texture = null;
    this.bytesTex = null;
    this.powerOf2Fix = false;
    this.offsetTex = null;
    this.premultipliedAlpha = true;
    this.m_url = purl;
    this.m_mipLv = mipLv;
  }

  startLoad() {
    if (this.m_img == null) {
      // let selfT: ImgResUnit = this;
      this.m_img = new Image(); ///*

      this.m_img.onload = evt => {
        this.m_loaded = true;
        this.buildTex();
      };

      this.m_img.addEventListener('error', evt => {
        if (this.m_url != "") {
          console.error("load image url error: ", this.m_url);
        }
      }); // this.m_img.crossOrigin = "";
      //m_img.setAttribute('crossorigin', 'anonymous');
      // this.m_img.src = this.m_url;

      const request = new XMLHttpRequest();
      request.open("GET", this.m_url, true);
      request.responseType = "blob";

      request.onload = e => {
        let pwin = window;
        var imageUrl = (pwin.URL || pwin.webkitURL).createObjectURL(request.response);
        this.m_img.src = imageUrl;
      };

      request.onerror = e => {
        console.error("load error binary image buffer request.status: ", request.status, "url:" + this.m_url);
      };

      request.send(null);
    }
  }

  buildTex() {
    let img = this.m_img;

    if (img != null && this.m_loaded) {
      let tex = this.texture;
      let offsetTex = this.offsetTex;
      let bytesTex = this.bytesTex;
      let imgData = null;
      let powBoo = MathConst_1.default.IsPowerOf2(img.width) && MathConst_1.default.IsPowerOf2(img.height);
      let powerOf2Fix = this.powerOf2Fix;

      if (RendererDevice_1.default.IsWebGL1()) {
        powerOf2Fix = true;
      }

      if (!powBoo && powerOf2Fix) {
        let pwidth = MathConst_1.default.CalcCeilPowerOfTwo(img.width);
        let pheight = MathConst_1.default.CalcCeilPowerOfTwo(img.height);
        if (pwidth > RendererDevice_1.default.MAX_TEXTURE_SIZE) pwidth = RendererDevice_1.default.MAX_TEXTURE_SIZE;
        if (pheight > RendererDevice_1.default.MAX_TEXTURE_SIZE) pwidth = RendererDevice_1.default.MAX_TEXTURE_SIZE;
        console.log("image canvas size: " + pwidth + "," + pheight);
        let dobj = createImageCanvas(img, pwidth, pheight);
        let mipLv = this.m_mipLv;

        if (tex != null) {
          tex.setDataFromImage(dobj.canvas, mipLv);
          console.log("use a base canvas create a img tex.");
          tex.name = this.m_url;

          if (offsetTex != null) {
            dobj = createImageCanvasAlphaOffset(img, pwidth, pheight);
            offsetTex.setDataFromImage(dobj.canvas, mipLv);
          }
        }

        if (bytesTex != null) {
          if (this.premultipliedAlpha) {
            console.log("use a base canvas create a bytes tex.");
            imgData = dobj.ctx2d.getImageData(0, 0, dobj.canvas.width, dobj.canvas.height);
            bytesTex.setDataFromBytes(imgData.data, mipLv, dobj.canvas.width, dobj.canvas.height);
            bytesTex.name = this.m_img.src;
          } else {
            //let t:number = Date.now();
            console.log("use a base canvas and a blendCanvas create a bytes tex.");
            imgData = dobj.ctx2d.getImageData(0, 0, dobj.canvas.width, dobj.canvas.height);
            let dst = imgData.data;
            let offsetObj = createImageCanvasAlphaOffset(img, pwidth, pheight);
            imgData = offsetObj.ctx2d.getImageData(0, 0, offsetObj.canvas.width, offsetObj.canvas.height);
            let sdata = imgData.data;
            let i = 0,
                j = 0,
                k = 0;

            for (; i < pheight; ++i) {
              for (j = 0; j < pwidth; ++j) {
                dst[k] += 255 - sdata[k];
                dst[k + 1] += 255 - sdata[k + 1];
                dst[k + 2] += 255 - sdata[k + 2]; //sdata[k + 3] = dst[k + 3];

                k += 4;
              }
            } //console.log("Loss time: "+(Date.now() - t));


            bytesTex.setDataFromBytes(dst, mipLv, dobj.canvas.width, dobj.canvas.height);
            bytesTex.name = this.m_img.src;
          }
        }
      } else {
        if (tex != null) {
          if (!this.powerOf2Fix) {
            console.log("image img size: " + img.width + "," + img.height);
          }

          tex.setDataFromImage(img, this.m_mipLv);
          tex.name = this.m_img.src;
        } else if (bytesTex != null) {
          let pwidth = MathConst_1.default.CalcNearestCeilPow2(img.width);
          let pheight = MathConst_1.default.CalcNearestCeilPow2(img.height);
          if (pwidth > 2048) pwidth = 2048;
          if (pheight > 2048) pwidth = 2048;
          let dobj = createImageCanvas(img, pwidth, pheight);
          let mipLv = this.m_mipLv;
          imgData = dobj.ctx2d.getImageData(0, 0, dobj.canvas.width, dobj.canvas.height);
          bytesTex.setDataFromBytes(imgData.data, mipLv, dobj.canvas.width, dobj.canvas.height);
          bytesTex.name = this.m_img.src;
        }
      }

      this.m_loaded = true; //console.log("ImgResUnit:startLoad(), loaded m_url: "+selfT.m_url);
    }
  }

  getURL() {
    return this.m_url;
  }

  getImage() {
    return this.m_img;
  }

  isLoaded() {
    return this.m_loaded;
  }

  destroy() {
    //console.log("ImgResUnit:destroy(), remove a res m_url: "+this.m_url);
    this.m_loaded = false;
    this.m_url = "";
    this.texture = null; // cancel image load

    this.m_img.src = "";
    this.m_img = null;
  }

}

class CubeImgResLoader {
  constructor(purls) {
    this.m_urls = null;
    this.m_imgs = [];
    this.m_loadedTotal = 0;
    this.m_loaded = false;
    this.m_texList = [];
    this.m_mLvList = [];
    this.m_urls = purls;
    var thisT = this;
    let i = 0;
    let img = null;

    for (; i < 6; ++i) {
      img = new Image();

      img.onload = function (info) {
        thisT.m_loadedTotal++;

        if (thisT.m_loadedTotal >= 6) {
          let i = 0;

          for (i = 0; i < 6; ++i) {
            //trace("m_imgs["+i+"] size: "+m_imgs[i].width+","+m_imgs[i].height);
            thisT.m_texList[0].setDataFromImageToFaceAt(i, thisT.m_imgs[i], thisT.m_mLvList[0]);
          }

          thisT.m_texList[0].name = thisT.m_imgs.src;
        }
      };

      img.crossOrigin = "";
      img.src = thisT.m_urls[i];
      thisT.m_imgs.push(img);
    }
  }

  addTex(tex, mipLevel) {
    this.m_texList.push(tex);
    this.m_mLvList.push(mipLevel);
  }

  getURLAt(i) {
    return this.m_urls[0];
  }

  getTexAt(i) {
    return this.m_texList[i];
  }

  isLoaded() {
    return this.m_loaded;
  }

  destroy() {}

}

class ImageTextureLoader {
  constructor(texBlock) {
    this.m_cubeDict = new Map();
    this.m_resMap = new Map();
    this.m_loadedList = [];
    this.m_waitLoadList = [];
    this.m_loadingList = [];
    this.m_loadingQueueMaxLength = 5;
    this.m_loadDelay = 17;
    this.m_loadDelayTime = 17;
    this.m_testDelay = 512;
    this.m_testDelayTime = 512;
    this.m_texBlock = null;
    this.m_runFlag = 0;
    this.m_texBlock = texBlock;

    if (texBlock != null) {
      texBlock.addTexLoader(this);
    }
  }

  getTexByUrl(purl, wrapRepeat = true, mipmapEnabled = true, powerOf2Fix = false) {
    let ptex = this.getImageTexByUrl(purl, 0, false, powerOf2Fix);
    ptex.mipmapEnabled = mipmapEnabled;
    if (wrapRepeat) ptex.setWrap(TextureConst_1.default.WRAP_REPEAT);
    return ptex;
  }

  getBytesNoPremultipliedAlphaTexByUrl(purl, mipLevel = 0) {
    if (purl == "") {
      return null;
    }

    if (mipLevel < 0) mipLevel = 0;
    let t = this.m_resMap.get(purl);

    if (t == null) {
      t = new ImgResUnit(purl, mipLevel);
      t.premultipliedAlpha = false;
      this.m_resMap.set(purl, t);
      let tex = this.m_texBlock.createBytesTex(1, 1);
      tex.name = purl;
      t.bytesTex = tex;
      this.m_waitLoadList.push(t);
      return tex;
    } else {
      if (t.bytesTex.isDestroyed()) {
        t.bytesTex = this.m_texBlock.createBytesTex(1, 1);
      }

      return t.bytesTex;
    }
  }

  getBytesTexByUrl(purl, mipLevel = 0) {
    if (purl == "") {
      return null;
    }

    if (mipLevel < 0) mipLevel = 0;
    let t = this.m_resMap.get(purl);

    if (t == null) {
      t = new ImgResUnit(purl, mipLevel);
      this.m_resMap.set(purl, t);
      let tex = this.m_texBlock.createBytesTex(1, 1);
      tex.name = purl;
      t.bytesTex = tex;
      this.m_waitLoadList.push(t);
      return tex;
    } else {
      if (t.bytesTex.isDestroyed()) {
        t.bytesTex = this.m_texBlock.createBytesTex(1, 1);
      }

      return t.bytesTex;
    }
  }

  getImageOffsetTexByUrl(purl, mipLevel = 0) {
    if (purl == "") {
      return null;
    }

    if (mipLevel < 0) mipLevel = 0;
    let t = this.m_resMap.get(purl);

    if (t != null) {
      return t.offsetTex;
    }

    return null;
  } // addCallbackByUrl(purl:string, callback: () => void): void {
  //     if(callback != null) {
  //         let t = this.m_resMap.get(purl);
  //         if (t != null) {
  //         }
  //     }
  // }


  getImageTexByUrl(purl, mipLevel = 0, offsetTexEnabled = false, powerOf2Fix = false) {
    if (purl == "") {
      return null;
    }

    if (mipLevel < 0) mipLevel = 0;
    let t = this.m_resMap.get(purl);

    if (t == null) {
      t = new ImgResUnit(purl, mipLevel);
      t.powerOf2Fix = powerOf2Fix;

      if (offsetTexEnabled) {
        t.offsetTex = this.m_texBlock.createImageTex2D(1, 1, false);
      }

      this.m_resMap.set(purl, t);
      let tex = this.m_texBlock.createImageTex2D(1, 1, false);
      tex.name = purl;
      t.texture = tex;

      if (this.m_loadingList.length < 6) {
        this.m_loadingList.push(t);
        t.startLoad();
      } else {
        this.m_waitLoadList.push(t);
      }

      return tex;
    } else {
      if (t.texture.isDestroyed()) {
        t.texture = this.m_texBlock.createImageTex2D(1, 1, false);
      }

      return t.texture;
    }
  }

  getCubeTexAndLoadImg(idns, purls, mipLevel = 0) {
    if (idns == "" || purls == null || purls.length < 6) {
      return null;
    }

    if (mipLevel < 0) mipLevel = 0;
    let t = this.m_cubeDict.get(idns);

    if (t == null) {
      t = new CubeImgResLoader(purls);
      this.m_cubeDict.set(idns, t);
      let tex = this.m_texBlock.createImageCubeTex(8, 8);
      t.addTex(tex, mipLevel);
      return tex;
    } else {
      return t.getTexAt(0);
    }
  }

  setRunFlag(flag) {
    this.m_runFlag = flag;
  }

  getRunFlag() {
    return this.m_runFlag;
  }

  isRunning() {
    return true;
  }

  isStopped() {
    return false;
  }

  run() {
    let i = 0;
    let res = null;
    --this.m_loadDelay;

    if (this.m_loadDelay < 1) {
      this.m_loadDelay = this.m_loadDelayTime;
      let loatingTotal = this.m_loadingList.length;

      if (loatingTotal > 0) {
        for (; i < loatingTotal; ++i) {
          if (this.m_loadingList[i].isLoaded()) {
            this.m_loadedList.push(this.m_loadingList[i]);
            this.m_loadingList.splice(i, 1);
            --i;
            --loatingTotal;
          }
        }
      }

      let waitingTotal = this.m_waitLoadList.length;

      if (waitingTotal > 0) {
        //console.log("ImageTextureLoader::run(), waitingTotal: "+waitingTotal);
        if (loatingTotal < this.m_loadingQueueMaxLength) {
          i = loatingTotal;

          for (; i < this.m_loadingQueueMaxLength; ++i) {
            if (this.m_waitLoadList.length > 0) {
              res = this.m_waitLoadList.pop();
              this.m_loadingList.push(res);
              res.startLoad();
            } else {
              break;
            }
          }
        }
      }
    }

    --this.m_testDelay;

    if (this.m_testDelay < 1) {
      this.m_testDelay = this.m_testDelayTime;
      let tex = null;
      let len = this.m_loadedList.length;

      for (i = 0; i < len; ++i) {
        res = this.m_loadedList[i];
        tex = res.texture != null ? res.texture : res.bytesTex;

        if (tex.isDestroyed()) {
          console.log("ImageTextureLoader::run(),remove a resource,url: ", res.getURL());
          this.m_resMap.delete(res.getURL());
          this.m_loadedList.splice(i, 1);
          res.destroy();
          --i;
          --len;
        }
      }
    }
  }

  getWaitTotal() {
    return this.m_waitLoadList.length;
  }

  isLoadedAll() {
    return this.m_waitLoadList.length < 1;
  }

}

exports.default = ImageTextureLoader;

/***/ }),

/***/ "f63e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ShaderUniformData_1 = __importDefault(__webpack_require__("b3bd"));

const MaterialBase_1 = __importDefault(__webpack_require__("0fc4"));

const ShaderCodeBuffer_1 = __importDefault(__webpack_require__("faa5"));

class Default3DShaderCodeBuffer extends ShaderCodeBuffer_1.default {
  constructor() {
    super();
    this.m_uniqueName = "";
    this.normalEnabled = false;
    this.vtxMatrixTransform = true;
  }

  initialize(texEnabled) {
    super.initialize(texEnabled);
    this.m_uniqueName = "VOX_Default3DShd";
    if (this.m_texEnabled) this.m_uniqueName += "_tex";
    if (this.vertColorEnabled) this.m_uniqueName += "_vtxColor";
    if (this.premultiplyAlpha) this.m_uniqueName += "_preMulAlpha";
    this.adaptationShaderVersion = false;
  }

  buildShader() {
    let coder = this.m_coder;
    coder.addVertLayout("vec3", "a_vs");
    coder.addFragUniform("vec4", "u_color");

    if (this.vtxMatrixTransform) {
      coder.addDefine("VOX_VTX_MAT_TRANSFORM");
      coder.useVertSpaceMats(true, true, true);
    } else {
      coder.useVertSpaceMats(false, false, false);
    }

    if (this.m_texEnabled) {
      this.m_uniform.addDiffuseMap();
      coder.addVertLayout("vec2", "a_uvs");
      coder.addVarying("vec2", "v_uv");
    }

    if (this.normalEnabled) {
      coder.addFragHeadCode("const vec3 direc = normalize(vec3(0.3,0.6,0.9));");
    }

    if (this.vertColorEnabled) {
      coder.addVertLayout("vec3", "a_cvs");
      coder.addVarying("vec3", "v_cv");
    }

    coder.addFragOutput("vec4", "FragColor0");
    coder.addFragMainCode(`
    FragColor0 = vec4(1.0);
    #ifdef VOX_USE_2D_MAP
        //  FragColor0 *= VOX_Texture2D(VOX_DIFFUSE_MAP, vec2(v_uv[0],v_uv[1]));
        FragColor0 *= VOX_Texture2D(VOX_DIFFUSE_MAP, v_uv.xy);
    #endif
    #ifdef VOX_USE_VTX_COLOR
        FragColor0.xyz *= v_cv.xyz;
    #endif
    #ifdef VOX_PREMULTIPLY_ALPHA
        FragColor0.rgb *= u_color.xyz;
        FragColor0.a *= u_color.w;
        FragColor0.rgb *= u_color.aaa;
    #else
        FragColor0 *= u_color;
    #endif
    #ifdef VOX_USE_NORMAL
        float nDotL = max(dot(v_worldNormal.xyz, direc), 0.0);
        FragColor0.xyz = FragColor0.xyz * 0.7 + 0.3 * FragColor0.xyz * vec3(nDotL);
    #endif
`);
    coder.addVertMainCode(`
    localPosition = vec4(a_vs.xyz,1.0);
    #ifdef VOX_VTX_MAT_TRANSFORM
        worldPosition = u_objMat * localPosition;
        oWorldPosition = worldPosition;
        viewPosition = u_viewMat * worldPosition;
        gl_Position = u_projMat * viewPosition;
        #ifdef VOX_USE_NORMAL
            v_worldNormal = normalize( a_nvs.xyz * inverse(mat3(u_objMat)) );
        #endif
    #else
        gl_Position = localPosition;
        #ifdef VOX_USE_NORMAL
            v_worldNormal = normalize( a_nvs.xyz );
        #endif
    #endif

    #ifdef VOX_USE_2D_MAP
        v_uv = a_uvs.xy;
    #endif
    #ifdef VOX_USE_VTX_COLOR
        v_cv = a_cvs.xyz;
    #endif
`);
  }

  getUniqueShaderName() {
    return this.m_uniqueName;
  }

}

class Default3DMaterial extends MaterialBase_1.default {
  constructor() {
    super();
    this.m_data = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    this.vertColorEnabled = false;
    this.premultiplyAlpha = false;
    this.normalEnabled = false;
    this.shadowReceiveEnabled = false;
    this.vtxMatrixTransform = true;

    if (Default3DMaterial.s_shdCodeBuffer == null) {
      Default3DMaterial.s_shdCodeBuffer = new Default3DShaderCodeBuffer();
    }
  }

  buildBuf() {
    let buf = Default3DMaterial.s_shdCodeBuffer;
    buf.getShaderCodeBuilder().normalEnabled = this.normalEnabled;
    buf.vertColorEnabled = this.vertColorEnabled;
    buf.premultiplyAlpha = this.premultiplyAlpha;
    buf.normalEnabled = this.normalEnabled;
    buf.shadowReceiveEnabled = this.shadowReceiveEnabled;
    buf.vtxMatrixTransform = this.vtxMatrixTransform;
  }
  /**
   * get a shader code buf instance, for sub class override
   * @returns a ShaderCodeBuffer class instance
   */


  getCodeBuf() {
    return Default3DMaterial.s_shdCodeBuffer;
  }

  setRGB3f(pr, pg, pb) {
    this.m_data[0] = pr;
    this.m_data[1] = pg;
    this.m_data[2] = pb;
  }

  getRGB3f(color) {
    let ds = this.m_data;
    color.setRGB3f(ds[0], ds[1], ds[2]);
  }

  setRGBA4f(pr, pg, pb, pa) {
    this.m_data[0] = pr;
    this.m_data[1] = pg;
    this.m_data[2] = pb;
    this.m_data[3] = pa;
  }

  getRGBA4f(color) {
    color.fromArray4(this.m_data);
  }

  setAlpha(pa) {
    this.m_data[3] = pa;
  }

  getAlpha() {
    return this.m_data[3];
  }

  setColor(color) {
    color.toArray4(this.m_data);
  }

  getColor(color) {
    color.fromArray4(this.m_data);
  }

  createSelfUniformData() {
    let oum = new ShaderUniformData_1.default();
    oum.uniformNameList = ["u_color"];
    oum.dataList = [this.m_data];
    return oum;
  }

}

Default3DMaterial.s_shdCodeBuffer = null;
exports.default = Default3DMaterial;

/***/ }),

/***/ "f928":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureConst_1 = __importDefault(__webpack_require__("8d98"));

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const TextureDataType_1 = __importDefault(__webpack_require__("1f61"));

const RawDataTextureProxy_1 = __importDefault(__webpack_require__("df25"));

class FloatTextureProxy extends RawDataTextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_type = TextureProxyType_1.TextureProxyType.Float;
    this.minFilter = TextureConst_1.default.LINEAR;
    this.internalFormat = TextureFormat_1.default.RGBA16F;
    this.dataType = TextureDataType_1.default.FLOAT;
    this.unpackAlignment = 4;
  }

  toAlphaFormat() {
    this.srcFormat = TextureFormat_1.default.ALPHA;
    this.internalFormat = TextureFormat_1.default.ALPHA;
    this.unpackAlignment = 1;
  }

  toRedFormat() {
    this.srcFormat = TextureFormat_1.default.RED;
    this.internalFormat = TextureFormat_1.default.RED;
    this.unpackAlignment = 1;
  }

  toRGBFormat() {
    this.srcFormat = TextureFormat_1.default.RGB;
    this.internalFormat = TextureFormat_1.default.RGB16F;
    this.unpackAlignment = 1;
  }

  toRGBAFormat() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.unpackAlignment = 4;
  }

  toRGBAFloatFormat() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA16F;
    this.unpackAlignment = 4;
  }

  setDataFromBytes(bytes, miplevel = 0, imgWidth = -1, imgHeight = -1, offsetx = 0, offsety = 0, rebuild = false) {
    super.setDataFromBytes(bytes, miplevel, imgWidth, imgHeight, offsetx, offsety, rebuild);
  }

  setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel = 0) {
    super.setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel);
  }

  getPixels(px, py, pw, ph, outBytes) {
    super.getPixels(px, py, pw, ph, outBytes);
  }

  toString() {
    return "[FloatTextureProxy(width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = FloatTextureProxy;

/***/ }),

/***/ "faa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ShaderCodeUUID_1 = __webpack_require__("f3a2");

const ShaderCodeBuilder_1 = __importDefault(__webpack_require__("4a54"));

const MaterialPipeType_1 = __webpack_require__("5216");

const ShaderCodeUniform_1 = __webpack_require__("3113");

const ShaderTextureBuilder_1 = __webpack_require__("4efa");

class ShaderCodeBuffer {
  constructor() {
    this.m_coder = null;
    this.m_shaderCodeObj = null;
    this.m_texList = null;
    this.m_texEnabled = true;
    this.pipeline = null;
    this.gamma = false;
    this.vertColorEnabled = false;
    this.premultiplyAlpha = false;
    this.shadowReceiveEnabled = false;
    this.lightEnabled = false;
    this.fogEnabled = false;
    this.envAmbientLightEnabled = false;
    this.brightnessOverlayEnabeld = false;
    this.glossinessEnabeld = true;
    this.pipeTypes = null;
    this.keysString = "";
    /**
     * 是否自适应转换shader版本
     */

    this.adaptationShaderVersion = true;

    if (ShaderCodeBuffer.s_coder == null) {
      ShaderCodeBuffer.s_uniform = new ShaderCodeUniform_1.ShaderCodeUniform();
      ShaderCodeBuffer.s_coder = new ShaderCodeBuilder_1.default(ShaderCodeBuffer.s_uniform);

      ShaderCodeBuffer.s_uniform.__$setCodeBuilder(ShaderCodeBuffer.s_coder);

      ShaderCodeBuffer.s_texBulder = new ShaderTextureBuilder_1.ShaderTextureBuilder(ShaderCodeBuffer.s_coder);
    }
  }

  reset() {
    this.m_coder = ShaderCodeBuffer.s_coder;
    this.m_uniform = ShaderCodeBuffer.s_uniform;
    this.m_texBuilder = ShaderCodeBuffer.s_texBulder;
    this.m_texture = this.m_uniform;
    this.m_coder.reset();
    this.m_texList = null;
    this.pipeTypes = null;
    this.gamma = false;
    this.vertColorEnabled = false;
    this.premultiplyAlpha = false;
    this.shadowReceiveEnabled = false;
    this.lightEnabled = false;
    this.fogEnabled = false;
    this.envAmbientLightEnabled = false;
    this.brightnessOverlayEnabeld = false;
    this.glossinessEnabeld = true;
    this.keysString = "";
  }

  clear() {
    this.m_coder = null;
  }

  getUniform() {
    return this.m_uniform;
  }

  getTexture() {
    return this.m_texture;
  }

  getTexBuilder() {
    return this.m_texBuilder;
  }

  setShaderCodeObject(obj) {
    this.m_shaderCodeObj = obj;
  }

  getShaderCodeObject() {
    return this.m_shaderCodeObj;
  }

  getShaderCodeObjectUUID() {
    return ShaderCodeUUID_1.ShaderCodeUUID.None;
  }

  getShaderCodeBuilder() {
    return ShaderCodeBuffer.s_coder;
  }

  static GetPreCompileInfo() {
    return ShaderCodeBuffer.s_coder.getPreCompileInfo();
  }

  initialize(texEnabled) {
    // if (ShaderCodeBuffer.__$s_csBuf != null) {
    //     if (ShaderCodeBuffer.__$s_csBuf != this) {
    //         ShaderCodeBuffer.__$s_csBuf.initialize(texEnabled);
    //     }
    // }
    this.m_texEnabled = texEnabled;
    this.bufInitWithPipeline();
  }

  buildDefine() {
    if (this.premultiplyAlpha) {
      this.m_coder.addDefine("VOX_PREMULTIPLY_ALPHA");
      this.keysString += "A";
    }

    if (this.vertColorEnabled) {
      this.m_coder.addDefine("VOX_USE_VTX_COLOR");
      this.keysString += "UVC";
    }

    if (this.brightnessOverlayEnabeld) {
      this.m_coder.addDefine("VOX_USE_BRIGHTNESS_OVERLAY_COLOR");
      this.keysString += "UBOC";
    }

    if (this.glossinessEnabeld) {
      this.m_coder.addDefine("VOX_USE_GLOSSINESS");
      this.keysString += "UG";
    }
  }

  buildPipelineParams() {
    if (this.pipeline != null) {
      if (this.pipeTypes == null) this.pipeTypes = [];
      let MPT = MaterialPipeType_1.MaterialPipeType;
      if (this.lightEnabled && !this.pipeTypes.includes(MPT.GLOBAL_LIGHT)) this.pipeTypes.push(MPT.GLOBAL_LIGHT);
      if (this.shadowReceiveEnabled && !this.pipeTypes.includes(MPT.VSM_SHADOW)) this.pipeTypes.push(MPT.VSM_SHADOW);
      if (this.fogEnabled && !this.pipeTypes.includes(MPT.FOG_EXP2)) this.pipeTypes.push(MPT.FOG_EXP2);
      if (this.envAmbientLightEnabled && !this.pipeTypes.includes(MPT.ENV_AMBIENT_LIGHT)) this.pipeTypes.push(MPT.ENV_AMBIENT_LIGHT);
    }
  }

  getTexturesFromPipeline(outList) {
    if (this.pipeline != null) {
      this.pipeline.getTextures(this.m_coder, outList, this.pipeTypes);
    }
  }

  bufInitWithPipeline() {
    if (this.pipeline != null) {
      this.buildPipelineParams();
      this.pipeline.buildSharedUniforms(this.pipeTypes);
      this.pipeline.createKeys(this.pipeTypes);
      this.keysString += this.pipeline.getKeysString();
    }
  }

  isTexEanbled() {
    return this.m_texEnabled;
  }

  setIRenderTextureList(texList) {
    this.m_texList = texList;
  }

  getIRenderTextureList() {
    return this.m_texList;
  }

  buildShader() {}

  getFragShaderCode() {
    //if (ShaderCodeBuffer.__$s_csBuf != this) return ShaderCodeBuffer.__$s_csBuf.getFragShaderCode();
    return this.m_coder.buildFragCode();
  }

  getVertShaderCode() {
    //if (ShaderCodeBuffer.__$s_csBuf != this) return ShaderCodeBuffer.__$s_csBuf.getVertShaderCode();
    return this.m_coder.buildVertCode();
  }

  getUniqueShaderName() {
    //if (ShaderCodeBuffer.__$s_csBuf != this) return ShaderCodeBuffer.__$s_csBuf.getUniqueShaderName();
    throw Error("Illgel operation !!!");
    return "";
  }

  toString() {
    return "[ShaderCodeBuffer()]";
  }

}

exports.default = ShaderCodeBuffer;

/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1eb2");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c807");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_entry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _entry__WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _entry__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "fc07":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

const AttributeLine_1 = __importDefault(__webpack_require__("2e8a"));

const UniformLine_1 = __importDefault(__webpack_require__("78e9"));

class ShaderCodeParser {
  constructor() {
    this.m_texNSMap = new Map();
    this.attriNSList = null;
    this.attriSizeList = null;
    this.uniformNameListStr = "";
    this.texUniformNameListStr = "";
    this.attributes = [null, null, null, null, null, null, null, null, null, null, null, null];
    this.uniforms = null;
    this.texTotal = 0;
    this.fragOutputTotal = 0;
  }

  reset() {
    this.attriNSList = null;
    this.uniformNameListStr = "";
    this.texUniformNameListStr = "";
    let i = 0;

    for (; i < 12; ++i) {
      this.attributes[i] = null;
    }

    this.uniforms = null;
    this.m_texNSMap.clear();
    this.texTotal = 0;
  }

  parseVShaderCode(vshdsrc) {
    let semicolonReg = new RegExp(";", "g");
    vshdsrc = vshdsrc.replace(semicolonReg, ";\n");
    vshdsrc = vshdsrc.replace("{", "{\n");
    vshdsrc = vshdsrc.replace("}", "\n}"); //

    let ENTER = "\n";
    let i = vshdsrc.indexOf(ENTER);
    let j = 0; //

    let codeList = [];
    let str = "";
    let subStr = ""; //trace("-----------------parseVShaderCode begin----------------------");

    let regSpace = new RegExp(" ", "g");

    while (i >= 0) {
      str = vshdsrc.slice(j, i);

      if (str.length > 0) {
        subStr = str.replace(regSpace, "");

        if (subStr.indexOf("//") != 0) {
          codeList.push(str);
        }
      }

      j = i + 1;
      i = vshdsrc.indexOf(ENTER, j);
    }

    str = vshdsrc.slice(j, vshdsrc.length);

    if (str.length > 0) {
      subStr = str.replace(regSpace, "");

      if (subStr.indexOf("//") != 0) {
        codeList.push(str);
      }
    }

    let UNIFORM = "uniform ";
    let len = codeList.length;
    let attri = null;
    i = 0;

    for (; i < 12; ++i) {
      this.attributes[i] = null;
    }

    this.attriNSList = [];
    this.attriSizeList = []; //

    let uniform = null;
    if (this.uniforms == null) this.uniforms = []; //if(this.uniformNameList == null)this.uniformNameList = [];
    //

    i = 0;
    let flagLayout = false;
    let flagAttri = false;

    while (i < len) {
      str = codeList[i];
      flagLayout = str.indexOf("layout") >= 0;
      flagAttri = str.indexOf("attribute ") >= 0;

      if (flagLayout && str.indexOf("location") > 0 || flagAttri) {
        attri = new AttributeLine_1.default();
        attri.layoutEnabled = flagLayout;
        attri.parseCode(str); //this.attributes.push( attri );

        this.attributes[attri.attriType] = attri;
        this.attriNSList.push(attri.name);
        this.attriSizeList.push(attri.typeSize);
      } else if (str.indexOf(UNIFORM) >= 0) {
        uniform = new UniformLine_1.default();

        if (uniform.parseCode(str)) {
          this.uniforms.push(uniform); //this.uniformNameList.push( uniform.name );

          this.uniformNameListStr += uniform.name + ",";

          if (uniform.isTex && !this.m_texNSMap.has(uniform.name)) {
            console.log("use vtx texture !!!");
            this.m_texNSMap.set(uniform.name, 1);
            this.texUniformNameListStr += uniform.name + ",";
            this.texTotal++;
          }
        }
      }

      ++i;
    } //trace("-----------------parseVShaderCode end----------------------");

  }

  parseFShaderCode(fshdsrc) {
    let semicolonReg = new RegExp(";", "g");
    fshdsrc = fshdsrc.replace(semicolonReg, ";\n");
    fshdsrc = fshdsrc.replace("{", "{\n");
    fshdsrc = fshdsrc.replace("}", "\n}"); //

    let ENTER = "\n";
    let i = fshdsrc.indexOf(ENTER);
    let j = 0; //

    let codeList = [];
    let str = "";
    let subStr = ""; //console.log("-----------------parseFShaderCode begin----------------------");

    let regSpace = new RegExp(" ", "g");

    while (i >= 0) {
      str = fshdsrc.slice(j, i);

      if (str.length > 0) {
        subStr = str.replace(regSpace, "");

        if (subStr.indexOf("//") != 0) {
          codeList.push(str);
        }
      }

      j = i + 1;
      i = fshdsrc.indexOf(ENTER, j);
    }

    str = fshdsrc.slice(j, fshdsrc.length);

    if (str.length > 0) {
      subStr = subStr.replace(regSpace, "");

      if (subStr.indexOf("//") != 0) {
        codeList.push(str); //trace(str);
      }
    }

    let UNIFORM = "uniform ";
    let len = codeList.length;
    let uniform = null;
    if (this.uniforms == null) this.uniforms = [];
    i = 0;

    while (i < len) {
      str = codeList[i];

      if (str.indexOf(UNIFORM) >= 0 && this.uniformNameListStr.indexOf(UNIFORM) < 0) {
        uniform = new UniformLine_1.default();

        if (uniform.parseCode(str)) {
          this.uniforms.push(uniform);
          this.uniformNameListStr += uniform.name + ",";

          if (uniform.isTex && !this.m_texNSMap.has(uniform.name)) {
            this.m_texNSMap.set(uniform.name, 1);
            this.texUniformNameListStr += uniform.name + ",";
            this.texTotal++;
          } else {//this.uniformNameList.push( uniform.name );
          }
        }
      }

      ++i;
    }

    let outputKey = "layout";

    if (RendererDevice_1.default.IsWebGL1()) {
      outputKey = "gl_FragData";
    }

    i = fshdsrc.indexOf(outputKey);
    this.fragOutputTotal = 0;

    while (i > 0) {
      this.fragOutputTotal++;
      i = fshdsrc.indexOf(outputKey, i + 2);
    }

    if (this.fragOutputTotal < 1) {
      this.fragOutputTotal = 1;
    } //trace("-----------------parseFShaderCode end----------------------,texTotal: "+texTotal);

  }

}

exports.default = ShaderCodeParser;

/***/ }),

/***/ "fe7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TextureProxyType_1 = __webpack_require__("7918");

const TextureFormat_1 = __importDefault(__webpack_require__("ffc0"));

const RawDataTextureProxy_1 = __importDefault(__webpack_require__("df25"));

class BytesTextureProxy extends RawDataTextureProxy_1.default {
  constructor(texWidth, texHeight, powerof2Boo = false) {
    super(texWidth, texHeight, powerof2Boo);
    this.m_type = TextureProxyType_1.TextureProxyType.Bytes;
  }

  toAlphaFormat() {
    this.srcFormat = TextureFormat_1.default.ALPHA;
    this.internalFormat = TextureFormat_1.default.ALPHA;
    this.unpackAlignment = 1;
  }

  toRedFormat() {
    this.srcFormat = TextureFormat_1.default.RED;
    this.internalFormat = TextureFormat_1.default.RED;
    this.unpackAlignment = 1;
  }

  toRGBFormat() {
    this.srcFormat = TextureFormat_1.default.RGB;
    this.internalFormat = TextureFormat_1.default.RGB;
    this.unpackAlignment = 3;
  }

  toRGBAFormat() {
    this.srcFormat = TextureFormat_1.default.RGBA;
    this.internalFormat = TextureFormat_1.default.RGBA;
    this.unpackAlignment = 4;
  }

  setDataFromBytes(bytes, miplevel = 0, imgWidth = -1, imgHeight = -1, offsetx = 0, offsety = 0, rebuild = false) {
    super.setDataFromBytes(bytes, miplevel, imgWidth, imgHeight, offsetx, offsety, rebuild);
  }

  setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel = 0) {
    super.setPartDataFromeBytes(bytes, px, py, twidth, theight, miplevel);
  }

  getPixels(px, py, pw, ph, outBytes) {
    super.getPixels(px, py, pw, ph, outBytes);
  }

  toString() {
    return "[BytesTextureProxy(width=" + this.getWidth() + ",height=" + this.getHeight() + ")]";
  }

}

exports.default = BytesTextureProxy;

/***/ }),

/***/ "febe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const VtxBufConst_1 = __importDefault(__webpack_require__("8a0a"));

const RenderConst_1 = __webpack_require__("e08e");

class ROIVertexBuffer {
  constructor(bufDataUsage = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    this.m_uid = 0;
    this.m_layoutBit = 0;
    this.m_ivs = null;
    this.m_bufDataUsage = 0;
    this.m_ibufStep = 2; // 2 or 4

    this.layoutBit = 0x0;
    this.vertexVer = 0;
    this.indicesVer = 0;
    this.version = 0;
    this.drawMode = RenderConst_1.RenderDrawMode.ELEMENTS_TRIANGLES;
    this.bufData = null;
    this.m_uid = ROIVertexBuffer.s_uid++;
    this.m_bufDataUsage = bufDataUsage;
  }

  getUid() {
    return this.m_uid;
  }

  getType() {
    return 0;
  }

  setBufSortFormat(layoutBit) {
    this.m_layoutBit = layoutBit;
  }

  getBufSortFormat() {
    return this.m_layoutBit;
  }

  getIBufStep() {
    return this.m_ibufStep;
  }

  getBufDataUsage() {
    return this.m_bufDataUsage;
  }

  getIvsData() {
    return this.m_ivs;
  }

  setUintIVSData(uint16Or32Arr, status = VtxBufConst_1.default.VTX_STATIC_DRAW) {
    if (uint16Or32Arr instanceof Uint16Array) {
      this.m_ibufStep = 2;

      if (uint16Or32Arr.length > 65535) {
        throw Error("its type is not Uint32Array.");
      }
    } else if (uint16Or32Arr instanceof Uint32Array) {
      this.m_ibufStep = 4;
    } else {
      console.error("Error: uint16Or32Arr is not an Uint32Array or an Uint16Array bufferArray instance !!!!");
      return;
    }

    this.m_ivs = uint16Or32Arr;

    if (uint16Or32Arr != null) {
      this.indicesVer++;
    }
  }
  /**
   * this function is only an empty function.
   */


  destroy() {
    this.m_layoutBit = 0;
  }

}

ROIVertexBuffer.s_uid = 0;
exports.default = ROIVertexBuffer;

/***/ }),

/***/ "fecb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const MathConst_1 = __importDefault(__webpack_require__("6e01"));

const Vector3D_1 = __importDefault(__webpack_require__("8e17"));

class AABB {
  constructor() {
    this.m_long = 100.0;
    this.m_width = 100.0;
    this.m_height = 100.0;
    this.m_halfLong = 50.0;
    this.m_halfWidth = 50.0;
    this.m_halfHeight = 50.0;
    this.m_tempV = new Vector3D_1.default();
    this.min = new Vector3D_1.default();
    this.max = new Vector3D_1.default();
    this.version = -1;
    this.radius = 50;
    this.radius2 = 2500;
    this.center = new Vector3D_1.default(0.0, 0.0, 0.0);
    this.reset();
  }

  getLong() {
    return this.m_long;
  }

  getWidth() {
    return this.m_width;
  }

  getHeight() {
    return this.m_height;
  }

  reset() {
    const min = this.min;
    const max = this.max;
    let v = min;
    v.x = v.y = v.z = MathConst_1.default.MATH_MAX_POSITIVE;
    v = max;
    v.x = v.y = v.z = MathConst_1.default.MATH_MIN_NEGATIVE;
  }

  equals(ab) {
    return this.min.equalsXYZ(ab.min) && this.max.equalsXYZ(ab.max);
  }

  setVolume(width, height, long) {
    this.m_width = width;
    this.m_height = height;
    this.m_long = long;
    this.m_halfLong = 0.5 * this.m_long;
    this.m_halfWidth = 0.5 * this.m_width;
    this.m_halfHeight = 0.5 * this.m_height;
    this.max.x = this.center.x + this.m_halfWidth;
    this.max.y = this.center.y + this.m_halfHeight;
    this.max.z = this.center.z + this.m_halfLong;
    this.min.x = this.center.x - this.m_halfWidth;
    this.min.y = this.center.y - this.m_halfHeight;
    this.min.z = this.center.z - this.m_halfLong;
    this.radius2 = this.m_halfWidth * this.m_halfWidth + this.m_halfHeight * this.m_halfHeight + this.m_halfLong * this.m_halfLong;
    this.radius = Math.sqrt(this.radius2);
  }

  union(ab) {
    this.addPosition(ab.min);
    this.addPosition(ab.max);
    return this;
  }

  addPosition(pv) {
    this.addXYZ(pv.x, pv.y, pv.z);
    return this;
  }

  addXYZ(pvx, pvy, pvz) {
    const min = this.min;
    const max = this.max;
    if (min.x > pvx) min.x = pvx;
    if (max.x < pvx) max.x = pvx;
    if (min.y > pvy) min.y = pvy;
    if (max.y < pvy) max.y = pvy;
    if (min.z > pvz) min.z = pvz;
    if (max.z < pvz) max.z = pvz;
  }

  addFloat32Arr(vs, step = 3) {
    let len = vs.length;

    for (let i = 0; i < len;) {
      this.addXYZ(vs[i], vs[i + 1], vs[i + 2]);
      i += step;
    }
  }

  addFloat32AndIndicesArr(vs, indices) {
    let len = indices.length;
    let i;

    for (let k = 0; k < len; k++) {
      i = indices[k] * 3;
      this.addXYZ(vs[i++], vs[i++], vs[i]);
    }
  }

  getClosePosition(in_pos, out_pos, bias = 0.0) {
    const min = this.min;
    const max = this.max;
    out_pos.copyFrom(in_pos);

    if (out_pos.x < min.x) {
      out_pos.x = min.x + bias;
    } else if (out_pos.x > max.x) {
      out_pos.x = max.x - bias;
    }

    if (out_pos.y < min.y) {
      out_pos.y = min.y + bias;
    } else if (out_pos.y > max.y) {
      out_pos.y = max.y - bias;
    }

    if (out_pos.z < min.z) {
      out_pos.z = min.z + bias;
    } else if (out_pos.z > max.z) {
      out_pos.z = max.z - bias;
    }
  } // @param	v	Vector3D instance


  containsV(v) {
    if (v.x < this.min.x || v.x > this.max.x) return false;
    if (v.y < this.min.y || v.y > this.max.y) return false;
    if (v.z < this.min.z || v.z > this.max.z) return false;
    return true;
  } // 是否包含某一点(同一坐标空间的点)


  containsXY(vx, vy) {
    if (vx < this.min.x || vx > this.max.x) return false;
    if (vy < this.min.y || vy > this.max.y) return false;
    return true;
  } // 是否包含某一点(同一坐标空间的点)


  containsXZ(vx, vz) {
    if (vx < this.min.x || vx > this.max.x) return false;
    if (vz < this.min.z || vz > this.max.z) return false;
    return true;
  } // 是否包含某一点(同一坐标空间的点)


  containsYZ(vy, vz) {
    if (vy < this.min.y || vy > this.max.y) return false;
    if (vz < this.min.z || vz > this.max.z) return false;
    return true;
  }

  copyFrom(ab) {
    //this.setRadius(ab.getRadius());
    this.radius = ab.radius;
    this.radius2 = ab.radius2; //this.setRadiusSquared(ab.getRadiusSquared());

    this.min.copyFrom(ab.min);
    this.max.copyFrom(ab.max); //this.getOCenter().copyFrom(ab.getOCenter());

    this.center.copyFrom(ab.center);
    this.updateVolume();
    return this;
  }

  expand(bias) {
    this.min.subtractBy(bias);
    this.max.addBy(bias);
    return this;
  }

  updateVolume() {
    this.m_width = this.max.x - this.min.x;
    this.m_height = this.max.y - this.min.y;
    this.m_long = this.max.z - this.min.z;
    this.m_halfLong = 0.5 * this.m_long;
    this.m_halfWidth = 0.5 * this.m_width;
    this.m_halfHeight = 0.5 * this.m_height;
    ++this.version;
    return this;
  }

  updateThis() {
    this.center.x = 0.5 * this.m_width;
    this.center.y = 0.5 * this.m_height;
    this.center.z = 0.5 * this.m_long;
    this.m_halfLong = this.center.z;
    this.m_halfWidth = this.center.x;
    this.m_halfHeight = this.center.y;
    this.radius2 = this.m_halfWidth * this.m_halfWidth + this.m_halfHeight * this.m_halfHeight + this.m_halfLong * this.m_halfLong;
    this.radius = Math.sqrt(this.radius2);
    this.center.addBy(this.min);
    ++this.version;
  }

  update() {
    // x
    this.m_width = this.max.x;

    if (this.min.x > this.max.x) {
      this.max.x = this.min.x;
      this.min.x = this.m_width;
    }

    this.m_width = this.max.x - this.min.x; // y

    this.m_height = this.max.y;

    if (this.min.y > this.max.y) {
      this.max.y = this.min.y;
      this.min.y = this.m_height;
    }

    this.m_height = this.max.y - this.min.y; // z

    this.m_long = this.max.z;

    if (this.min.z > this.max.z) {
      this.max.z = this.min.z;
      this.min.z = this.m_long;
    }

    this.m_long = this.max.z - this.min.z;
    this.updateThis();
  }

  updateFast() {
    this.m_width = this.max.x - this.min.x;
    this.m_height = this.max.y - this.min.y;
    this.m_long = this.max.z - this.min.z;
    this.updateThis();
  }

  toString() {
    return "[AABB(min->" + this.min + ",size(" + this.m_width + "," + this.m_height + "," + this.m_long + "))]";
  } // max vecs sphere range intersect calc


  sphereIntersect(centerV, radius) {
    this.m_tempV.x = this.center.x - centerV.x;
    this.m_tempV.y = this.center.y - centerV.y;
    this.m_tempV.z = this.center.z - centerV.z;
    let dis = this.m_tempV.getLengthSquared();

    if (dis < this.radius2) {
      return true;
    }

    radius += this.radius;
    radius *= radius;
    return radius >= dis;
  }

}

exports.default = AABB;

/***/ }),

/***/ "ffc0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***************************************************************************/

/*                                                                         */

/*  Copyright 2018-2022 by                                                 */

/*  Vily(vily313@126.com)                                                  */

/*                                                                         */

/***************************************************************************/

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RendererDevice_1 = __importDefault(__webpack_require__("3b73"));

class TextureFormat {
  static ToGL(gl, format) {
    const tf = TextureFormat;

    switch (format) {
      case tf.RGBA:
        break;

      case tf.R8:
        return gl.R8;
        break;

      case tf.RGB:
        return gl.RGB;
        break;

      case tf.RGB8:
        return gl.RGB8;
        break;

      case tf.RGBA8:
        return gl.RGBA8;
        break;

      case tf.ALPHA:
        return gl.ALPHA;
        break;

      case tf.RGB16F:
        if (RendererDevice_1.default.IsWebGL2()) {
          return gl.RGB16F;
        }

        return gl.RGB;
        break;

      case tf.RGBA16F:
        if (RendererDevice_1.default.IsWebGL2()) {
          return gl.RGBA16F;
        }

        return gl.RGBA;
        break;

      case tf.RGB32F:
        if (RendererDevice_1.default.IsWebGL2()) gl.RGB32F;
        return gl.RGB;
        break;

      case tf.RGBA32F:
        if (RendererDevice_1.default.IsWebGL2()) gl.RGBA32F;
        return gl.RGBA;
        break;

      case TextureFormat.RED:
        return gl.RED;
        break;

      case tf.DEPTH_COMPONENT:
        return gl.DEPTH_COMPONENT;
        break;

      case tf.DEPTH_STENCIL:
        return gl.DEPTH_STENCIL;
        break;

      default:
        break;
    }

    return gl.RGBA;
  }

}

TextureFormat.R8 = 101;
TextureFormat.RGB = 110;
TextureFormat.RED = 111;
TextureFormat.RGBA = 121;
TextureFormat.RGB8 = 122;
TextureFormat.RGBA8 = 123;
TextureFormat.ALPHA = 132;
TextureFormat.RGB16F = 331;
TextureFormat.RGBA16F = 332;
TextureFormat.RGB32F = 341;
TextureFormat.RGBA32F = 342;
TextureFormat.DEPTH_COMPONENT = 351;
TextureFormat.DEPTH_STENCIL = 352;
exports.default = TextureFormat;

/***/ })

/******/ });