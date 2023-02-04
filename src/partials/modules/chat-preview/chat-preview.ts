import { Block, CoreRouter } from 'core';
import template from 'bundle-text:./template.hbs';

import './chat-preview.css';
import { withRouter } from 'utils';

interface ChatPreviewProps {
    id: number,
    title: string,
    router: CoreRouter,
    onChatTitleClick?: (e: Event) => void,
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
        this.props.router.go(`/messenger/${this.id}`);
    }

    render() {
        return template;
    }
}

export default withRouter(ChatPreview);
