import { Block, Store } from 'core';
import { withStore } from 'utils';
import { validateForm } from 'helpers/validateForm';
import { updatePassword } from 'services/profile';

import './password-edit-form.css';

import template from './template.hbs';

interface PasswordEditFormProps {
    store: Store<AppState>,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class PasswordEditForm extends Block<PasswordEditFormProps> {
    static componentName: string = 'PasswordEditForm';

    constructor(props: PasswordEditFormProps) {
        super({
            ...props,
            events: {
                submit: (event: MouseEvent) => this.onSubmit(event),
            },
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();

        interface UpdatePasswordData {
            oldPassword: string,
            newPassword: string,
        }

        const oldPasswordEl = this.element?.querySelector('#oldPassword') as HTMLInputElement;
        const newPasswordEl = this.element?.querySelector('#newPassword') as HTMLInputElement;

        const updatePasswordData: UpdatePasswordData = {
            oldPassword: oldPasswordEl?.value || '',
            newPassword: newPasswordEl?.value || '',
        };

        const oldPasswordError = validateForm({ type: 'password', value: oldPasswordEl.value });
        this.refs.oldPasswordInputGroup.refs.formError.setProps({ text: oldPasswordError });

        const newPasswordError = validateForm({ type: 'password', value: newPasswordEl.value });
        this.refs.newPasswordInputGroup.refs.formError.setProps({ text: newPasswordError });

        if (!newPasswordError) {
            this.props.store.dispatch(updatePassword, updatePasswordData);
        }
    }

    render() {
        return template;
    }
}

export default withStore(PasswordEditForm);
