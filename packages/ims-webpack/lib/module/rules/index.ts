import babel, { IBabelModule } from './babel'
import tsx from './tsx';
import jsx from './jsx';
import css from './css'
import image from './image'
import less from './less'
import svg from './svg'
import sass from './sass'

export class ImsWebpackModule {
    babelConfig: any;
    constructor(public module: IBabelModule) {
        this.babelConfig = babel(module)
    }

    get() {
        return {
            noParse: [/moment.js/],
            rules: [
                tsx(this.babelConfig),
                jsx(this.babelConfig),
                css,
                image,
                less,
                svg,
                sass
            ]
        }
    }
}
