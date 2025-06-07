import { ROUTES } from "@/constants"
import router from "@/router"
import { useAppStore } from "@/store/app.store"

export const useInitAuthorization = async (): Promise<void> => {

  const appStore = useAppStore()

  if (!appStore.initited) {
    await appStore.init()
  }

  // Если пользователь считается вошедшим в систему, то перенаправляем его на домашнюю страницу рабочей области
  if (appStore.isLoggined) {
    await router.push(ROUTES.DASHBOARD.HOSTING_LIST.PATH)
  }
}