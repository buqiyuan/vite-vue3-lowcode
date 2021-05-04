const modules = import.meta.globEager('./*/index.tsx')

const components = {}

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1')
  components[name] = modules[key]?.default || modules[key]
})

console.log(components, 'base-widgets')
export default components
