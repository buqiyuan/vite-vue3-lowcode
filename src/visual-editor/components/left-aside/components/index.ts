import { DefineComponent } from 'vue';

const modules = import.meta.globEager('./*/index.(tsx|vue)') as Record<
  string,
  undefined | { default: DefineComponent }
>;

const components: Record<string, DefineComponent> = {};

console.log(modules, '起航');

for (const path in modules) {
  const comp = modules[path]?.default;
  if (comp) {
    components[comp.name || path.split('/')[1]] = comp;
  }
}
console.log('left-aside components:', components);

export default components;
