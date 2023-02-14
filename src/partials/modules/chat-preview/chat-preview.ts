import { Block, CoreRouter, Store } from 'core';
import template from 'bundle-text:./template.hbs';

import './chat-preview.css';
import { withRouter, withStore } from 'utils';
import { closeSocket, getChatUsers, initRealTimeMessagesConnection } from 'services/messenger';

interface ChatPreviewProps {
    id: number,
    title: string,
    router: CoreRouter,
    onChatTitleClick?: (e: Event) => void,
    store: Store<AppState>,
}

class ChatPreview extends Block<ChatPreviewProps> {
    static componentName: string = 'ChatPreview';

    constructor(props: ChatPreviewProps) {
        super(props);

        this.setProps({
            onChatTitleClick: (e: Event) => this.onChatTitleClick(e),
        });
    }

    onChatTitleClick(e: Event) {
        e.preventDefault();

        this.props.store.dispatch(closeSocket);
        this.props.store.dispatch(getChatUsers, this.props.id);
        this.props.store.dispatch(initRealTimeMessagesConnection, { chatId: this.props.id, userId: window.store.getState().user?.id });
        this.props.router.go(`/messenger/${this.props.id}`);
    }

    render() {
        return template;
    }
}

export default withStore(withRouter(ChatPreview));
