<script setup lang="ts">
import type { ModelRef } from 'vue'

interface Props {
  label?: string
}

defineProps<Props>()

const model: ModelRef<boolean> = defineModel({
  type: Boolean,
  default: false,
})
</script>

<template>
  <label :class="$s.label">
    <input v-model="model" type="checkbox" :class="$s.checkbox" />
    <div :class="$s.customCheckboxWrapper">
      <div :class="$s.customCheckbox"></div>
      <span v-if="label" :class="$s.customCheckboxLabel">{{ label }}</span>
    </div>
  </label>
</template>

<style lang="scss" module="$s">
.label {
  cursor: pointer;
}

.checkbox {
  position: absolute;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  opacity: 0;
}

/* CUSTOM CHECKBOX */
.customCheckboxWrapper {
  display: flex;
  align-items: center;
  gap: functions.rem(8px);
}

.customCheckbox {
  --border-color: rgba(var(--border-color--hex), 0.5);

  width: functions.rem(16px);
  height: functions.rem(16px);

  display: flex;
  align-items: center;
  justify-content: center;

  border: functions.rem(1px) solid rgba(var(--border-color--rgb), 0.5);
  border-radius: functions.rem(4px);

  position: relative;

  transition: border-color 0.3s ease;

  &::after {
    content: 'done';

    font-family: 'Material Icons';
    color: var(--primary-color--hex);

    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::before {
    content: '';

    --checkbox-size: 0%;

    width: var(--checkbox-size);
    height: var(--checkbox-size);

    position: absolute;

    border-radius: 100%;

    background-color: var(--primary-supportive-color--hex);
    transition:
      width 0.3s ease,
      height 0.3s ease;
  }
}

.checkbox:checked + .customCheckboxWrapper > .customCheckbox::after {
  opacity: 1;
}

.checkbox:hover + .customCheckboxWrapper > .customCheckbox {
  --border-color: var(--primary-color--hex);
}

.checkbox:hover + .customCheckboxWrapper > .customCheckbox::before {
  --checkbox-size: calc(125% + 8px);
}
/* END CUSTOM CHECKBOX */
</style>
