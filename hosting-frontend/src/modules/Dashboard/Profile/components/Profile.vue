<script setup lang="ts">
import { type ShallowRef, onUnmounted, ref } from 'vue'

import {
  SectionWrapper,
  TabContent,
  TabContentItem,
  TabItem,
  Tabs,
} from '@/components'

import { UIButton } from '@/ui'

import { useProfileCurrentUser } from '../store/profile-current-user.store'
import { useProfileGeneralStore } from '../store/profile-general.store'
import CurrentUserTab from './CurrentUserTab.vue'
import GeneralTab from './GeneralTab.vue'

const profileGeneral = useProfileGeneralStore()
const profileCurrentUser = useProfileCurrentUser()

// refs
const currentTab: ShallowRef<string> = ref('general')

// hooks
onUnmounted(() => {
    profileGeneral.$reset()
    profileCurrentUser.$reset()
})
</script>

<template>
  <SectionWrapper>
    <template #header>
        <Tabs v-model:current-tab="currentTab" :options="{ tabs: { center: true } }">
            <TabItem name="general">Общие</TabItem>
            <TabItem name="current-user">Текущий пользователь</TabItem>

            <template #actions>
                <template v-if="currentTab === 'general'">
                <UIButton
                    flat
                    width="auto"
                    type="primary"
                    label="Сохранить"
                    :title="profileGeneral.canSave ? 'Введите текущий и новый пароль' : undefined"
                    :disabled="profileGeneral.canSave"
                    :loading="profileGeneral.isLoading"
                    @click="profileGeneral.save"
                />
                </template>
                <template v-if="currentTab === 'current-user'">
                <UIButton
                    flat
                    width="auto"
                    type="primary"
                    label="Сохранить"
                    :loading="profileCurrentUser.isLoading"
                    @click="profileCurrentUser.save"
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

            <TabContentItem name="current-user">
                <CurrentUserTab />
            </TabContentItem>
        </TabContent>
    </template>
  </SectionWrapper>
</template>
