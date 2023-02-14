import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './option.css';

interface OptionProps {
    onClick: () => void;
    events: {
        click: () => void;
    }
}

export default class Option extends Block<OptionProps> {
    static componentName: string = 'Option';

    constructor(props: OptionProps) {
        super({ ...props, events: { click: props.onClick } });
    }
    
    render() {
        return template;
    }
}
