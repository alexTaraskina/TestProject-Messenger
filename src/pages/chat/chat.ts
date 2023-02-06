import { Block, Store } from '../../core';
import template from 'bundle-text:./template.hbs';
import { addUser } from 'services/messenger';

interface ChatProps {
    store: Store<AppState>;
    showAddUserModal?: () => void,
    showRemoveUserModal?: () => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
}

export default class Chat extends Block<ChatProps> {
    static componentName: string = 'Chat';
    

    constructor(props: ChatProps)
    {
        super(props);
        this.setProps({
            showAddUserModal: () => this.showAddUserModal(),
            showRemoveUserModal: () => this.showRemoveUserModal(),
            onAddUserClick: (e: Event) => this.onAddUserClick(e),
            onRemoveUserClick: (e: Event) => this.onRemoveUserClick(e),
        });
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
        let chatId = window.store.getState().params.id; 

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
        return template;
    }
}
