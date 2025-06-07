import { defineStore } from "pinia";
import type { IGeneralSettings } from "../types";
import { useWorkplacesStore } from "@/store/workplaces.store";
import { WorkplacesApi } from "@/api/workplaces";
import { ROUTES } from "@/constants";
import { useAppStore } from "@/store/app.store";
import type { IErrorResponse } from "@/types";
import type { IUser } from "@/api/users/interfaces/user.interface";
import { UsersApi } from "@/api/users";
import { NotifyErrorResponse } from "@/classes";

interface State {
    data: IGeneralSettings,
    modal: {
      createUserModal: boolean,
      updateUserModal: boolean,
    }
    currentUser: IUser | null
    isLoading: boolean
}

export const useSettingsGeneral = defineStore("settings-general", {
    state: (): State => ({
        data: {
            title: ""
        },
        modal: {
          createUserModal: false,
          updateUserModal: false
        },
        currentUser: null,
        isLoading: false
    }),
    getters: {},
    actions: {
        init() {
            const workplacesStore = useWorkplacesStore()

            if (workplacesStore.workplaces.current?.title) {
                this.data.title = workplacesStore.workplaces.current?.title
            }
        },

        /* API */
        async loadUserById(userId: number): Promise<void> {
          this.isLoading = true;

          const [user, error] = await UsersApi.loadUserById(userId)

          if (error) {
            NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
          }

          if (user) {
            this.currentUser = user
          }

          this.isLoading = false;
        },

        async update(): Promise<void> {},

        async delete(): Promise<void> {
            this.isLoading = true

            const workplacesStore = useWorkplacesStore()

            const [result, error] = await WorkplacesApi.delete(workplacesStore.currentWorkplace!.id)

            if (error) {
              NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
            }

            if (result) {
                const appStore = useAppStore()

                await appStore.logout()

                await this.$router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
            }

            this.isLoading = false
        },
        /* END API */
    },
})
