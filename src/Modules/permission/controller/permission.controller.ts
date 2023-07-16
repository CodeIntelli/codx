import { Body, Controller, Param, Query, Req, Res, Get, Post, Put, Patch, Delete, HttpStatus, HttpException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { PermissionService } from '../services/permission.service';

@Controller('permission')
export class PermissionController {
    constructor(
        private readonly serviceHandler: PermissionService,
        private readonly responseService: ResponseHandlerService,
    ) { }

    @Post('/')
    async addRoles(@Res() res: Response, @Body() responseData) {
        try {
            console.log(responseData);
            let result = await this.serviceHandler.AddPermissionWorker(responseData);
            return this.responseService.sendSuccessResponse(res, result, 'register', "Permission Added Successfully");
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('/')
    async listRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.serviceHandler.listPermissionWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    async getRole(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.serviceHandler.GetPermissionWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    async editRole(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.serviceHandler.EditPermissionWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:id')
    async removeRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.serviceHandler.RemovePermissionWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Delete('/:id')
    async deleteRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.serviceHandler.DeletePermissionWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

