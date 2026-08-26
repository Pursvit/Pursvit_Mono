import { UserModule } from "@app/users/users.module";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PasswordResetModule } from "./password-reset/password-reset.module";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: config.get<number>("JWT_EXPIRES_IN", 1800), // added type as number in place of 30m
        },
      }),
    }),
    PasswordResetModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
