import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';

const modules = import.meta.globEager('./*/index.tsx') as Record<
  string,
  undefined | { default: VisualEditorComponent } | VisualEditorComponent
>;

type DefaultModule = { default: VisualEditorComponent };

const components: Record<string, VisualEditorComponent> = {};

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
  const module = modules[key];
  if (module) {
    if (Object.prototype.hasOwnProperty.call(module, 'default')) {
      components[name] = (module as DefaultModule).default;
    } else {
      components[name] = module as VisualEditorComponent;
    }
  }
});

console.log(components, 'container-component');
export default components;
