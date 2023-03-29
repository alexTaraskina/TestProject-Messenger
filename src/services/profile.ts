import { profileAPI } from 'api/profile';
import { UserDTO } from 'api/types';
import { transformUser, apiHasError } from 'utils';
import { DispatchStateHandler } from './types';

type EditProfilePayload = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

type UpdatePasswordPayload = {
    oldPassword: string,
    newPassword: string,
}

export const editProfile: DispatchStateHandler<EditProfilePayload> = async (dispatch, _state, data) => {
    try {
        dispatch({ isLoading: true });

        console.log(data);
        const response = await profileAPI.edit(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false });
            return;
        }

        dispatch({ isLoading: false, user: transformUser(response as UserDTO) });

        window.router.go('/settings');
    }
    catch (e) {
        console.log(e);
    }
}

export const updatePassword: DispatchStateHandler<UpdatePasswordPayload> = async (dispatch, _state, data) => {
    try {
        dispatch({ isLoading: true });

        const response = await profileAPI.password(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false, changePasswordError: response.reason });
            return;
        }

        dispatch({ isLoading: false, changePasswordMessage: 'Пароль был изменен' });
        setTimeout(() => {
            dispatch({ changePasswordMessage: '' });
            window.router.go('/settings');
        }, 2000);
    }
    catch (e) {
        console.log(e);
    }
}

export const changeAvatar: DispatchStateHandler<FormData> = async (dispatch, _state, data) => {
    try {
        dispatch({ isLoading: true });

        const response = await profileAPI.changeAvatar(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false });
            return;
        }

        dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
        window.router.go('/settings');
    }
    catch (e) {
        console.log(e);
    }
}
