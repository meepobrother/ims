import { Router } from 'ims-core';

import { ImsAdminerRouterManager } from './admin/manager'
import { ImsAdminerRouterUsercenter } from './admin/ucenter'
import { ImsAdminerRouterWebsite } from './admin/website'

@Router({
    path: '/adminer',
    redirect: 'ucenter',
    routes: [
        ImsAdminerRouterManager,
        ImsAdminerRouterUsercenter,
        ImsAdminerRouterWebsite
    ],
    store: {
        'router': 'store/router'
    }
})
export class ImsAdminerRouter { }
