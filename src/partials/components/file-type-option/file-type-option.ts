import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './file-type-option.css';

export default class FileTypeOption extends Block {
    static componentName: string = 'FileTypeOption';
    
    render() {
        return template;
    }
}
