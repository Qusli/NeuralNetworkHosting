<script setup lang="ts">
import { type ComputedRef, type ShallowRef, computed, onMounted, onUnmounted, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { SectionWrapper, TabContent, TabContentItem, Tabs } from '@/components'
import TabItem from '@/components/tabs/TabItem.vue'

import { useHostingsStore } from '@/store/hostings.store'

import { ROUTES } from '@/constants'
import { UILoader } from '@/ui'
import HostingMenu from './HostingMenu.vue'

const route = useRoute()
const router = useRouter()

const hostingsStore = useHostingsStore()

// refs
const currentTab: ShallowRef<string> = shallowRef('containers')

// computed
const statusColor: ComputedRef<string> = computed(() => hostingsStore.hostingStatusLabel.color)

// refs
onMounted(async () => {
  const hostingId: number = parseInt(route.query.hostingId as string) ?? 0

  if (hostingId) {
    await hostingsStore.loadById(hostingId)

    if (!hostingsStore.hostings.current) {
      await router.push(ROUTES.DASHBOARD.HOSTING_LIST.PATH)
    }
  } else if (router.options.history.state) {
    router.go(-1)
  } else {
    await router.push(ROUTES.DASHBOARD.HOSTING_LIST.PATH)
  }
})

onUnmounted(() => {
  hostingsStore.hostings.current = null
})
</script>

<template>
  <SectionWrapper>
    <template #content>
      <template v-if="!hostingsStore.isLoading">
        <div :class="$s.header">
          <div :class="$s.titleWrapper">
            <span :class="$s.title">{{
              hostingsStore.currentHosting?.title
            }}</span>
          </div>
          <HostingMenu />
        </div>

        <Tabs v-model:current-tab="currentTab" :class="$s.tabs">
          <TabItem name="containers">Контейнеры</TabItem>
          <TabItem name="analytics">Аналитика</TabItem>
          <TabItem name="settings">Настройки</TabItem>
        </Tabs>

        <TabContent v-model:current-tab="currentTab">
          <TabContentItem name="containers"> В разработке... </TabContentItem>
          <TabContentItem name="analytics"> Аналитика </TabContentItem>
          <TabContentItem name="settings"> Настройки </TabContentItem>
        </TabContent>
      </template>
      <template v-else>
        <div :class="$s.loaderWrapper">
          <UILoader size="xl" />
        </div>
      </template>
    </template>
  </SectionWrapper>
</template>

<style lang="scss" module="$s">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.titleWrapper {
  display: flex;
  align-items: center;
  gap: functions.rem(8px);

  &::before {
    content: "";

    width: functions.rem(16px);
    height: functions.rem(16px);

    border-radius: 100%;
    background-color: v-bind(statusColor);
    box-shadow: 0 0 functions.rem(8px) functions.rem(1px) rgba(var(--border-color--rgb), 0.75);

    display: inline-block;

  }
}

.title {
  font-size: var(--font-size-h2);
}

.statusColor {
  width: functions.rem(15px);
  height: functions.rem(15px);
  border-radius: 100%;
  background-color: v-bind(statusColor);
}

.tabs {
  margin-block: functions.rem(12px);
}

.loaderWrapper {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
