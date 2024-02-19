import { getVueFileScriptContent, typescriptTypeErasure } from "./parse-vue-script";

getVueFileScriptContent().then(({ script, sourceCode }) => {
    console.log(script, sourceCode);
    typescriptTypeErasure({ script, sourceCode });
});