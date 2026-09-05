import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { CreateUserInput } from "./dto/createUser.input";
import { FindUserId } from "./dto/findUserId.dto";
import { UpdateUserInput } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(userInput: CreateUserInput) {
    return await this.userRepo.createUserDb(userInput);
  }

  async updateUser(user_id: FindUserId, updateInput: UpdateUserInput) {
    return await this.userRepo.updateUserDb(user_id, updateInput);
  }

  async deleteUser(user_id: FindUserId) {
    return await this.userRepo.deleteUserByIdDb(user_id);
  }

  async findUserByID(user_id: string) {
    return await this.userRepo.findUserByIdDb(user_id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findUserByEmailDb(email);
  }
}
