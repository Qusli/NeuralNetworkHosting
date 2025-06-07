<script setup lang="ts">
import type { IAccount } from '@/api/accounts'
import { type ShallowRef, shallowRef } from 'vue'

import { UIButton } from '@/ui'

import { useAccountStore } from '@/store/account.store'
import { useAppStore } from '@/store/app.store'

interface Props {
  account: IAccount | null
}

defineProps<Props>()

const appStore = useAppStore()
const accountStore = useAccountStore()

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
    <div :class="$s.accountIcon">
      <span :class="$s.accountIconWord">{{
        accountStore.firstUpperWordEmail
      }}</span>
    </div>
    <span :class="$s.accountEmail">{{ account.email }}</span>
    <UIButton
      flat
      type="red"
      width="auto"
      size="sm"
      icon="logout"
      icon-color="var(--red-color--hex)"
      :loading="loading"
      :class="$s.logout"
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

  position: relative;

  &::after {
    content: 'Ваш аккаунт';

    font-size: var(--font-size-small-text);
    color: var(--text-supportive-color--hex);

    position: absolute;
    bottom: 85%;
    left: 15px;

    padding: functions.rem(4px) functions.rem(12px);
    border-radius: functions.rem(2px);
    box-shadow: 0 -3px functions.rem(8px) rgba(var(--border-color--rgb), 0.25);
    background-color: var(--background-component-color--hex);
  }
}

.accountIcon {
  min-width: functions.rem(40px);
  min-height: functions.rem(40px);

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

.accountEmail {
  flex: 1 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout {
  height: functions.rem(40px);
}
</style>
