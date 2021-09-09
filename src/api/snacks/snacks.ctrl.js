import Snack from '../../models/Snack';

export const snackRegister = async (ctx) => {
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

  const snack = new Snack({
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
    await snack.save();
    ctx.body = snack;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const snackList = async (ctx) => {
  try {
    const snacks = await Snack.find().exec();
    ctx.body = snacks;
  } catch (e) {
    ctx.throw(500, e);
  }
};
