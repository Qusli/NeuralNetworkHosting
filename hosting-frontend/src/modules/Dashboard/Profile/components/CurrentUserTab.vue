<script setup lang="ts">
import { onMounted } from 'vue'

import { Section } from '@/components'

import { UIInput } from '@/ui'

import { useUsersStore } from '@/store/users.store'

import { useProfileCurrentUser } from '../store/profile-current-user.store'

const usersStore = useUsersStore()
const profileCurrentUser = useProfileCurrentUser()

onMounted(() => {
  profileCurrentUser.init()
})
</script>

<template>
  <Section caption="Пользователь" :classes="{ container: [$s.user] }">
    <span>Индификатор пользователя: {{ usersStore.users.current?.id }}</span>
    <span>Ваша роль: {{ usersStore.roleLabel }}</span>
  </Section>
  <Section caption="Настройки" :classes="{ container: [$s.settings] }">
    <UIInput
      v-model="profileCurrentUser.data.lastname"
      type="text"
      label="Фамилия"
      placeholder="Введите фамилию..."
    />
    <UIInput
      v-model="profileCurrentUser.data.firstname"
      type="text"
      label="Имя"
      placeholder="Введите имя..."
    />
    <UIInput
      v-model="profileCurrentUser.data.surname"
      type="text"
      label="Отчество"
      placeholder="Введите отчество..."
    />
  </Section>
</template>

<style lang="scss" module="$s">
.user {
  display: flex;
  flex-direction: column;
  gap: functions.rem(8px);
}

.settings {
  max-width: functions.rem(350px);

  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}
</style>
