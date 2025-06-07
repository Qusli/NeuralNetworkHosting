<script setup lang="ts">
import type { IWorkplace } from '@/api/workplaces'
import { type ShallowRef, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import { UIButton } from '@/ui/'

import { useWorkplacesStore } from '@/store/workplaces.store'

import { ROUTES } from '@/constants'

interface Props {
  workplace: IWorkplace
  disabled?: boolean
}

interface Emits {
  (e: 'disabled', value: boolean): void
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<Emits>()

const router = useRouter()

const workplacesStore = useWorkplacesStore()

// refs
const loading: ShallowRef<boolean> = shallowRef(false)

// methods
async function selectWorkplace(workplace: IWorkplace): Promise<void> {
  loading.value = true
  emit('disabled', true)

  workplacesStore.selectWorkplace(workplace)
  await workplacesStore.init()

  loading.value = false
  emit('disabled', false)

  router.push(ROUTES.DASHBOARD.HOSTING_LIST.PATH)
}
</script>

<template>
  <div :class="$s.workplace">
    <span :class="$s.caption">{{ workplace.title }}</span>
    <UIButton
      flat
      label="Выбрать"
      type="primary-supportive"
      width="auto"
      :loading="loading"
      :disabled="disabled"
      @click="selectWorkplace(workplace)"
    />
  </div>
</template>

<style lang="scss" module="$s">
.workplace {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: functions.rem(8px) functions.rem(16px);
  border-radius: functions.rem(4px);
  box-shadow: 0 0 functions.rem(8px) rgba(var(--border-color--rgb), 0.4);

  background-color: var(--background-component-color--hex);
}

.caption {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
