import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/users.schema";
import { UserService } from "./users.service";
import { UserRepository } from "./users.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      // connect the user module with user model
      {
        name: User.name, // will return class name "Users"
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
