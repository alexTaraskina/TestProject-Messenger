import { Block, CoreRouter, Store } from '../../../core';
import template from 'bundle-text:./template.hbs';
import { withRouter, withStore } from 'utils';
import { logout } from 'services/auth';

import './chats.css';

interface ChatsProps {
    router: CoreRouter,
    store: Store<AppState>,
    onProfileLinkClick?: (e: Event) => void,
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
        });
    }

    onProfileLinkClick(e: Event) {
        e.preventDefault();
        this.props.router.go("/profile");
    }
    
    render() {
        return template;
    }
}

export default withStore(withRouter(Chats));
