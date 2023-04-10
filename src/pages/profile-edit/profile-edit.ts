import { Block } from '../../core';
import '../profile/profile.css';

import template from './template.hbs';

export default class ProfileEdit extends Block {
    static componentName: string = 'ProfileEdit';

    render() {
        return template;
    }
}
