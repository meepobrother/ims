import { Router } from 'ims-core'
@Router({
    path: '/index',
    component: 'editor/index/index',
    exact: false
})
class ImsWebsiteAdmin { }

@Router({
    path: '/editor',
    component: 'editor/layout',
    redirect: 'index',
    routes: [
        ImsWebsiteAdmin
    ],
    exact: false
})
export class ImsWebsiteRouterAdmin { }