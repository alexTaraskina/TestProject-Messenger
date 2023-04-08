import { HTTPTransport } from 'helpers';
import { UserDTO, APIError, ResponseData } from 'api/types';
import { baseURL } from './variables';

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

export const authAPI = {
    login: (data: LoginRequestData) => new HTTPTransport().post<ResponseData>(`${baseURL}/auth/signin`, { data }),me: () => new HTTPTransport().get<UserDTO | APIError>(`${baseURL}/auth/user`),

    logout: () => new HTTPTransport().post(`${baseURL}/auth/logout`),

    register: (data: RegisterRequestData) => new HTTPTransport().post<ResponseData>(`${baseURL}/auth/signup`, { data }),
};
