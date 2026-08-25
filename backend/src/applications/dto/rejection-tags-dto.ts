import { IsArray, IsString } from "class-validator";

export class RejectionTagsDto {
      @IsArray()
      @IsString({ each: true })
      tags!: string[];
}