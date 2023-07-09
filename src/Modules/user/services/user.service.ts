import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { JwtAuthService } from '../../../common/services/jwt.service';
import { ContextService } from '../../../common/services/context.service';
import { AwsService } from '../../../common/services/aws.service';
import { Attachment } from 'src/Models/attachment.schema';
import { userDocument } from 'src/Models/user.schema';
import { MailService } from 'src/common/services/mail.service';
import { PasswordService } from '../../../common/services/password.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<userDocument>,
        @InjectModel('Attachment') private readonly attachmentModel: Model<Attachment>,
        private readonly responseService: ResponseHandlerService,
        private readonly jwtService: JwtAuthService,
        private readonly message: ContextService,
        private readonly awsService: AwsService,
        private readonly mailService: MailService,
        private readonly passwordService: PasswordService
    ) {

    }

    public async doCheckUser(userId) {
        let verifiedUser = await this.userModel.findOne({ _id: userId, isActive: true });
        if (!verifiedUser) {
            throw new NotFoundException(this.message.userNotFound);
        }
        return verifiedUser;
    }

    public async doCheckAttachmentUser(userId) {
        let userProfile = await this.attachmentModel.findOne({ user: userId });
        if (!userProfile) {
            throw new NotFoundException(this.message.userNotFound);
        }
        return userProfile;
    }

    public async registerUser(user: any) {
        user.email = user.email.toLowerCase();
        const isAlreadyExist = await this.userModel.findOne({ email: user.email });
        if (isAlreadyExist != null) {
            throw new Error(this.message.userExist);
        }
        let securePassword = await this.passwordService.securedPassword(user.password)
        user.password = securePassword;
        const registerUserData = new this.userModel(user);
        let storedData = await registerUserData.save();
        // [ . ] send conformation mailto user start
        const payload = { email: storedData.email }
        let token = await this.jwtService.generateJwtToken(payload)
        let url = `localhost:2030/verify-email/?token=${token}`
        /* if (storedData) {
            await this.mailService.verifyMail(storedData.email, storedData.firstname, url)
            storedData.isVerified = true;
        } */
        // [ . ] send conformation mailto user end

        return storedData;

    }

    public async loginUser(userEmail, UserPassword) {
        let loginData = await this.userModel.findOne({ email: userEmail }).select('+password');
        if (loginData.isActive === false) {
            throw new BadRequestException("user can't actvie please send email");

        }
        if (!loginData) {
            throw new Error(this.message.invalidCred);
        }
        let isPasswordMatched = await this.passwordService.verifyPassword(UserPassword, loginData.password);
        if (!isPasswordMatched) {
            throw new BadRequestException(this.message.invalidCred);
        }
        const payload = { username: loginData.firstname, id: loginData._id }
        let access_token = await this.jwtService.generateJwtToken(payload);
        loginData.password = undefined;
        if (loginData) {
            let sendemail = await this.mailService.welcomeMail(loginData.email, loginData.firstname)
        }
        const result = { loginData, access_token: access_token };
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

    public async removeUser(userId, param) {
        await this.doCheckUser(userId);
        await this.userModel.findByIdAndDelete(param);
        return true;
    }

    public async listUser() {
        let getListUser = await this.userModel.find({ isActive: true }).sort('desc');
        console.log("🚀 ~ file: user.service.ts ~ line 86 ~ UserService ~ listUser ~ getListUser", getListUser);
        return getListUser;
    }

    public async getUser(userId, param) {
        await this.doCheckUser(userId);
        let getUserData = await this.userModel.findById(param);
        console.log("🚀 ~ file: user.service.ts ~ line 86 ~ UserService ~ listUser ~ getUserData", getUserData);
        return getUserData;
    }

    public async uploadProfileImage(userId, folderName, fileObj) {

        let user = await this.doCheckUser(userId);
        let checkUser = await this.doCheckAttachmentUser(user.id)
        let result = await this.awsService.uploadFile(folderName, userId, fileObj);
        if (!checkUser) {
            checkUser = new this.attachmentModel()
        }
        checkUser.filename = fileObj.originalname;
        checkUser.fileType = fileObj.mimetype;
        checkUser.size = fileObj.size;
        checkUser.location = result.Bucket;
        checkUser.key = result.Key;
        checkUser.url = result.Location;
        user = userId;
        let storedData = await checkUser.save()
        return storedData;
    }

    public async userProfileImage(key) {
        let result = await this.awsService.getSignedUrl(key);
        return result;
    }

    public async changePassword(userId, data) {
        const user = await this.doCheckUser(userId);
        let isPasswordMatched = await this.passwordService.verifyPassword(data.password, user.password);
        if (!isPasswordMatched) {
            throw new BadRequestException(this.message.invalidCred);
        }
        let securedPassword = await this.passwordService.securedPassword(data.newPassword)
        await this.userModel.findByIdAndUpdate(userId, { password: securedPassword }, { new: true });
        return true;
    }

    public async toggleUserStatus(userId, status, param) {
        await this.doCheckUser(userId);
        let data = await this.userModel.findByIdAndUpdate(param, { isActive: status.isActive }, { new: true });
        return data;
    }

    public async forgotPassword(data) {
        let findUser = await this.userModel.findOne({ email: data })
        if (!findUser) {
            throw new BadRequestException(this.message.invalidEmail);
        }
        // generate token and store in the db
        let sendToken = await this.createResetPasswordToken(findUser.email)
        if (sendToken) {
            let resetTokenUrl = `http://localhost:2030/api/v1/user/reset-password/${sendToken}`;
            let generateTime = Date.now();
            let sendResetEmail = await this.mailService.resetPasswordEmail(findUser.email, findUser.firstname, generateTime, resetTokenUrl)
            console.log(sendResetEmail);
        }
    }


    public async createResetPasswordToken(email) {
        let checkEmail = await this.userModel.findOne({ email: email });
        let payload = { email: email }
        const token = await this.jwtService.generateJwtToken(payload)
        if (checkEmail) {
            checkEmail.resetPasswordToken = token
            checkEmail.save()
            return checkEmail.resetPasswordToken;
        }
        else {
            throw new BadRequestException(this.message.invalidEmail)
        }
    }

    public async resetPassword(data) {
        let existToken = await this.userModel.findOne({ resetPasswordToken: data.token });
        if (!existToken) {
            throw new BadRequestException(this.message.resetPasswordTokenNotMatch)
        }
        let secureNewPassword = await this.passwordService.securedPassword(data.newPassword);
        existToken.password = secureNewPassword;
        existToken.resetPasswordToken = null;
        let result = existToken.save();
        return result;

    }

    public async logoutUser(userId) {
        const user = await this.doCheckUser(userId)
        if (user.isOnline === true) {
            user.isOnline = false;
        }
        await user.save();
    }
}
