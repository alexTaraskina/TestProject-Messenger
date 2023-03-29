import { Block, CoreRouter, Store } from '../../../core';
import { withRouter, withStore } from 'utils';

import './chats.css';
import { createChat } from 'services/messenger';

const template = require('./template.hbs');

interface ChatsProps {
    router: CoreRouter,
    store: Store<AppState>,
    onProfileLinkClick?: (e: Event) => void,
    onCreateChatClick?: () => void,
    handleScroll?: (e: Event) => void,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class Chats extends Block<ChatsProps> {
    static componentName: string = 'Chats';

    constructor(props: ChatsProps) {
        super({
            ...props,
            onProfileLinkClick: (e: Event) => this.onProfileLinkClick(e),
            onCreateChatClick: () => this.onCreateChatClick(),
            handleScroll: (e: Event) => this.checkPosition(e),
        });
    }

    onProfileLinkClick(e: Event) {
        e.preventDefault();
        this.props.router.go("/settings");
    }

    onCreateChatClick() {
        const chatTitleEl = this.element?.querySelector('#newChatTitle') as HTMLInputElement;

        if (chatTitleEl.value.length === 0) {
            this.refs.newChatError.setProps({ text: 'Title can not be empty' });
        }

        interface NewChatData {
            title: string,
        };

        const newChatData: NewChatData = {
            title: chatTitleEl?.value,
        }

        this.props.store.dispatch(createChat, newChatData);
    }

    checkPosition(e: Event) {
        // высота документа и высота экрана:
        console.log(e.target);
        console.log((e.target as HTMLElement).offsetHeight);
        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight
        const scrolled = window.scrollY
        const threshold = height - screenHeight / 4
        const position = scrolled + screenHeight

        if (position >= threshold) {
            console.log(height);
        }
    }

    render() {
        return template;
    }
}

export default withStore(withRouter(Chats));
