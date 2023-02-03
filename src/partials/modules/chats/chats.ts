import { Block, CoreRouter, Store } from '../../../core';
import template from 'bundle-text:./template.hbs';
import { withRouter, withStore } from 'utils';

import './chats.css';

interface ChatsProps {
    router: CoreRouter,
    store: Store<AppState>,
    onProfileLinkClick?: (e: Event) => void,
    onCreateChatClick?: () => void,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class Chats extends Block<ChatsProps> {
    static componentName: string = 'Chats';

    constructor(props: ChatsProps) {
        super(props);

        this.setProps({
            onProfileLinkClick: (e: Event) => this.onProfileLinkClick(e),
            onCreateChatClick: () => this.onCreateChatClick(),
        });
    }

    onProfileLinkClick(e: Event) {
        e.preventDefault();
        this.props.router.go("/profile");
    }

    onCreateChatClick() {
        const chatTitleEl = this.element?.querySelector('#newChatTitle') as HTMLInputElement;

        interface NewChatData {
            title: string,
        };

        const newChatData: NewChatData = {
            title: chatTitleEl?.value,
        }

        this.props.store.dispatch(register, newChatData);
    }
    
    render() {
        return template;
    }
}

export default withStore(withRouter(Chats));
