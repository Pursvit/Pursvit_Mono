import { HttpStatus } from "@nestjs/common";
import { DomainException } from "./domain.exception";

export class ValidationException extends DomainException {
  constructor(errors: Record<string, any> | string) {
    super({
      message: "Valitdation Failed.",
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      code: "Validation Error",
      details: typeof errors === 'string' ? { error: errors } : errors,
    })
  }
}
