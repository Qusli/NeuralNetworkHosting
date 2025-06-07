import { api } from '@/api'
import type { AxiosError } from 'axios'

import type { SignInDto } from './dto/sign-in.dto'
import type { SignInResponse } from './types'

export async function signIn(dto: SignInDto): Promise<SignInResponse> {
  try {
    const data = await api
      .post('/authorization/sign-in', dto)
      .then((r) => r.data)

    return [data, null]
  } catch (error) {
    console.error(error)

    return [null, error as AxiosError]
  }
}
