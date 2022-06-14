import { Document, Schema, Types, model } from 'mongoose';
import { IUser } from './User';

// property interface
export interface IProperty extends Document {
  name?: string;
  address?: string;
  type?: string;
  description?: string;
  image_url?: string;
  total_rooms?: string;
  occupancy_type?: string;
  rent_amount?: number;
  currency?: string;
  rent_frequency?: string;
  is_published?: boolean;
  user?: any;
  email_sent?: boolean;
}

// property schema
const PropertySchema = new Schema<IProperty>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    thumbnail: String,
    type: {
      type: String,
      enum: ['flat', 'duplex', 'studio'],
      default: 'flat',
    },
    description: {
      type: String,
    },
    image_url: {
      type: String,
    },
    total_rooms: {
      type: String,
    },
    occupancy_type: {
      type: String,
    },
    rent_amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    rent_frequency: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'yearly',
    },
    is_published: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },

    email_sent: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

// create and export post model
export const PropertyModel = model<IProperty>('Property', PropertySchema);
