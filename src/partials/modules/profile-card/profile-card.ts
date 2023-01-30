import { Block, Store, CoreRouter } from '../../../core';
import template from 'bundle-text:./template.hbs';
import { withRouter, withStore } from 'utils';
import { logout } from 'services/auth';

import './profile-card.css';

interface ProfileCardProps {
    store: Store<AppState>,
    router: CoreRouter,
    onLogoutClick?: (e: Event) => void,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class ProfileCard extends Block<ProfileCardProps> {
    static componentName: string = 'ProfileCard';

    constructor(props: ProfileCardProps) {
        super(props);

        this.setProps({
            onLogoutClick: (e: Event) => this.onLogoutClick(e),
        });
    }

    onLogoutClick(e: Event) {
        e.preventDefault();
        this.props.store.dispatch(logout);
        this.props.router.go('/login');
    }
    
    render() {
        return template;
    }
}

export default withRouter(withStore(ProfileCard));
