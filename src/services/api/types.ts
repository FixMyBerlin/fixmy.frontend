import { Options as KyOptions } from 'ky';

export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };

export interface JSONArray extends Array<JSONValue> {
}

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type Callbacks = {
  setSubmitting?: (boolean) => void;
  setErrors?: (JsonValue) => void;
}

export type ResponseBodyType = 'arrayBuffer' |
  'blob' |
  'formData' |
  'json' |
  'text'

export type RequestOptions = {
  kyOptions?: KyOptions;
  callbacks?: Callbacks;
  responseBodyType?: ResponseBodyType;
};
