export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export interface RequestConfig {
  method: 'get' | 'post' | 'patch' | 'delete';
  route: string;
  json?: JSONValue;
  token?: string;
  respType?: string;
}

export interface ExtendedRequestConfig extends RequestConfig {
  setSubmitting?: (boolean) => void;
  setErrors?: (Error) => void;
}
