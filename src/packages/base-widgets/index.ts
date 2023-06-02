import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';

const modules = import.meta.globEager('./*/index.tsx') as Record<
  string,
  undefined | { default: VisualEditorComponent } | VisualEditorComponent
>;

type DefaultModule = { default: VisualEditorComponent };

const components: Record<string, VisualEditorComponent> = {};

Object.entries(modules).forEach(([key, module]) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
  if (module) {
    if (Object.prototype.hasOwnProperty.call(module, 'default')) {
      components[name] = (module as DefaultModule).default;
    } else {
      components[name] = module as VisualEditorComponent;
    }
  }
});

console.log(components, 'base-widgets');
export default components;
