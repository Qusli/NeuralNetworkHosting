import { NNHApi } from "api/nnh";
import { AxiosError } from "axios";
import { INeuralNetworkType } from "./interfaces/neural-network-type.interface";

export const NNHNeuralNetworkApi = {

    async getTypes(): Promise<[ types: INeuralNetworkType[] | null, error: AxiosError | null ]> {
        try {
            const types = await NNHApi.get("/neuralNetworkType").then(r => r.data)
            return [types, null]
        } catch (error) {
            console.error(error)
            return [null, error]
        }
    },

}