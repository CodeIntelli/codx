import { Body, Controller, Param, Query, Req, Res, Get, Post, Put, Patch, Delete, HttpStatus, HttpException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { IsAuthenticated } from 'src/Modules/auth/jwt-guard';
import { registerUserDtos, checkLoginUserData } from '../dtos/user.dtos';
import { UserService } from '../services/user.service';
import { RequestInterface } from '../interface/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly responseService: ResponseHandlerService,
    ) { }

    /*     @Post('register')
        async doRegisterUser(@Res() res: Response, @Body() registerData: registerUserDtos) {
            try {
                let result = await this.userService.registerUser(registerData);
                return this.responseService.sendSuccessResponse(res, result, 'register');
            } catch (err) {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, { cause: new Error(err) });
            }
        }
    
        @Post('login')
        async doLoginUser(@Res() res: Response, @Body() loginData: checkLoginUserData) {
            try {
                let result = await this.userService.loginUser(loginData.email, loginData.password);
                console.log("🚀 ~ file: user.controller.ts ~ line 31 ~ UserController ~ loginUser ~ data", result);
                return this.responseService.sendSuccessResponse(res, result, 'login');
            } catch (err) {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, { cause: new Error(err) });
            }
        }
    
        @Get('profile')
        @UseGuards(IsAuthenticated)
        async doGetUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
            try {
                let data = await this.userService.userProfile(req.user.id);
                return this.responseService.sendSuccessResponse(res, data, 'get', "profile get succesfully");
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        }
    
        @Put('editprofile')
        @UseGuards(IsAuthenticated)
        async doUpdateUserProfile(@Req() req: RequestInterface, @Res() res: Response, @Body() editedData) {
            try {
                let data = await this.userService.editProfile(req.user.id, editedData);
                return this.responseService.sendSuccessResponse(res, data, 'put');
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        }
    
        @Put('delete')
        @UseGuards(IsAuthenticated)
        async doDeleteUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
            try {
                let data = await this.userService.softDeleteUser(req.user.id);
                return this.responseService.sendSuccessResponse(res, data, 'put', "delete user");
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        }
    
    
        @Delete('remove')
        @UseGuards(IsAuthenticated)
        async doRemoveUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
            try {
                let data = await this.userService.removeUser(req.user.id);
                return this.responseService.sendSuccessResponse(res, data, 'delete');
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        }
    
        @Get('list')
        @UseGuards(IsAuthenticated)
        async doGetUserList(@Res() res: Response) {
            try {
                let data = await this.userService.listUser();
                return this.responseService.sendSuccessResponse(res, data, 'get', "all user data retrived");
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        }
    
        @Get('single')
        @UseGuards(IsAuthenticated)
        async doGetSingleUser(@Req() req: RequestInterface, @Res() res: Response) {
            try {
                let data = await this.userService.getUser(req.user.id);
                return this.responseService.sendSuccessResponse(res, data, 'get', "single data retrive successfully");
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        }
    
        @Put('upload-profile')
        @UseGuards(IsAuthenticated)
        @UseInterceptors(FileInterceptor('profileImg'))
        async doUploadProfileUser(@Req() req: RequestInterface, @Res() res: Response, @UploadedFile() file) {
            try {
                let folder = "profile"
                console.log(file)
                let data = await this.userService.uploadProfileImage(req.user.id, folder, file);
                return this.responseService.sendSuccessResponse(res, data, 'put', "user profile upload successfully");
            } catch (err) {
                return this.responseService.sendErrorResponse(res, err, 'internal server error');
            }
        } */



    /* Common Authentication Routes */
    @Post('/register')
    public async doRegisterUser(@Req() req: Request, @Res() res: Response) { }


    @Post('/login')
    public async doLoginUser() { }


    @Post('/forgot-password')
    public async doForgotPassword() { }

    @Post('/reset-password')
    public async doResetPassword() { }

    @Post('/logout')
    public async doLogoutUser() { }


    /* Authentication Required */
    @Get('/profile')
    @UseGuards(IsAuthenticated)
    public async doGetUserProfile() { }


    @Get('/list-user')
    @UseGuards(IsAuthenticated)
    public async doGetUserList() { }

    @Get('/:id')
    @UseGuards(IsAuthenticated)
    public async doGetUser() { }


    @Put('/profile/:id')
    @UseGuards(IsAuthenticated)
    public async doEditProfile() { }

    @Put('/change-password')
    @UseGuards(IsAuthenticated)
    public async doEditPassword() { }

    @Put('/toggler')
    @UseGuards(IsAuthenticated)
    public async doTogglerUser() { }


    @Delete('/remove-user/:id')
    @UseGuards(IsAuthenticated)
    public async doRemoveUser() { }

    @Put('/upload')
    @UseGuards(IsAuthenticated)
    @UseInterceptors(FileInterceptor('profileImg'))
    public async doUploadProfilePicture() { }

}   