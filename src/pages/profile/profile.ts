import { Block } from '../../core';
const template = require('./template.hbs');

import './profile.css';
import { Screens } from 'utils';

interface ProfileProps {}

export default class Profile extends Block<ProfileProps> {
    static componentName: string = 'Profile';

    componentDidUpdate(_oldProps: ProfileProps, _newProps: ProfileProps): boolean {
        return window.store.getState().screen !== Screens.Profile;
    }

    render() {
        return template;
    }
}
