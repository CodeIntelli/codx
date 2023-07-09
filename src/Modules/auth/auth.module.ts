import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
    imports: [PassportModule],
    providers: [JwtStrategyService, AuthService],
    exports: [AuthService, JwtStrategyService]
})
export class AuthModule {
}
