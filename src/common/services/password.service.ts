import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordService {
    constructor() { }

    // [ . ]create secure password through hash
    public async securedPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // [ . ]verify password (compare password)
    public async verifyPassword(userPassword, Hashedpassword) {
        try {
            const verifyPassword = await bcrypt.compare(userPassword, Hashedpassword);
            return verifyPassword;
        }
        catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
