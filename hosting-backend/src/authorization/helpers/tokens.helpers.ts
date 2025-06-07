import * as dayjs from 'dayjs';
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

export class TokensHelpers {
    constructor(
        private config: ConfigService,
        private response: Response
    ) {}

    setTokensInCookie(accessToken: string, refreshToken: string): Response {
        this.response = this.setAccessTokenInCookie(accessToken)
        this.response = this.setRefreshTokenInCookie(refreshToken)

        return this.response
    }

    setAccessTokenInCookie(token: string): Response {
        const accessTokenExpires = dayjs().add(this.config.get("jwt.access.expiresTime"), this.config.get("jwt.access.expiresPerfomance")).toDate()

        this.response.cookie('access-token', token, {
          httpOnly: true,
          expires: accessTokenExpires
        })

        return this.response
    }

    setRefreshTokenInCookie(token: string): Response {
        const refreshTokenExpires = dayjs().add(this.config.get("jwt.refresh.expiresTime"), this.config.get("jwt.refresh.expiresPerfomance")).toDate()

        this.response.cookie('refresh-token', token, {
            expires: refreshTokenExpires,
            httpOnly: true,
        })

        return this.response
    }
}