// middleware/verifyAdmin.js
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, 'Not authenticated'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Token is invalid'));
    if (user.role !== 'admin') return next(errorHandler(403, 'Access denied'));
    req.user = user;
    next();
  });
};
