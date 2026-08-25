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

  async createApplicationDb(
    userId: string,
    dto: CreateApplicationDto,
  ): Promise<ApplicationDocument> {
    try {
      const createApplication = new this.appModel({
        userID: new Types.ObjectId(userId),
        ...dto,
      });
      return await createApplication.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserById(userId: string): Promise<ApplicationDocument[]> {
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

  //   async updateStatus(appId: string, userId: string, status: string): Promise<ApplicationDocument | null> {
  //       try {
  //             return await this.appModel.findOneAndUpdate({_id: appId, userID: new Types.ObjectId(userId)}, status, {returnDocument: 'after'});
  //       }
  //       catch(error: any) {
  //             throw new InternalServerErrorException(error.message);
  //       }
  //   }
}
