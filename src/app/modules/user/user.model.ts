import { model, Schema } from "mongoose";
import { IUser, UserRole } from "./user.interface";


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: function (this: IUser) {
        return this.role !== UserRole.PLATFORM_ADMIN;
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
