// 200
export const successCode = (res, message, data) => {
  res.status(200).json({
    statusCode: 200,
    message,
    data,
  });
};

// 400
export const failCode = (res, message = "400 bad request", data = "") => {
  res.status(400).json({
    statusCode: 400,
    message,
    data,
  });
};

// 500
export const errorCode = (res, message = "Internal server error", data) => {
  res.status(500).json({
    statusCode: 500,
    message,
  });
};
