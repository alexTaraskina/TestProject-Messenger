import { Block, Store } from 'core';
import { withStore } from 'utils';
import { sendMessage } from 'services/messenger';
import { baseURL } from 'api/variables';

import './chat-area.css';

interface ChatAreaProps {
    store: Store<AppState>,
    onChoseOptionClick?: (e: Event) => void,
    onSendMessageClick?: (e: Event) => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
    onRemoveChatClick?: () => void,
    onUploadAssetFileClick?: () => void,
    id: number,
    chatUsers: User[],
    chat: Chat | undefined,
    messages: Message[],
    userId: number,
    uploadedFile: ChatFile | null,
}

class ChatArea extends Block<ChatAreaProps> {
    static componentName: string = 'ChatArea';

    constructor(props: ChatAreaProps) {
        super({
            ...props,
            onChoseOptionClick: (e: Event) => this.onChoseOptionClick(e),
            onSendMessageClick: (e: Event) => this.onSendMessageClick(e),
        });
    }

    onChoseOptionClick(e: Event) {
        e.preventDefault();
        const el = e.target as HTMLElement;
        if (el && el.parentNode) {
            const options = el.parentNode.querySelector('.jsOptions');
            options?.classList.toggle('active');
        }
    }

    onSendMessageClick(e: Event) {
        e.preventDefault();
        if (this.props.uploadedFile == null) {
            const el = e.target as HTMLElement;
            const message = el && el.parentNode
                ? el.parentNode.querySelector('input')?.value
                : null;
            if (message) {
                window.store.dispatch(sendMessage, { content: message, type: 'message' });
            }
        } else {
            window.store.dispatch(sendMessage, { content: this.props.uploadedFile.id, type: 'file' });
        }
    }

    render() {
        return `
        <div class="chat-area {{selected}}">
            {{#if selected }}
            <div class="chat-area__header">
                <div class="chat-area__recipient-info">
                    {{{ ChatImage chatId=${this.props.chat?.id} image="${this.props.chat?.avatar ?? ''}" }}}
                    <div style="display: flex; flex-direction: column;">
                        <p class="chat-area__recipient-name">${this.props.chat?.title}</p>
                        ${this.props.chatUsers.map((u) => `${u.firstName} ${u.secondName}`)}
                    </div>
                </div>
                <button class="chat-area__actions-button">
                    {{{ ActionsButton 
                        cssModificator="chat-area__actions-icon" 
                        id="actionsButton" 
                        onClick=onChoseOptionClick 
                    }}}
                    <div class="chat-area__actions-type-options jsOptions">
                        {{{ Option 
                            optionText="Добавить пользователя" 
                            optionType="addUser" 
                            onClick=onAddUserClick 
                        }}}
                        {{{ Option 
                            optionText="Удалить пользователя" 
                            optionType="removeUser" 
                            onClick=onRemoveUserClick 
                        }}}
                        {{{ Option 
                            optionText="Удалить чат" 
                            optionType="removeChat" 
                            onClick=onRemoveChatClick 
                        }}}
                    </div>
                </button>
            </div>
            <div class="chat-area__main">
                <div class="chat-area__dialog-area">
                    ${
    // eslint-disable-next-line
    this.props.messages?.slice().reverse().map((m) => {
        if (m.type === 'file') {
            const src = `${baseURL}/resources/${m.file?.path}`;
            return `
                                <div class="message message_content-type_file 
                                    ${Number(m.user_id) !== this.props.userId
        ? 'message_type_recieved'
        : 'message_type_sent'}">
                                        <img src=${src}>
                                    </div>`;
        }

        if (m.content) {
            return `
                <div class="message message_content-type_text 
                    ${Number(m.user_id) !== this.props.userId
        ? 'message_type_recieved'
        : 'message_type_sent'}">
                    <p>${m.content}</p>
                </div>`;
        }
    }).join('')}
                </div>
                <div class="chat-area__new-message-area jsMessageArea">
                    <button class="chat-area__attach-file-button">
                        {{{ ActionsButton 
                            cssModificator="chat-area__attach-file-icon" 
                            id="attachFileButton" 
                            onClick=onChoseOptionClick 
                        }}}
                        <div class="chat-area__file-type-options jsOptions">
                            {{{ Option optionText="Фото или Видео" optionType="photo" onClick=onUploadAssetFileClick }}}
                            {{{ Option optionText="Файл" optionType="video" onClick=onUploadAssetFileClick }}}
                        </div>
                    </button>
                    <input type="text" id="message" 
                        name="message" class="chat-area__new-message" 
                        placeholder="Сообщение"
                        value="${this.props.uploadedFile?.filename ?? ''}" />
                    {{{ SendMessageButton onClick=onSendMessageClick }}}
                </div>
            </div>
            {{else}}
            <p class="chat-area__no-choosen-message">Выберите чат чтобы отправить сообщение</p>
            {{/if}}
        </div>
        `;
    }
}

export default withStore(ChatArea, (state: AppState) => ({
    id: state.params?.id,
    chatUsers: state.currentChatUsers ?? [],
    messages: state.messages,
    chat: state.chats?.find((chat) => chat.id === Number(state.params?.id)),
    userId: state.user?.id ?? 0,
    uploadedFile: state.uploadedFile,
}));
