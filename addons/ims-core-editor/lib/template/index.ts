import { Template } from 'ims-core'

@Template({
    mobiles: [],
    admins: [{
        path: '/editor',
        redirect: 'markdown',
        store: {
            'editor': 'store/index'
        },
        routes: [
            {
                path: '/markdown',
                component: 'editor/markdown'
            }, {
                path: '/rich',
                component: 'editor/rich'
            },
        ]
    }, {
        path: '/drafts',
        component: 'drafts'
    }]
})
export class ImsCoreEditorTemplate { }