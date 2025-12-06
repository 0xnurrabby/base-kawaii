// Global error handler so backend never crashes on API failures
export const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err?.message || err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    error: {
      message: status === 500 ? 'Internal server error' : err.message,
      code: err.code || 'INTERNAL_ERROR'
    }
  });
};
