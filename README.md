# Vite2.x + Vue3.x + TypeScript H5低代码平台

## 技术栈

- 编程语言：[TypeScript 4.x](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- 构建工具：[Vite 2.x](https://cn.vitejs.dev/)
- 前端框架：[Vue 3.x](https://v3.cn.vuejs.org/)
- 路由工具：[Vue Router 4.x](https://next.router.vuejs.org/zh/index.html)
- 状态管理：[Vuex 4.x](https://next.vuex.vuejs.org/)
- PC端UI 框架：[Element Plus](https://element-plus.org/#/zh-CN)
- H5端UI 框架：[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/)
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
- [ ] 数据源管理
- [ ] 提供预置函数
- [ ] 更多组件的封装
- [ ] 其他...

### 简易说明
目前在使用表单时，需要把相关的`表单控件`放到`表单容器`内部，并且需要将`按钮`放到`表单容器`内，
然后再讲`按钮的type`设置为`表单提交按钮`这时候点击提交按钮才会自动收集表单容器内部的所有字段和值

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

