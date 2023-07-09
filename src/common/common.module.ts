import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { ResponseHandlerService } from './services/responseHandler.service';
import { AwsService } from './services/aws.service';
import { MailService } from './services/mail.service';
import { JwtAuthService } from './services/jwt.service';
import { OtpgeneratorService } from './services/otpgenerator.service';
import { ApifeatureService } from './services/apifeature.service';
import { EncdecService } from './services/encdec.service';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseService } from './services/Firebase.service';
import { ContextService } from './services/context.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  providers: [
    ServicesService,
    ResponseHandlerService,
    AwsService,
    MailService,
    JwtAuthService,
    OtpgeneratorService,
    ApifeatureService,
    EncdecService,
    FirebaseService,
    ContextService,

  ],
  exports: [
    ServicesService,
    ResponseHandlerService,
    AwsService,
    MailService,
    JwtAuthService,
    OtpgeneratorService,
    ApifeatureService,
    EncdecService,
    FirebaseService
  ],

})
export class CommonModule { }
