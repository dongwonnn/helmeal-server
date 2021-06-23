import Meal from '../../models/meal';
// import Joi from '@hapi/joi';

export const mealRegister = async (ctx) => {
  const {
    id,
    title,
    protein,
    carb,
    fat,
    cal,
    integrity,
    proteinImgUrl,
    largeImgUrl,
    smallImgUrl,
  } = ctx.request.body;

  const meal = new Meal({
    id,
    title,
    protein,
    carb,
    fat,
    cal,
    integrity,
    proteinImgUrl,
    largeImgUrl,
    smallImgUrl,
  });

  try {
    await meal.save();
    ctx.body = meal;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const mealList = async (ctx) => {
  try {
    const meals = await Meal.find().exec();
    ctx.body = meals;
  } catch (e) {
    ctx.throw(500, e);
  }
};
