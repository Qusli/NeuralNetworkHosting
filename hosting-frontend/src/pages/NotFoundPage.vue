<script setup lang="ts">
import { ROUTES } from '@/constants'
</script>

<template>
  <main :class="$s.main">
    <h1 :class="$s.title">404 NOT FOUND</h1>
    <RouterLink :to="ROUTES.DASHBOARD.HOSTING_LIST.PATH" :class="$s.link"
      > На главную страницу </RouterLink
    >
  </main>
</template>

<style lang="scss" module="$s">
.main {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: functions.rem(12px);
}

.title {
  color: var(--primary-color--hex);
}
</style>
