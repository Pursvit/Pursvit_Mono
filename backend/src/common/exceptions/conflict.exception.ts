import { HttpStatus } from "@nestjs/common";
import { DomainException } from "./domain.exception";

export class ConflictException extends DomainException {
  constructor(message: string = "A conflict is occured with existing resource") {
    super({
      message,
      statusCode: HttpStatus.CONFLICT,
      code: "RESOURCE_CONFLICT"
    })
  }
}
