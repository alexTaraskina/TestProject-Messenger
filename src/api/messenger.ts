import { HTTPTransport } from 'helpers';
import { APIError, ChatDTO, ResponseData } from 'api/types';
import { baseURL } from './variables';

type CreateChatRequestData = {
    title: string,
}

type GetChatsRequestData = {
    offset: number,
    limit: number,
    title: string,
}

export const messengerAPI = {
    createChat: (data: CreateChatRequestData) => 
        new HTTPTransport().post<ResponseData>(baseURL + '/chats', {data}),

    chats: (data: GetChatsRequestData = { offset: 0, limit: 10, title: "" }) => 
        new HTTPTransport().get<ChatDTO[] | APIError>(baseURL + '/chats', {data}),
}
