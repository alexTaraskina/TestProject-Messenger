import { messengerAPI } from 'api/messenger';
import { ChatDTO, UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { apiHasError, transformChat, transformUser } from 'utils';

type CreateChatPayload = {
    title: string,
};

type UserPayload = {
    users: number[],
    chatId: number,
};

type GetChatsRequestData = {
    offset: number,
    limit: number,
    title: string,
}

export const uploadChats = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: GetChatsRequestData
) => {
    try {
        dispatch({ isLoading: true });

        const response = await messengerAPI.chats(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false });
            return;
        }
        else {
            let responseChats = response.map(item => transformChat(item as ChatDTO));
            let allChats = state.chats ? state.chats.concat(responseChats) : responseChats;
            dispatch({ isLoading: false, chats: allChats });
        }
    }
    catch (e) {
        console.log(e);
    }
}

export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: CreateChatPayload
) => {
    try {
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
    catch (e) {
        console.log(e);
    }
}

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: UserPayload
) => {
    try {
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
    catch (e) {
        console.log(e);
    }
}

export const removeUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: UserPayload) => {
        try {
            dispatch({ isLoading: true });
    
            const response = await messengerAPI.removeUser(data);
    
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
        catch (e) {
            console.log(e);
        }
}

export const getChatUsers = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    id: number
) => {
    try {
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
    catch (e) {
        console.log(e);
    }
}

let socket: WebSocket;
export const initRealTimeMessagesConnection = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: { chatId: number, userId: number }) => {
    try {
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
            socket?.close();
            socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.userId}/${data.chatId}/${connection.token}`);
            // prolong connection
            setInterval(() => {
                socket.send(JSON.stringify({ type: 'ping' }));
            }, 30000);

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
                if (Array.isArray(data)) {
                    dispatch({ messages: data });
                }
                //let oldMessages = window.store.getState()?.messages ? [...window.store.getState()?.messages] : [];
                //debugger;
                else if (data.type !== 'pong') {
                    dispatch({ messages: [...window.store.getState().messages, data] });
                }
            });

            socket.addEventListener('error', event => {
                console.log('Ошибка', event.message);
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}

export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: string) => {
    socket?.send(JSON.stringify({
        content: data,
        type: 'message'
    }));
}

export const closeSocket = async (
    dispatch: Dispatch<AppState>,
    state: AppState) => {
    socket?.close();
}

export const updateChatImage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: FormData
) => {
    try {
        dispatch({ isLoading: true });

        const response = await messengerAPI.chatImage(data);

        if (apiHasError(response)) {
            dispatch({ isLoading: false });
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
    }
    catch (e) {
        console.log(e);
    }
}
