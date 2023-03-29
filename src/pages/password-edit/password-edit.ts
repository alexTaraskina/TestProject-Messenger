import { Block } from '../../core';
const template = require('./template.hbs');

import "../profile/profile.css";

export default class PasswordEdit extends Block {
    static componentName: string = 'PasswordEdit';

    render() {
        return template;
    }
}
