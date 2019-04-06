import { ClassAst, ClassContext } from 'ims-decorator';
export interface EventSubscriber {
}
export declare const EventSubscriberMetadataKey = "EventSubscriberMetadataKey";
export declare const EventSubscriber: (metadataDef?: EventSubscriber & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isEventSubscriberClassAst(val: ClassAst): val is ClassAst<EventSubscriber>;
export declare class EventSubscriberAst extends ClassContext<EventSubscriber> {
}
