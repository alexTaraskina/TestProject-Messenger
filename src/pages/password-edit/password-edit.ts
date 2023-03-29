import { Block } from '../../core';

import '../profile/profile.css';

const template = require('./template.hbs');

export default class PasswordEdit extends Block {
    static componentName: string = 'PasswordEdit';

    render() {
        return template;
    }
}
