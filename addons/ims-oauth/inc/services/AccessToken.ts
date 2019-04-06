export class AccessToken {
    constructor(
        public data: {
            access_token: string;
            refresh_token: string;
            expires_in: number;
            scope: string;
            openid: string;
            create_at?: number;
        }
    ) {
        this.data.create_at = new Date().getTime();
    }
    isValid() {
        return !!this.data.access_token && (new Date().getTime()) < (this.data.create_at + this.data.expires_in * 1000);
    }
}
