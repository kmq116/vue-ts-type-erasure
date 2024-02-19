export const vueFile = `
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
