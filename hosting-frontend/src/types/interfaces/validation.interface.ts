export interface IValidation {
  message?: string
  validation: boolean
  isValid(): boolean
}
