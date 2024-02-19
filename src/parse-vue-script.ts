import fs from "fs-extra";
import * as swc from "@swc/core";
import { parse } from "@vue/compiler-sfc";
import { swcOptions } from "./swcOptions";

// 编译 vue3 文件
async function compileVueFile() {
  const filePath = "./HelloWorld.vue";
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { descriptor } = parse(fileContent, {
      filename: filePath,
    });
    // console.log(descriptor);
    const scriptContent = descriptor.script?.content;
    const scriptSetupContent = descriptor.scriptSetup?.content;
    console.log("Script extracted successfully:", scriptContent);
    console.log("Script extracted successfully:", scriptSetupContent);
  } catch (err) {
    console.error("Error compiling Vue file:", err);
  }
}

const filePath = "src/HelloWorld.vue";
export async function getVueFileScriptContent() {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { descriptor } = parse(fileContent, {
      filename: filePath,
    });
    // console.log(descriptor);
    const scriptContent = descriptor.script?.content;
    const scriptSetupContent = descriptor.scriptSetup?.content;
    // console.log("Script extracted successfully:", scriptContent);
    // console.log("Script extracted successfully:", scriptSetupContent);
    return {
      script: scriptSetupContent || scriptContent,
      sourceCode: fileContent,
    };
  } catch (err) {
    console.error("Error compiling Vue file:", err);
  }
}

export function typescriptTypeErasure({ script, sourceCode }) {
  return new Promise((resolve, reject) => {
    swc
      .transform(script, swcOptions)
      .then((output) => {
        resolve(output.code);
        const result = sourceCode.replace(script, "\n" + output.code);
        console.log(result, "替换之后的 vue 文件");
        fs.writeFile(filePath, result, (err) => {
          if (err) throw err;
          console.log("文件已成功写入！");
        });
        // output.code; // transformed code
        // output.map; // source map (in string)
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
