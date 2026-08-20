import { IsEmail } from "class-validator";

export class UpdateUserInput {
  @IsEmail()
  email!: string;
}
