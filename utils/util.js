const mongoose = require('mongoose');
const { mockReq, mockRes } = require('sinon-express-mock');

const createRequestMock = (request) => [mockReq(request), mockRes(), jest.fn()];
const connectMock = (dbName) => async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: dbName,
  });
};
const disconnectMock = () => {
  mongoose.connection.close();
};

exports.createRequestMock = createRequestMock;
exports.connectMock = connectMock;
exports.disconnectMock = disconnectMock;
