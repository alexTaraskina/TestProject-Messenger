import { Block, Store } from 'core';
import { addUser, removeUser, removeChat, uploadChatAsset } from 'services/messenger';
import { Screens } from 'utils';

interface ChatProps {
    store: Store<AppState>;
    showAddUserModal?: () => void,
    showRemoveUserModal?: () => void,
    showFileUploadModal?: () => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
    onRemoveChatClick?: () => void,
    onFileChoosen?: () => void,
    getChat: () => Chat | undefined,
    uploadFile?: (e: Event) => void,
}

export default class ChatPage extends Block<ChatProps> {
    static componentName: string = 'Chat';
    

    constructor(props: ChatProps)
    {
        super({ 
            ...props, 
            getChat: () => window.store.getState().chats?.find(chat => chat.id === Number(window.store.getState().params?.id)),
            showAddUserModal: () => this.showAddUserModal(),
            showRemoveUserModal: () => this.showRemoveUserModal(),
            showFileUploadModal: () => this.showFileUploadModal(),
            onAddUserClick: (e: Event) => this.onAddUserClick(e),
            onRemoveUserClick: (e: Event) => this.onRemoveUserClick(e), 
            onRemoveChatClick: () => this.onRemoveChatClick(),
            uploadFile: (e: Event) => this.uploadFile(e),
        });
    }

    componentDidUpdate(_oldProps: ChatProps, _newProps: ChatProps): boolean {
        return window.store.getState().screen !== Screens.Chat;
    }

    showAddUserModal() {
        this.refs.addUserModal.setProps({ state: "active" });
    }

    showRemoveUserModal() {
        this.refs.removeUserModal.setProps({ state: "active" });
    }

    showFileUploadModal() {
        this.refs.uploadFileModal.setProps({ state: "active" });
    }

    onAddUserClick(e: Event) {
        interface NewChatUserData {
            users: number[],
            chatId: number,
        };

        let el = e.target as HTMLElement;
        let userId = el && el.parentNode ? Number(el.parentNode.querySelector('input')?.value) : null;
        let chatId = Number(window.store.getState().params?.id); 

        if (userId && chatId) {
            const newChatUserData: NewChatUserData = {
                users: [ userId ], 
                chatId: chatId, 
            }

            window.store.dispatch(addUser, newChatUserData);
        }
    }

    onRemoveUserClick(e: Event) {
        interface ChatUserData {
            users: number[],
            chatId: number,
        };

        let el = e.target as HTMLElement;
        let userId = el && el.parentNode ? Number(el.parentNode.querySelector('input')?.value) : null;
        let chatId = Number(window.store.getState().params?.id);

        if (userId && chatId) {
            const userData: ChatUserData = {
                users: [ userId ], 
                chatId: chatId, 
            }

            window.store.dispatch(removeUser, userData);
        }
    }

    onRemoveChatClick() {
        let chatId = Number(window.store.getState().params?.id);

        if (chatId) {
            window.store.dispatch(removeChat, { chatId });
        }

        window.router.go('/messenger');
    }

    uploadFile(e: Event) {
        let el = e.target as HTMLElement;
        const imageInputEl = el && el.parentNode ? el.parentNode.querySelector('input') : null;
        if (imageInputEl && imageInputEl.files) {
            const formData = new FormData();
            formData.append('resource', imageInputEl.files[0]);
            window.store.dispatch(uploadChatAsset, formData);
        }

        this.refs.uploadFileModal.setProps({ state: "" });

        // e.preventDefault();
        // const el = e.target as HTMLElement;
        // const message = el && el.parentNode ? el.parentNode.querySelector('input')?.value : null;
        // window.store.dispatch(sendMessage, message);
    }

    render() {
        return `
        <div class="page chat-page">
            {{{ Chats }}}
            {{{ ChatArea selected="chat-area_selected" chat=${this.props.getChat()}
                recipientName="Вадим" 
                onAddUserClick=showAddUserModal
                onRemoveUserClick=showRemoveUserModal
                onRemoveChatClick=onRemoveChatClick
                onUploadAssetFileClick=showFileUploadModal }}}
            {{{ Modal state="hidden" 
                heading="Добавить пользователя" 
                buttonText="Добавить" 
                inputType="text"
                ref="addUserModal"
                onButtonClick=onAddUserClick }}}
            {{{ Modal state="hidden" 
                heading="Удалить пользователя" 
                buttonText="Удалить" 
                inputType="text"
                ref="removeUserModal"
                onButtonClick=onRemoveUserClick }}}
            {{{ Modal state="hidden" 
                heading="Загрузите файл" 
                buttonText="Загрузить"
                inputType="file"
                ref="uploadFileModal"
                onButtonClick=uploadFile }}}
        </div>
        `;
    }
}
