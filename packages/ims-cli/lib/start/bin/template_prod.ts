#!/usr/bin/env node
import 'ts-node/register';
import 'tsconfig-paths/register';
import "reflect-metadata";
import { bootstrap } from './template';
bootstrap(false);
