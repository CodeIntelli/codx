import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import Configuration from './Configuration/Configuration';
import { DatabaseModule } from './Database/database.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
// import { CloudinaryService } from './helper/cloudinary.service';
import { AuthModule } from './Modules/auth/auth.module';
import { UserModule } from './Modules/user/user.module';
import { CommonModule } from './common/common.module';
import { AppService } from './app.service';
@Module({
  imports: [
    // * globally configuration get enviornment variable
    ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),

    // * mail credentials and configure
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASS,
        },
      },
      template: {
        dir: join(__dirname, 'Templates'),
        adapter: new HandlebarsAdapter(),
      }
    }),
    // * database configuration
    DatabaseModule,
    // * auth module provide jwt service
    AuthModule,
    // * all user fucntion call from user module
    UserModule,
    // HelperModule,
    // * common module configure common service to call every file
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
