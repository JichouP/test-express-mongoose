import mongoose, { Schema } from 'mongoose';

interface UserSchema {
  name: string;
  createdAt: Date;
}
export interface UserDocument extends mongoose.Document, UserSchema {}

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'user' },
);

export const userModel = mongoose.model<UserDocument>('User', userSchema);

export default {
  find: async (query: {}): Promise<UserDocument | null> => {
    return new Promise((res, rej) => {
      userModel.findOne(query).exec((err, doc) => {
        if (err) {
          return rej(err);
        }
        res(doc);
      });
    });
  },
  findList: async (): Promise<UserDocument[]> => {
    return new Promise((res, rej) => {
      userModel.find().exec((err, docs) => {
        if (err) {
          rej(err);
        }
        res(docs);
      });
    });
  },
  create: async (user: { name: string }): Promise<UserDocument> => {
    return new Promise((res, rej) => {
      if (!user || !user.name) {
        return rej(new Error());
      }
      const newUser = new userModel({
        name: user.name,
      });
      newUser.save((err, doc) => {
        if (err) {
          rej(err);
        }
        res(doc);
      });
    });
  },
};
