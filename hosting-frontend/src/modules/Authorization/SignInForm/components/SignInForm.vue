<script setup lang="ts">
import { useRouter } from 'vue-router'

import { AuthorizationForm } from '@/components'

import { UIButton, UICheckbox, UIInput } from '@/ui'

import { ROUTES } from '@/constants'

import { useSignInStore } from '../store/signInStore'

const router = useRouter()

const signInStore = useSignInStore()

// methods
function goToSignUpPage() {
  router.push(ROUTES.AUTHORIZATION.SIGN_UP.PATH)
}
</script>

<template>
  <AuthorizationForm title="Форма авторизации" @submit="signInStore.signIn">
    <template #inputs>
      <UIInput
        clear-icon
        v-model="signInStore.data.email"
        type="email"
        placeholder="i.ivanov@gmail.com"
      />
      <UIInput
        v-model="signInStore.data.password"
        type="password"
        placeholder="Пароль"
      />
      <div :class="$s.remember">
        <UICheckbox
          v-model="signInStore.data.remember"
          label="Запомнить меня"
        />
        <RouterLink
          :to="ROUTES.AUTHORIZATION.PASSWORD_RECOVERY.PATH"
          :class="$s.recoveryPasswordLink"
        >
          Восстановить пароль
        </RouterLink>
      </div>
    </template>

    <template #buttons>
      <UIButton
        label="Войти"
        button-type="submit"
        type="primary"
        :loading="signInStore.isLoadign"
      />
      <div :class="$s.or">
        <span :class="$s.orText">или</span>
      </div>
      <UIButton
        label="Зарегистрироваться"
        type="primary-supportive"
        @click="goToSignUpPage"
      />
    </template>
  </AuthorizationForm>
</template>

<style lang="scss" module="$s">
@use '@/assets/styles/modules/Authorization/styles.module.scss';

.remember {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.recoveryPasswordLink {
  font-size: var(--font-size-medium-text);
  color: var(--text-supportive-color--hex);
}
</style>
