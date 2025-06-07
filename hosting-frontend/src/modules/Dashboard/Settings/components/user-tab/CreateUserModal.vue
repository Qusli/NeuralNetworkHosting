<script setup lang='ts'>
import { UIModal } from '@/ui';
import { useSettingsGeneral } from '../../store/settings-general.store';
import UIInput from '@/ui/UIInput.vue';

const settingsGeneral = useSettingsGeneral()
</script>

<template>
  <UIModal title="Создание пользователя" v-model:open="settingsGeneral.modal.createUserModal">
    <template #content>
      <UIInput type="email" label="Почта" placeholder="Почта пользователя..."></UIInput>
    </template>
  </UIModal>
</template>