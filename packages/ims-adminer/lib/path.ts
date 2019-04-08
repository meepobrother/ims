import { compile, PathFunction } from 'path-to-regexp'
interface IAdminer { m: string, c: string, a: string }
export const makePath: PathFunction<IAdminer> = compile<IAdminer>('/m/:c/:a');