import { makeDecorator, ClassContext } from 'ims-decorator';
export const WatchMetadataKey = 'WatchMetadataKey';
export interface WatchOptions {
    path: string[];
}
export const Watch = makeDecorator<WatchOptions>(WatchMetadataKey);
export class WatchAst extends ClassContext<WatchOptions> { }
