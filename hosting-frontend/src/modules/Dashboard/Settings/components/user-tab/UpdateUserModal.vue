<script setup lang='ts'>
import { UIModal } from '@/ui';
import { onMounted, onUnmounted} from 'vue';
import { useSettingsGeneral } from '../../store/settings-general.store';

const settingsGeneral = useSettingsGeneral()

// hooks
onMounted(() => {
  if (!settingsGeneral.currentUser) {
    settingsGeneral.modal.updateUserModal = false
  }
})

onUnmounted(() => {
  settingsGeneral.currentUser = null
})
</script>

<template>
  <UIModal title="Настройка пользователя" v-model:open="settingsGeneral.modal.updateUserModal">

  </UIModal>
</template>