<script setup lang='ts'>
import { type ModelRef } from 'vue';
import IconFactory from './IconFactory.vue';

interface Props {
  title?: string
  close?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  close: () => {}
})

const open: ModelRef<boolean> = defineModel("open", { default: false })

// methods
const close = () => {
  props.close()
  open.value = false
}
</script>

<template>
  <Teleport to="body">
      <div v-if="open" :class="$s.modalWrapper">
        <div :class="$s.modal">
          <div :class="$s.header">
            <span v-if="title" :class="$s.title">{{ title }}</span>
            <div :class="$s.closeWrapper" @click="close">
              <IconFactory icon="close" :class="$s.close" />
            </div>
          </div>
          <div :class="$s.content">
            <slot name="content"></slot>
          </div>
          <div :class="$s.buttons">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
  </Teleport>
</template>

<style lang='scss' module='$s'>
.modalWrapper {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  z-index: 100;

  background-color: rgba(var(--border-color--rgb), 0.5);
}

.modal {
  max-width: functions.rem(500px);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: functions.rem(24px);

  padding: functions.rem(24px);
  border-radius: functions.rem(8px);

  background-color: var(--background-component-color--hex);

}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: var(--font-size-h3);
}

.closeWrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  cursor: pointer;

  &:hover::before {
    --size: calc(100% + 12px);
  }

  &:hover .close {
    color: var(--primary-color--hex);
  }
}

.closeWrapper::before {
  --size: 0;

  content: "";

  width: var(--size);
  height: var(--size);

  position: absolute;

  border-radius: functions.rem(16px);

  background-color: var(--primary-supportive-color--hex);

  transition: width 0.3s ease, height 0.3s ease;
}

.close {
  display: flex;

  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  gap: functions.rem(16px);
}

.buttons {
  flex: 1 1;

  display: flex;
  flex-direction: column;
}
</style>
