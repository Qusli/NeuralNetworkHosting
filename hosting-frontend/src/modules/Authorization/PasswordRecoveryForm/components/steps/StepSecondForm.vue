<script setup lang="ts">
import { RecoveryPasswordApi } from '@/api/recovery-password'
import {
  type ComputedRef,
  type ModelRef,
  type ShallowRef,
  computed,
  shallowRef,
} from 'vue'
import { toast } from 'vue3-toastify'

import { AuthorizationForm } from '@/components'

import { UIButton } from '@/ui'

import type { IErrorResponse } from '@/types'

import { usePasswordRecoveryStore } from '../../store/passwordRecovery'
import InputCode from '../InputCode.vue'
import { NotifyErrorResponse } from '@/classes'

const currentStep: ModelRef<number> = defineModel('currentStep', { default: 0 })

const passwordRecovertStore = usePasswordRecoveryStore()

// refs
const codeSize: ShallowRef<number> = shallowRef(6)

const timerId: ShallowRef<number> = shallowRef(0)
const seconds: ShallowRef<number> = shallowRef(0)

const isError: ShallowRef<boolean> = shallowRef(false)
const isLoading: ShallowRef<boolean> = shallowRef(false)

// computed
const sendDisabled: ComputedRef<boolean> = computed(() => {
  const _code = passwordRecovertStore.data.code.toString()
  return !_code || _code.length < codeSize.value || seconds.value !== 0
})

// methods
function prev() {
  currentStep.value = 1
}

async function send() {
  isLoading.value = true

  if (seconds.value) {
    toast.error('The timer has not expired yet')
    isLoading.value = false
    return
  }

  const [result, error] = await RecoveryPasswordApi.confirm(
    passwordRecovertStore.data.code,
  )

  if (error) {
    NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()

    isError.value = true

    startTime()
  }

  if (result) {
    next()
  }

  isLoading.value = false
}

function next() {
  currentStep.value = 3
}

function resetSecond() {
  seconds.value = 60
}

function startTime() {
  resetSecond()

  timerId.value = setInterval(() => {
    seconds.value -= 1

    if (seconds.value === 0) {
      stopTimer()
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timerId.value)
}
</script>

<template>
  <AuthorizationForm
    title="Восстановление пароля"
    :buttons="{ column: false }"
    @submit="send"
  >
    <template #inputs>
      <InputCode
        :size="codeSize"
        @code="(val) => (passwordRecovertStore.data.code = val)"
      />

      <span v-if="isError && seconds !== 0" :class="$s.caption">
        Повторно отправить код можно будет через {{ seconds }}
      </span>
    </template>

    <template #buttons>
      <UIButton type="primary-supportive" label="Назад" @click="prev" />
      <UIButton
        button-type="submit"
        type="primary"
        label="Отправить"
        :disabled="sendDisabled"
        :loading="isLoading"
      />
    </template>
  </AuthorizationForm>
</template>

<style lang="scss" module="$s">
.caption {
  font-size: var(--font-size-medium-text);
  color: var(--text-supportive-color--hex);
  text-align: center;
}
</style>
