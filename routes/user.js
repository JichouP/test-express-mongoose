const User = require('../models/user');

const find = async (req, res, next) => {
  const { id } = req.params;
  const data = await User.find({ _id: id }).catch((reason) => {
    res.status(400).send('Bad Request');
    next(reason);
  });
  res.status(200).send(data);
};

const findList = async (req, res, next) => {
  const data = await User.findList().catch((reason) => {
    res.status(400).send('Bad Request');
    next(reason);
  });
  res.status(200).send(data);
};

const create = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Bad Request');
  }
  const account = await User.find({ name });
  if (account) {
    return res.status(400).send('Bad Request');
  }
  const data = await User.create({ name })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((reason) => {
      res.status(400).send('Bad Request');
      next(reason);
    });
};

exports.find = find;
exports.findList = findList;
exports.create = create;
