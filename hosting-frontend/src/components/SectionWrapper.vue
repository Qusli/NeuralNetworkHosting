<template>
  <div :class="$s.section">
    <div v-if="$slots.header" :class="$s.header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.content" :class="[$s.content, $slots.header ? $s.headerExtist : '']">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" module="$s">
@mixin styles {
  padding: functions.rem(12px) functions.rem(16px);

  border-radius: functions.rem(4px);

  box-shadow: 0 0 functions.rem(8px) rgba(var(--border-color--rgb), 0.4);
  background-color: var(--background-component-color--hex);
}

.section {
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}

.header {
  width: calc(100% - (var(--sidebar-width) + functions.rem(40px)));
  height: functions.rem(65px);

  position: fixed;
  z-index: 100;

  @include styles();
}

.content {
  width: 100%;
  height: 100%;
  @include styles();
}

.headerExtist {
  margin-top: calc(functions.rem(65px) + functions.rem(12px));
}
</style>
