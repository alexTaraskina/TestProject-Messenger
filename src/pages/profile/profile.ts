import './profile.css';
import { Screens } from 'utils';
import { Block } from 'core';

import template from './template.hbs';

interface ProfileProps {}

export default class Profile extends Block<ProfileProps> {
    static componentName: string = 'Profile';

    componentDidUpdate(): boolean {
        return window.store.getState().screen !== Screens.Profile;
    }

    render() {
        return template;
    }
}
