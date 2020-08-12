import { Mongoose } from 'mongoose';
import { mockReq, mockRes } from 'sinon-express-mock';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export const createRequestMock = (request?: {}): [
  mockReq.MockReq & Request<ParamsDictionary>,
  mockRes.MockRes & Response,
  jest.Mock<any, any>,
] => [mockReq(request), mockRes(), jest.fn()];
export const connectMock = (
  mongoose: Mongoose,
  dbName: 'jest-routes' | 'jest-models' | 'jest-integration',
) => async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect((global as any).__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: dbName,
  });
};
export const disconnectMock = (mongoose: Mongoose) => () => {
  mongoose.connection.close();
};
export const createHandler = (
  handler: (req: Request<ParamsDictionary>, res: Response<any>, next: NextFunction) => any,
) => {
  return handler;
};
