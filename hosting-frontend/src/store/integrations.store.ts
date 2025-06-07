import { defineStore } from "pinia";

interface Props {
  isLoading: boolean
}

export const useIntegrationsStore = defineStore("integrations-store", {
  state: (): Props => ({
    isLoading: false
  }),
  getters: {},
  actions: {},
})