export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };

export interface JSONArray extends Array<JSONValue> {
}

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type Callbacks = {
  setSubmitting?: (boolean) => void;
  setErrors?: (Error) => void;
}

export type BodyType = 'arrayBuffer' |
  'blob' |
  'formData' |
  'json' |
  'text'
