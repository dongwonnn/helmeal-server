import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import meals from './meals';
import snacks from './snacks';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/meals', meals.routes());
api.use('/snacks', snacks.routes());

// 라우터 내보내기
export default api;
