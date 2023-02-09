import { Block, Store, } from 'core';
import template from 'bundle-text:./template.hbs';
import { withStore } from 'utils';
import { getChatUsers } from 'services/messenger';

import './chat-area.css';

interface ChatAreaProps {
    store: Store<AppState>,
    onChoseOptionClick?: (e: Event) => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
    id: () => number,
    chatUsers: () => User[] | null,
    users?: User[] | null,
    getChat: () => Chat | undefined,
    chat: () => Chat | undefined,
}

class ChatArea extends Block<ChatAreaProps> {
    static componentName: string = 'ChatArea';

    constructor(props: ChatAreaProps) {
        super({ 
            ...props, 
            chatUsers: () => { return window.store.getState().currentChatUsers },
            chat: () => window.store.getState().chats?.find(chat => chat.id === Number(window.store.getState().params.id)) 
        });

        this.props.store.dispatch(getChatUsers, this.props.store.getState().params.id);

        this.setProps({
            onChoseOptionClick: (e: Event) => this.onChoseOptionClick(e),
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
    }

    onChoseOptionClick(e: Event) {
        e.preventDefault();
        let el = e.target as HTMLElement;
        if (el && el.parentNode) {
            let options = el.parentNode.querySelector('.jsOptions');
            options?.classList.toggle('active');
        }
    }

    render() {
        console.log(this.props.chat);
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
                    <p class="chat-area__messages-date">19 июня</p>
                    {{{ Message type="message_type_recieved" contentType="message_content-type_text" text="Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро." }}}
                    {{{ Message  type="message_type_recieved" contentType="message_content-type_image" }}}
                    {{{ Message  type="message_type_sent" contentType="message_content-type_text" text="Круто!" }}}
                </div>
                <div class="chat-area__new-message-area">
                    <button class="chat-area__attach-file-button">
                        <span class="chat-area__attach-file-icon" id="attachFileButton"></span>
                        <div class="chat-area__file-type-options jsOptions">
                            {{{ Option optionText="Фото или Видео" optionType="photo" }}}
                            {{{ Option optionText="Файл" optionType="video" }}}
                            {{{ Option optionText="Локация" optionType="location" }}}
                        </div>
                    </button>
                    <input type="text" id="message" name="message" class="chat-area__new-message" placeholder="Сообщение"/>
                    <button class="chat-area__send-button">
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
