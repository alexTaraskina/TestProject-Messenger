import { Block, Store } from 'core';
import template from 'bundle-text:./template.hbs';
import { addUser } from 'services/messenger';
import { Screens } from 'utils';

interface ChatProps {
    store: Store<AppState>;
    showAddUserModal?: () => void,
    showRemoveUserModal?: () => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
    getChat: () => Chat | undefined,
}

export default class ChatPage extends Block<ChatProps> {
    static componentName: string = 'Chat';
    

    constructor(props: ChatProps)
    {
        super({ 
            ...props, 
            getChat: () => window.store.getState().chats?.find(chat => chat.id === Number(window.store.getState().params.id)),
            showAddUserModal: () => this.showAddUserModal(),
            showRemoveUserModal: () => this.showRemoveUserModal(),
            onAddUserClick: (e: Event) => this.onAddUserClick(e),
            onRemoveUserClick: (e: Event) => this.onRemoveUserClick(e), 
        });
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        return window.store.getState().screen !== Screens.Chat;
    }

    showAddUserModal() {
        this.refs.addUserModal.setProps({ state: "active" });
    }

    showRemoveUserModal() {
        this.refs.removeUserModal.setProps({ state: "active" });
    }

    onAddUserClick(e: Event) {
        interface NewChatUserData {
            users: number[],
            chatId: number,
        };

        let el = e.target as HTMLElement;
        let userId = el && el.parentNode ? Number(el.parentNode.querySelector('input')?.value) : null;
        let chatId = Number(window.store.getState().params.id); 

        if (userId && chatId) {
            const newChatUserData: NewChatUserData = {
                users: [ userId ], 
                chatId: chatId, 
            }

            window.store.dispatch(addUser, newChatUserData);
        }
    }

    onRemoveUserClick(e: Event) {
        e.preventDefault();
    }

    render() {
        return `
        <div class="page chat-page">
            {{{ Chats }}}
            {{{ ChatArea selected="chat-area_selected" chat=${this.props.getChat()}
                recipientName="Вадим" 
                onAddUserClick=showAddUserModal
                onRemoveUserClick=showRemoveUserModal }}}
            {{{ Modal state="hidden" 
                heading="Добавить пользователя" 
                buttonText="Добавить" 
                type="input"
                ref="addUserModal"
                onButtonClick=onAddUserClick }}}
            {{{ Modal state="hidden" 
                heading="Удалить пользователя" 
                buttonText="Удалить" 
                type="input"
                ref="removeUserModal"
                onButtonClick=onRemoveUserClick }}}
        </div>
        `;
    }
}
