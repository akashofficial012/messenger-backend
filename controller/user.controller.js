import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import sendToken from '../routes/features.js';

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

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    sendToken(res, user, 200, 'Login successful');
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { newUser, login };
