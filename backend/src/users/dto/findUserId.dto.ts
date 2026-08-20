import { IsMongoId, IsNotEmpty } from "class-validator";

export class FindUserId {
  @IsMongoId()
  @IsNotEmpty()
  user_id!: string;
}
