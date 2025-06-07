<script setup lang="ts">
import { type ModelRef, computed, useSlots } from 'vue'

const currentTab: ModelRef<string> = defineModel('currentTab', {
  required: true,
})

const slots = useSlots()

const components = slots.default ? slots.default() : []

// computed
const tabContentItems = computed(() => {
  return (
    components.map((component) => ({
      name: component!.props!.name,
      content: component,
    })) || []
  )
})
</script>

<template>
  <div :class="$s.content">
    <template v-for="tab in tabContentItems" :key="tab.name">
      <div v-if="tab.name === currentTab" :class="$s.wrapper">
        <component :is="() => tab.content"></component>
      </div>
    </template>
  </div>
</template>

<style lang="scss" module="$s">
.content {
  padding-block: functions.rem(12px);
}

.wrapper {
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}
</style>
