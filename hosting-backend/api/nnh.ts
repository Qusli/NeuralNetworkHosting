import { Logger } from "@nestjs/common";
import axios from "axios";


export const NNHApi = axios.create({
    baseURL: "http://10.45.169.11:8090/api"
})

NNHApi.interceptors.request.use(
    (req) => {
        Logger.log(`${req.method} by URI ${req.url}`, {
            query: req.params,
            body: req.data
        })
        return req
    },
    (error) => {
        Logger.error(`Axios error`, {
            status: error?.response?.status,
            message: error?.response?.statusText,
        })
        return error
    }
)

NNHApi.interceptors.response.use(
    (res) => {
        Logger.log(`${res.request.method} by URI ${res.request.path}`, res.data)
        return res
    },
    (error) => {
        Logger.error({
            status: error?.response?.status,
            message: error?.response?.statusText,
        })
        return error
    }
)