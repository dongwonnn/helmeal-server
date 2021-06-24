import mongoose from 'mongoose';

const { Schema } = mongoose;

// 스키마 정의
const OrderInfoSchema = new Schema({
  proteinInfo: String,
  dateInfo: String,
  subscribeTerm: String,
  mainAddress: String,
  deliveryPeriod: String,
  totalPay: String,
  user: {
    _id: mongoose.Types.ObjectId,
    userId: String,
  },
});

// 모델 인스턴스 생성 (스키마 이름, 스키마 객체)
const OrderInfo = mongoose.model('OrderInfo', OrderInfoSchema);
export default OrderInfo;
