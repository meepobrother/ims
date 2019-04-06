import { PlatformRef } from 'ims-common';
import cli from 'ims-platform-cli';
import { ImsWebpacks } from './webpacks';
import { join } from 'path';
const webpackAdmin = PlatformRef.create([
    context => new ImsWebpacks(context).run()
]);

const express = PlatformRef.create([], [cli, webpackAdmin]);

export default function () {
    const root = process.cwd();
    const app: any = require(join(root, 'config/app.json'));
    const appType = require(app.entry).default;
    return express.bootstrap(appType);
}
