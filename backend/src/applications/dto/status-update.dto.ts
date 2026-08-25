import { IsEnum, IsNotEmpty } from "class-validator";

export class StatusUpdateDto {
  @IsEnum([
            "Applied",
            "Screening",
            "Interview 1",
            "Interview 2",
            "Offer",
            "Rejected",
      ])
      @IsNotEmpty()
      status!: string;
}