const replaceDecimal = (value: string) => value.replace(',', '.');

/**
 * Parse an input floating point or integer formatted as German locale meters
 * and return the value in centimeters as an integer
 *
 * @param value input value from text field
 */
const parseLength = (value: string) => {
  const valueAsFloat = parseFloat(replaceDecimal(value));
  return Math.round(valueAsFloat * 100.0);
};

export default parseLength;
