import { authAPI } from 'api/auth';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';
import { DispatchStateHandler } from './types';

type LoginPayload = {
    login: string;
    password: string;
};

type RegisterPayload = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export const logout = async (dispatch: Dispatch<AppState>) => {
    try {
        dispatch({ isLoading: true });

        await authAPI.logout();

        dispatch({ isLoading: false, user: null });

        window.router.go('/');
    } catch (e) {
        console.log(e);
    }
};

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, _state, data) => {
    try {
        dispatch({ isLoading: true });

        const response = await authAPI.login(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false, loginFormError: response.reason });
            return;
        }

        const responseUser = await authAPI.me();

        dispatch({ isLoading: false, loginFormError: null });

        if (apiHasError(response)) {
            dispatch(logout);
            return;
        }

        dispatch({ user: transformUser(responseUser as UserDTO) });

        window.router.go('/messenger');
    } catch (e) {
        console.log(e);
    }
};

export const register: DispatchStateHandler<RegisterPayload> = async (dispatch, _state, data) => {
    try {
        dispatch({ isLoading: true });

        console.log(data);
        const response = await authAPI.register(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false });
            return;
        }

        const responseUser = await authAPI.me();

        dispatch({ isLoading: false });

        if (apiHasError(response)) {
            dispatch(logout);
            return;
        }

        dispatch({ user: transformUser(responseUser as UserDTO) });

        window.router.go('/messenger');
    } catch (e) {
        console.log(e);
    }
};
