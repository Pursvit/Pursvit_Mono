import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./schema/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserInput } from "./dto/createUser.input";
import { UpdateUserInput } from "./dto/updateUser.dto";
import { FindUserId } from "./dto/findUserId.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUserDb(input: CreateUserInput): Promise<User> {
    try {
      const createUserDb = new this.userModel({
        email: input.email,
        passwordHash: input.passwordHash,
        name: input.name,
      });
      return await createUserDb.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUserDb(
    user_id: FindUserId,
    input: UpdateUserInput,
  ): Promise<User | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate(user_id, input, { new: true })
        .exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserByIdDb(user_id: FindUserId): Promise<User | null> {
    try {
      return await this.userModel.findById(user_id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUserByIdDb(user_id: FindUserId): Promise<User | null> {
    try {
      return await this.userModel.findByIdAndDelete(user_id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserByEmailDb(email: string): Promise<User | null> {
    try {
      return await this.userModel
        .findOne({ email })
        .select("+passwordHash")
        .exec(); // explicitly selecting the passwordhash becuase we have select it off in schema
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
