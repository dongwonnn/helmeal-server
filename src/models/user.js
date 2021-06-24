import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  email: String,
  userId: String,
  hashedPassword: String,
});

// 인스턴스 함수에서 this는 문서 인스턴스
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// 스태틱에서 this는 User
UserSchema.statics.findByuserId = function (userId) {
  return this.findOne({ userId });
};

// hasedmethod 지우기
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      userId: this.userId,
    },
    process.env.JWT_SECRET,
    {
      //토큰 유효기간
      expiresIn: '7d',
    },
  );

  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
