import React, { Component } from "react";
import ImsMediumEditor, { CoreOptions } from './lib';
import "medium-editor/dist/css/medium-editor.css";
import './index.less';
export interface MediumEditorProps {
    text?: string;
    options?: CoreOptions;
    onChange?: (text: string, medium: ImsMediumEditor) => any;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
    contentEditable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    focus?: boolean;
}
export interface MediumEditorState {
    text?: string;
}
export default class RcMediumEditor extends Component<MediumEditorProps, MediumEditorState> {
    static defaultProps: {
        text: string;
        options: {
            imageDragging: boolean;
            toolbar: {
                allowMultiParagraphSelection: boolean;
                firstButtonClass: string;
                lastButtonClass: string;
                relativeContainer: HTMLElement;
                standardizeSelectionStart: boolean;
                static: boolean;
                updateOnEmptySelection: boolean;
                buttons: ({
                    name: string;
                    aria: string;
                    contentDefault: string;
                    attrs: {
                        "data-tooltip": string;
                        "data-tooltip-delay": string;
                        "data-shotcut": string;
                    };
                } | {
                    name: string;
                    aria: string;
                    contentDefault: string;
                    attrs: {
                        "data-tooltip": string;
                        "data-tooltip-delay": string;
                        "data-shotcut"?: undefined;
                    };
                })[];
            };
            placeholder: {
                text: string;
            };
        };
        className: string;
    };
    medium: ImsMediumEditor;
    dom: HTMLElement;
    private _updated;
    constructor(props: MediumEditorProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Readonly<MediumEditorProps>, nextContext: any): void;
    change(text: string): void;
    render(): JSX.Element;
}
