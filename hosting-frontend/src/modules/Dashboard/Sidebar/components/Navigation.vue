<script setup lang="ts">
import { ERole } from '@/api/roles'
import { computed } from 'vue'

import { useUsersStore } from '@/store/users.store'

import { ROUTES } from '@/constants'

import { ROUTE_LABELS } from '../constants/route-labels.constant'

const usersStore = useUsersStore()

// computed
const labels = computed(() => {
  const _labels = []

  for (const label of ROUTE_LABELS) {
    if (label.path !== ROUTES.DASHBOARD.SETTINGS.PATH) {
      _labels.push(label)
    } else if (
      label.path === ROUTES.DASHBOARD.SETTINGS.PATH &&
      usersStore.users.current?.role.label !== ERole.USER
    ) {
      _labels.push(label)
    }
  }

  return _labels
})
</script>

<template>
  <nav :class="$s.navigation">
    <RouterLink
      v-for="(route, index) in labels"
      :key="index"
      :class="$s.link"
      :to="route.path"
    >
      {{ route.label }}
    </RouterLink>
  </nav>
</template>

<style lang="scss" module="$s">
.navigation {
  display: flex;
  flex-direction: column;
  gap: functions.rem(15px);
}

.link {
  padding: functions.rem(8px) functions.rem(12px);
  border-radius: functions.rem(4px);

  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>

<style lang="scss" scoped>
.router-link-active {
  cursor: default;
}

nav a:hover,
.router-link-active {
  color: var(--primary-color--hex);
  background-color: var(--primary-supportive-color--hex);
}
</style>
