import { Injectable, NotFoundException } from "@nestjs/common";
import { ApplicationRepository } from "./application.repository";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { StatusUpdateDto } from "./dto/status-update.dto";
import { RejectionTagsDto } from "./dto/rejection-tags-dto";

@Injectable()
export class ApplicationService {
  constructor(private readonly repo: ApplicationRepository) {}

  private calculateFollowUpDate(companySize: string): Date {
    const date = new Date();
    const days =
      companySize === "Startup" ? 3 : companySize === "Mid-size" ? 7 : 10;
    date.setDate(date.getDate() + days);
    return date;
  }

  async create(userId: string, newData: CreateApplicationDto) {
    const nextFollowUpDate = this.calculateFollowUpDate(newData.companySize);
    return await this.repo.create(userId, { ...newData, nextFollowUpDate });
  }

  async findAllByUser(userId: string) {
    return await this.repo.findByUserId(userId);
  }

  async updateStatus(
    userId: string,
    appId: string,
    statusUpdate: StatusUpdateDto,
  ) {
    return await this.repo.updateStatus(appId, userId, statusUpdate.status);
  }

  async addRejectionTags(
    userId: string,
    appId: string,
    rejectionTags: RejectionTagsDto,
  ) {
    return await this.repo.rejectionTags(appId, userId, rejectionTags.tags);
  }

  async update(
    userId: string,
    appId: string,
    updateData: Partial<CreateApplicationDto>,
  ) {
    return await this.repo.update(appId, userId, updateData);
  }

  async delete(userId: string, appId: string) {
    return await this.repo.delete(appId, userId);
  }

  async logFollowUp(userId: string, appId: string) {
    const application = await this.repo.findOneByIdAndUser(appId, userId);
    if (!application) throw new NotFoundException("Application not found");
    const newDate = this.calculateFollowUpDate(application.companySize);
    return await this.repo.incrementFollowUp(appId, userId, newDate);
  }
}
