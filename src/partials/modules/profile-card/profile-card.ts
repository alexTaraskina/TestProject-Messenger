import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './profile-card.css';

export default class ProfileCard extends Block {
    static componentName: string = 'ProfileCard';
    
    render() {
        return template;
    }
}
