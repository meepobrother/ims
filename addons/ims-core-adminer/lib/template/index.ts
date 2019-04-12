import { Template } from 'ims-core'

@Template({
    admins: [{
        path: '/login',
        component: 'login',
        store: {
            login: 'store/login',
            cookie: 'store/cookie'
        }
    }]
})
export class ImsAdminerTemplate { }
