import model from './model';

/**
 * form Helpers Module
 * @module formHelper
 */

const validSchema = (schema, obj) => {
  const errors = [];
  const questionsAnswered = [];
  for (let i = 0; i < schema.length; i += 1) {
    const val = obj[schema[i].name];
    if (val === undefined && schema[i].required) {
      errors.push({
        field: schema[i].name,
        error: `${schema[i].name} is required.`
      });
    }
    if (!(val === undefined || val === null)) {
      /* eslint-disable no-underscore-dangle */
      questionsAnswered.push(schema[i]._id);
      switch (schema[i].type) {
        case 'Boolean':
          if (typeof val !== 'boolean') {
            errors.push({
              field: schema[i].name,
              error: `${schema[i].name} is of wrong format, boolean required.`
            });
          }
          break;
        case 'Enum':
          if (typeof val !== 'string') {
            errors.push({
              field: schema[i].name,
              error: `${schema[i].name} is of wrong format, string required.`
            });
          } else if (!schema[i].enumList.includes(val)) {
            errors.push({
              field: schema[i].name,
              error: `${
                schema[i].name
              } has an invalid value, please select one of the available choices.`
            });
          }
          break;
        case 'String':
          if (typeof val !== 'string') {
            errors.push({
              field: schema[i].name,
              error: `${schema[i].name} is of wrong format, string required.`
            });
          }
          break;
        case 'Integer':
          if (typeof val !== 'number') {
            errors.push({
              field: schema[i].name,
              error: `${schema[i].name} is of wrong format, number required.`
            });
          }
          break;
        default:
          break;
      }
    }
  }
  return {
    valid: !errors.length,
    saved: !errors.length,
    errors,
    questionsAnswered
  };
};

const validateAnswerSchema = obj =>
  model
    .getQuestions()
    .then(questions => {
      const result = validSchema(questions, obj);
      return Promise.resolve({
        questionsProvided: questions,
        formData: obj,
        ...result
      });
    })
    .catch(err => Promise.reject(err));

export default { validateAnswerSchema };
