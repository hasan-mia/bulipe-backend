const bcrypt = require('bcryptjs')
const User = require('../models/user.js')
const sendToken = require('../utils/generateJwtToken.js')
const ErrorHandler = require('../utils/errorhandler.js')
const catchAsyncError = require('../middleware/catchAsyncError.js');

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!password) {
      return next(new ErrorHandler('Please provide a name and password', 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ErrorHandler(`${email} is already registered`, 401));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword, role });

    const responsePayload = {
      id: newUser._id,
      role: newUser.role,
    };

    sendToken(responsePayload, 200, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return next(new ErrorHandler('Please Enter Email & Password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new ErrorHandler('Invalid Email & Password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Email & Password !', 401))
    }

    const responsePayload = {
      id: user._id,
      role: user.role,
    };

    sendToken(responsePayload, 200, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

exports.userInfo = catchAsyncError(async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(401).json({ message: 'User not found' });
  }
})