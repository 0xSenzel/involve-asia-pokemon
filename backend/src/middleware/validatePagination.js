export function validatePagination(req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (req.query.page && (isNaN(page) || page < 1)) {
    return res.status(400).json({
      error: 'Invalid pagination parameters',
      message: 'Page must be a positive integer'
    });
  }

  if (req.query.limit && (isNaN(limit) || limit < 1 || limit > 100)) {
    return res.status(400).json({
      error: 'Invalid pagination parameters',
      message: 'Limit must be between 1 and 100'
    });
  }

  next();
}
