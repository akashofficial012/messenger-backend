import { User } from '../models/userModel.js';
import bcrypt, { compare } from 'bcrypt';
import sendToken from '../routes/features.js';
import { errorMiddleware, TryCatch } from '../middlewares/error.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

const newUser = async (req, res) => {
  const { name, username, email, password, bio } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio,
    });

    sendToken(res, user, 201, 'User created successfully');


    res.status(201).json({ success: true, user});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ success: false, message: "Invalid credentials" });

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});



const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  res.json({
    success: true,
    user,
  });
});


export { newUser, login , getMyProfile };
