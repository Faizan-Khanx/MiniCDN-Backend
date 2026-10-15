import rateLimit from "express-rate-limit";

export const ratelimit = rateLimit({
  windowMs: 1 * 1000 * 60,
  max: 5,
  message: {
    success: false,
    message: "Too Many Request Please Try Again Later",
  },
  handler: (req, res, next, options) => {
    console.log(
      `Rate Limit Exceeded by IP: ${req.ip} on router: ${req.originalUrl}`,
    );
    return res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
