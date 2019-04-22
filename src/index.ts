import { exec } from 'shelljs'
import { join } from 'path';

exec('umi dev', {
    cwd: join(process.cwd(), 'template')
}, (code, out, err) => {
    console.log(out)
})