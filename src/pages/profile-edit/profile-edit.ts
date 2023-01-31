import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';

import "../profile/profile.css";

export default class ProfileEdit extends Block {
    render() {
        return template;
    }
}
