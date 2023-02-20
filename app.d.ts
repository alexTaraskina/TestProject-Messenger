declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type Params = Record<string, string>;

    export type AppState = {
        appIsInited: boolean;
        params: Params,
        screen: Screens | null;
        isLoading: boolean;
        loginFormError: string | null;
        changePasswordError: string | null;
        changePasswordMessage: string | null;
        user: User | null;
        chats: Chat[] | null;
        currentChat: number | null;
        createChatError: string | null;
        currentChatUsers: User[] | null,
        token: string,  
        messages: Message[],
        webSocket: WebSocket | null,
        error: Error | null,
    };

    export type Error = {
        status: string,
        text: string,
    }

    export type Message = {
        chat_id: number,
        time: string,
        type: string,
        user_id: string,
        content: string,
        file?: Nullable<File>,        
    };

    export type File = {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    };

    export type User = {
        id: number;
        login: string;
        firstName: string;
        secondName: string;
        displayName: string;
        avatar: string;
        phone: string;
        email: string;
    };

    export type Chat = {
        id: number,
        title: string,
        avatar: string,
        unreadCount: number,
        lastMessage: LastMessage | null,
        users: User[] | null,
    }

    type LastMessage = {
        user: {
            firstName: string,
            secondName: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time: string,
        content: string
    }
}

export { }
