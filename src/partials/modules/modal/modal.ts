import { Block } from "../../../core";
import template from 'bundle-text:./template.hbs';

import './modal.css';

export default class Modal extends Block {
    static componentName: string = 'Modal';
    
    render() {
        return template;
    }
}
