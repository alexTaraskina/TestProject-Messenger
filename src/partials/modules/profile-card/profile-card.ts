import { withRouter, withStore } from 'utils';
import { logout } from 'services/auth';
import { Block, Store, CoreRouter } from '../../../core';

import './profile-card.css';

import template from './template.hbs';

interface ProfileCardProps {
    store: Store<AppState>,
    router: CoreRouter,
    onLogoutClick?: (e: Event) => void,
    onEditProfileClick?: (e: Event) => void,
    onChangePasswordClick?: (e: Event) => void,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class ProfileCard extends Block<ProfileCardProps> {
    static componentName: string = 'ProfileCard';

    constructor(props: ProfileCardProps) {
        super({
            ...props,
            onLogoutClick: (e: Event) => this.onLogoutClick(e),
            onEditProfileClick: (e: Event) => this.onEditProfileClick(e),
            onChangePasswordClick: (e: Event) => this.onChangePasswordClick(e),
        });
    }

    onLogoutClick(e: Event) {
        e.preventDefault();
        this.props.store.dispatch(logout);
        this.props.router.go('/');
    }

    onEditProfileClick(e: Event) {
        e.preventDefault();
        this.props.router.go('/settings-edit');
    }

    onChangePasswordClick(e: Event) {
        e.preventDefault();
        this.props.router.go('/password-edit');
    }

    render() {
        return template;
    }
}

export default withRouter(withStore(ProfileCard));
