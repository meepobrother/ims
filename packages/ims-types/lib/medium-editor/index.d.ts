export interface CoreOptions {
    activeButtonClass?: string;
    allowMultiParagraphSelection?: boolean;
    buttonLabels?: string | boolean;
    contentWindow?: Window;
    delay?: number;
    disableReturn?: boolean;
    disableDoubleReturn?: boolean;
    disableExtraSpaces?: boolean;
    disableEditing?: boolean;
    elementsContainer?: HTMLElement;
    extensions?: any;
    ownerDocument?: Document;
    spellcheck?: boolean;
    targetBlank?: boolean;
    toolbar?: ToolbarOptions | boolean;
    anchorPreview?: AnchorPreviewOptions | boolean;
    placeholder?: PlaceholderOptions | boolean;
    anchor?: AnchorFormOptions;
    paste?: PasteOptions;
    keyboardCommands?: KeyboardCommandsOptions | boolean;
    autoLink?: boolean;
    imageDragging?: boolean;
}
export interface ToolbarOptions {
    align?: string;
    allowMultiParagraphSelection?: boolean;
    buttons?: Button[];
    diffLeft?: number;
    diffTop?: number;
    firstButtonClass?: string;
    lastButtonClass?: string;
    standardizeSelectionStart?: boolean;
    static?: boolean;
    sticky?: boolean;
    stickyTopOffset?: number;
    updateOnEmptySelection?: boolean;
    relativeContainer?: Node;
}
export interface AnchorPreviewOptions {
    hideDelay?: number;
    previewValueSelector?: string;
    showWhenToolbarIsVisible?: boolean;
    showOnEmptyLinks?: boolean;
}
export interface PlaceholderOptions {
    text?: string;
    hideOnClick?: boolean;
}
export interface AnchorFormOptions {
    customClassOption?: string;
    customClassOptionText?: string;
    linkValidation?: boolean;
    placeholderText?: string;
    targetCheckbox?: boolean;
    targetCheckboxText?: string;
}
export interface PasteOptions {
    forcePlainText?: boolean;
    cleanPastedHTML?: boolean;
    preCleanReplacements?: any[];
    cleanReplacements?: any[];
    cleanAttrs?: string[];
    cleanTags?: string[];
    unwrapTags?: string[];
}
export interface KeyboardCommandsOptions {
    commands?: KeyboardCommandOptions[];
}
export interface KeyboardCommandOptions {
    command: string;
    key: string;
    meta: boolean;
    shift: boolean;
    alt: boolean;
}
export interface CreateLinkOptions {
    value: string;
    target?: string;
    buttonClass?: string;
}
export interface PasteHTMLOptions {
    cleanAttrs?: string[];
    cleanTags?: string[];
    unwrapTags?: string[];
}
export interface ButtonOptions {
    name?: string;
    action?: string;
    aria?: string;
    tagNames?: string[];
    style?: { prop: string, value: string };
    useQueryState?: boolean;
    contentDefault?: string;
    contentFA?: string;
    classList?: string[];
    attrs?: { [key: string]: string };
}
export type Button = string | ButtonOptions;
export type elementType = string | HTMLElement | HTMLElement[] | NodeList | NodeListOf<Element> | HTMLCollection;
export interface selectionObject {
    start: number;
    end: number;
}

