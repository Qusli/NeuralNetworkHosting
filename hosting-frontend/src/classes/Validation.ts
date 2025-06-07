import type { IValidation } from '@/types'

export class Validation implements IValidation {
  message?: string | undefined
  validation: boolean

  constructor(validation: boolean, message?: string) {
    this.message = message
    this.validation = validation
  }

  isValid(): boolean {
    return this.validation
  }
}
