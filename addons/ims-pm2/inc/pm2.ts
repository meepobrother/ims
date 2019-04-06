import { Controller, On, Get, Role } from 'ims-core';
import { list, ProcessDescription } from 'pm2';

@Controller({
    path: '/'
})
export class ImsPm2Inc {

    @Get()
    @Role({
        name: 'adminer'
    })
    list() {
        return new Promise((resolve, reject) => {
            list((err: Error, processDescriptionList: ProcessDescription[]) => {
                if (err) return reject(err);
                return resolve(processDescriptionList)
            });
        });
    }
}
