import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/user.routes'
import postRouter from './routes/post.routes'
import authRouter from './routes/auth.routes';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('API running');
});

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is running on 3000')
  })
}
