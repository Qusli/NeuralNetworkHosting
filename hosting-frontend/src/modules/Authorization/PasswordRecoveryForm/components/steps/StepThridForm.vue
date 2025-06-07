<script setup lang="ts">
import { RecoveryPasswordApi } from '@/api/recovery-password'
import { type ShallowRef, shallowRef } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

import { AuthorizationForm } from '@/components'

import { UIButton, UIInput } from '@/ui'

import type { IErrorResponse } from '@/types'

import { ROUTES } from '@/constants'

import { usePasswordRecoveryStore } from '../../store/passwordRecovery'
import { NotifyErrorResponse } from '@/classes'

const router = useRouter()

const passwordRecovertStore = usePasswordRecoveryStore()

// refs
const isLoading: ShallowRef<boolean> = shallowRef(false)

// methods
async function recovery() {
  isLoading.value = true

  const validation = passwordRecovertStore.passwordValidation()

  if (!validation.isValid()) {
    toast.error(validation.message)
    isLoading.value = false
    return
  }

  const [result, error] = await RecoveryPasswordApi.recovery(
    passwordRecovertStore.data,
  )

  if (error) {
    NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
  }

  if (result) {
    await router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
  }

  isLoading.value = false
}
</script>

<template>
  <AuthorizationForm
    title="Восстановление пароля"
    :buttons="{ column: false }"
    @submit="recovery"
  >
    <template #inputs>
      <UIInput
        clear-icon
        v-model="passwordRecovertStore.data.password"
        type="password"
        placeholder="Пароль"
      />
      <UIInput
        clear-icon
        v-model="passwordRecovertStore.data.repeatPassword"
        type="password"
        placeholder="Повторите пароль"
      />
    </template>

    <template #buttons>
      <UIButton
        button-type="submit"
        type="primary"
        label="Сохранить"
        :loading="isLoading"
        :disabled="
          !passwordRecovertStore.data.password ||
          !passwordRecovertStore.data.repeatPassword
        "
      />
    </template>
  </AuthorizationForm>
</template>
