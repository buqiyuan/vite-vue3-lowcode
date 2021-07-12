# base on Vite2.x + Vue3.x + TypeScript H5 Low code platform

[![license](https://img.shields.io/github/license/buqiyuan/vite-vue3-lowcode.svg)](LICENSE)

**English** | [中文](./README.md)

## Clone the main branch and ignore irrelevant branches such as git-pages

```shell
git clone --single-branch https://github.com/buqiyuan/vite-vue3-lowcode.git
```

## technology stack

- Programming Language：[TypeScript 4.x](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- Build Tools：[Vite 2.x](https://cn.vitejs.dev/)
- Front End Frame：[Vue 3.x](https://v3.cn.vuejs.org/)
- Subnet Calculator：[Vue Router 4.x](https://next.router.vuejs.org/zh/index.html)
- State Management：[Vuex 4.x](https://next.vuex.vuejs.org/)
- PC UI Frame：[Element Plus](https://element-plus.org/#/zh-CN)
- H5 UI Frame：[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/)
- CSS Pre：[Stylus](https://stylus-lang.com/) / [Sass](https://sass.bootcss.com/documentation) / [Less](http://lesscss.cn/)
- HTTP Tool：[Axios](https://axios-http.com/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- Coding Standards：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#translation)
- Submit Specifications：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)
- Unit Testing：[vue-test-utils](https://next.vue-test-utils.vuejs.org/) + [jest](https://jestjs.io/) + [vue-jest](https://github.com/vuejs/vue-jest) + [ts-jest](https://kulshekhar.github.io/ts-jest/)
- Auto Deploy：[GitHub Actions](https://docs.github.com/cn/actions/learn-github-actions)

### Function List

- [x] Add pages dynamically
- [x] Drag and drop components
- [ ] service worker + indexeddb Implement server-free front-end interaction
- [ ] DataSource Admin Console
- [ ] Provide preset functions
- [ ] More component encapsulation
- [ ] Others...

### Generate component properties quickly

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

## Browser support

The `Chrome 80+` browser is recommended for local development

Support modern browsers, not IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                             not support                                                                                              |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

### Git Contribution submission specification

- `feat` Add new features
- `fix` Fix the problem/BUG
- `style` The code style is related and does not affect the running result
- `perf` Optimization/performance improvement
- `refactor` Refactor
- `revert` Undo edit
- `test` Test related
- `docs` Documentation/notes
- `chore` Dependency update/scaffolding configuration modification etc.
- `workflow` Workflow improvements
- `ci` Continuous integration
- `types` Type definition file changes
- `wip` In development

## QUICK START

### Install and use

```sh
npm install
# or
yarn add
```

### run

```sh
npm run dev
```

### build

```sh
npm run build
```
