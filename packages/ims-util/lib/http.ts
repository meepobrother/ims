export class ImsHttp {
    constructor(public baseUrl: string = '') { }
    static async create(baseUrl: string = '') {
        return new ImsHttp(baseUrl)
    }

    get(url: string) {
        return (params: any = {}) => {
            return fetch(`${this.baseUrl}${url}?${params.join('&')}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
        }
    }

    post(url: string) {
        return (body: any) => {
            return fetch(`${this.baseUrl}${url}`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
        }
    }
}