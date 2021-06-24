import Router from 'koa-router';
import * as orderInfoCtrl from './orderInfo.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const orderInfos = new Router();

orderInfos.get('/', orderInfoCtrl.list);
orderInfos.post('/', checkLoggedIn, orderInfoCtrl.enroll);

export default orderInfos;
