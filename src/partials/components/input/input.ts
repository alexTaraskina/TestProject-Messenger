import { Block } from 'core';
import template from 'bundle-text:./template.hbs';

import './input.css';

interface InputProps {
    onBlur?: () => void,
    onFocus?: () => void,
    onInput?: () => void,
    onChange?: () => void,
    type?: string,
    placeholder?: string,
    id?: string
}

export default class Input extends Block { 
    static componentName: string = 'Input';

    constructor({ onBlur, onFocus, onInput, onChange, ...props }: InputProps) {
        super({ ...props, events: { input: onInput, blur: onBlur, focus: onFocus, change: onChange }});
    }

    render() {
        return template;
    }
}
