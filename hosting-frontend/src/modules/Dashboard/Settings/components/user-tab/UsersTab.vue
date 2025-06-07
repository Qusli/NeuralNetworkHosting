<script setup lang="ts">
import { type Reactive, type ShallowRef, onMounted, reactive, shallowRef, watch } from 'vue'

import { UIInput, UITable, type UITableRow } from '@/ui'

import { useUsersStore } from '@/store/users.store'

import { USERS_TABLE_COLUMNS } from '../../constants'
import CreateUserModal from './CreateUserModal.vue'
import UpdateUserModal from './UpdateUserModal.vue'
import { useSettingsGeneral } from '../../store/settings-general.store'
import { toast } from 'vue3-toastify'
import { UsersApi } from '@/api/users'
import type { IUser } from '@/api/users/interfaces/user.interface'

const usersStore = useUsersStore()
const settingsGeneral = useSettingsGeneral()

// refs
const timeoutId: ShallowRef<number> = shallowRef(0)
const search: ShallowRef<string> = shallowRef("")
const rows: Reactive<UITableRow[]> = reactive([])
const isLoading: ShallowRef<boolean> = shallowRef(false)

// methods
const clearRows = () => {
  while(rows.length) {
    rows.pop()
  }
}

const setRowsByUser = (users: IUser[]) => {
  clearRows()

  if (users.length) {
    for (const user of users) {
      rows.push({
        id: user.id,
        email: user.account.email,
        lastname: `${user.lastname}`,
        firstname: `${user.firstname}`,
        surname: `${user.surname}`,
      })
    }
  }
}

const loadUserById = async (row: UITableRow) => {
  if (row.id) {
    await settingsGeneral.loadUserById(row.id as number)

    if (settingsGeneral.currentUser) {
      settingsGeneral.modal.updateUserModal = true
    }

  } else {
    toast.error("A user upload error has occurred")
  }
}

const serachByEmail = async (email: string) => {
  isLoading.value = true

  const [users, error] = await UsersApi.searchByEmail(email)

  if (error) {
    toast.error("Error in the search")
  }

  if (users) {
    setRowsByUser(users)
  }

  isLoading.value = false
}

// hooks
onMounted(async () => {
  await usersStore.loadUsers(true)
  setRowsByUser(usersStore.users.items)
})

watch(search, (email) => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }

  timeoutId.value = setTimeout(() => serachByEmail(email), 500)
})
</script>

<template>
  <div>
    <UIInput type="text" v-model="search" placeholder="Поиск по почте..." :class="$s.search" autocomplete="off" />

    <UITable
      :columns="USERS_TABLE_COLUMNS"
      :rows="rows"
      :loading="isLoading"
      empty-message="Пользователи не найдены"
      @row-click="loadUserById"
    />

    <CreateUserModal v-if="settingsGeneral.modal.createUserModal" />

    <UpdateUserModal v-if="settingsGeneral.modal.updateUserModal" />
  </div>
</template>

<style lang="scss" module="$s">
.search {
  max-width: functions.rem(400px);
  margin-bottom: functions.rem(12px);
}
</style>
