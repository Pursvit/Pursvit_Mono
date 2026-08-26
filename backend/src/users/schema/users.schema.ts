import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

// This function is used to remove password and version key from where we are using this function(Currently JSON/Object)
const removeSensitiveFields = (doc: unknown, ret: Record<string, any>) => {
  delete ret.passwordHash;
  delete ret.__v;
  return ret;
};

@Schema({
  timestamps: true,
  toJSON: {
    transform: removeSensitiveFields,
  },
  toObject: {
    transform: removeSensitiveFields,
  },
})
<<<<<<< HEAD
export class User {
=======
export class Users {
>>>>>>> 999f5ba5b8a22cb1838871b18467771ba59d8bed
  _id!: Types.ObjectId;

  @Prop({
    required: [true, "Email required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  })
  email!: string;

  @Prop({
    required: [true, "Password Required"],
    select: false,
    minlength: [8, "Password is of minimum of 8 character"],
  })
  passwordHash!: string;

  @Prop({
    required: [true, "Name Required"],
    trim: true,
    maxlength: [100, "Name Cannot Be More Than 100 Char"],
  })
  name!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
