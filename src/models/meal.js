import mongoose from 'mongoose';

const { Schema } = mongoose;

// Meal 스키마 정의
const MealSchema = new Schema({
  id: String,
  title: String,
  protein: String,
  carb: Number,
  fat: Number,
  cal: Number,
  integrity: String,
  proteinImgUrl: String,
  largeImgUrl: String,
  smallImgUrl: String,
});

// 모델 인스턴스 생성 (스키마 이름, 스키마 객체)
const Meal = mongoose.model('Meal', MealSchema);
export default Meal;
