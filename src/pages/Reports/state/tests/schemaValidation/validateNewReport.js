import { Validator } from 'jsonschema';

const schema = require('./newReport-jsonSchema.json');

const v = new Validator();

export default function validateNewReport(newReportObj) {
  return v.validate(newReportObj, schema);
}
