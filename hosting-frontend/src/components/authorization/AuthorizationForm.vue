<script setup lang="ts">
import { UILoader } from '@/ui'

interface Props {
  title?: string
  classes?: {
    inputs: string[]
    buttons: string[]
  }
  buttons?: {
    column?: boolean
  }
  isLoading?: boolean
  onSubmit?: () => void
}

withDefaults(defineProps<Props>(), {
  classes: () => ({
    inputs: [],
    buttons: [],
  }),
  buttons: () => ({
    column: true,
  }),
  isLoading: false,
  onSubmit: () => {},
})
</script>

<template>
  <form :class="$s.form" @submit.prevent="onSubmit">
    <div :class="$s.header">
      <slot v-if="!isLoading" name="title-before"></slot>
      <h2 v-if="title">{{ title }}</h2>
      <!-- тут будет иконка, если нет заголовка формы -->
      <slot v-if="!isLoading" name="title-after"></slot>
    </div>

    <template v-if="!isLoading">
      <fieldset v-if="$slots.inputs" :class="[$s.inputs, ...classes.inputs]">
        <slot name="inputs"></slot>
      </fieldset>

      <div
        v-if="$slots.buttons"
        :class="[
          $s.buttons,
          buttons.column ? $s.buttonsColumn : $s.buttonsRow,
          ...classes.buttons,
        ]"
      >
        <slot name="buttons"></slot>
      </div>
    </template>

    <template v-else>
      <UILoader :class="$s.loader" size="lg" />
    </template>
  </form>
</template>

<style lang="scss" module="$s">
.form {
  $padding-horizontal: clamp(functions.rem(20px), 5vw, functions.rem(35px));
  $padding-vertical: clamp(functions.rem(30px), 5vw, functions.rem(45px));

  max-width: functions.rem(550px);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: clamp(functions.rem(25px), 5vw, functions.rem(50px));

  background-color: var(--background-component-color--hex);

  border-radius: functions.rem(8px);
  padding: $padding-horizontal $padding-vertical;

  box-shadow: 0 0 functions.rem(12px) rgba(var(--border-color--rgb), 0.25);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: functions.rem(16px);
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: functions.rem(15px);
}

.buttons {
  display: flex;
  gap: functions.rem(12px);

  &Row {
    flex-direction: row;
  }

  &Column {
    flex-direction: column;
  }
}

.loader {
  align-self: center;
}
</style>
