import Router from 'koa-router';
import * as snacksCtrl from './snacks.ctrl';

const snacks = new Router();

snacks.get('/list', snacksCtrl.snackList);
snacks.post('/register', snacksCtrl.snackRegister);

export default snacks;
