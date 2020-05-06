import { Options as KyOptions } from 'ky';

export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };

export interface JSONArray extends Array<JSONValue> {}

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type Callbacks = {
  setSubmitting?: (arg0: boolean) => void;
  setErrors?: (arg0: JSONValue) => void;
};

export type ExpectedResponseBodyType =
  | 'arrayBuffer'
  | 'blob'
  | 'formData'
  | 'json'
  | 'text';

export type RequestOptions = {
  kyOptions?: KyOptions;
  callbacks?: Callbacks;
  accept?: ExpectedResponseBodyType;
};

export interface FMCError extends Error {}
