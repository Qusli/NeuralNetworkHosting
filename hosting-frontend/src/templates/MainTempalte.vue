<script setup lang="ts">
import Sidebar from '@/modules/Dashboard/Sidebar/components/Sidebar.vue'

import UILoader from '@/ui/UILoader.vue'

import { useAppStore } from '@/store/app.store'

const appStore = useAppStore()
</script>

<template>
  <main v-if="!appStore.isLoading" :class="$s.main">
    <Sidebar :class="$s.sidebar" />
    <div :class="$s.container">
      <RouterView />
    </div>
  </main>
  <UILoader v-else size="xl" type="full" color="default" />
</template>

<style lang="scss" module="$s">
.main {
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: var(--sidebar-width) calc(100% - var(--sidebar-width));
}

.sidebar {
  grid-area: sidebar;
}

.container {
  grid-area: main;
  padding: functions.rem(20px);
}
</style>
