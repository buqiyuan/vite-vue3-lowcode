/**
 * @name: useDotProp
 * @author: 卜启缘
 * @date: 2021/5/2 19:54
 * @description：useDotProp
 * @update: 2021/5/2 19:54
 */
export const useDotProp = (originObj, propName) => {
  const props: string[] = propName.split('.')
  const isDotProp = props.length > 1
  const prop = props.pop()!
  const propObj = props.reduce((prev, curr) => (prev[curr] ??= {}), originObj)
  return {
    prop,
    propObj,
    isDotProp
  }
}
