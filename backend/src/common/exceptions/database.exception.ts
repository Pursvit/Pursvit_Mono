import { HttpStatus } from "@nestjs/common";
import { DomainException } from "./domain.exception";

export class DatabseException extends DomainException {
  constructor(
    message: string = "A database error occurred",
    originalError?: any,
  ) {
    super({
      message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: "DATABASE_ERROR",
      details:
        process.env.NODE_env === "production"
          ? undefined
          : {
              raw: originalError?.message,
            }, // search about it at end
    });
  }
}
