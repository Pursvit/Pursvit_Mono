import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schema/users.schema";
import { UserService } from "./users.service";
import { UserRepo } from "./users.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      // connect the user module with user model
      {
        name: Users.name, // will return class name "Users"
        schema: UsersSchema,
      },
    ]),
  ],
  providers: [UserService, UserRepo],
  exports: [UserService],
})
export class UserModule {}
