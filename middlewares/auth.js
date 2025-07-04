import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.headers?.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token required' });

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
}
