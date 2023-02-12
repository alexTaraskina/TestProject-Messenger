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

export const getChatUsers = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    id: number
) => {
    dispatch({ isLoading: true });

    const chatUsers = await messengerAPI.getChatUsers({ id });

    if (apiHasError(chatUsers)) {
        dispatch({ isLoading: false });
        return;
    }
    else {
        dispatch({ isLoading: false, currentChatUsers: chatUsers.map(item => transformUser(item as UserDTO)) });
    }
}

export const initRealTimeMessagesConnection = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: { chatId: number, userId: number }) => {
    dispatch({ isLoading: true });

    const connection = await messengerAPI.initRealTimeMessagesConnection({ id: data.chatId });

    if (apiHasError(connection)) {
        dispatch({ isLoading: false });
        return;
    }
    else {
        dispatch({ 
            isLoading: false, 
            token: connection.token,
        });
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.userId}/${data.chatId}/${connection.token}`);
        // prolong connection
        setInterval(() => {
            socket.send(JSON.stringify({ type: 'ping' }));
        }, 60000);

        dispatch({ webSocket: socket });
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            let data = JSON.parse(event.data);
            // if we get old messages - there will be array
            if (Array.isArray(data) && data.length > 0) {
                dispatch({ messages: data });
            }
            //let oldMessages = window.store.getState()?.messages ? [...window.store.getState()?.messages] : [];
            //debugger;
            else {
                dispatch({ messages: [...window.store.getState().messages, data] });
            }
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    }
}

export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: string) => {
        console.log(JSON.stringify({
            content: data,
            type: 'message'
        }));
        state.webSocket?.send(JSON.stringify({
            content: data,
            type: 'message'
        }));
}
