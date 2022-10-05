import { DefineComponent } from 'vue';

const modules: Record<string, DefineComponent> = import.meta.glob('./*/index.(tsx|vue)', {
  eager: true,
});

const components: Record<string, DefineComponent> = {};

console.log(modules, '起航');

for (const path in modules) {
  const comp = modules[path].default;
  components[comp.name || path.split('/')[1]] = comp;
}
console.log('left-aside components:', components);

export default components;
