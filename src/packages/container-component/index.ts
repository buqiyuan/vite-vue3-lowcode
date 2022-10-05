import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';

const modules: Record<string, any> = import.meta.glob('./*/index.tsx', {
  eager: true,
});

const components: Record<string, VisualEditorComponent> = {};

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
  components[name] = modules[key]?.default || modules[key];
});

console.log(components, 'container-component');
export default components;
