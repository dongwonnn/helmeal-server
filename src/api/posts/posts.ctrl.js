let postId = 1;

const posts = [
  {
    id: 1,
    title: 'title',
    body: 'contents',
  },
];

/* 포스트 작성
POST /api/posts
*/
export const write = (ctx) => {
  // REST API의 Request Body는 ctx.require.body에서 조회 가능
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/* 포스트 목록 조회
GET /api/posts
*/
export const list = (ctx) => {
  ctx.body = posts;
};

/* 특정 목록 조회
GET /api/posts/:id
*/
export const read = (ctx) => {
  const { id } = ctx.params;
  const post = posts.find((p) => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'post doesnt exist',
    };
    return;
  }
  ctx.body = post;
};

/* 특정 포스트 삭제
DELETE /api/posts/:id
*/
export const remove = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === 1) {
    ctx.status = 404;
    ctx.body = {
      message: 'post doesnt exist',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

/* 포스트 수정(교체)
PUT /api/posts/:id
*/
export const replace = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'post doesnt exist',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

export const update = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'post doesnt exist',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };

  ctx.body = posts[index];
};