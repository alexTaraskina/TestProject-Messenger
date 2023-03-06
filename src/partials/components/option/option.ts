import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './option.css';

interface OptionProps {
    onClick?: () => void;
    events: {
        click?: () => void;
    }
}

export default class Option extends Block<OptionProps> {
    static componentName: string = 'Option';

    constructor({ onClick, ...props }: OptionProps) {
        super({ ...props, events: { click: onClick } });
    }
    
    render() {
        return template;
    }
}
