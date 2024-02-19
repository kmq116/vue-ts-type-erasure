import { test } from "vitest";
import {
  getVueFileScriptContent,
  typescriptTypeErasure,
} from "./parse-vue-script";

test("typescriptTypeErasure", () => {
  getVueFileScriptContent().then((scriptContent) => {
    console.log(scriptContent, "scriptContent11111111");

    typescriptTypeErasure(scriptContent)
      .then((res) => {
        console.log("输出文件", res);

        console.log(res, "typescriptTypeErasure");
      })
      .catch((err) => {
        console.log(err, "typescriptTypeErasure");
      });
  });
});
