export type WithAccessToken = Readonly<{
    access_token: string;
}>;
export type UserPayload = Readonly<{
    sub: number;
    username: string;
}>;

