<script setup lang='ts'>
import { UIButton } from '@/ui';
import { shallowRef, type ShallowRef } from 'vue';

// refs
const open: ShallowRef<boolean> = shallowRef(false)
</script>

<template>
  <div :class="$s.wrapper" @click="open = !open">
    <div :class="$s.menu"></div>
    <Transition name="menu">
      <div v-if="open" :class="$s.container" @click.stop="">
        <UIButton
          flat
          width="max-content"
          type="primary"
          label="Добавить контейнер"
          icon="add"
          icon-size="12px"
          icon-color="var(--primary-color--hex)"
          size="md"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
</style>

<style lang='scss' module='$s'>
.wrapper {
  height: functions.rem(16px);

  position: relative;

  &::before {
    content: "";

    width: calc(100% + 16px);
    height: calc(100% + 24px);

    display: block;

    position: absolute;
    top: -10px;
    left: -8px;
    z-index: 10;

    transition: background-color 0.3s ease;

    background-color: transparent;
    cursor: pointer;
  }

  &:hover::before {
    background-color: rgba(var(--border-color--rgb), 0.25);
  }
}

.menu {
  width: functions.rem(32px);
  height: functions.rem(3px);

  border-radius: functions.rem(4px);

  background-color: var(--text-color--hex);

  &::before,
  &::after {
    content: "";

    width: functions.rem(32px);
    height: functions.rem(3px);

    display: block;

    position: relative;

    border-radius: functions.rem(4px);

    background-color: var(--text-color--hex);
  }

  &::before {
    top: calc(100% + 13px);
  }

  &::after {
    bottom: calc(100% - 8px);
  }
}

.container {
  position: absolute;
  top: calc(100% + 20px);
  right: 0;
  z-index: 100;

  padding: functions.rem(8px) functions.rem(12px);

  border-radius: functions.rem(4px);

  box-shadow: 0 0 functions.rem(8px) 0 rgba(var(--border-color--rgb), 0.5);
  background-color: var(--background-component-color--hex);
}
</style>