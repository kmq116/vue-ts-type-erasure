const fs = require('fs-extra');
const compiler = require('vue-template-compiler');

const filePath = 'example.vue';
const vueFile = `
<template>
  <div>Hello, Vue!</div>
</template>

<script>
export default {
  data() {
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