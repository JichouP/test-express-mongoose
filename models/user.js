const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
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

const userModel = mongoose.model('User', userSchema);

const find = async (query) => {
  return new Promise((res, rej) => {
    userModel.findOne(query).exec((err, doc) => {
      if (err) {
        rej(err);
      }
      res(doc);
    });
  });
};

const findList = async () => {
  return new Promise((res, rej) => {
    userModel.find().exec((err, docs) => {
      if (err) {
        rej(err);
      }
      res(docs);
    });
  });
};

const create = async (user) => {
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
};

exports.find = find;
exports.findList = findList;
exports.create = create;
exports.userModel = userModel;
