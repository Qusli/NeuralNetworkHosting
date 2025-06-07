<script setup lang="ts">
import { ROUTES } from '@/constants';
import { Settings } from '@/modules'
import { useUsersStore } from '@/store/users.store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const usersStore = useUsersStore()

onMounted(() => {
    if (!usersStore.isAdministrator && !usersStore.isModerator) {
      router.push(ROUTES.DASHBOARD.HOSTING_LIST.PATH)
    }
})
</script>

<template>
  <Settings />
</template>
