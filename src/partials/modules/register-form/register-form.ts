import { Block, CoreRouter, Store } from '../../../core';
import { validateForm } from 'helpers/validateForm';
import { register } from 'services/auth';
import { withStore, withRouter } from 'utils';

const template = require('./template.hbs');

interface RegisterFormProps {
    store: Store<AppState>,
    router: CoreRouter,
    events: {
        submit:(event: MouseEvent) => void,
    }
}

class RegisterForm extends Block<RegisterFormProps> {
    static componentName: string = 'RegisterForm';

    constructor(props: RegisterFormProps) {
        super({
            ...props,
            events: {
                submit: (event: MouseEvent) => this.onSubmit(event),
            },
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();

        interface RegisterData {
            first_name: string,
            second_name: string,
            login: string,
            email: string,
            password: string,
            phone: string
        };

        const emailEl = this.element?.querySelector('#email') as HTMLInputElement;
        const loginEl = this.element?.querySelector('#login') as HTMLInputElement;
        const firstNameEl = this.element?.querySelector('#first_name') as HTMLInputElement;
        const secondNameEl = this.element?.querySelector('#second_name') as HTMLInputElement;
        const phoneEl = this.element?.querySelector('#phone') as HTMLInputElement;
        const passwordEl = this.element?.querySelector('#password') as HTMLInputElement;

        const registerData: RegisterData = {
            first_name: firstNameEl?.value,
            second_name: secondNameEl?.value,
            login: loginEl?.value,
            email: emailEl?.value,
            password: passwordEl?.value,
            phone: phoneEl?.value,
        }

        const loginError = validateForm({ type: 'login', value: loginEl.value });
        this.refs.loginInputGroup.refs.formError.setProps({ text: loginError });

        const emailError = validateForm({ type: 'email', value: emailEl.value });
        this.refs.emailInputGroup.refs.formError.setProps({ text: emailError });

        const nameError = validateForm({ type: 'name', value: firstNameEl.value });
        this.refs.nameInputGroup.refs.formError.setProps({ text: nameError });

        const secondNameError = validateForm({ type: 'name', value: secondNameEl.value });
        this.refs.secondNameInputGroup.refs.formError.setProps({ text: secondNameError });

        const phoneError = validateForm({ type: 'phone', value: phoneEl.value });
        this.refs.phoneInputGroup.refs.formError.setProps({ text: phoneError });

        const passwordError = validateForm({ type: 'password', value: passwordEl.value });
        this.refs.passwordInputGroup.refs.formError.setProps({ text: passwordError });

        if (!loginError && !emailError && !nameError && !secondNameError && !phoneError && !passwordError) {
            this.props.store.dispatch(register, registerData);
        }
    }
    
    render() {
        return template;
    }
}

export default withRouter(withStore(RegisterForm));
