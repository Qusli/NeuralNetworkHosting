<script setup lang="ts">
import { RecoveryPasswordApi } from '@/api/recovery-password'
import { isEmail } from '@/utils'
import { type ModelRef, type ShallowRef, onMounted, shallowRef } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

import { AuthorizationForm } from '@/components'

import { UIButton, UIInput } from '@/ui'

import type { IErrorResponse } from '@/types'

import { ROUTES } from '@/constants'

import { usePasswordRecoveryStore } from '../../store/passwordRecovery'
import { NotifyErrorResponse } from '@/classes'

const router = useRouter()

const currentStep: ModelRef<number> = defineModel('currentStep', { default: 0 })

const passwordRecovertStore = usePasswordRecoveryStore()

// refs
const isLoading: ShallowRef<boolean> = shallowRef(false)

// methods
function prev() {
  router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
}

async function next() {
  isLoading.value = true

  if (!isEmail(passwordRecovertStore.data.email)) {
    toast.error('This is not email')
    return
  }

  const [result, error] = await RecoveryPasswordApi.createByEmail(
    passwordRecovertStore.data.email,
  )

  if (error) {
    NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
  }

  if (result) {
    currentStep.value = 2
  }

  isLoading.value = false
}

onMounted(() => {
  if (passwordRecovertStore.data.code) {
    passwordRecovertStore.data.code = 0
  }
})
</script>

<template>
  <AuthorizationForm
    title="Восстановление пароля"
    :buttons="{ column: false }"
    @submit="next"
  >
    <template #inputs>
      <UIInput
        clear-icon
        v-model="passwordRecovertStore.data.email"
        type="email"
        placeholder="i.ivanov@gmail.com"
      />
    </template>

    <template #buttons>
      <UIButton type="primary-supportive" label="Назад" @click="prev" />
      <UIButton
        button-type="submit"
        type="primary"
        label="Далее"
        :disabled="!passwordRecovertStore.data.email"
        :loading="isLoading"
      />
    </template>
  </AuthorizationForm>
</template>
