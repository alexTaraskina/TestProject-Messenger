export type APIError = {
    reason: string;
};

export type ResponseData = {} | APIError;

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: LastMessageDTO,
    users: UserDTO[] | null,
};

type LastMessageDTO = {
    user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string
    },
    time: string,
    content: string
};
