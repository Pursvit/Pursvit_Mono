import { HttpStatus } from "@nestjs/common";
import { DomainException } from "./domain.exception";

export class NotFoundException extends DomainException {
  constructor(entity: string, identifier: string | number) {
    super({
      message: identifier ? `${entity} with identifier ${identifier} is not found` : `${entity} not Found.`,
      statusCode: HttpStatus.NOT_FOUND,
      code: "RESOURCE_NOT_FOUND"
    })
  }
}
