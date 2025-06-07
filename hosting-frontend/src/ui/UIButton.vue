<script setup lang="ts">
import { computed, useCssModule } from 'vue'

import IconFactory, { type IconSize } from './IconFactory.vue'
import UILoader from './UILoader.vue'

export type UIButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export type UIButtonType =
  | 'default'
  | 'primary'
  | 'primary-supportive'
  | 'accent'
  | 'accent-supportive'
  | 'red'

interface Props {
  label?: string
  icon?: string
  iconSize?: IconSize
  iconColor?: string
  width?: 'full' | string
  size?: UIButtonSize
  type?: UIButtonType
  buttonType?: 'button' | 'submit'
  flatColor?: string
  flat?: boolean
  loading?: boolean
  disabled?: boolean
}

const {
  width = 'full',
  size = 'lg',
  iconSize = 'md',
  type = 'default',
  buttonType = 'button',
  flat = false,
  loading = false,
  disabled = false,
} = defineProps<Props>()

const $s = useCssModule('$s')

// computed
const classes = computed(() => {
  return [
    $s.button,
    type === 'default' ? $s.buttonDefault : '',
    type === 'primary' ? $s.buttonPrimary : '',
    type === 'primary-supportive' ? $s.buttonPrimarySupportive : '',
    type === 'accent' ? $s.buttonAccent : '',
    type === 'accent-supportive' ? $s.buttonAccentSupportive : '',
    type === 'red' ? $s.buttonRed : '',
    size === 'sm' ? $s.buttonSm : '',
    size === 'md' ? $s.buttonMd : '',
    size === 'lg' ? $s.buttonLg : '',
    size === 'xl' ? $s.buttonXl : '',
    flat ? $s.flat : '',
    loading ? $s.loading : '',
  ]
})

const styles = computed(() => {
  return [width === 'full' ? 'width: 100%' : `width: ${width}`]
})
</script>

<template>
  <button
    :type="buttonType"
    :class="classes"
    :style="styles"
    :disabled="disabled || loading"
  >
    <template v-if="!loading">
      <IconFactory
        v-if="icon"
        :icon="icon"
        :color="iconColor"
        :size="iconSize"
      />
      <span v-if="label" :class="$s.label">{{ label }}</span>
    </template>

    <template v-else>
      <UILoader :class="$s.loader" size="sm" />
    </template>
  </button>
</template>

<style lang="scss" module="$s">
.button {
  height: functions.rem(44px);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: functions.rem(8px);

  padding: functions.rem(12px) functions.rem(16px);

  border: functions.rem(1px) solid transparent;
  border-radius: functions.rem(4px);

  box-shadow: 0 functions.rem(1px) functions.rem(4px) 0
    rgba(var(--border-color--rgb), 0.25);

  transition:
    filter 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(70%);
  }

  &:disabled {
    filter: grayscale(35%);
    cursor: not-allowed;
  }
}

.label {
  font-size: inherit;
  color: inherit;
}

.buttonDefault {
  border-color: rgba(var(--border-color--hex), 0.25);
  background-color: var(--background-component-color--hex);
}

.buttonPrimary {
  color: white;
  background-color: var(--primary-color--hex);

  & > .loader {
    border-color: white;
  }
}

.buttonPrimarySupportive {
  color: var(--primary-color--hex);
  background-color: var(--primary-supportive-color--hex);

  & > .loader {
    border-color: var(--primary-color--hex);
  }
}

.buttonAccent {
  color: white;
  background-color: var(--accent-color--hex);

  & > .loader {
    border-color: white;
  }
}

.buttonAccentSupportive {
  color: var(--accent-color--hex);
  background-color: var(--accent-supportive-color--hex);

  & > .loader {
    border-color: var(--accent-color--hex);
  }
}

.buttonRed {
  color: white;
  background-color: var(--red-color--hex);

  & > .loader {
    border-color: white;
  }
}

.buttonSm {
  padding: functions.rem(6px) functions.rem(10px);
  font-size: var(--font-size-small-text);
}

.buttonMd {
  padding: functions.rem(8px) functions.rem(12px);
  font-size: var(--font-size-medium-text);
}

.buttonLg {
  font-size: var(--font-size-default-text);
}

.buttonXl {
  padding: functions.rem(14px) functions.rem(18px);
  font-size: var(--font-size-large-text);
}

.flat {
  border: none;
  box-shadow: none;

  &.buttonPrimary,
  &.buttonPrimarySupportive {
    color: var(--primary-color--hex);
    background-color: rgba(var(--primary-color--rgb), 0);
  }

  &.buttonPrimary:hover,
  &.buttonPrimarySupportive:hover {
    background-color: rgba(var(--primary-color--rgb), 0.1);
  }

  &.buttonAccent,
  &.buttonAccentSupportive {
    color: var(--accent-color--hex);
    background-color: rgba(var(--accent-supportive-color--rgb), 0);
  }

  &.buttonAccent:hover,
  &.buttonAccentSupportive:hover {
    background-color: rgba(var(--accent-supportive-color--rgb), 0.1);
  }

  &.buttonRed {
    color: var(--red-color--hex);
    background-color: rgba(var(--red-color--rgb), 0);
  }

  &.buttonRed:hover {
    background-color: rgba(var(--red-color--rgb), 0.1);
  }

  & > .loader {
    border-color: var(--primary-color--hex);
  }
}

.loading.flat {
  background-color: transparent !important;
}
</style>
