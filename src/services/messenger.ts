import { messengerAPI } from 'api/messenger';
import type { Dispatch } from 'core';
import { apiHasError, transformChat } from 'utils';

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
        dispatch({ isLoading: false, createChatError: response.reason });
        return;
    }

    // ToDo route to created chat page
    dispatch({ isLoading: false });
}
