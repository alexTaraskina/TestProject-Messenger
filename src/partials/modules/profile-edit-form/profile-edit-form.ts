import { withRouter, withStore } from 'utils';
import { validateForm } from 'helpers/validateForm';
import { editProfile } from 'services/profile';
import { Block, Store, CoreRouter } from '../../../core';

import './profile-edit-form.css';

import template from './template.hbs';

interface ProfileEditFormProps {
    store: Store<AppState>,
    router: CoreRouter,
    displayName: string,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class ProfileEditForm extends Block<ProfileEditFormProps> {
    static componentName: string = 'ProfileEditForm';

    constructor(props: ProfileEditFormProps) {
        super({
            ...props,
            displayName: props.store.getState().user?.displayName ?? '',
            events: {
                submit: (event: MouseEvent) => this.onSubmit(event),
            },
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();

        interface EditProfileData {
            first_name: string,
            second_name: string,
            display_name: string,
            login: string,
            email: string,
            phone: string
        }

        const emailEl = this.element?.querySelector('#email') as HTMLInputElement;
        const loginEl = this.element?.querySelector('#login') as HTMLInputElement;
        const firstNameEl = this.element?.querySelector('#first_name') as HTMLInputElement;
        const secondNameEl = this.element?.querySelector('#second_name') as HTMLInputElement;
        const displayNameEl = this.element?.querySelector('#display_name') as HTMLInputElement;
        const phoneEl = this.element?.querySelector('#phone') as HTMLInputElement;

        const state = this.props.store.getState();

        const editProfileData: EditProfileData = {
            first_name: firstNameEl?.value || state.user?.firstName || '',
            second_name: secondNameEl?.value || state.user?.secondName || '',
            display_name: displayNameEl?.value || state.user?.displayName || '',
            login: loginEl?.value || state.user?.login || '',
            email: emailEl?.value || state.user?.email || '',
            phone: phoneEl?.value || state.user?.phone || '',
        };

        console.log(editProfileData);

        const loginError = validateForm({ type: 'login', value: editProfileData.login });
        this.refs.loginInputGroup.refs.formError.setProps({ text: loginError });

        const emailError = validateForm({ type: 'email', value: editProfileData.email });
        this.refs.emailInputGroup.refs.formError.setProps({ text: emailError });

        const nameError = validateForm({ type: 'name', value: editProfileData.first_name });
        this.refs.nameInputGroup.refs.formError.setProps({ text: nameError });

        const secondNameError = validateForm({ type: 'name', value: editProfileData.second_name });
        this.refs.secondNameInputGroup.refs.formError.setProps({ text: secondNameError });

        const displayNameError = validateForm({ type: 'name', value: editProfileData.display_name });
        this.refs.displayNameInputGroup.refs.formError.setProps({ text: displayNameError });

        const phoneError = validateForm({ type: 'phone', value: editProfileData.phone });
        this.refs.phoneInputGroup.refs.formError.setProps({ text: phoneError });

        if (!loginError && !emailError && !nameError && !secondNameError && !phoneError && !displayNameError) {
            this.props.store.dispatch(editProfile, editProfileData);
        }
    }

    render() {
        return template;
    }
}

export default withRouter(withStore(ProfileEditForm));
