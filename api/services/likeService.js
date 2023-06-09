const likeDao = require('../models/likeDao');

const createDeleteLike = async (userId, bookId) => {
  let createOrDelete;
  try {
    const isLiked = await likeDao.checkLike(userId, bookId);

    if (isLiked) {
      createOrDelete = 'Deleted Like';
      await likeDao.deleteLike(userId, bookId);

      return createOrDelete;
    }

    createOrDelete = 'Created Like';
    await likeDao.createLike(userId, bookId);
  } catch (error) {
    error = new Error(error.message);
    error.statusCode = 400;
    throw error;
  }

  return createOrDelete;
};

const getLikes = async (userId) => {
  const likeList = await likeDao.getLikes(userId);
  return likeList;
};

const deleteLikes = async (userId, likeId) => {
  return likeDao.deleteLikes(userId, likeId);
};

module.exports = {
  createDeleteLike,
  getLikes,
  deleteLikes,
};
