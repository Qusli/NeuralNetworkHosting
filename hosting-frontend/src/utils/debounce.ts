export function debounce(callee: (...args: any[]) => void, ms: number) {
  return function perform(...args: any[]) {
    const previousCall = this.lastCall

    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= ms) {
      clearTimeout(this.lastCallTimer)
    }

    this.lastCallTimer = setTimeout(() => callee(...args), ms)
  }
}