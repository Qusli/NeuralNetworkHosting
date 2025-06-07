<script setup lang="ts">
import type { IAccount } from '@/api/accounts'
import { type ShallowRef, shallowRef } from 'vue'

import { UIButton } from '@/ui'

import { useAccountStore } from '@/store/account.store'
import { useAppStore } from '@/store/app.store'
import { useUsersStore } from '@/store/users.store'

interface Props {
  account: IAccount | null
}

defineProps<Props>()

const appStore = useAppStore()
const accountStore = useAccountStore()
const usersStore = useUsersStore()

// refs
const loading: ShallowRef<boolean> = shallowRef(false)

// methods
const logout = async () => {
  loading.value = true

  await appStore.logout()

  loading.value = false
}
</script>

<template>
  <div v-if="account" :class="$s.account">
    <div :class="$s.container">
      <div :class="$s.accountIcon">
        <span :class="$s.accountIconWord">{{
          accountStore.firstUpperWordEmail
        }}</span>
      </div>
      <div :class="$s.label">
        <span :class="$s.email">{{ account.email }}</span>
        <span :class="$s.role">{{ usersStore.roleLabel }}</span>
      </div>
    </div>
    <UIButton
      flat
      type="red"
      width="auto"
      size="sm"
      icon="logout"
      icon-color="var(--red-color--hex)"
      :class="$s.logout"
      :loading="loading"
      @click="logout"
    />
  </div>
</template>

<style lang="scss" module="$s">
.account {
  width: 100%;

  display: flex;
  align-items: center;
  gap: functions.rem(12px);

  padding: functions.rem(12px) functions.rem(16px);
  border-radius: functions.rem(4px);
  box-shadow: 0 0 functions.rem(8px) rgba(var(--border-color--rgb), 0.4);
  background-color: var(--background-component-color--hex);

  transition: filter 0.3s ease;
}

.container {
  display: flex;
  align-items: center;
  gap: functions.rem(10px);

  flex: 1 1;

  overflow: hidden;
}

.accountIcon {
  min-width: functions.rem(36px);
  min-height: functions.rem(36px);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;

  background-color: var(--primary-color--hex);

  &Word {
    font-size: 24px;
    color: white;
  }
}

.label {
  display: flex;
  flex-direction: column;

  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
}

.email {
  font-size: var(--font-size-medium-text);

  overflow: inherit;
  text-overflow: inherit;
}

.role {
  font-size: var(--font-size-small-text);
  color: var(--text-supportive-color--hex);

  overflow: inherit;
  text-overflow: inherit;
}

.logout {
  height: functions.rem(40px);
}
</style>
