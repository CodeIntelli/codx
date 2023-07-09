import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailService: MailerService) { }

    public async sendDeactivateMail(to: string, contextUsername: string) {
        let mailObj = {
            to: to,
            from: process.env.SMTP_MAIL,
            subject: "Reactivate Your Account",
            template: "deactivateAccount",
            context: {
                username: contextUsername
            }
        }
        await this.mailService.sendMail(mailObj);
        return { message: `Mail Send Successfully to ${to}` };
    }

    public async sendLoginMail(to: string, contextUsername: string, loginIPAddress: string, loginLocation: string, time: string, secureUrl: string) {
        let mailObj = {
            to: to,
            from: process.env.SMTP_MAIL,
            subject: "Someone Is Login From Your Account",
            template: "loginAccount",
            context: {
                username: contextUsername,
                UserIP: loginIPAddress,
                userLocation: loginLocation,
                time: time,
                url: secureUrl || ""
            }
        }
        await this.mailService.sendMail(mailObj);
        return { message: `Mail Send Successfully to ${to}` };
    }


    public async resetPasswordEmail(to: string, username: string, contextUserid: string, contextUsermail: string, loginIPAddress: string, loginLocation: string, time: string, contextUserpasswordUrl: string) {
        let mailObj = {
            to: to,
            from: process.env.SMTP_MAIL,
            subject: `Reset Password Request from ${username}`,
            template: "resetPassword",
            context: {
                username: username,
                useremail: contextUsermail,
                userId: contextUserid,
                url: contextUserpasswordUrl,
                UserIP: loginIPAddress,
                userLocation: loginLocation,
                time: time,
            }
        }
        await this.mailService.sendMail(mailObj);
        return { message: `Mail Send Successfully to ${to}` };
    }


    public async verifyMail(to: string, contextUsername: string, secureUrl: string) {
        let mailObj = {
            to: to,
            from: process.env.SMTP_MAIL,
            subject: "Email Verification",
            template: "verifyEmail",
            context: {
                username: contextUsername,
                url: secureUrl || ""
            }
        }
        await this.mailService.sendMail(mailObj);
        return { message: `Mail Send Successfully to ${to}` };
    }


    public async welcomeMail(to: string, contextUsername: string) {
        let mailObj = {
            to: to,
            from: process.env.SMTP_MAIL,
            subject: "Welcome To Codeintelli",
            template: "welcomeMail",
            context: {
                username: contextUsername,
            }
        }
        await this.mailService.sendMail(mailObj);
        return { message: `Mail Send Successfully to ${to}` };
    }
}
