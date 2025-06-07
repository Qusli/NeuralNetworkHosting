<script setup lang="ts">
import { type ComputedRef, computed, useCssModule } from 'vue'

interface Classes {
  container: string[]
}

interface Props {
  caption?: string
  classes?: Partial<Classes>
}

const props = defineProps<Props>()

const $style = useCssModule('$s')

// computed
const containerClasses: ComputedRef<string[]> = computed(() => {
  const customClasses = props.classes?.container?.length
    ? props.classes.container
    : []

  return [$style.container, ...customClasses]
})
</script>

<template>
  <div :class="$s.section">
    <span v-if="caption" :class="$s.caption">{{ caption }}</span>
    <div :class="containerClasses">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" module="$s">
.section {
  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}

.caption {
  font-size: var(--font-size-large-text);
  color: var(--text-supportive-color--hex);

  padding-bottom: functions.rem(8px);

  border-bottom: functions.rem(1px) solid var(--border-color--hex);
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
