import { validationResult } from "express-validator";
import { logger } from "../utils/winstonLogger.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  logger.error("유효성 검증에서 400 에러 발생");
  return res.status(400).json({
    success: false,
    error: {
      code: 400,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

const notFoundValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  logger.error("유효성 검증에서 404 에러 발생");
  return res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

export { validate, notFoundValidate };
