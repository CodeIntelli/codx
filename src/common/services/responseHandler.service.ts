import { HttpStatus, Injectable } from '@nestjs/common';
import { EncdecService } from './encdec.service';
import { ContextService } from './context.service';
@Injectable()
export class ResponseHandlerService {
    constructor(
        private readonly enc: EncdecService,
        private readonly msg: ContextService,
    ) { }

    // [ > ] send success response for return api
    public async sendSuccessResponse(res: any, data: any, method?: string, message?: string) {
        // decrypt and encrypt data is here
        // let newData = await JSON.stringify(data);
        // data = await JSON.stringify(data);
        // data = await this.enc.doEncryptResponse(newData);

        switch (method.toLowerCase()) {
            case 'get':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `🤩 ${message}` : this.msg.getDataSuccess });
                break;
            case 'post':
                return res.status(HttpStatus.CREATED).json({ success: true, data, message: message ? `🤩 ${message}` : this.msg.postDataSuccess });
                break;
            case 'put':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `🤩 ${message}` : this.msg.editDataSuccess });
                break;
            case 'patch':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `🤩 ${message}` : this.msg.editDataSuccess });
                break;
            case 'softdelete':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `😞 ${message}` : this.msg.delDataSuccess });
                break;
            case 'delete':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `💔 ${message}` : this.msg.pdelDataSuccess });
                break;
            case 'login':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `🥳 ${message}` : this.msg.loginSuccess });
                break;
            case 'register':
                return res.status(HttpStatus.CREATED).json({ success: true, data, message: message ? `🥳 ${message}` : this.msg.registerSuccess });
                break;
            case 'send Mail':
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `📩 ${message}` : this.msg.mailSendSuccess });
                break;
            default:
                return res.status(HttpStatus.OK).json({ success: true, data, message: message ? `🔥 ${message}` : this.msg.apiCalledSuccess });
                break;
        }
    }

    // [ > ]send Error response for return api
    public async sendErrorResponse(res: any, err: any, errType: any, errMessage?: any) {
        if (errType.toLowerCase() === "internal server error") {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 Internal Server Error' });
        }
        else if (errType.toLowerCase() === "internal error") {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 Internal Server Error' });
        }
        else if (errType.toLowerCase() === "unauthorized") {
            res.status(HttpStatus.UNAUTHORIZED).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 You Are Not Authorized User' });
        }
        else if (errType.toLowerCase() === "not found") {
            res.status(HttpStatus.NOT_FOUND).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 Not Found' });
        }
        else if (errType.toLowerCase() === "wrong credentials") {
            res.status(HttpStatus.BAD_GATEWAY).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 Wrong Credentials' });
        }
        else if (errType.toLowerCase() === "empty field") {
            res.status(HttpStatus.BAD_REQUEST).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 Please Fill All Fields Properly' });
        }
        else {
            res.status(HttpStatus.BAD_REQUEST).json({ success: false, data: [], message: process.env.DEBUG_MODE ? err.message : errMessage || '😞 Something Went Wrong' });
        }
    }
}
