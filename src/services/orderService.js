import mongoose from "mongoose";
import Order from "../models/Order.js";

const createOrder = async (data) => {
  return await Order.create(data);
};

const getOrdersByUserId = async (userId) => {
  const result = await Order.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },

    {
      // Left outer join
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },

    { $unwind: "$productDetails" },
  ]);

  return result;
};

export default { createOrder, getOrdersByUserId };

/**
 * SELECT  products.* AS productDetails FROM orders
 * LEFT JOIN products ON products._id = orders.productId
 */
