<script setup lang="ts">
import { computed } from 'vue'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | string

interface Props {
  icon: string
  size?: IconSize
  color?: string
}

const { icon, size = 'md', color = 'default' } = defineProps<Props>()

// computed
const _size = computed(() => {
  if (size === 'sm') {
    return 'var(--font-size-small-text)'
  } else if (size === 'md') {
    return 'var(--font-size-medium-text)'
  } else if (size === 'lg') {
    return 'var(--font-size-default-text)'
  } else if (size === 'xl') {
    return 'var(--font-size-large-text)'
  } else {
    return size
  }
})

const _color = computed(() => {
  if (color === 'primary') {
    return 'var(--primary-color--hex)'
  } else if (color === 'primary-supportive') {
    return 'var(--primary-supportive-color--hex)'
  } else if (color === 'accent') {
    return 'var(--accent-color--hex)'
  } else if (color === 'accent-supportive') {
    return 'var(--accent-supportive-color--hex)'
  } else if (color === 'default') {
    return '#111117'
  } else {
    return color
  }
})
</script>

<template>
  <i :class="$s.icon" :data-icon="icon"></i>
</template>

<style lang="scss" module="$s">
$icon-size: calc(v-bind(_size) + functions.rem(8px));

.icon {
  width: $icon-size;
  height: $icon-size;

  color: v-bind(_color);
}

.icon::after {
  content: attr(data-icon);

  font-family: 'Material Icons';
  font-size: $icon-size;
  color: inherit;

  transition: color 0.15s ease;
}
</style>
