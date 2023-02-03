import { messengerAPI } from 'api/messenger';
import type { Dispatch } from 'core';
import { apiHasError } from 'utils';

type CreateChatPayload = {
    title: string,
};

export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: CreateChatPayload
) => {
    dispatch({ isLoading: true });

    const response = await messengerAPI.createChat(data);

    if (apiHasError(response)) {
        dispatch({ isLoading: false });
        return;
    }

    dispatch({ isLoading: false, changePasswordMessage: 'Пароль был изменен' });
}
