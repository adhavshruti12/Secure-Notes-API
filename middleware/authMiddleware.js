const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch {
    res.status(403).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;
