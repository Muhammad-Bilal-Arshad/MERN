import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;
const ShoppingSchema = new schema({
    itemNumber: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
      },
      status: {
          type: String,
          required: true
      }



})
const shop = mongoose.model('store',ShoppingSchema);
export {shop};