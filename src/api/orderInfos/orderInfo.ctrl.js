import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import OrderInfo from '../../models/orderInfo';

// 영수증 등록 -> 물건 구매시
export const enroll = async (ctx) => {
  const schema = Joi.object().keys({
    proteinInfo: Joi.string().required(),
    dateInfo: Joi.string().required(),
    subscribeTerm: Joi.string().required(),
    mainAddress: Joi.string().required(),
    deliveryPeriod: Joi.string().required(),
    totalPay: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    proteinInfo,
    dateInfo,
    subscribeTerm,
    mainAddress,
    deliveryPeriod,
    totalPay,
  } = ctx.request.body;

  const orderInfo = new OrderInfo({
    proteinInfo,
    dateInfo,
    subscribeTerm,
    mainAddress,
    deliveryPeriod,
    totalPay,
    user: ctx.state.user,
  });

  try {
    await orderInfo.save();
    ctx.body = orderInfo;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 영수증 가져오기
export const list = async (ctx) => {
  try {
    const orderInfos = await OrderInfo.find().exec();
    ctx.body = orderInfos;
  } catch (e) {
    ctx.throw(500, e);
  }
};
