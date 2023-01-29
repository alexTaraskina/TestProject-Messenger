import { HTTPTransport } from 'helpers';
import { UserDTO, APIError } from 'api/types';

type LoginRequestData = {
    login: string;
    password: string;
};

type LoginResponseData = {} | APIError;

export const authAPI = {
    login: (data: LoginRequestData) =>
        new HTTPTransport().post<LoginResponseData>('auth/signin', {data}),

    me: () => new HTTPTransport().get<UserDTO | APIError>('auth/user'),

    logout: () => new HTTPTransport().post('auth/logout'),
};
