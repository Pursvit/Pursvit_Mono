import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Users } from "./schema/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserInput } from "./dto/createUser.input";
import { UpdateUserInput } from "./dto/updateUser.dto";

@Injectable()
export class UserRepo {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
  ) {}

  async createUserDb(input: CreateUserInput): Promise<Users> {
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
    user_id: string,
    input: UpdateUserInput,
  ): Promise<Users | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate(user_id, input, { new: true })
        .exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserByIdDb(user_id: string): Promise<Users | null> {
    try {
      return await this.userModel.findById(user_id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUserByIdDb(user_id: string): Promise<Users | null> {
    try {
      return await this.userModel.findByIdAndDelete(user_id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserByEmailDb(email: string): Promise<Users | null> {
    try {
      return await this.userModel.findOne({email}).select("+passwordHash").exec(); // explicitly selecting the passwordhash becuase we have select it off in schema
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
