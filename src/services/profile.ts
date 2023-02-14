import { profileAPI } from 'api/profile';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

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

export const editProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: EditProfilePayload
) => {
    dispatch({ isLoading: true });

    console.log(data);
    const response = await profileAPI.edit(data);

    if (apiHasError(response)) {
        dispatch({ isLoading: false });
        return;
    }

    dispatch({ isLoading: false, user: transformUser(response as UserDTO) });

    window.router.go('/profile');
}

export const updatePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: UpdatePasswordPayload
) => {
    dispatch({ isLoading: true });

    const response = await profileAPI.password(data);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, changePasswordError: response.reason });
        return;
    }

    dispatch({ isLoading: false, changePasswordMessage: 'Пароль был изменен' });
    setTimeout(() => { 
        dispatch({ changePasswordMessage: '' }); 
        window.router.go('/profile');
    }, 2000);
}

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: FormData
) => {
    dispatch({ isLoading: true });

    const response = await profileAPI.changeAvatar(data);

    if (apiHasError(response)) {
        dispatch({ isLoading: false });
        return;
    }

    dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
    window.router.go('/profile');
}
