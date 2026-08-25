import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsEnum(["A", "B"])
  resumeVersion!: "A" | "B";

  @IsEnum(["Startup", "Mid-size", "Enterprise"])
  companySize!: "Startup" | "Mid-size" | "Enterprise";

  @IsOptional()
  @IsString()
  status?: string;
}
