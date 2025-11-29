export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    statusCode,
    message,
    ...(isDevelopment && { stack: err.stack })
  };

  console.error('[ERROR]', JSON.stringify(errorLog));

  res.status(statusCode).json({
    error: 'Request failed',
    message,
    ...(isDevelopment && { stack: err.stack })
  });
}
