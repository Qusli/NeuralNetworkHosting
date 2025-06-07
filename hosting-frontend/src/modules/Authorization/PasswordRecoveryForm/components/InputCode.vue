<script setup lang="ts">
import { type Ref, type ShallowReactive, ref, shallowReactive } from 'vue'

import UIInput from '@/ui/UIInput.vue'

interface Props {
  size: number
}

interface Emits {
  (e: 'code', value: number): void
}

const { size } = defineProps<Props>()

const emit = defineEmits<Emits>()

// refs
const wrapper: Ref<HTMLDivElement | null> = ref(null)
const _code: ShallowReactive<number[]> = shallowReactive(new Array(size))

// methods
const onlyNumber = (event: KeyboardEvent, index: number) => {
  const isNumber = event.key >= '0' && event.key <= '9'
  const isControlKey = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Home',
    'End',
    'Enter',
  ].includes(event.key)

  if (!isNumber && !isControlKey) {
    event.preventDefault()
  }

  if (event.key === 'ArrowLeft') {
    prev(index)
  }

  if (event.key === 'ArrowRight') {
    next(index)
  }

  if (event.key === 'Backspace' || event.key === 'Delete') {
    clearCurrentInput(index)
  }
}

const inputNumber = (event: InputEvent, index: number) => {
  if (_code[index] > 9 && event.data) {
    _code[index] = +event.data
  }

  emit('code', parseInt(_code.join('')))

  const currentInput = wrapper.value?.children.item(
    index,
  ) as HTMLInputElement | null

  if (currentInput && !_code[index] && _code[index] !== 0) {
    prev(index)
  } else {
    next(index)
  }
}

const prev = (index: number) => {
  const prevInput = wrapper.value?.children.item(
    index - 1,
  ) as HTMLInputElement | null

  if (prevInput) {
    prevInput.focus()
  }
}

const next = (index: number) => {
  const nextInput = wrapper.value?.children.item(
    index + 1,
  ) as HTMLInputElement | null

  if (nextInput) {
    nextInput.focus()
  }
}

const clearCurrentInput = (index: number) => {
  const currentInput = wrapper.value?.children.item(
    index,
  ) as HTMLInputElement | null

  if (currentInput) {
    _code[index] = 0
    emit('code', parseInt(_code.join('')))
  }
}

const paste = (event: ClipboardEvent) => {
  event.preventDefault()
}
</script>

<template>
  <div :class="$s.wrapper" ref="wrapper">
    <UIInput
      type="text"
      inputmode="numeric"
      autocomplete="off"
      v-for="(_, index) in _code"
      :key="index"
      :class="$s.input"
      v-model.number="_code[index]"
      :classes="{
        inputs: [$s.inputCenter],
      }"
      @keydown="(event) => onlyNumber(event, index)"
      @input="(event) => inputNumber(event, index)"
      @paste="paste"
    />
  </div>
</template>

<style lang="scss" module="$s">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: functions.rem(12px);
}

.input {
  width: functions.rem(50px);
  height: functions.rem(50px);
}

.inputCenter {
  text-align: center;
}
</style>
