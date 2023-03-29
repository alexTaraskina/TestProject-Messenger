import { Block } from 'core';
import './form-error.css';

import template from './template.hbs';

interface FormErrorProps {
    text?: string
}

export default class FormError extends Block<FormErrorProps> {
    static componentName: string = 'FormError';

    render() {
        return template;
    }
}
