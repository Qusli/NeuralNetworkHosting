<script setup lang="ts">
import { type ShallowRef, computed, shallowRef, useCssModule } from 'vue'

export type UILoaderSize = 'sm' | 'md' | 'lg' | 'xl'

export type UILoaderType = 'default' | 'full'

interface Props {
  size?: UILoaderSize
  type?: UILoaderType
  color?: 'default' | 'primary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  type: 'default',
  color: 'primary',
})

const $style = useCssModule('$s')

const sizeToPx = {
  sm: '20px',
  md: '24px',
  lg: '28px',
  xl: '32px',
}

// refs
const _size: ShallowRef<string> = shallowRef(sizeToPx[props.size])

// computed
const classes = computed(() => {
  return [
    props.color === 'primary' ? $style.loaderPrimary : '',
    props.color === 'accent' ? $style.loaderAccent : '',
    $style.loader,
  ]
})
</script>

<template>
  <template v-if="type === 'default'">
    <div :class="classes"></div>
  </template>
  <template v-else>
    <Teleport to="body">
      <div :class="$s.body">
        <div :class="classes"></div>
      </div>
    </Teleport>
  </template>
</template>

<style lang="scss" module="$s">
.body {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  z-index: 99999;

  background-color: rgba(#111111, 0.25);
}

.loader {
  width: v-bind(_size);
  height: v-bind(_size);
  border: 3px solid #fff;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loaderPrimary {
  border-color: var(--primary-color--hex);
}

.loaderAccent {
  border-color: var(--accent-color--hex);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
