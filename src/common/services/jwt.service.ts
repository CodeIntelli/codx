import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) { }

    // ~ generate token
    public async generateJwtToken(payload: any): Promise<any> {
        try {
            let access_token = await this.jwtService.sign(payload);
            return access_token;
        }
        catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}
