import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js'
@Injectable()
export class EncdecService {
    constructor() { }
    key = process.env.ENC_DEC_KEY;
    iv1 = process.env.IV1;

    // ~ request body data convert into the encrypt format
    async doEncryptResponse(payload) {
        const encrypted = await CryptoJS.AES.encrypt(JSON.stringify(payload), this.key, {
            keySize: 16,
            iv: this.iv1,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString()
    }

    // ~ request body data convert into the decrypt format
    async doDecryptRequest(encryptedData) {
        const plainText1 = await CryptoJS.AES.decrypt(encryptedData, this.key, {
            keySize: 16,
            iv: this.iv1,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return plainText1.toString(CryptoJS.enc.Utf8)
    }
}
