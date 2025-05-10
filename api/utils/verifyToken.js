import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header (format: Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1]; // Extract token after "Bearer"

  // If there's no token, return an error
  if (!token) {
    return res.status(403).json({ message: 'No token provided. Access denied.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid or expired, return an error
      return res.status(401).json({ message: 'Invalid or expired token. Access denied.' });
    }

    // If the token is valid, store the decoded data in the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  });
};

export default verifyToken;
