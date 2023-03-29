import { HTTPTransport } from 'helpers';
import { UserDTO, APIError, ResponseData } from 'api/types';
import { baseURL } from './variables';

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

export const profileAPI = {
    edit: (data: EditProfileRequestData) => new HTTPTransport().put<ResponseData>(`${baseURL}/user/profile`, { data }),

    password: (
        data: UpdatePasswordRequestData,
    ) => new HTTPTransport().put<ResponseData>(
        `${baseURL}/user/password`,
        { data },
    ),

    changeAvatar: (
        data: FormData,
    ) => new HTTPTransport().put<UserDTO | APIError>(
        `${baseURL}/user/profile/avatar`,
        { data, noHeaders: true, noConvertion: true },
    ),
};
