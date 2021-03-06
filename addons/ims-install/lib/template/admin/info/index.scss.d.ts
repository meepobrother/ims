interface Style {
  'ims-info': string;
  imsInfo: string;
  'footer-bar': string;
  footerBar: string;
  title: string;
  detail: string;
  date: string;
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
