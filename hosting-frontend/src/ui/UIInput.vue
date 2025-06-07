<script setup lang="ts">
import {
  type ComputedRef,
  type InputTypeHTMLAttribute,
  type ShallowRef,
  computed,
  shallowRef,
  useCssModule,
  useId,
} from 'vue'

import IconFactory from './IconFactory.vue'

export type UIInputSize = 'sm' | 'md' | 'lg' | 'xl'

interface Classes {
  inputs: string[]
}

interface Props {
  type: InputTypeHTMLAttribute
  inputMode?:
    | 'email'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
  autocomplete?: string
  size?: UIInputSize
  label?: string
  placeholder?: string
  clearIcon?: boolean
  classes?: Partial<Classes>
  onInput?: (payload: InputEvent) => void
  onKeydown?: (payload: KeyboardEvent) => void
  onKeypress?: (payload: KeyboardEvent) => void
  onKeyup?: (payload: KeyboardEvent) => void
  onPaste?: (payload: ClipboardEvent) => void
}

const {
  type = 'text',
  size = 'lg',
  clearIcon = false,
  classes = {},
} = defineProps<Props>()

const model = defineModel()

const _id = useId()
const $style = useCssModule('$s')

// refs
const _type: ShallowRef<InputTypeHTMLAttribute> = shallowRef(type)
const inputId: ShallowRef<string> = shallowRef(`input-${type}-${_id}`)
const focus: ShallowRef<boolean> = shallowRef(false)

// computed
const labelClasses: ComputedRef<string[]> = computed(() => {
  return [focus.value ? $style.labelFocus : '', $style.label]
})

const inputClasses: ComputedRef<string[]> = computed(() => {
  const _customClasses = classes && classes.inputs?.length ? classes.inputs : []

  return [
    size === 'sm' ? $style.inputSm : '',
    size === 'md' ? $style.inputMd : '',
    size === 'lg' ? $style.inputLg : '',
    size === 'xl' ? $style.inputXl : '',
    $style.input,
    ..._customClasses,
  ]
})

const areShowPassword: ComputedRef<boolean> = computed(() => {
  return type === 'password' && _type.value !== 'password'
})

const emptyModelValue: ComputedRef<boolean> = computed(() => {
  return !model.value
})

// methods
function clearInput() {
  model.value = '' // TODO: Учесть разные типы
}

function showPassword() {
  if (_type.value === 'password') {
    _type.value = 'text'
  } else {
    _type.value = 'password'
  }
}
</script>

<template>
  <div :class="labelClasses">
    <div :class="$s.container">
      <label v-if="label" :for="inputId" :class="$s.inputLabel">{{ label }}</label>
      <div :class="$s.inputWrapper">
        <input
          v-model="model"
          :type="_type"
          :inputmode="inputMode"
          :autocomplete="autocomplete"
          :id="inputId"
          :class="inputClasses"
          :placeholder="placeholder"
          @focusin="focus = true"
          @focusout="focus = false"
          @input="onInput"
          @keypress="onKeypress"
          @keyup="onKeyup"
          @keydown="onKeydown"
          @paste="onPaste"
        />
      </div>
    </div>
    <div :class="$s.icons">
      <IconFactory
        v-if="type === 'password'"
        :icon="areShowPassword ? 'visibility' : 'visibility_off'"
        :color="areShowPassword ? 'primary' : 'default'"
        :class="$s.eyeIcon"
        @click.prevent="showPassword"
      />
      <Transition name="close-icon">
        <IconFactory
          v-if="clearIcon && !emptyModelValue"
          icon="clear"
          color="var(--red-color--hex)"
          :class="$s.closeIcon"
          @click.prevent="clearInput"
        />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" module="$s">
.label,
.container {
  width: 100%;
}

.label {
  display: flex;
  align-items: center;

  position: relative;
}

.labelFocus .inputWrapper::after,
.labelFocus .inputWrapper::before {
  border-color: var(--primary-supportive-color--hex);
}

.container {
  width: inherit;
  height: inherit;

  display: flex;
  flex-direction: column;
  gap: functions.rem(4px);
}

.inputLabel {
  width: max-content;
  margin-bottom: functions.rem(4px);
}

.inputWrapper {
  width: inherit;
  height: inherit;

  position: relative;

  &::after,
  &::before {
    content: '';

    width: calc(100% + functions.rem(4px));
    height: calc(100% + functions.rem(4px));

    position: absolute;
    left: functions.rem(-2px);
    bottom: functions.rem(-2px);
    z-index: 1;

    border: functions.rem(2px) solid transparent;
    border-radius: functions.rem(6px);

    transition: border-color 0.3s ease;
  }
}

.input {
  width: inherit;
  height: inherit;
  min-height: functions.rem(44px);

  $padding-horizontal: functions.rem(12px);
  $padding-vertical: functions.rem(16px);

  padding: $padding-horizontal $padding-vertical;

  border: functions.rem(1px) solid rgba(var(--border-color--rgb), 0.5);
  border-radius: functions.rem(4px);

  transition: border-color 0.3s ease;

  position: relative;
  z-index: 2;

  &:focus,
  &:hover {
    border-color: var(--primary-color--hex);
  }
}

.inputSm {
  font-size: var(--font-size-small-text);
}

.inputMd {
  font-size: var(--font-size-medium-text);
}

.inputLg {
  font-size: var(--font-size-default-text);
}

.inputXl {
  font-size: var(--font-size-large-text);
}

.icons {
  display: flex;
  align-items: center;
  gap: functions.rem(8px);

  position: absolute;
  right: functions.rem(20px);
  z-index: 10;
}

.closeIcon,
.eyeIcon {
  cursor: pointer;
  z-index: 10;
}
</style>

<style lang="scss" scoped>
.close-icon-enter-active,
.close-icon-leave-active {
  transition: opacity 0.15s ease;
}

.close-icon-enter-from,
.close-icon-leave-to {
  opacity: 0;
}
</style>
