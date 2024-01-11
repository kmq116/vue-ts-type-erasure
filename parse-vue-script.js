const fs = require('fs-extra');
const compiler = require('vue-template-compiler');
const swc = require("@swc/core");
const filePath = 'example.vue';
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
console.log(script.content);

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


