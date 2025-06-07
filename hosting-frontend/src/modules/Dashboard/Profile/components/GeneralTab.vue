<script setup lang="ts">
import { Section } from '@/components'

import { UIInput } from '@/ui'

import { useAccountStore } from '@/store/account.store'

import { useProfileGeneralStore } from '../store/profile-general.store'

const accountStore = useAccountStore()
const profileGeneral = useProfileGeneralStore()
</script>

<template>
  <Section caption="Аккаунт" :classes="{ container: [$s.infoWrapper] }">
    <div :class="$s.image">
      {{ accountStore.firstUpperWordEmail }}
    </div>
    <div :class="$s.info">
      <span>Индификатор аккаунта: {{ accountStore.account?.id }}</span>
      <span>Почта: {{ accountStore.account?.email }}</span>
    </div>
  </Section>
  <Section caption="Настройки" :classes="{ container: [$s.settingsWrapper] }">
    <div :class="$s.settings">
      <UIInput
        v-model="profileGeneral.data.currentPassword"
        type="password"
        placeholder="Текущий пароль"
      />
      <UIInput
        v-model="profileGeneral.data.newPassword"
        type="password"
        placeholder="Новый пароль"
      />
    </div>
  </Section>
</template>

<style lang="scss" module="$s">
.infoWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: functions.rem(12px);
}

.image {
  width: functions.rem(50px);
  height: functions.rem(50px);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-h1);
  color: white;

  background-color: var(--primary-color--hex);
  border-radius: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: functions.rem(8px);
}

.settingsWrapper {
  display: flex;
  flex-direction: column;
  gap: functions.rem(16px);
}

.settings {
  max-width: functions.rem(350px);

  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}
</style>
