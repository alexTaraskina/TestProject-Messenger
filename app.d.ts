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
        messages: Message[] | null,
        webSocket: WebSocket | null,
    };

    export type Message = {
        user: User,
        time: Date,
        content: string,
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
