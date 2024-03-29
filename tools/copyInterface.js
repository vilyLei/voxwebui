
console.log("copy begin...");
const path = require("path"),
    fs = require("fs");

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

let emptyFileTxt = `export default interface IRPONode {
    uid: number;
    index: number;
};
`;
function writeCurrFile(srcUrl, dstUrl) {
    if (srcUrl.indexOf("\\IRPONode.ts") < 0) {
        // return true;
        fs.copyFileSync(srcUrl, dstUrl);
    } else {
        const opt = {
            flag: 'w'//, // a：追加写入；w：覆盖写入
        }
        fs.writeFile(dstUrl, emptyFileTxt, opt, (err) => {
            if (err) {
                console.error(err)
            }
        })
    }
    // return false;
}
function copyLib(filePath, dstDir, rename) {
    let path = filePath + "";
    // console.log("find path: ", path);
    let keyStr = "../src/";
    let i = keyStr.length;
    let url = dstDir + path.slice(i);
    // console.log("find dst url: ", url);
    i = url.lastIndexOf("\\");
    let dir = url.slice(0, i + 1);
    let fileName = url.slice(i + 1);
    // console.log("find dst dir: ", dir, ", fileName: ", fileName);
    // return;
    const isExisted = fsExistsSync(dir);
    // console.log("isExisted: ", isExisted);
    if (!isExisted) {
        mkdirsSync(dir);
    }
    if (rename) {
        fileName = fileName.slice(0, fileName.indexOf(".")) + ".js";
        fileName = fileName.toLowerCase();
    }

    // if(filePath.indexOf("voxengine") > 0) {
    //     console.log("OOOOO filePath: ", filePath);
    // }
    url = dir + fileName;
    writeCurrFile(path, dir + fileName);


    console.log("copy finish url: ", url);
}
let total = 0;
function walkSync(currentDirPath, dstDir, callback) {
    // var fs = require('fs'),
    //      path = require('path');
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
        var filePath = path.join(currentDirPath, dirent.name);
        if (dirent.isFile()) {
            // if(filePath.indexOf("voxengine") > 0) {
            //     console.log("XXXXX filePath: ", filePath);
            // }
            callback(filePath, dstDir, dirent);
        } else if (dirent.isDirectory()) {
            // 遍历当前文件夹里面的所有文件和文件夹
            walkSync(filePath, dstDir, callback);
        }
        // console.log("files total: ", total);
    });
}
function test(url) {

    // let keyStr = "\\button\\plane\\";
    let keyStr = "\\button\\ButtonBuilder.ts";
    if (url.indexOf(keyStr) > 0) return false;
    return true;
}
let forceCopy = false;
function copy_lib_interface(srcDir) {
    //'../src/cospace/'
    walkSync(srcDir, "../exportLibs/", function (filePath, dstDir, stat) {
        // console.log("filePath: ", filePath);
        // console.log("filePath.lastIndexOf('.ts'): ", filePath.lastIndexOf(".ts"), filePath.length);
        if (forceCopy || test(filePath)) {
            if (filePath.lastIndexOf(".ts") == (filePath.length - 3) && filePath.indexOf(".d.ts") < 0) {
                const fs = require('fs')
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //ICoRenderer
                    let boo = false;
                    // if(filePath.indexOf("ICoRenderer") > 0) {
                    //     console.log("KKKKK 0 filePath: ", filePath);
                    //     boo = true;
                    // }
                    // data 是二进制类型，需要转换成字符串
                    //console.log(data.toString())
                    let str = data.toString();
                    let k0 = str.indexOf("interface ");
                    let k1 = str.indexOf(" interface ");
                    // if(boo) {
                    //     console.log("k0, k1: ", k0, k1);
                    // }
                    if (k0 >= 0 || k1 > 0) {
                        // if(filePath.indexOf("ICoRenderer") > 0) {
                        //     console.log("KKKKK 1 filePath: ", filePath);
                        // }
                        total++;
                        // console.log(total," filePath: ", filePath);
                        copyLib(filePath, dstDir);
                    }
                })
            }
        }
    });
}
function copy_voxui() {
    forceCopy = false;
    copy_lib_interface('../src/voxui/');
}function copy_modelEdit() {
    forceCopy = false;
    copy_lib_interface('../src/modelEdit/');
}
copy_voxui();
copy_modelEdit();
