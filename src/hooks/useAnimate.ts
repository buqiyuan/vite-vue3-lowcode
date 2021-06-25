/*
 * @Author: 卜启缘
 * @Date: 2021-06-12 21:29:32
 * @LastEditTime: 2021-06-25 08:48:30
 * @LastEditors: 卜启缘
 * @Description: 执行组件动画
 * @FilePath: \vite-vue3-lowcode\src\hooks\useAnimate.ts
 */

import type { Animation } from '@/visual-editor/visual-editor.utils'

export const useAnimate = async (
  animateEl: HTMLElement,
  animations: Animation | Animation[],
  prefixCls = 'animate__'
) => {
  animations = Array.isArray(animations) ? animations : [animations]

  const play = (animate: Animation) =>
    new Promise((resolve) => {
      if (animateEl) {
        const animationName = `${prefixCls}${animate.value}`

        // 过滤可能残留的animate.css动画类名
        animateEl.classList.value = animateEl.classList.value
          .split(' ')
          .filter((item) => !item.includes(prefixCls))
          .join(' ')

        // 设置动画属性
        const setAnimate = () => {
          animateEl.style.setProperty('--animate-duration', `${animate.duration}s`)
          animateEl.style.setProperty('animation-delay', `${animate.delay}s`)
          animateEl.style.setProperty(
            'animation-iteration-count',
            `${animate.infinite ? 'infinite' : animate.count}`
          )
          animateEl?.classList.add(`${prefixCls}animated`, animationName)
        }

        // 动画结束时，删除类名
        const handleAnimationEnd = (event?: AnimationEvent) => {
          event?.stopPropagation()
          animateEl.classList.remove(`${prefixCls}animated`, animationName)
          animateEl.removeEventListener('animationend', handleAnimationEnd)
          resolve('animation end')
        }

        setAnimate()

        animateEl?.addEventListener('animationend', handleAnimationEnd, { once: true })
        // animateEl?.addEventListener('animationcancel', handleAnimationEnd, { once: true })
      } else {
        resolve('动画执行失败！执行动画元素不存在！')
      }
    })

  for (const item of animations) {
    await play(item)
  }
}
