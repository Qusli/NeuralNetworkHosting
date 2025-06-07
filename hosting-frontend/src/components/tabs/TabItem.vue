<script setup lang="ts">
export interface ITabItem {
  name: string
}

defineProps<ITabItem>()
</script>

<template>
  <slot></slot>
</template>
