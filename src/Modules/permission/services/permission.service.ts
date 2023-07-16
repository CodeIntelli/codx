// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { PermissionModel } from 'src/Models/permission.schema'

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel('Roles') private readonly RoleModel,
        @InjectModel('Permission') private readonly PermissionModel,
        // private readonly responseService: ResponseHandlerService,
        // private readonly jwtService: JwtAuthService,
        // private readonly message: ContextService,
        // private readonly awsService: AwsService,
        // private readonly mailService: MailService,
        // private readonly passwordService: PasswordService
    ) {

    }
    public async AddPermissionWorker(record: any) {
        const addRecord = new this.PermissionModel(record);
        let storedData = await addRecord.save()
        console.log("🤩 ~ file: permission.service.ts:26 ~ PermissionService ~ AddPermissionWorker ~ storedData:", storedData)
        return await storedData;
    }
    public async listPermissionWorker() {
        return {
            success: true
        }
    }
    public async GetPermissionWorker() {
        return {
            success: true
        }
    }
    public async EditPermissionWorker() {
        return {
            success: true
        }
    }
    public async RemovePermissionWorker() {
        return {
            success: true
        }
    }
    public async DeletePermissionWorker() {
        return {
            success: true
        }
    }
}
