# 基于 Vite2.x + Vue3.x + TypeScript H5 低代码平台

### 只是一个简单的模板，感兴趣可以根据自己的需要调整

[![license](https://img.shields.io/github/license/buqiyuan/vite-vue3-lowcode.svg)](LICENSE)

**中文** | [English](./README.EN.md)

## 克隆项目

```shell
git clone --single-branch https://github.com/buqiyuan/vite-vue3-lowcode.git
or
git clone --depth=1 https://github.com/buqiyuan/vite-vue3-lowcode.git
```

## 技术栈

- 编程语言：[TypeScript 4.x](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- 构建工具：[Vite 2.x](https://cn.vitejs.dev/)
- 前端框架：[Vue 3.x](https://v3.cn.vuejs.org/)
- 路由工具：[Vue Router 4.x](https://next.router.vuejs.org/zh/index.html)
- 状态管理：[Vuex 4.x](https://next.vuex.vuejs.org/)
- PC 端 UI 框架：[Element Plus](https://element-plus.org/#/zh-CN)
- H5 端 UI 框架：[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/)
- CSS 预编译：[Stylus](https://stylus-lang.com/) / [Sass](https://sass.bootcss.com/documentation) / [Less](http://lesscss.cn/)
- HTTP 工具：[Axios](https://axios-http.com/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#translation)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)
- 单元测试：[vue-test-utils](https://next.vue-test-utils.vuejs.org/) + [jest](https://jestjs.io/) + [vue-jest](https://github.com/vuejs/vue-jest) + [ts-jest](https://kulshekhar.github.io/ts-jest/)
- 自动部署：[GitHub Actions](https://docs.github.com/cn/actions/learn-github-actions)

### 功能清单

- [x] 动态添加页面
- [x] 拖拽式生成组件
- [ ] service worker + indexeddb 实现无服务端的前端交互
- [ ] 数据源管理(支持导入 swagger JSON 生成数据模型及接口)
- [ ] 提供预置函数
- [ ] 更多组件的封装
- [ ] 其他...

### 简易说明

目前在使用表单时，需要把相关的`表单控件`放到`表单容器`内部，并且需要将`按钮`放到`表单容器`内，
然后再讲`按钮的type`设置为`表单提交按钮`这时候点击提交按钮才会自动收集表单容器内部的所有字段和值

### 快速生成组件属性

```javascript
// 在vant文档中 chrome控制台输入以下代码，快速生成组件属性
let propObj = {
  string: (config) => `createEditorInputProp(${JSON.stringify(config)})`,
  number: (config) => `createEditorInputNumberProp(${JSON.stringify(config)})`,
  boolean: (config) => `createEditorSwitchProp(${JSON.stringify(config)})`
}

JSON.stringify(
  $$('#props + table tbody tr').reduce((prev, curr) => {
    const children = curr.children
    const key = children[0].textContent.replace(/-([a-z])/g, (all, i) => i.toUpperCase())
    const child3Text = children[3].textContent
    const defaultValue = ['true', 'false'].includes(child3Text)
      ? child3Text
      : `'${child3Text == '-' ? '' : child3Text}'`
    const value = (propObj[children[2].textContent] ?? propObj['string'])({
      label: `'${children[1].textContent}'`,
      defaultValue
    }).replaceAll('"', '')
    prev[key] = value
    return prev
  }, {})
).replaceAll('"', '')
```

```javascript
// 在vant文档中 chrome控制台输入以下代码，快速生成组件事件
JSON.stringify(
  $$('#events + table tbody tr').reduce((prev, curr) => {
    const children = curr.children
    const event = {
      label: children[1].textContent,
      value: children[0].textContent
    }
    return prev.concat([event])
  }, [])
)
  .replaceAll(/(?<!:)\"(?!,|})/g, '')
  .replace(/\"/g, "'")
```

## 部分功能演示

[![RHfBbn.gif](https://z3.ax1x.com/2021/07/07/RHfBbn.gif)](https://imgtu.com/i/RHfBbn)

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                             not support                                                                                              |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

### 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `build` 对构建系统或者外部依赖项进行了修改
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## 快速开始

### 安装依赖

```sh
npm install
# or
yarn add
```

### 启动项目

```sh
npm run dev
```

### 项目打包

```sh
npm run build
```
