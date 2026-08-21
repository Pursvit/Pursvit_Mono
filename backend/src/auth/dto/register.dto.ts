import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @ApiProperty({example: "yourname@service.com"})
  email!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({example: "yourPassword@123"})
  password!: string;

  @IsString()
  @ApiProperty({example: "yourName"})
  name!: string;
}
