import createError from 'http-errors';

const checkRole = roles => (req, res, next) => {
  if (!roles.includes(req.decoded.role)) {
    next(createError(401, 'Unuthorized'));
    return;
  }
  next();
};

export default {
  checkRole
};
