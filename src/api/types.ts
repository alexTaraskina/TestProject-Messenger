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

export type FileDTO = {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
}

export type RealTimeMessagesConnectionDTO = {
    token: string
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
