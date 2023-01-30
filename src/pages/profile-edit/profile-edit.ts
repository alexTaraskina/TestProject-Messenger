import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';

import "../profile/profile.css";
import "./profile-edit.css";

export default class ProfileEdit extends Block {
    render() {
        return template;
    }
}
