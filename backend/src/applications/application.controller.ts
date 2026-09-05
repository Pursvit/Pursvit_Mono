import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";
import { StatusUpdateDto } from "./dto/status-update.dto";
import { RejectionTagsDto } from "./dto/rejection-tags-dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

@Controller("applications")
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateApplicationDto) {
    return await this.appService.create(req.user.userId, dto);
  }

  @Get()
  async findAll(@Req() req: any) {
    return await this.appService.findAllByUser(req.user.userId);
  }

  @Patch(":id/status")
  async updateStatus(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: StatusUpdateDto,
  ) {
    return await this.appService.updateStatus(req.user.userId, id, dto);
  }

  @Patch(":id/rejection-tags")
  async addRejectionTags(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: RejectionTagsDto,
  ) {
    return await this.appService.addRejectionTags(req.user.userId, id, dto);
  }

  @Patch(":id")
  async update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateApplicationDto,
  ) {
    return await this.appService.update(req.user.userId, id, dto);
  }

  @Post(":id/follow-up")
  async logFollowUp(@Req() req: any, @Param("id") id: string) {
    return await this.appService.logFollowUp(req.user.userId, id);
  }

  @Delete(":id")
  async delete(@Req() req: any, @Param("id") id: string) {
    return await this.appService.delete(req.user.userId, id);
  }
}
