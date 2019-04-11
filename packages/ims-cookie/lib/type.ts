export type Cookie = any;
import { CookieSetOptions } from 'cookie'
export interface CookieGetOptions {
  doNotParse?: boolean;
}
export interface CookieChangeOptions {
  name: string;
  value?: any;
  options?: CookieSetOptions;
}
export type CookieChangeListener = (options: CookieChangeOptions) => void;
