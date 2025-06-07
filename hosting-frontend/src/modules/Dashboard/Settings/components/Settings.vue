<script setup lang="ts">
import { type ShallowRef, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  SectionWrapper,
  TabContent,
  TabContentItem,
  TabItem,
  Tabs,
} from '@/components'

import { UIButton } from '@/ui/'

import { ROUTES } from '@/constants'

import { useSettingsGeneral } from '../store/settings-general.store'
import GeneralTab from './GeneralTab.vue'
import RolesTab from './RolesTab.vue'
import UsersTab from './user-tab/UsersTab.vue'
import { useAccountStore } from '@/store/account.store'
import { useUsersStore } from '@/store/users.store'

const route = useRoute()

const accountStore = useAccountStore()
const usersStore = useUsersStore()
const settingsGeneral = useSettingsGeneral()

// refs
const currentTab: ShallowRef<string> = ref('general')

// hooks
onMounted(() => {
  if (route.name === ROUTES.DASHBOARD.SETTINGS_USER.NAME) {
    currentTab.value = 'users'
  }

  if (route.name === ROUTES.DASHBOARD.SETTINGS_ROLE.NAME) {
    currentTab.value = 'roles'
  }
})

onUnmounted(() => {
  settingsGeneral.$reset()
})
</script>

<template>
  <SectionWrapper>
    <template #header>
      <Tabs
        v-model:current-tab="currentTab"
        :options="{ tabs: { center: true } }"
      >
        <TabItem name="general">Общие</TabItem>
        <TabItem v-if="usersStore" name="users">Пользователи</TabItem>
        <TabItem name="roles">Роли</TabItem>

        <template #actions>
          <template v-if="currentTab === 'general'">
            <UIButton
              v-if="accountStore.isOwner"
              flat
              width="auto"
              type="red"
              icon="delete"
              icon-size="sm"
              icon-color="var(--red-color--hex)"
              label="Удалить"
              :loading="settingsGeneral.isLoading"
              @click="settingsGeneral.delete"
            />
            <UIButton flat type="primary" label="Сохранить" />
          </template>

          <template v-if="currentTab === 'users'">
            <UIButton
              flat
              type="primary"
              icon="add"
              icon-color="var(--primary-color--hex)"
              label="Добавить пользователя"
              @click="settingsGeneral.modal.createUserModal = true"
            />
          </template>

          <template v-if="currentTab === 'roles'">
            <UIButton
              flat
              type="primary"
              icon="add"
              icon-color="var(--primary-color--hex)"
              label="Добавить роль"
            />
          </template>
        </template>
      </Tabs>
    </template>

    <template #content>
      <TabContent v-model:current-tab="currentTab">
        <TabContentItem name="general">
          <GeneralTab />
        </TabContentItem>

        <TabContentItem name="users">
          <UsersTab />
        </TabContentItem>

        <TabContentItem name="roles">
          <RolesTab />
        </TabContentItem>
      </TabContent>
    </template>
  </SectionWrapper>
</template>
