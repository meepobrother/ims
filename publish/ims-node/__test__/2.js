"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_node_1 = require("ims-node");
const path_1 = require("path");
const root = process.cwd();
ims_node_1.createAddon(path_1.join(root, 'packages/ims-addon-install/lib'));
