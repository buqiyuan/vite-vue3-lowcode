/*
 * @Author: 卜启缘
 * @Date: 2021-06-12 21:29:32
 * @LastEditTime: 2021-06-12 22:03:43
 * @LastEditors: 卜启缘
 * @Description: 执行组件动画
 * @FilePath: \vite-vue3-lowcode\src\hooks\useAnimate.ts
 */

import { Animation } from '@/visual-editor/visual-editor.utils'

export const useAnimate = async (animateEl: HTMLElement, animations: Animation | Animation[]) => {
  animations = Array.isArray(animations) ? animations : [animations]

  const play = (animate: Animation) =>
    new Promise((resolve) => {
      if (animateEl) {
        const animationName = `animate__${animate.value}`
        animateEl.style.setProperty('--animate-duration', `${animate.duration}s`)
        animateEl.style.setProperty('--animate-delay', `${animate.delay}s`)
        animateEl.style.setProperty(
          'animation-iteration-count',
          `${animate.infinite ? 'infinite' : animate.count}`
        )

        // 动画结束时，删除类名
        const handleAnimationEnd = (event?: AnimationEvent) => {
          event?.stopPropagation()
          animateEl.classList.remove(`animate__animated`, animationName)
          animateEl.removeEventListener('animationend', handleAnimationEnd)
          resolve('animation end')
        }

        animateEl?.classList.add(`animate__animated`, animationName)
        animateEl?.addEventListener('animationend', handleAnimationEnd, { once: true })
      } else {
        resolve('动画执行失败！执行动画元素不存在！')
      }
    })

  for (const item of animations) {
    await play(item)
  }
}
