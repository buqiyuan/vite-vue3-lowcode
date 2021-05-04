<template>
  <div>
    <comp-render :element="element" :config="config">
      <template v-for="(value, key) in element.props?.slots" :key="key" #[key]>
        <template v-for="item in value?.children" :key="item._vid">
          <slot-item :element="item" :config="config" />
        </template>
      </template>
    </comp-render>
  </div>
</template>

<script lang="ts">
/**
 * @name: slot-item
 * @author:卜启缘
 * @date: 2021/5/3 4:18
 * @description：slot-item
 * @update: 2021/5/3 14:18
 */

import CompRender from './comp-render'

export default {
  name: 'SlotItem',
  components: { CompRender },
  props: {
    element: {
      type: [Object, Array],
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped></style>
