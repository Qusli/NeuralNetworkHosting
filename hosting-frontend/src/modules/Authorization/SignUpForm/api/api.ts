import { api } from '@/api'
import type { AxiosError } from 'axios'

import type { SignUpDto } from './interfaces/sign-up.dto'
import type { SignUpResponse } from './types'

export async function signUp(dto: SignUpDto): Promise<SignUpResponse> {
  try {
    const data = await api
      .post('/authorization/sign-up', dto)
      .then((r) => r.data)

    return [data, null]
  } catch (error) {
    console.error(error)

    return [null, error as AxiosError]
  }
}
