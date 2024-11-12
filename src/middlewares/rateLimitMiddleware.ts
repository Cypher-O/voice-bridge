import rateLimit from 'express-rate-limit';

// Create a rate limiter: maximum 100 requests per 15 minutes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
