import { Document, Schema, Types, model } from 'mongoose';

// (first_name, last_name, email, phone)

// user interface
export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
}

// user schema
const UserSchema = new Schema<IUser>({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: String,
  phone: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
})

// create and export user model
export const UserModel = model<IUser>("User", UserSchema);