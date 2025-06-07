import type { AxiosError } from "axios";

export type DeleteResponse = [
    ok: boolean,
    error: AxiosError | null
]