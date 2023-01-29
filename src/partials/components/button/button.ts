import { Block } from "../../../core";
import template from 'bundle-text:./template.hbs';

import './button.css';

interface ButtonProps {
    heading: string;
    events: {
        click: () => void;
    }
}

export default class Button extends Block<ButtonProps> {
    static componentName: string = 'Button';

    // constructor({ heading, onClick }: ButtonProps) {
    //     super({ heading, events: {} });
    //   }

    render() {
        return template;
    }
}
