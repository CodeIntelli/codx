import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userInfo } from 'os';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { UserInterface } from '../interface/user.interface';
import { JwtAuthService } from '../../../common/services/jwt.service';
import { ContextService } from '../../../common/services/context.service';
import { AwsService } from '../../../common/services/aws.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private readonly responseService: ResponseHandlerService,
        private readonly jwtService: JwtAuthService,
        private readonly message: ContextService,
        private readonly awsService: AwsService
    ) {

    }

    public async doCheckUser(userId) {
        let verifiedUser = await this.userModel.findById(userId);
        if (!verifiedUser) {
            throw new NotFoundException(this.message.userNotFound);
        }
        return verifiedUser;
    }

    public async registerUser(user: any): Promise<UserInterface> {
        user.email = user.email.toLowerCase();
        const isAlreadyExist = await this.userModel.findOne({ email: user.email });
        if (isAlreadyExist != null) {
            throw new Error(this.message.userExist);
        }
        let securePassword = await this.jwtService.securedPassword(user.password)
        user.password = securePassword;
        const registerUserData = new this.userModel(user);
        let storedData = await registerUserData.save();
        return storedData;

    }

    public async loginUser(userEmail, UserPassword) {
        const loginData = await this.userModel.findOne({ email: userEmail }).select('+password');
        if (!loginData) {
            throw new Error(this.message.invalidCred);
        }
        let isPasswordMatched = await this.jwtService.verifyPassword(UserPassword, loginData.password);
        if (!isPasswordMatched) {
            throw new BadRequestException(this.message.invalidCred);
        }
        const payload = { username: loginData.name, id: loginData._id }
        loginData.access_token = await this.jwtService.generateJwtToken(payload);
        loginData.password = undefined;
        const result = { loginData, access_token: loginData.access_token };
        return result;
    }

    public async userProfile(userId) {
        let result = await this.doCheckUser(userId);
        return result;
    }

    public async editProfile(userId, data) {
        await this.doCheckUser(userId);
        let doUpdateUserData = await this.userModel.findByIdAndUpdate(userId, data, { new: true });
        return doUpdateUserData;
    }

    public async softDeleteUser(userId) {
        await this.doCheckUser(userId);
        await this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        return true;
    }

    public async removeUser(userId) {
        await this.doCheckUser(userId);
        await this.userModel.findByIdAndDelete(userId);
        return true;
    }

    public async listUser() {
        let getListUser = await this.userModel.find({ isActive: true }).sort('desc');
        console.log("🚀 ~ file: user.service.ts ~ line 86 ~ UserService ~ listUser ~ getListUser", getListUser);
        return getListUser;
    }

    public async getUser(userId) {
        await this.doCheckUser(userId);
        let getUserData = await this.userModel.findById(userId);
        console.log("🚀 ~ file: user.service.ts ~ line 86 ~ UserService ~ listUser ~ getUserData", getUserData);
        return getUserData;
    }

    public async uploadProfileImage(userId, folderName, fileObj) {
        console.log("🤩 ~ file: user.service.ts:98 ~ UserService ~ uploadProfileImage ~ userId, folderName, fileObj:", userId, folderName, fileObj)
        console.log("🤩 ~ file: user.service.ts:98 ~ UserService ~ uploadProfileImage ~ fileObj:", fileObj)
        await this.doCheckUser(userId);
        let result = await this.awsService.uploadFile(folderName, userId, fileObj);
        console.log("🚀 ~ file: user.service.ts:101 ~ UserService ~ uploadProfileImage ~ result:", result.Location)
        return result.Location;
    }

}
