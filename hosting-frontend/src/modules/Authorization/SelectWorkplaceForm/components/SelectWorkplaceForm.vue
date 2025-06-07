<script setup lang="ts">
import { type ShallowRef, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import AccountCard from '@/components/AccountCard.vue'
import AuthorizationForm from '@/components/authorization/AuthorizationForm.vue'

import { UIButton } from '@/ui'

import { useAccountStore } from '@/store/account.store'
import { useAppStore } from '@/store/app.store'
import { useWorkplacesStore } from '@/store/workplaces.store'

import { ROUTES } from '@/constants'

import WorkplaceItem from './WorkplaceItem.vue'

const router = useRouter()

const appStore = useAppStore()
const accountStore = useAccountStore()
const workplacesStore = useWorkplacesStore()

// refs
const disabled: ShallowRef<boolean> = shallowRef(false)

// methods
const goToCreateWorkplacePage = (): void => {
  router.push({
    name: ROUTES.AUTHORIZATION.CREATE_WORKPLACE.NAME,
  })
}
</script>

<template>
  <AuthorizationForm
    title="Выберите рабочую область"
    :class="$s.form"
    :classes="{ inputs: [], buttons: [$s.buttons] }"
    :buttons="{ column: false }"
    :is-loading="appStore.isLoading"
  >
    <template #title-after>
      <AccountCard :class="$s.account" :account="accountStore.account" />
    </template>

    <template #inputs>
      <div :class="$s.selectWrapper">
        <WorkplaceItem
          v-for="workplace in workplacesStore.workplaces.items"
          :key="workplace.id"
          :workplace="workplace"
          :disabled="disabled"
          @disabled="(value) => (disabled = value)"
        />
      </div>
    </template>

    <template #buttons>
      <UIButton
        flat
        type="primary-supportive"
        label="Добавить рабочую область"
        @click="goToCreateWorkplacePage"
      />
    </template>
  </AuthorizationForm>
</template>

<style lang="scss" module="$s">
.account {
  margin-top: functions.rem(16px);
}

.selectWrapper {
  max-height: functions.rem(350px);

  display: inherit;
  flex-direction: inherit;
  gap: inherit;

  margin: functions.rem(-8px);
  padding: functions.rem(8px);

  overflow-y: auto;
}

.caption {
  flex: 1 1;
}
</style>
