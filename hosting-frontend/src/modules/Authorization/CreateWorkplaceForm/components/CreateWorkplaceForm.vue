<script setup lang="ts">
import { WorkplacesApi } from '@/api/workplaces'
import type { CreateWorkplaceDto } from '@/api/workplaces/dto'
import {
  type ComputedRef,
  type ShallowReactive,
  type ShallowRef,
  computed,
  shallowReactive,
  shallowRef,
} from 'vue'
import { useRouter } from 'vue-router'

import { AuthorizationForm } from '@/components'
import AccountCard from '@/components/AccountCard.vue'

import { UIButton, UIInput } from '@/ui'

import { useAccountStore } from '@/store/account.store'
import { useAppStore } from '@/store/app.store'
import { useWorkplacesStore } from '@/store/workplaces.store'

import { ROUTES } from '@/constants'
import { NotifyErrorResponse, Validation } from '@/classes'
import { toast } from 'vue3-toastify'
import type { IErrorResponse } from '@/types'

interface Data {
  title: string
}

const router = useRouter()

const appStore = useAppStore()
const accountStore = useAccountStore()
const workplacesStore = useWorkplacesStore()

// refs
const data: ShallowReactive<Data> = shallowReactive({
  title: '',
})
const isLoading: ShallowRef<boolean> = shallowRef(false)

// computed
const disabled: ComputedRef<boolean> = computed(() => {
  return !data.title?.length
})

// methods
const goToSelectWorkplacePage = (): void => {
  router.push(ROUTES.AUTHORIZATION.SELECT_WORKPLACE.PATH)
}

function validation(): Validation {
  if (!data.title?.length) {
    return new Validation(false, "Password can't be empty")
  }

  return new Validation(true)
}

async function createWorkplace() {
  isLoading.value = true

  const _validation = validation()

  if (!_validation.isValid()) {
    toast.error(_validation.message)
    isLoading.value = false
    return
  }

  const dto: CreateWorkplaceDto = {
    title: data.title,
    owner: {
      id: accountStore.account!.id,
    },
  }

  const [workplaceId, error] = await WorkplacesApi.create(dto)

  if (error) {
    NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
    isLoading.value = false
    return
  }

  workplacesStore.setWorkplaceIdInLocalStorage(workplaceId as number)

  await workplacesStore.loadWorkplaceByLocalStorage()

  await router.push(ROUTES.DASHBOARD.HOSTING_LIST.PATH)

  isLoading.value = false
}
</script>

<template>
  <AuthorizationForm
    title="Создайте рабочее пространство"
    :buttons="{ column: false }"
    :is-loading="appStore.isLoading"
  >
    <template #title-after>
      <AccountCard :class="$s.account" :account="accountStore.account" />
    </template>

    <template #inputs>
      <UIInput
        v-model="data.title"
        type="text"
        placeholder="Название рабочего пространства"
      />
    </template>

    <template #buttons>
      <UIButton
        v-if="!workplacesStore.workplacesEmpty"
        type="primary-supportive"
        label="Назад"
        @click="goToSelectWorkplacePage"
      />
      <UIButton
        button-type="submit"
        type="primary"
        label="Создать"
        :disabled="disabled"
        :loading="isLoading"
        @click="createWorkplace"
      />
    </template>
  </AuthorizationForm>
</template>

<style lang="scss" module="$s">
.account {
  margin: functions.rem(16px);
}
</style>
