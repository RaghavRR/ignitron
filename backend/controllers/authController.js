const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route  POST /api/auth/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id),
  });
};

// @route  GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.admin);
};

// @route  PUT /api/auth/change-password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id);
  if (!(await admin.matchPassword(currentPassword))) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }
  admin.password = newPassword;
  await admin.save();
  res.json({ message: 'Password updated successfully' });
};

module.exports = { loginAdmin, getMe, changePassword };
