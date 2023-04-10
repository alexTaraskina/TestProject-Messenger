import { UserDTO, ChatDTO, FileDTO } from 'api/types';

export const transformUser = (data: UserDTO): User => ({
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
});

export const transformChat = (data: ChatDTO): Chat => ({
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unreadCount: data.unread_count,
    lastMessage: data.last_message ? {
        user: {
            firstName: data.last_message.user.first_name,
            secondName: data.last_message.user.second_name,
            avatar: data.last_message.user.avatar,
            email: data.last_message.user.email,
            login: data.last_message.user.login,
            phone: data.last_message.user.phone,
        },
        time: new Date(Date.parse(data.last_message.time)).toLocaleDateString(
            'ru-RU',
            { weekday: 'short', month: 'long', day: 'numeric' },
        ),
        content: data.last_message.content,
    } : null,
    users: data.users
        ? data.users.map(transformUser)
        : null,
});

export const transformFile = (data: FileDTO): ChatFile => ({
    id: data.id,
    user_id: data.user_id,
    path: data.path,
    filename: data.filename,
    content_type: data.content_type,
    content_size: data.content_size,
    upload_date: data.upload_date,
});
