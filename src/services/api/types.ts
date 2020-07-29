import { Options as KyOptions } from 'ky';

export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };

export interface JSONArray extends Array<JSONValue> {}

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type ExpectedResponseBodyType =
  | 'arrayBuffer'
  | 'blob'
  | 'formData'
  | 'json'
  | 'text';

export type RequestOptions = KyOptions & {
  onSubmit?: Function;
  onFinish?: Function;
  onSlowResponse?: (timeout: number) => any;
  accept?: ExpectedResponseBodyType;
  slowResponseTimeout?: number;
};

export interface FMCError extends Error {
  response?: Response;
}
