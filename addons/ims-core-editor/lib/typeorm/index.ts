import { Typeorm } from 'ims-core'
import { ImsArticle } from './entities/article'
@Typeorm({
    entities: [
        ImsArticle
    ],
    subscribers: [],
    migrations: []
})
export class ImsCoreEditorTypeorm { }

export * from './entities/article'