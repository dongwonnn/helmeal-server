import Router from 'koa-router';
import * as mealsCtrl from './meals.ctrl';

const meals = new Router();

meals.get('/list', mealsCtrl.mealList);
meals.post('/register', mealsCtrl.mealRegister);

export default meals;
