import { HttpException, HttpStatus } from "@nestjs/common";

export class PasswordNotCompareException extends HttpException {
    constructor() {
        super("Password is not compare", HttpStatus.BAD_REQUEST)
    }
}