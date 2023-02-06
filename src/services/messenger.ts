import { messengerAPI } from 'api/messenger';
import { ChatDTO, UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { apiHasError, transformChat, transformUser } from 'utils';

type CreateChatPayload = {
    title: string,
};

type AddUserPayload = {
    users: number[],
    chatId: number,
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

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: AddUserPayload
) => {
    dispatch({ isLoading: true });

    const response = await messengerAPI.addUser(data);

    if (apiHasError(response)) {
        dispatch({ isLoading: false });
        return;
    }

    const chatUsers = await messengerAPI.getChatUsers({ id: data.chatId });

    if (apiHasError(chatUsers)) {
        dispatch({ isLoading: false });
        return;
    }
    else {
        dispatch({ isLoading: false, currentChatUsers: chatUsers.map(item => transformUser(item as UserDTO)) });
    }
}
