import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';

import './profile.css';
import { Screens } from 'utils';

interface ProfileProps {}

export default class Profile extends Block<ProfileProps> {
    componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        return window.store.getState().screen !== Screens.Profile;
    }

    render() {
        return template;
    }
}
