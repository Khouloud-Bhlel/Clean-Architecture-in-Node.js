const Joi = require('joi');
const ResponseHandler = require('../../../utils/response.handler');

const schemas = {
  createUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').default('user')
  }),

  updateUser: Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    role: Joi.string().valid('user', 'admin')
  }).min(1)
};

function validateUser(schemaName) {
  return (req, res, next) => {
    const { error } = schemas[schemaName].validate(req.body, { abortEarly: false });
    
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

module.exports = { validateUser }; 