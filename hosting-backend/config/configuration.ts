import { TypeOrmModuleOptions } from "@nestjs/typeorm"

interface Token {
    secret: string
    expiresTime: number,
    expiresPerfomance: string
}

interface Smtp {
    host: string
    port: number
    user: string
    password: string
    from: string
}

interface Config {
    database: TypeOrmModuleOptions
    jwt: Token
    smtp: Smtp
}

export default (): Config => ({
    database: {
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "postgres",
        autoLoadEntities: true,
        synchronize: true
    },
    jwt: {
        secret: process.env.JWT_TOKEN_SECRET_KEY,
        expiresTime: parseInt(process.env.JWT_TOKEN_EXPIRES_TIME) || 1,
        expiresPerfomance: process.env.JWT_TOKEN_EXPIRES_PERFORMANCE || "h" 
    },
    smtp: {
        host: process.env.SMTP_HOST || "smtp.yandex.ru",
        port: parseInt(process.env.SMTP_HOST) || 465,
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
        from: process.env.SMTP_FROM,
    }
})