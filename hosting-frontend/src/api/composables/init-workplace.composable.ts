import { ROUTES } from "@/constants"
import { useAppStore } from "@/store/app.store"
import { useUsersStore } from "@/store/users.store"
import { useWorkplacesStore } from "@/store/workplaces.store"
import { useRouter } from "vue-router"

export const useInitWorkplace = async (): Promise<void> => {
  const router = useRouter()

  const appStore = useAppStore()
  const workplacesStore = useWorkplacesStore()
  const usersStore = useUsersStore()

  if (!appStore.initited) {
    await appStore.init()
  }

  // Если пользователь считается НЕ вошедшим в систему или текущая рабочее пространство пуста, то перенаправляем его на страницу аунтификации
  if (!appStore.isLoggined || workplacesStore.currentWorkplaceEmpty) {
    router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
  }

  if (usersStore.currentUserEmpty) {
    await usersStore.loadCurrentUser()
  }
}