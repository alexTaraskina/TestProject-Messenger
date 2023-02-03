declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type AppState = {
        appIsInited: boolean;
        screen: Screens | null;
        isLoading: boolean;
        loginFormError: string | null;
        changePasswordError: string | null;
        changePasswordMessage: string | null;
        user: User | null;
        chats: Chat[] | null;
        currentChat: number | null;
        createChatError: string | null;
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
        lastMessage: LastMessage
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
