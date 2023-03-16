import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './form-input-group.css';
import { validateForm, ValidateRuleType } from 'helpers/validateForm';
import { REPL_MODE_SLOPPY } from 'repl';

type InputType = 'text' | 'password' | 'email' | 'tel';

interface FormInputGroupProps {
    type?: InputType,
    placeholder?: string,
    value?: string,
    error?: string,
    name?: string,
    validationType?: ValidateRuleType,
    events: {
        blur: (e: Event) => void,
        input: (e: Event) => void,
    }
}

export default class FormInputGroup extends Block<FormInputGroupProps> {
    static componentName = 'FormInputGroup';

    constructor(props: FormInputGroupProps) {
        super({
            ...props,
            value: props.value ? props.value : "",
            events: {
                blur: event => {
                    this.validate(event);
                },
                input: event => {
                    this.validate(event);
                }
            }
        });
    }

    validate(event: Event): void {
        if (this.props.validationType !== undefined) {
            const inputEl = event.target as HTMLInputElement;
            const error = validateForm({ type: this.props.validationType, value: inputEl.value });
            this.refs.formError.setProps({ text: error });
        }
    }

    render() {
        return template;
    }
}
