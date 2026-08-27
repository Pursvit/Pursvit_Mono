import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { DomainException } from "../exceptions";
/*
review this file again because there is ai help in this.
*/
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = "Internal Server Error";
    let code = "INTERNAL_SERVER_ERROR";
    let details: Record<string, any> | undefined = undefined;

    if (exception instanceof DomainException) {
      status = exception.getStatus();
      const res = exception.getResponse() as Record<string, any>;
      message = res.message;
      code = exception.code || "DOMAIN_ERROR";
      details = exception.details;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    const logPayload = {
      statusCode: status,
      path: request.url,
      method: request.method,
      code,
      details,
    };

    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} - ${JSON.stringify(logPayload)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`${request.method} ${request.url} - ${JSON.stringify(logPayload)}`);
    }

    response.status(status).json({
      statusCode: status,
      parh: request.url,
      code,
      message,
      ...(details && { details }),
      timestamp: new Date().toISOString(),
    });
  }
}
