import { HTTPTransport } from 'helpers';
import { UserDTO, APIError } from 'api/types';

type LoginRequestData = {
    login: string;
    password: string;
};

type RegisterRequestData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

const baseURL = 'https://ya-praktikum.tech/api/v2';

type ResponseData = {} | APIError;

export const authAPI = {
    login: (data: LoginRequestData) =>
        new HTTPTransport().post<ResponseData>(baseURL + '/auth/signin', {data}),

    me: () => new HTTPTransport().get<UserDTO | APIError>(baseURL + '/auth/user'),

    logout: () => new HTTPTransport().post(baseURL + '/auth/logout'),

    register: (data: RegisterRequestData) => 
        new HTTPTransport().post<ResponseData>(baseURL + '/auth/signup', {data}),
};
