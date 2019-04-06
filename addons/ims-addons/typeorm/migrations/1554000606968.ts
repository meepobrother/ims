import { Migration, IQueryRunner } from 'ims-core';
@Migration()
export class ImsAddons1554000606968 implements Migration {
    public async up(queryRunner: IQueryRunner): Promise<any> {
        console.log('ImsAddons1554000606968 Up')
    }
    public async down(queryRunner: IQueryRunner): Promise<any> {
        console.log('ImsAddons1554000606968 Down')
    }
}
