const bookService = require('../services/bookService');
const { catchAsync } = require('../middlewares/error');

const createBookList = catchAsync(async (req, res) => {
  const {
    title,
    subtitle,
    author,
    issueDate,
    description,
    thumbnail,
    price,
    quantity,
    subCategoryId,
    isSubscribe,
  } = req.body;

  await bookService.createBookList(
    title,
    subtitle,
    author,
    issueDate,
    description,
    thumbnail,
    price,
    quantity,
    subCategoryId,
    isSubscribe
  );
  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

const getBookList = catchAsync(async (req, res) => {
  const {
    categoryId,
    subCategoryId,
    orderBy,
    limit = 9,
    offset = 0,
  } = req.query;
  const result = await bookService.getBookList(
    categoryId,
    subCategoryId,
    orderBy,
    limit,
    offset
  );

  const resultCount = await bookService.getBookCount(categoryId, subCategoryId);
  return res
    .status(200)
    .json({ message: 'GET SUCCESS', data: result, booksCount: resultCount });
});

const getBookById = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const userId = req.userId;

  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const book = await bookService.getBookById(bookId, userId);

  return res.status(200).json(book);
});

module.exports = {
  createBookList,
  getBookList,
  getBookById,
};
