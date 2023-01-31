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

type EditProfileRequestData = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
};

type UpdatePasswordRequestData = {
    oldPassword: string,
    newPassword: string,
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

export const profileAPI = {
    edit: (data: EditProfileRequestData) => 
        new HTTPTransport().put<ResponseData>(baseURL + '/user/profile', {data}),

    password: (data: UpdatePasswordRequestData) => 
        new HTTPTransport().put<ResponseData>(baseURL + '/user/password', {data}),
}
