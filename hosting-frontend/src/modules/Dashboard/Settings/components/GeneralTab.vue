<script setup lang="ts">
import { Section } from '@/components'

import { UIInput } from '@/ui'
import { useSettingsGeneral } from '../store/settings-general.store';
import { onMounted } from 'vue';

const settingsGeneral = useSettingsGeneral()

// hooks
onMounted(() => {
    settingsGeneral.init()
})
</script>

<template>
  <Section caption="Рабочее пространство" :classes="{ container: [$s.settings] }">
    <UIInput
      v-model="settingsGeneral.data.title"
      type="text"
      label="Название рабочей области"
      placeholder="Введите название..."
    />
  </Section>
</template>

<style lang="scss" module="$s">
.settings {
  max-width: functions.rem(350px);

  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}
</style>
