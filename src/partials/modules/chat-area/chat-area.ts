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
    chatUsers: () => User[] | null,
    id: () => number,
}

class ChatArea extends Block<ChatAreaProps> {
    static componentName: string = 'ChatArea';

    constructor(props: ChatAreaProps) {
        super(props);

        this.props.store.dispatch(getChatUsers, this.props.store.getState().params.id);

        this.setProps({
            onChoseOptionClick: (e: Event) => this.onChoseOptionClick(e),
            id: () => Number(this.props.store.getState().params.id),
            chatUsers: () => this.props.store.getState().currentChatUsers,
        });

        this.props.store.dispatch(getChatUsers, this.props.id());

        console.log(this.props.id());
        console.log(this.props.chatUsers());

        this.props.store.dispatch(getChatUsers, this.props.id);

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
        console.log(this.props.store.getState());
        return template;
    }
}

export default withStore(ChatArea);

// export default withStore(ChatArea<ChatAreaProps, {chatUsers: User[]|null}>, (state: AppState) => {
//     chatUsers: store.currentChatUsers
// });
