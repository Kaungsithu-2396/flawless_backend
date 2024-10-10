const errorHandler = (err, req, resp, next) => {
    const statusCode = resp.statusCode || 500;
    resp.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
    next();
};
module.exports = errorHandler;
