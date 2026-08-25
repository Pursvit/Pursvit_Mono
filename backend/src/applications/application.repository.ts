import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application, ApplicationDocument } from "./schema/application.schema";
import { Model, Types } from "mongoose";
import { CreateApplicationDto } from "./dto/create-application.dto";

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name) private appModel: Model<ApplicationDocument>,
  ) {}

  async create(
    userId: string,
    newData: CreateApplicationDto,
  ): Promise<ApplicationDocument> {
    try {
      const createApplication = new this.appModel({
        userID: new Types.ObjectId(userId),
        ...newData,
      });
      return await createApplication.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByUserId(userId: string): Promise<ApplicationDocument[]> {
    try {
      return await this.appModel
        .find({ userId: new Types.ObjectId(userId) })
        .exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneByIdAndUser(
    appId: string,
    userId: string,
  ): Promise<ApplicationDocument | null> {
    try {
      return await this.appModel.findOne({
        _id: appId,
        userId: new Types.ObjectId(userId),
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateStatus(
    appId: string,
    userId: string,
    status: string,
  ): Promise<ApplicationDocument | null> {
    try {
      return await this.appModel.findOneAndUpdate(
        { _id: appId, userID: new Types.ObjectId(userId) },
        { status },
        { new: true },
      );
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    appId: string,
    userID: string,
    updateData: Partial<CreateApplicationDto>,
  ): Promise<ApplicationDocument | null> {
    try {
      return await this.appModel.findOneAndUpdate(
        { _id: appId, userId: new Types.ObjectId(userID) },
        updateData,
        { new: true },
      );
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async rejectionTags(
    appId: string,
    userId: string,
    tags: string[],
  ): Promise<ApplicationDocument | null> {
    try {
      return await this.appModel.findOneAndUpdate(
        { _id: appId, userID: new Types.ObjectId(userId) },
        { $push: { rejectionTags: { $each: tags } } },
        { new: true },
      );
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async incrementFollowUp(
    appId: string,
    userId: string,
    newDate: Date,
  ): Promise<ApplicationDocument | null> {
    try {
      return this.appModel.findOneAndUpdate(
        { _id: appId, userID: new Types.ObjectId(userId) },
        { $inc: { followUpCount: 1 }, $set: { nextFollowUpDate: newDate } },
        { new: true },
      );
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(
    appId: string,
    userId: string,
  ): Promise<ApplicationDocument | null> {
    try {
      return await this.appModel.findOneAndDelete({
        _id: appId,
        userId: new Types.ObjectId(userId),
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
