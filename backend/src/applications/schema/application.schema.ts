import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userID!: Types.ObjectId;

  @Prop({ required: true })
  company!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({
    enum: [
      "Applied",
      "Screening",
      "Interview 1",
      "Interview 2",
      "Offer",
      "Rejected",
    ],
    default: "Applied"
  })
  status!: string;

  @Prop({enum: ['A', 'B']})
  resumeVersion!: string;

  @Prop({enum: ['Startup', 'Mid-size', 'Enterprise']})
  companySize!: string;

  @Prop({type: Date})
  nextFollowUpDate!: Date;

  @Prop({default: 0})
  followUpCount!: number;

  @Prop({type: [String], default: []})
  rejectionTags!: string[]
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);