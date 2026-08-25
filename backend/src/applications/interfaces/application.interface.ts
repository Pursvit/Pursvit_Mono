import { Types } from "mongoose";

export class IApplication {
  _id?: Types.ObjectId;
  userId!: Types.ObjectId;
  company!: string;
  role!: string;
  status!:
    | "Applied"
    | "Screening"
    | "Interview 1"
    | "Interview 2"
    | "Offer"
    | "Rejected";
  resumeVersion!: "A" | "B";
  companySize!: "Startup" | "Mid-size" | "Enterprise";
  nextFollowUpDate!: Date;
  followUpCount!: number;
  rejectionTags!: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
