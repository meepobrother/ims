export interface NginxHost {
    ip: string;
    port: number;
}
export interface NginxProps {
    upstream: NginxHost[];
    path: string;
    name: string;
}
export function createNginxConfig(props: NginxProps[]) {
    return `
${props.map(prop => {
        return `upstream ${prop.name}_upstream {
    ip_hash;
    ${prop.upstream.map(up => {
            return `server ${up.ip}:${up.port};`
        }).join('\n')}
}`
    }).join('\n')}
server {
    listen       80;
    server_name  localhost;
    ${props.map(prop => {
        return `location /${prop.path} {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_pass http://${prop.name}_upstream
    }`
    }).join('\n\t')}
}
`
}