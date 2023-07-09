import { Injectable } from '@nestjs/common';
import otpGenerator from "otp-generator";
@Injectable()
export class OtpgeneratorService {
    // [ . ]generate otp
    public async GenerateOTP(length: number, config: any) {
        const otpConfig = {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        };
        const result = otpGenerator.generate(length || 3, config || otpConfig);
        const result2 = otpGenerator.generate(length || 3, config || otpConfig);
        // Here the Otp Will be Generate Like 123 232 so its better for security reasons
        return `${result} ${result2}`;
    }
}
