// https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046

import * as Monaco from 'monaco-editor'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const global: any = globalThis || window

global.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') return new jsonWorker()
    if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker()
    // if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker()
    // if (label === 'typescript' || label === 'javascript') return new tsWorker()
    // return new editorWorker()
  }
}

const languages = Monaco.languages.getLanguages()

export { Monaco, languages }
