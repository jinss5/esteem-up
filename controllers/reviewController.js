const reviewService = require('../services/reviewService.js');
const { catchAsync } = require('../middlewares/error.js');

const getReviewsByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const { limit = 5, offset = 0 } = req.query;

  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const reviews = await reviewService.getReviewsByBookId(
    bookId,
    parseInt(limit),
    parseInt(offset)
  );

  return res.status(200).json(reviews);
});

module.exports = {
  getReviewsByBookId,
};