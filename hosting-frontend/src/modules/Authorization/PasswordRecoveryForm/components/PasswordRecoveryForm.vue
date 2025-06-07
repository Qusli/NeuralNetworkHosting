<script setup lang="ts">
import { type ShallowRef, ref } from 'vue'

import { StepFirstForm, StepSecondForm, StepThridForm } from './steps'

const currentStep: ShallowRef<number> = ref(1)
</script>

<template>
  <StepFirstForm v-if="currentStep === 1" v-model:current-step="currentStep" />
  <StepSecondForm v-if="currentStep === 2" v-model:current-step="currentStep" />
  <StepThridForm v-if="currentStep === 3" v-model:current-step="currentStep" />
</template>
