import * as bcrypt from "bcrypt"

const salt = 12;

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, salt)
}