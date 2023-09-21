const mongoose = require('mongoose');
const { Schema } = mongoose;

// 9시간을 더한 현재 시간을 얻기 위한 함수
const getCurrentTimeWithOffset = () => {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 9); // 9시간 추가
  return currentTime.toISOString();
};

const Inventory = new Schema({
  CurrentStock: {
    type: Number,
  }, //현재 재고량
  MinimumStock: {
    type: Number,
  }, //최소 재고량
  StoredProducts: {
    type: Number,
  }, //완제품 수량
  createdAt: {
    type: String,
    default: getCurrentTimeWithOffset, // 9시간 추가된 현재 시간을 기본값으로 사용
    immutable: true,
  },
});

module.exports = Inventory;
