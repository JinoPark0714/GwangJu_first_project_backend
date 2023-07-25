import baseRouter from '../controller/index.js';
import webtoonRouter from '../controller/webtoon.controller.js';
import userRouter from '../controller/user.controller.js';

const url = {
  base : '/',
  webtoon : '/webtoon',
  user : '/user'
};

export function setRouter(app){
  app.use(url.base, baseRouter);
  app.use(url.webtoon, webtoonRouter);
  app.use(url.user, userRouter);
}
