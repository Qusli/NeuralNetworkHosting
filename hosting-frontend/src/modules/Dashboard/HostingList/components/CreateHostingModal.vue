<script setup lang='ts'>
import { useHostingsStore } from '@/store/hostings.store';
import { UIButton, UIInput, UIModal } from '@/ui';
import IconFactory from '@/ui/IconFactory.vue';
import type { ModelRef } from 'vue';

const open: ModelRef<boolean> = defineModel("open", { default: false })

const hostingsStore = useHostingsStore()
</script>

<template>
  <UIModal title="Создание хостинга" v-model:open="open">
    <template #content>
      <UIInput v-model="hostingsStore.dto.create.title" type="text" label="Название хостинга" placeholder="Тестовый хостинг" />
      <UIInput v-model="hostingsStore.dto.create.description" type="text" label="Описание хостинга" placeholder="Нейросети для сумаризации текста" />
      <UIInput v-model="hostingsStore.dto.create.host" type="text" label="Адресс хостинга" placeholder="10.45.169.10" />
      <UIInput v-model="hostingsStore.dto.create.port" type="text" label="Порт хостинга" placeholder="2375" />
      <div :class="$s.infoWrapper" title="Информацию о там, как создать свой хостинг">
        <IconFactory icon="help_outline" size="13px" :class="$s.infoIcon" />
        <span :class="$s.info">
          Как поднять свой хостинг
        </span>
      </div>
    </template>

    <template #buttons>
      <div :class="$s.buttonWrapper">
        <UIButton type="primary" label="Создать" @click="hostingsStore.create" />
      </div>
    </template>
  </UIModal>
</template>

<style lang='scss' module='$s'>
.inputWrapper {
  display: flex;
  flex-direction: column;
  gap: functions.rem(12px);
}

.infoWrapper {
  width: max-content;

  display: flex;
  align-items: center;
  gap: functions.rem(4px);

  font-size: var(--font-size-medium-text);
  color: var(--text-supportive-color--hex);

  cursor: pointer;
}

.infoIcon,
.info {
  font-size: inherit;
  color: inherit;
}

.buttonWrapper {
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>