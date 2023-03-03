> 无论是多人合作还是个人开发的项目，统一的代码风格对于项目的维护都有着相当的益处，同时，各种代码质量的校验规则还可在开发初期便避免一些低级错误的出现

## 概要

本文主要通过 `vscode-eslint`，`vscode-stylelint` 两个插件，及 `.vscode/extensions.json`，`.vscode/setting.json`，`.eslintrc.js`，`.stylelintrc.js` 四个配置文件，实现 vscode 在保存文件时自动对 vue 文件的 `template`，`script`，`style` 三个部分自动进行错误修正及格式统一的功能

## 配置

- .vscode/extensions.json

自动推荐安装格式化所需插件

```json
{
  "recommendations": [
    "octref.vetur",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "editorconfig.editorconfig"
  ]
}
复制代码
```

- .vscode/setting.json

统一编辑器自动格式化配置，同时关闭 `vetur` 的部分配置，减少资源消耗

```json
 {
  "eslint.validate": [
    "javascript",
    "html",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "vetur.format.enable": false,
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false
}
复制代码
```

- .editorconfig (推荐)

统一编辑器的默认换行及缩进规则

```
[*]
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
复制代码
```

- .eslintrc.js

将默认的 `plugin:vue/essential` 替换为 `plugin:vue/recommended` 以便实现对 `template` 部分的格式化，同时更加严格的校验规则也利于代码质量的提升

```js
module.exports = {
  // ...
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  // ...
}
复制代码
```

- .stylelintrc.js

样式格式化配置

```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order'
  ]
}
复制代码
```

## 其他

vscode 的格式化插件大致可分为 *`format`* 如 `prettier`，`js-beautify-html` 等和 *`lint`* 如 `eslint`，`stylelint` 等两种

早期 `eslint` 等校验工具并不具备修正格式错误的能力，于是以 `prettier` 为代表的格式化工具出现并受到推崇，但同时也存在与 `eslint` 规则冲突等问题，而目前 `eslint` 等工具均已支持修正能力，同时还有对代码质量的校验能力，所以更加推荐一些 (也可能我对 `prettier` 了解的不够多，如果有什么其他优势还请指出)

`format` 工具也可通过以下配置实现文件保存时自动格式化 (不推荐)

- .vscode/setting.json

```json
{
   "editor.formatOnSave": true
}
```

