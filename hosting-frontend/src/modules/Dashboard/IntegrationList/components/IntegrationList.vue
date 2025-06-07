<script setup lang='ts'>
import { SectionWrapper } from '@/components';
import { UIButton } from '@/ui';
import { shallowRef, type ShallowRef } from 'vue';

const createIntegrationModalOpen: ShallowRef<boolean> = shallowRef(false)
</script>

<template>
    <SectionWrapper>
      <template #header>
        <div :class="$s.headerWrapper">
          <span :class="$s.title">Список интеграций</span>
          <UIButton
            flat
            width="auto"
            type="primary"
            icon="add"
            icon-color="var(--primary-color--hex)"
            label="Создать интегацию"
            :class="$s.buttonCreateIntegration"
            @click="createIntegrationModalOpen = true"
          />
        </div>
      </template>
        <template #content></template>
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

.buttonCreateIntegration {
  justify-self: flex-end;
}
</style>