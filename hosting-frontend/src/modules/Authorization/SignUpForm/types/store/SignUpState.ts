import type { SignUpDto } from '../../api/interfaces/sign-up.dto'

export interface ISignUpState {
  data: SignUpDto
  isLoading: boolean
}
