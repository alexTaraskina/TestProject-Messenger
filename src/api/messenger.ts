import { HTTPTransport } from 'helpers';
import { APIError, ChatDTO, ResponseData, UserDTO, RealTimeMessagesConnectionDTO } from 'api/types';
import { baseURL } from './variables';

type CreateChatRequestData = {
    title: string,
}

type GetChatsRequestData = {
    offset: number,
    limit: number,
    title: string,
}

type ChatUserRequestData = {
    users: number[],
    chatId: number,
};

type ChatUsersRequestData = {
    id: number,
    offset?: number,
    limit?: number,
    name?: string,
    email?: string,
};

type InitRealTimeMessagesConnectionRequestData = {
    id: number,
};

export const messengerAPI = {
    createChat: (data: CreateChatRequestData) => 
        new HTTPTransport().post<ResponseData>(baseURL + '/chats', {data}),

    chats: (data: GetChatsRequestData = { offset: 0, limit: 10, title: "" }) => 
        new HTTPTransport().get<ChatDTO[] | APIError>(baseURL + '/chats', {data}),

    addUser: (data: ChatUserRequestData) => 
        new HTTPTransport().put<ResponseData>(baseURL + '/chats/users', {data}),

    removeUser: (data: ChatUserRequestData) => 
        new HTTPTransport().delete<ResponseData>(baseURL + '/chats/users', {data}),

    getChatUsers: (data: ChatUsersRequestData) => 
        new HTTPTransport().get<UserDTO[] | APIError>(baseURL + `/chats/${data.id}/users`, {data}),
        
    initRealTimeMessagesConnection: (data: InitRealTimeMessagesConnectionRequestData) => 
        new HTTPTransport().post<RealTimeMessagesConnectionDTO | APIError>(baseURL + `/chats/token/${data.id}`, {data}),
}
