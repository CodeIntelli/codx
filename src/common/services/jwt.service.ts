import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) { }

    public async generateJwtToken(payload: any): Promise<any> {
        try {
            let access_token = await this.jwtService.sign(payload);
            return access_token;
        }
        catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    public async securedPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


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
