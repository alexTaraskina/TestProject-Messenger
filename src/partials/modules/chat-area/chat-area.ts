import { Block, Store, } from 'core';
// import template from 'bundle-text:./template.hbs';
import { withStore } from 'utils';
import { getChatUsers, sendMessage, initRealTimeMessagesConnection } from 'services/messenger';

import './chat-area.css';

interface ChatAreaProps {
    store: Store<AppState>,
    onChoseOptionClick?: (e: Event) => void,
    onSendMessageClick?: (e: Event) => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
    id: () => number,
    chatUsers: () => User[] | null,
    users?: User[] | null,
    getChat: () => Chat | undefined,
    chat: () => Chat | undefined,
    messages: () => Message[], 
}

class ChatArea extends Block<ChatAreaProps> {
    static componentName: string = 'ChatArea';

    constructor(props: ChatAreaProps) {
        super({
            ...props,
            chatUsers: () => { return window.store.getState().currentChatUsers },
            chat: () => window.store.getState().chats?.find(chat => chat.id === Number(window.store.getState().params.id)),
            messages: () => window.store.getState().messages ?? [],
        });

        let chatId = this.props.store.getState().params.id;
        this.props.store.dispatch(getChatUsers, chatId);
        this.props.store.dispatch(initRealTimeMessagesConnection, { chatId, userId: window.store.getState().user?.id });

        this.setProps({
            onChoseOptionClick: (e: Event) => this.onChoseOptionClick(e),
            onSendMessageClick: (e: Event) => this.onSendMessageClick(e),
            id: () => Number(props.store.getState().params.id),
            chatUsers: () => { return window.store.getState().currentChatUsers },
        });

        let actionButton = this.element?.querySelector('#actionsButton');
        if (actionButton) {
            actionButton.addEventListener('click', this.onChoseOptionClick);
        }

        let attachFileButton = this.element?.querySelector('#attachFileButton');
        if (attachFileButton) {
            attachFileButton.addEventListener('click', this.onChoseOptionClick);
        }

        const sendMessageButton = this.element?.querySelector('#sendMessageButton');
        if (sendMessageButton) {
            sendMessageButton.addEventListener('click', this.onSendMessageClick);
        }
    }

    onChoseOptionClick(e: Event) {
        e.preventDefault();
        let el = e.target as HTMLElement;
        if (el && el.parentNode) {
            let options = el.parentNode.querySelector('.jsOptions');
            options?.classList.toggle('active');
        }
    }

    onSendMessageClick(e: Event) {
        e.preventDefault();
        const el = e.target as HTMLElement;
        const message = el && el.parentNode ? el.parentNode.querySelector('input')?.value : null;
        window.store.dispatch(sendMessage, message);
        console.log(message);
        console.log(this.props.messages());
    }

    render() {
        return `
        <div class="chat-area {{selected}}">
            {{#if selected }}
            <div class="chat-area__header">
                <div class="chat-area__recipient-info">
                    <div class="chat-area__recipient-avatar"></div>
                    <div style="display: flex; flex-direction: column;">
                        <p class="chat-area__recipient-name">${this.props.chat()?.title}</p>
                        ${this.props.chat()?.users?.map(u => `${u.firstName} ${u.secondName}`)}
                    </div>
                </div>
                <button class="chat-area__actions-button">
                    <span class="chat-area__actions-icon" id="actionsButton"></span>
                    <div class="chat-area__actions-type-options jsOptions">
                        {{{ Option optionText="Добавить пользователя" optionType="addUser" onClick=onAddUserClick }}}
                        {{{ Option optionText="Удалить пользователя" optionType="removeUser" onClick=onRemoveUserClick }}}
                    </div>
                </button>
            </div>
            <div class="chat-area__main">
                <div class="chat-area__dialog-area">
                    ${this.props.messages()?.map(m => `${m.content}`)}
                </div>
                <div class="chat-area__new-message-area jsMessageArea">
                    <button class="chat-area__attach-file-button">
                        <span class="chat-area__attach-file-icon" id="attachFileButton"></span>
                        <div class="chat-area__file-type-options jsOptions">
                            {{{ Option optionText="Фото или Видео" optionType="photo" }}}
                            {{{ Option optionText="Файл" optionType="video" }}}
                            {{{ Option optionText="Локация" optionType="location" }}}
                        </div>
                    </button>
                    <input type="text" id="message" name="message" class="chat-area__new-message" placeholder="Сообщение"/>
                    <button id="sendMessageButton" class="chat-area__send-button">
                        <span class="chat-area__send-icon"></span>
                    </button>
                </div>
            </div>
            {{else}}
            <p class="chat-area__no-choosen-message">Выберите чат чтобы отправить сообщение</p>
            {{/if}}
        </div>
        `;
    }
}

export default withStore(ChatArea);

// export default withStore(ChatArea<ChatAreaProps, {chatUsers: User[]|null}>, (state: AppState) => {
//     chatUsers: store.currentChatUsers
// });
