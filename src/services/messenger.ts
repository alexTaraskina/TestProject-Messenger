import { messengerAPI } from 'api/messenger';
import { ChatDTO } from 'api/types';
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

    const responseChats = await messengerAPI.chats();
    if (apiHasError(responseChats)) {
        dispatch({ isLoading: false });
        return;
    }
    else {
        dispatch({ isLoading: false, chats: responseChats.map(item => transformChat(item as ChatDTO)) });
    }

    // ToDo route to created chat page
}
