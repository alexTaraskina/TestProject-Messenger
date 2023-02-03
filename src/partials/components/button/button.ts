import { Block } from "core";
import template from 'bundle-text:./template.hbs';

import './button.css';

interface ButtonProps {
    heading: string;
    onClick?: () => void;
    events: {
        click?: () => void;
    }
}

export default class Button extends Block<ButtonProps> {
    static componentName: string = 'Button';

    constructor({ onClick, ...props }: ButtonProps) {
        super({ ...props, events: { click: onClick } });
    }

    render() {
        return template;
    }
}