export class MediumEditor {
    version: {
        major: number;
        minor: number;
        revision: number;
        preRelease: string;
        toString(): string;
    }
    defaults: any;
    constructor(elements: elementType, options?: CoreOptions);
    init(elements: elementType, options?: CoreOptions): void;
    setup(): void;
    destroy(): void;
    on(targets: HTMLElement | NodeList, event: string, listener: EventListenerOrEventListenerObject, useCapture: boolean): MediumEditor;
    of(targets: HTMLElement | NodeList, event: string, listener: EventListenerOrEventListenerObject, useCapture: boolean): MediumEditor;
    subscribe(name: string, listener: (data: any, editable: HTMLElement) => void): MediumEditor;
    unsubscribe(name: string, listener: (data: any, editable: HTMLElement) => void): MediumEditor;
    trigger(name: string, data: any, editable: HTMLElement): MediumEditor;
    delay(fn: () => any): any;
    serialize(): { [key: string]: { value: string } };
    getExtensionByName(name: string): any;
    addBuiltInExtension(name:
        'anchor' | 'anchor-preview' |
        'autoLink' | 'fileDragging' | 'fontname' | 'fontsize' |
        'keyboardCommands' | 'paste' | 'placeholder' | string,
        opts: any
    ): any;
    stopSelectionUpdates(): void;
    startSelectionUpdates(): void;
    checkSelection(): MediumEditor;
    queryCommandState(action: string): boolean;
    execAction(action: string, opts?: string | CreateLinkOptions): boolean;
    getSelectedParentElement(range: Range): HTMLElement;
    selectAllContents(): void;
    selectElement(element: HTMLElement): void;
    getFocusedElement(): HTMLElement;
    exportSelection(): selectionObject;
    saveSelection(): void;
    importSelection(selectionState: selectionObject, favorLaterSelectionAnchor: boolean): void;
    restoreSelection(): void;
    createLink(opt: CreateLinkOptions): void;
    cleanPaste(text: string): void;
    pasteHTML(html: string, opt: any): void;
    setContent(html: string, index: number): void;
    getContent(index): string;
    checkContentChanged(editable: HTMLElement): any;
    resetContent(element: HTMLElement): void;
    addElements(selector: elementType): void;
    removeElements(selector: elementType): void;
}
export interface Version {
    major: number;
    minor: number;
    preRelease: string;
    revision: number;
    toString(): string;
}
export interface MediumEditorUtil { }
export interface Selection { }
export interface ProtoProps {
    [key: string]: any;
    name?: string;
    action?: string;
    aria?: string;
    tagNames?: string[];
    contentDefault?: string;
    contentFA?: string;
    style?: any;
    attrs?: any;
    init?: () => any;
    checkState?: (node: HTMLElement) => any;
    destroy?: () => any;
    queryCommandState?: () => any;
    getInteractionElements?: () => any;
    isActive?: () => boolean;
    isAlreadyApplied?: (node: HTMLElement) => boolean;
    setActive?: () => void;
    setInactive?: () => void;
    getEditorElements?: () => {}
}
interface IExtensionFactory {
    extend(protoProps: ProtoProps): Extension
}
export class Extension {
    base: any;
    name: any;
    checkState: any;
    destroy: any;
    queryCommandState: any;
    isActive: any;
    isAlreadyApplied: any;
    setActive: any;
    setInactive: any;
    getInteractionElements: any;
    window: any;
    document: any;
    constructor(options);
    static extend(protoProps: ProtoProps): any;
    init(): any;
    getEditorElements(): any;
    getEditorId(): any;
    getEditorOption(option): any;
    execAction(action: string, opts?: string | CreateLinkOptions): any;
    on(targets: HTMLElement | NodeList, event: string, listener: EventListenerOrEventListenerObject, useCapture: boolean): MediumEditor;
    of(targets: HTMLElement | NodeList, event: string, listener: EventListenerOrEventListenerObject, useCapture: boolean): MediumEditor;
    subscribe(name: string, listener: (data: any, editable: HTMLElement) => void): MediumEditor;
    trigger(name: string, data: any, editable: HTMLElement): MediumEditor;
}
export class Events {
    constructor(instance: any);
    attachDOMEvent(targets, event, listener, useCapture): any;
    detachDOMEvent(targets, event, listener, useCapture): any;
    indexOfListener(targets, event, listener, useCapture): any;
    detachAllDOMEvents(): any;
    detachAllEventsFromElement(element): any
    attachAllEventsToElement(element): any;
    enableCustomEvent(event): any;
    disableCustomEvent(event): void;
    attachCustomEvent(event, listener): any;
    detachCustomEvent(event, listener): any;
    indexOfCustomListener(event, listener): any;
    detachAllCustomEvents(): any;
    triggerCustomEvent(name, data, editable): any;
    destroy(): any;
    attachToExecCommand(): any;
    detachExecCommand(): any;
    wrapExecCommand(): any;
    unwrapExecCommand(): any;
    setupListener(name): any;
    attachToEachElement(name, handler): any;
    cleanupElement(element): any;
    focusElement(element): any;
    updateFocus(target, eventObj): any;
    updateInput(target, eventObj): any;
    handleDocumentSelectionChange(event): any;
    handleDocumentExecCommand(): any;
    handleBodyClick(event);
    handleBodyFocus(event);
    handleBodyMousedown(event);
    handleInput(event);
    handleClick(event);
    handleBlur(event);
    handleKeypress(event);
    handleKeyup(event);
    handleMouseover(event);
    handleDragging(event);
    handleDrop(event);
    handlePaste(event);
    handleKeydown(event);
}
export const extensions: {
    button: IExtensionFactory;
    [key: string]: IExtensionFactory;
};
export function getEditorFromElement(element: HTMLElement): MediumEditor;
export function parseVersionString(release: string): Version;
export const selection: Selection;
export const util: MediumEditorUtil;
export const version: Version;
export default MediumEditor;
