import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  passwordHash!: string;

  @IsString()
  @MaxLength(100)
  name!: string;
}
