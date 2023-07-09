import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncdecService } from '../../common/services/encdec.service';
import * as CryptoJS from 'crypto-js'


@Injectable()
// interceptor work like a middleware
export class HttpInterceptor implements NestInterceptor {
  constructor() { }
  key = process.env.ENC_DEC_KEY;
  iv1 = process.env.IV1;
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    debugger;
    const http = context.switchToHttp();
    const request = http.getRequest();
    // const { params, query, body, headers, user, url, route } = request;
    const { route } = request;
    console.log('method : ', route.methods);
    if (route.methods.post || route.methods.put || route.methods.patch) {
      debugger;
      const encPayload = await context.switchToHttp().getRequest().body.payload;
      let decData = await this.doDecryptRequest(encPayload)
      context.switchToHttp().getRequest().body = await JSON.parse(decData)
    }
    return next.handle().pipe(map(async (response) => {
    }));
  }


  async doDecryptRequest(encryptedData) {
    const plainText1 = await CryptoJS.AES.decrypt(encryptedData, this.key, {
      keySize: 16,
      iv: this.iv1,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    let decryptedData = await JSON.parse(plainText1.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}




