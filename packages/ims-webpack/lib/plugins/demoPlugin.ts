import { PluginHandler, IApi, buildPlugin } from './type';
export interface DemoPluginOptions { }
const handler: PluginHandler<DemoPluginOptions> = (api: IApi, options: DemoPluginOptions) => {
    api.assertVersion(7);
    return {
        name: 'demo-plugin',
        visitor: {}
    }
}
export default buildPlugin(handler);
