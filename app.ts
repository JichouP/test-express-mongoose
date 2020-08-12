import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from './routes/user';
import { ParamsDictionary } from 'express-serve-static-core';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/express-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', User.findList);
app.get('/user/:id', User.find);
app.post('/user', User.create);

app.use('/', (req, res, next) => {
  res.status(404).send('Not Found');
  next();
});
app.use((err: Error, req: Request<ParamsDictionary>, res: Response<any>, next: NextFunction) => {
  res.status(500);
  res.json({ message: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  http.createServer(app).listen(3000, () => {
    console.log('listening at 3000');
  });
}

export default app;
