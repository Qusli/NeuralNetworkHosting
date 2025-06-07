<template>
  <main :class="$s.main">
    <RouterView />
  </main>
</template>

<style lang="scss" module="$s">
.main {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 560px) {
  .main {
    padding-right: functions.rem(12px);
    padding-left: functions.rem(12px);
  }
}
</style>
