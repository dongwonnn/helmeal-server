import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

// 포스트가 자기 껀지 체크
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

// 삭제 시 권한 체크
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);

    // 포스트가 존재 안할 때
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

// 글쓰기
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 특정 글 가져오기
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

// 삭제하기
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // 성공했지만 응답할 데이터는 없음
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 글 업데이트하기
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    });

    if (!post) {
      ctx.status = 404;
      return;
    }

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
