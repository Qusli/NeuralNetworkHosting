<script setup lang="ts">
import type { IHosting } from '@/api/hostings'
import {
  type Reactive,
  type ShallowRef,
  onMounted,
  reactive,
  shallowRef,
} from 'vue'

import SectionWrapper from '@/components/SectionWrapper.vue'

import { UIButton, UITable, type UITableRow } from '@/ui'

import { useHostingsStore } from '../../../../store/hostings.store'
import { HOSTING_LIST_TABLE_COLUMNS } from '../constants/hosting-list-table.constant'
import CreateHostingModal from './CreateHostingModal.vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants'

const router = useRouter()

const hostingsStore = useHostingsStore()

// refs
const rows: Reactive<UITableRow[]> = reactive([])
const createHostingModalOpen: ShallowRef<boolean> = shallowRef(false)

// methods
const setRowsByHostings = (hostings: IHosting[]) => {
  for (const hosting of hostings) {
    rows.push({
      id: hosting.id,
      title: hosting.title,
      status: hostingsStore.getStatusByHosting(hosting),
      host: hosting.host,
      port: hosting.port,
    })
  }
}

const goToHosting = (row: UITableRow) => {
  if (row.id) {
    router.push({ name: ROUTES.DASHBOARD.HOSTING.NAME, query: { hostingId: row.id } })
  } else {
    toast.error("A user upload error has occurred")
  }
}

// hooks
onMounted(async () => {
  await hostingsStore.load()

  setRowsByHostings(hostingsStore.hostings.items)
})
</script>

<template>
  <SectionWrapper>
    <template #header>
      <div :class="$s.headerWrapper">
        <span :class="$s.title">Список хостингов</span>
        <UIButton
          flat
          width="auto"
          type="primary"
          icon="add"
          icon-color="var(--primary-color--hex)"
          label="Создать хостинг"
          :class="$s.buttonCreateHosting"
          @click="createHostingModalOpen = true"
        />
      </div>
    </template>

    <template #content>
      <UITable
        :columns="HOSTING_LIST_TABLE_COLUMNS"
        :rows="rows"
        :loading="hostingsStore.isLoading"
        empty-message="Хостинги отсутствуют"
        @row-click="goToHosting"
      >
        <template #status="{ row }">
          <div :class="$s.status">
            <div :class="$s.statusColor" :style="`background-color: ${row.color}`"></div>
            <span>{{ row.label }}</span>
          </div>
        </template>
      </UITable>

      <CreateHostingModal
        v-if="createHostingModalOpen"
        v-model:open="createHostingModalOpen"
      />
    </template>
  </SectionWrapper>
</template>

<style lang="scss" module="$s">
.headerWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: var(--font-size-h3);
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: functions.rem(8px);
}

.statusColor {
  width: functions.rem(12px);
  height: functions.rem(12px);
  border-radius: 100%;
  box-shadow: 0 0 functions.rem(8px) 0 rgba(var(--border-color--rgb), 0.75);
}

.buttonCreateHosting {
  justify-self: flex-end;
}
</style>
