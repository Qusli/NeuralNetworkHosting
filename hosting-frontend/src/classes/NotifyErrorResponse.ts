import type { IErrorResponse } from "@/types"
import { toast } from "vue3-toastify"

export class NotifyErrorResponse {
  static #SERVER_ERROR: string = 'Server error'
  static #UNKNOW_ERROR: string = 'Unknow error'

  static #error: IErrorResponse | null = null

  static init(error: IErrorResponse): typeof NotifyErrorResponse {
    this.#error = error
    return this
  }

  static sendNotifyError(): void {
    if (Array.isArray(this.#error?.message)) {
      for (const message of this.#error?.message) {
        toast.error(message || this.#SERVER_ERROR)
      }
    } else if (this.#error?.message) {
      toast.error(this.#error?.message || this.#SERVER_ERROR)
    } else {
      toast.error(this.#UNKNOW_ERROR)
    }
  }
}
