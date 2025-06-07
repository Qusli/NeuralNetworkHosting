<script setup lang="ts">
import { useAccountStore } from '@/store/account.store'
import { useWorkplacesStore } from '@/store/workplaces.store'

import AccountCard from './AccountCard.vue'
import Navigation from './Navigation.vue'

const accountStore = useAccountStore()
const workplacesStore = useWorkplacesStore()
</script>

<template>
  <aside :class="$s.sidebar">
    <span :class="$s.title">{{
      workplacesStore.workplaces.current?.title || 'Неизвестный'
    }}</span>
    <Navigation :class="$s.navigation" />
    <AccountCard :class="$s.account" :account="accountStore.account" />
  </aside>
</template>

<style lang="scss" module="$s">
.sidebar {
  width: var(--sidebar-width);
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: functions.rem(15px);

  position: fixed;

  padding: functions.rem(20px) functions.rem(15px);

  box-shadow: functions.rem(1px) 0 functions.rem(8px)
    rgba(var(--border-color--rgb), 0.25);
  background-color: var(--background-component-color--hex);

  &::after,
  &::before {
    content: '';

    display: inline-block;

    width: 100%;
    height: functions.rem(1px);

    background-color: rgba(var(--border-color--rgb), 0.5);
  }

  .title {
    width: 100%;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
    text-overflow: ellipsis;

    order: 1;
    word-break: break-all;
  }

  &::before {
    order: 2;
  }

  .navigation {
    flex: 1 1;
    order: 3;
  }

  &::after {
    order: 4;
  }

  .account {
    order: 5;
  }
}
</style>
