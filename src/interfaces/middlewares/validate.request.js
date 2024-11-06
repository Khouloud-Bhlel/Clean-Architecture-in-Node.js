const ResponseHandler = require('../../utils/response.handler');

function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));
      return ResponseHandler.error(res, 'Validation Error', 400, errors);
    }
    
    next();
  };
}

module.exports = validateRequest; 