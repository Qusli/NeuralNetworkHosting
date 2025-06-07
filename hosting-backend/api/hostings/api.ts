import { NNHApi } from "api/nnh";
import { ConnectToHostDto } from "./dto/connect-to-host.dto";
import { IHosting } from "./interfaces/hosting.interface";
import { AxiosError } from "axios";

export const NNHHostingsApi = {

    async connectToHost(dto: ConnectToHostDto): Promise<[ host: IHosting | null, error: AxiosError | null ]> {
        try {
            const host = await NNHApi.post("/docker-hosts/connect-to-new-host", null, {
                params: {
                    hostAddress: dto.address,
                    hostPort: dto.port,
                    description: dto.description
                }
            }).then(r => r.data)
            return [host, null]
        } catch (error) {
            console.error(error)
            return [null, error]
        }
    },

    async getHostingById(hostingId: number): Promise<[ host: IHosting | null, error: AxiosError | null ]> {
        try {
            const host = await NNHApi.get("/docker-hosts/get-docker-host", {
                params: {
                    hostId: hostingId
                }
            }).then(r => r.data)
            return [host, null]
        } catch (error) {
            console.error(error)
            return [null, error]
        }
    }

}