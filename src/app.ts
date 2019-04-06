import { App } from 'ims-common';
import ImsWebsite from 'ims-website'
import ImsInstall from '../addons/ims-install'

@App({
    name: 'ims',
    version: '1.0.0',
    addons: [ImsWebsite, ImsInstall],
    dev: true
})
export default class ImsApp { }
