import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';

const modules: Record<string, any> = import.meta.glob('./*/index.tsx', { eager: true });

const components: Record<string, VisualEditorComponent> = {};

Object.entries(modules).forEach(([key, module]) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
  components[name] = module?.default || module;
});

console.log(components, 'base-widgets');
export default components;
