import { Block } from "core";
import template from 'bundle-text:./template.hbs'

import './form-error.css';

interface FormErrorProps {
    text?: string
}

export default class FormError extends Block<FormErrorProps> {
    static componentName: string = 'FormError';

    render() {
        return template;
    }
}
