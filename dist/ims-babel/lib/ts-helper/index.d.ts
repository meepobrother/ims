import * as ts from 'typescript';
export declare function template(code: string): (props: object, fileName?: string, languageVersion?: ts.ScriptTarget, setParentNodes?: boolean, scriptKind?: ts.ScriptKind) => void;
