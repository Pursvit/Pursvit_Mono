import { HttpException, HttpStatus } from "@nestjs/common";

export interface ExceptionPayload {
  message: string,
  statusCode?: HttpStatus;
  code?: string,
  details?: Record<string, any>;
}

export abstract class DomainException extends HttpException {
  public readonly code?: string;
  public readonly details?: Record<string, any>;

  constructor({
    message, statusCode = HttpStatus.BAD_REQUEST, code, details
  }: ExceptionPayload) {
    super(
      {
        statusCode,
        message,
        code,
        details,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
    this.code = code;
    this.details = details;
  }
}
