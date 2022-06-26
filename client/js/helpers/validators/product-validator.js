import Validator from '../validator.js';

const productValidator = ({ 
  productName,
  price,
  qty
}) => {
  const errors = {};

  const productNameValidator = new Validator(productName)
    .min('test')
    .required('Privalomas laukas');
  if (productNameValidator.hasErrors) errors.productName = productNameValidator.HTMLError

  const priceValidator = new Validator(price)
    .required('Privalomas laukas')
  if (priceValidator.hasErrors) errors.price = priceValidator.HTMLError;

  const qtyValidator = new Validator(qty)
    .required('Privalomas laukas')
  if (qtyValidator.hasErrors) errors.qty = qtyValidator.HTMLError;

  return errors;
}

export default productValidator;

