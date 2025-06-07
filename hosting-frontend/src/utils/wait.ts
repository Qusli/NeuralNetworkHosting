export const wait = async (second: number): Promise<void> => {
  await new Promise((res) => {
    setTimeout(() => {
      res(0)
    }, second * 1000)
  })
}
