import orderService from "../services/orderService.js";

const createOrder = async (req, res) => {
  const user = req.user;
  const input = req.body;

  try {
    const data = await orderService.createOrder({ ...input, userId: user.id });

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getAllOrdersOfAuthUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = await orderService.getOrdersByUserId(userId);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export { createOrder, getAllOrdersOfAuthUser };

// Orders - UserId
