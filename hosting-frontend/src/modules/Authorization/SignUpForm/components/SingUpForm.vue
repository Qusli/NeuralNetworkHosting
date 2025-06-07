<script setup lang="ts">
import { useRouter } from 'vue-router'

import { AuthorizationForm } from '@/components'

import { UIButton, UIInput } from '@/ui'

import { ROUTES } from '@/constants'

import { useSignUpStore } from '../store/signUpStore'

const router = useRouter()

const signUpStore = useSignUpStore()

// methods
function goToSignInPage() {
  router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
}
</script>

<template>
  <AuthorizationForm title="Форма регистрации" @submit="signUpStore.signUp">
    <template #inputs>
      <UIInput
        v-model="signUpStore.data.email"
        type="email"
        placeholder="Почта"
        clear-icon
      />
      <UIInput
        v-model="signUpStore.data.password"
        type="password"
        placeholder="Пароль"
      />
      <UIInput
        v-model="signUpStore.data.repeatPassword"
        type="password"
        placeholder="Повторите пароль"
      />
    </template>

    <template #buttons>
      <UIButton
        label="Зарегистрироваться"
        button-type="submit"
        type="primary"
        :loading="signUpStore.isLoading"
      />
      <div :class="$s.or">
        <span :class="$s.orText">или</span>
      </div>
      <UIButton
        label="Войти"
        type="primary-supportive"
        @click="goToSignInPage"
      />
    </template>
  </AuthorizationForm>
</template>

<style lang="scss" module="$s">
@use '@/assets/styles/modules/Authorization/styles.module.scss';
</style>
