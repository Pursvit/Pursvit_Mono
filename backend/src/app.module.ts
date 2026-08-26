import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ThrottleConfig } from "./common/config/rate-limit.config";
import { ValidationCofig } from "./common/config/validation.config";
import { DatabaseConfig } from "./common/config/database.config";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    /*ConfigModule.forRoot({
      isGlobal: true; // will make this import all over source code can be used i am not using currently
    }),
    */
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ValidationCofig,
    }),
    // using forRootAsync makes connection asyncronous and configservice is useful rather than reapeatidly calling process.env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DatabaseConfig,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ThrottleConfig,
    }),
    UserModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Applying THe APP Guard all route globally
    },
  ],
})
export class AppModule {}
