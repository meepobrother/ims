#!/usr/bin/env node
import 'ts-node/register';
import 'tsconfig-paths/register';
import { bootstrap } from '../bootstrap';
bootstrap(process.cwd(), true)