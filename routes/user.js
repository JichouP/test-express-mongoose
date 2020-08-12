const User = require('../models/user');

const find = async (req, res, next) => {
  const { id } = req.params;
  await User.find({ _id: id })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((reason) => {
      console.log(reason);
      next(reason);
    });
};

const findList = async (req, res, next) => {
  const data = await User.findList().catch((reason) => {
    console.log(reason);
    next(reason);
  });
  res.status(200).send(data);
};

const create = async (req, res, next) => {
  const { name } = req.body;
  const data = await User.create({ name }).catch((reason) => {
    console.log(reason);
    next(reason);
  });
  res.status(201).send(data);
};

exports.find = find;
exports.findList = findList;
exports.create = create;
