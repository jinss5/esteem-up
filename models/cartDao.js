const { dataSource } = require('./dataSource');

const createCart = async (userId, bookId, amount, isSubscribe) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO carts (
            user_id,
            book_id,
            amount,
            is_subscribe
        ) VALUES (
          ?, ?, ?, ?
        )
      `,
      [userId, bookId, amount, isSubscribe]
    );
    const [cart] = await dataSource.query(
      `SELECT DISTINCT
        b.id bookId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.id = ?
        `,
      [result.insertedId]
    );

    return cart;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const checkCart = async (userId, bookId) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM carts 
          WHERE user_id = ? AND book_id = ?
      ) isLiked
      `,
      [userId, bookId]
    );
    return !!parseInt(result.isLiked);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createCart,
  checkCart,
};