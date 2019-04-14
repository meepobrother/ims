export default class ImsCoreEditor {
    title: string;
    content: string;
    setTitle(title: string): void;
    setContent(content: string): void;
    publish(): import("axios").AxiosPromise<any>;
}
