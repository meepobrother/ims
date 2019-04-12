#!/usr/bin/env node
import 'ts-node/register';
import 'tsconfig-paths/register';
import "reflect-metadata";
import { bootstrap as templateBootstrap } from './template';
import { bootstrap } from '../bootstrap';
bootstrap(process.cwd(), true)
// templateBootstrap(true);
