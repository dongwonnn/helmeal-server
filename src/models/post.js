import mongoose from 'mongoose';

const { Schema } = mongoose;

// 스키마 정의
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

// 모델 인스턴스 생성 (스키마 이름, 스키마 객체)
const Post = mongoose.model('Post', PostSchema);
export default Post;
