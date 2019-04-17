interface Style {
  'ims-install': string;
  imsInstall: string;
  content: string;
  container: string;
  login: string;
  'login-header': string;
  loginHeader: string;
  band: string;
  'main-form': string;
  mainForm: string;
  'login-form': string;
  loginForm: string;
  title: string;
}

declare namespace ClassNames {
  type DictionaryValue = boolean | undefined | null;
  interface Dictionary {
    [id: string]: DictionaryValue;
  }
  type Value = string | Dictionary | Values | null | undefined;
  interface Values extends Array<Value> {}
  type Fn = (...classes: Value[]) => string;
}

declare namespace ClassNamesBind {
  type Names = keyof Style;
  type DictionaryValue = boolean | undefined | null;
  type Dictionary = {
    [key in Names]?: DictionaryValue;
  };
  type Fn = (...classes: Dictionary[]) => string;
}

export declare const style: Style;
export declare const classNames: ClassNames.Fn;
export declare const classNamesBind: ClassNamesBind.Fn;
export declare const cn: typeof classNames;
export declare const cx: typeof classNamesBind;

export default cx;
