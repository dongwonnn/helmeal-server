import Joi from '@hapi/joi';
import User from '../../models/user';

export const register = async (ctx) => {
  // requset body 검증
  // const schema = Joi.object().keys({
  //   // userId: Joi.string().alphanum().min(3).max(20).required(),
  //   email: Joi.string().required(),
  //   userId: Joi.string().required(),
  //   password: Joi.string().required(),
  // });

  // const result = schema.validate(ctx.request.body);
  // if (result.error) {
  //   ctx.status = 400;
  //   ctx.body = result.error;
  //   return;
  // }

  const { email, password, phoneNum, birthday, userId, sex } = ctx.request.body;

  try {
    // 이름 겹치는 지 확인. 스태틱 메서드
    const exists = await User.findByuserId(email);
    if (exists) {
      ctx.status = 409;
      ctx.body = '이름이 겹칩니다.';
      return;
    }

    const user = new User({
      email,
      password,
      phoneNum,
      birthday,
      userId,
      sex,
    });

    // 인스턴스 메서드
    await user.setPassword(password);
    await user.save();

    // hashedpassword 필드 제거
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!password || !email) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByuserId(email);

    // 계정 존재하는 지?
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    console.log('3');

    ctx.throw(500, e);
  }
};
export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

// 로그아웃. 쿠키 지우기
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
