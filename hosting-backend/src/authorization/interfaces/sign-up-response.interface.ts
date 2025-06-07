export interface ISignUpResponse {
    account: {
        id: number
        email: string
    },
    token: string
}