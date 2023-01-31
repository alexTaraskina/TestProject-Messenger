import { HTTPTransport } from 'helpers';
import { APIError } from 'api/types';

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

type ChangeAvatarRequestData = {
    file: Blob,
}

const baseURL = 'https://ya-praktikum.tech/api/v2';

type ResponseData = {} | APIError;

export const profileAPI = {
    edit: (data: EditProfileRequestData) => 
        new HTTPTransport().put<ResponseData>(baseURL + '/user/profile', {data}),

    password: (data: UpdatePasswordRequestData) => 
        new HTTPTransport().put<ResponseData>(baseURL + '/user/password', {data}),

    changeAvatar: (data: ChangeAvatarRequestData) =>
        new HTTPTransport().put<ResponseData>(baseURL + '/user/profile/avatar', {data}),
}
