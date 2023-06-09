const reviewDao = require('../models/reviewDao');

const createReview = async (userId, bookId, content, score) => {
  return reviewDao.createReview(userId, bookId, content, score);
};

const getReviewsByBookId = async (bookId, limit, offset) => {
  const reviews = await reviewDao.getReviewsByBookId(bookId, limit, offset);
  const reviewsCount = await reviewDao.getReviewsCountByBookId(bookId);

  return { reviewsCount, reviews };
};

const isExistedReview = (bookId) => {
  return reviewDao.isExistedReview(bookId);
};

const modifyReview = async (userId, reviewId, content, score) => {
  return reviewDao.modifyReview(userId, reviewId, content, score);
};

const deleteReview = async (userId, reviewId) => {
  return reviewDao.deleteReview(userId, reviewId);
};

module.exports = {
  createReview,
  getReviewsByBookId,
  isExistedReview,
  modifyReview,
  deleteReview,
};
