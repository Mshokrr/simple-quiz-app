import validate from 'express-validation';

/**
 * Decorates method express validate so unkown body parameters are removed
 * @returns  {Function} validate
 * @author @Radi
 */
validate.options({
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

export default validate;
