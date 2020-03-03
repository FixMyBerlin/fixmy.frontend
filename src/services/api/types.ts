import { Options as KyOptions } from 'ky';

export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

type Callbacks = {
  setSubmitting?: (boolean) => void;
  setErrors?: (Error) => void;
}
export type RequestConfig = KyOptions & Callbacks
