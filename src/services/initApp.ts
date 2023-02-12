import { authAPI } from 'api/auth';
import { messengerAPI } from 'api/messenger';
import { ChatDTO, UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError, transformChat } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {
    try {
        const response = await authAPI.me();

        if (apiHasError(response)) {
            return;
        }

        const responseChats = await messengerAPI.chats();

        if (apiHasError(responseChats)) {
            return;
        }

        for (let i = 0; i < responseChats.length; i++) {
            let chatId = Number(responseChats[i].id);
            let users = await messengerAPI.getChatUsers({ id: chatId });

            if (apiHasError(users)) {
                return;
            }

            responseChats[i].users = users;
        }

        dispatch({ 
            user: transformUser(response as UserDTO), 
            chats: responseChats.map(item => transformChat(item as ChatDTO)),
            messages: [],
        });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appIsInited: true });
    }
}
