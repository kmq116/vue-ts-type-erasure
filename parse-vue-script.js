const fs = require('fs-extra');
const compiler = require('vue-template-compiler');
const swc = require("@swc/core");
const filePath = 'example.vue';
const vueFile = `
<template>
  <div>Hello, Vue!</div>
</template>

<script>
export default {
  data():void {
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
    console.log(output.code);
    output.map; // source map (in string)
  }).catch(err => {
    console.error(err);
  })


async function extractScript() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { script } = compiler.parseComponent(fileContent);
    const scriptContent = script ? script.content : '';
    console.log('Script extracted successfully:', scriptContent);
  } catch (err) {
    console.error('Error extracting script:', err);
  }
}

// extractScript();