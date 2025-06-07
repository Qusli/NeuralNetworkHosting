<script setup lang="ts">
import { type ModelRef, computed, reactive, useSlots } from 'vue'

import type { ITabItem } from './TabItem.vue'

interface Options {
  tabs: {
    center: boolean
  }
}

interface Props {
  options?: Partial<Options>
}

const props = defineProps<Props>()

const slots = useSlots()

const model: ModelRef<string> = defineModel('currentTab', { required: true })

const components = slots.default ? slots.default() : []

// refs
const tabsStyles = reactive({
  'align-items': props.options?.tabs?.center ? 'center' : undefined,
})

// computed
const tabItems = computed(() => {
  return (
    components.map((component) => ({
      name: component!.props!.name,
      content: component,
    })) || []
  )
})

// methods
const switchTab = (tab: ITabItem) => {
  model.value = tab.name
}
</script>

<template>
  <div :class="$s.tabs" :style="tabsStyles">
    <div :class="$s.container">
      <template v-for="tab in tabItems" :key="tab.name">
        <div
          :class="[currentTab === tab.name ? $s.activeTab : '', $s.tab]"
          @click="switchTab(tab)"
        >
          <component :is="() => tab.content"></component>
        </div>
      </template>
    </div>
    <div v-if="$slots.actions" :class="$s.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss" module="$s">
.tabs {
  display: flex;
  justify-content: space-between;
}

.container {
  height: min-content;
  display: flex;
  gap: functions.rem(12px);
}

.tab {
  padding: functions.rem(4px) functions.rem(8px);
  border-bottom: functions.rem(2px) solid transparent;
  transition: border-bottom-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

.activeTab {
  color: var(--primary-color--hex);
}

.tab:hover,
.activeTab {
  border-bottom-color: var(--primary-color--hex);
}

.actions {
  display: flex;
  gap: functions.rem(4px);
}
</style>
