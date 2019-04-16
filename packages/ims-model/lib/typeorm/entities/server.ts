import { Entity, Column, PrimaryColumn } from 'ims-core';
export interface NginxHost {
    ip: string;
    port: number;
}
@Entity()
export class ImsServer {
    @PrimaryColumn()
    name: string = '';

    @PrimaryColumn()
    path: string = '';

    @Column({
        type: 'text',
        transformer: {
            from: (val: string) => {
                return JSON.parse(val)
            },
            to: (val: NginxHost[]) => {
                return JSON.stringify(val)
            }
        }
    })
    upstream: NginxHost[] = [];
}