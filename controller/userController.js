const { catchAsync } = require('../middleware/error.js');
const { isExistedUser } = require('../model/userDao.js');
const userService = require('../service/userService.js');

const signUp = catchAsync(async (req, res) => {
  const {
    email,
    password,
    name,
    phoneNumber,
    address,
    gender,
    birthDate,
    points = 100000.0,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !phoneNumber ||
    !address ||
    !gender ||
    !birthDate
  ) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(
    email,
    password,
    name,
    phoneNumber,
    address,
    gender,
    birthDate,
    points
  );
  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
});

module.exports = {
  signUp,
};
