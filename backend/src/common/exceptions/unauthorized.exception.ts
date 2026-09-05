import { HttpStatus } from "@nestjs/common";
import { DomainException } from "./domain.exception";

export class UnauthorizedException extends DomainException {
  constructor(message: string = "Unauthorized access.") {
    super({
      message,
      statusCode: HttpStatus.UNAUTHORIZED,
      code: "UNAUTHORIZED_ACCESS",
    });
  }
}
