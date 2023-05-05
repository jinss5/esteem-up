const paymentService = require('../services/paymentService');
const { catchAsync } = require('../middlewares/error');

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { address, quantity, bookId } = req.body;

  await orderService.createOrder(address, userId);
  await orderService.createOrderItems(quantity, bookId);

  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

module.exports = {
  createOrder,
};
