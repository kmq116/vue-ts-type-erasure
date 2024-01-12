const fs = require('fs-extra');
const compiler = require('vue-template-compiler');
const swc = require("@swc/core");
const filePath = 'example.vue';
const { parse } = require('@vue/compiler-sfc');
const vueFile = `
<template>
  <div>Hello, Vue!</div>
</template>

<script>
export enum FixedType {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum Test {
  中文测试 = '中文测试',
}
export default {
  data():void { // test
    return {
      message: 'Hello, World!'
    };
  },
  methods: {
    greet() {
      console.log(this.message);
    }
  }
};
</script>

<style scoped>
.hello {
  color: red;
}
</style>
`;
const { script } = compiler.parseComponent(vueFile);
// console.log(script.content);
// fs.readFile('./HelloWorld.vue', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//   } else {
//     console.log(data.toString(), 'File content:');
//     const { script } = compiler.parseComponent(data.toString());

//     console.error(script, '脚本部分');
//   }
// })

// 编译 vue3 文件
async function compileVueFile() {
  const filePath = './HelloWorld.vue'
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { descriptor } = parse(fileContent, {
      filename: filePath,
    });
    // console.log(descriptor);
    const scriptContent = descriptor.script?.content;
    const scriptSetupContent = descriptor.scriptSetup?.content;
    console.log('Script extracted successfully:', scriptContent);
    console.log('Script extracted successfully:', scriptSetupContent);
  } catch (err) {
    console.error('Error compiling Vue file:', err);
  }
}

compileVueFile();
swc
  .transform(script.content, {
    // Some options cannot be specified in .swcrc
    // Input files are treated as module by default.
    isModule: true,
    module: {
      type: "es6",
    },
    // All options below can be configured via .swcrc
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: false,
      },
      target: "es2022",
      loose: false,
      minify: {
        compress: false,
        mangle: false,
      },
    },
  })
  .then((output) => {
    output.code; // transformed code
    // console.log(output.code);
    console.log(vueFile.replace(script.content, output.code), '替换之后的 vue 文件');
    output.map; // source map (in string)
  }).catch(err => {
    console.error(err);
  })


