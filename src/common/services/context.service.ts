import { Injectable } from '@nestjs/common';

@Injectable()
export class ContextService {
    // * Success Message
    public userExist = 'User Already Exist'
    public getDataSuccess = "🤩 Data Retrieved Successfully"
    public postDataSuccess = "'🤩 Data Added Successfully'"
    public editDataSuccess = "🤩 Data edited Successfully"
    public delDataSuccess = "😞 Data Deleted Successfully"
    public pdelDataSuccess = "💔 Data Permenantly Deleted"
    public mailSendSuccess = "📩 Mail Send Successfully"
    public apiCalledSuccess = "🔥 API called Successfully"
    public loginSuccess = "🥳 Login Successfully"
    public registerSuccess = "🥳 User Registered Successfully"

    // ! Error Message
    public somethingWentwrong = "😞 Something Went Wrong"
    public userNotFound = "User Not Found"
    public invalidCred = "Invalid Credentials"
    public invalidEmail = "Invalid Email"
    public resetPasswordTokenNotMatch = "Reset password token doesn't match"
}
