
const notFound = (req, res, next) => {
  res.status(404);
  res.json({
    message: `Not Found - ${req.originalUrl}`,
  });
};


const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode:500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    details: err.details || null,
  });
};

 module.exports = { notFound, errorHandler };
