import { Body, Controller, Param, Query, Req, Res, Get, Post, Put, Patch, Delete, HttpStatus, HttpException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly roleServices: RolesService,
        private readonly responseService: ResponseHandlerService,
    ) { }

    @Post('/')
    async addRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.roleServices.AddRolesWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('/')
    async listRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.roleServices.listRolesWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    async getRole(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.roleServices.GetRolesWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    async editRole(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.roleServices.EditRolesWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:id')
    async removeRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.roleServices.RemoveRolesWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Delete('/:id')
    async deleteRoles(@Res() res: Response, @Body() responseData) {
        try {

            let result = await this.roleServices.DeleteRolesWorker();
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

