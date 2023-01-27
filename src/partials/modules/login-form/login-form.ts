import { Block } from 'core';
import template from 'bundle-text:./template.hbs';
import { validateForm } from 'helpers/validateForm';

interface LoginFormProps {
}

export default class LoginForm extends Block<LoginFormProps> {
    static componentName: string = 'LoginForm';

    constructor(props: LoginFormProps) {
        super({
            ...props,
            events: {
                submit: (event: MouseEvent) => this.onSubmit(event),
            },
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();

        interface LoginData {
            login: string,
            password: string
        };

        const loginEl = this.element?.querySelector('#login') as HTMLInputElement;
        const passwordEl = this.element?.querySelector('#password') as HTMLInputElement;

        const loginData: LoginData = {
            login: loginEl?.value,
            password: passwordEl?.value,
        }

        console.log(loginData);

        const loginError = validateForm({ type: 'login', value: loginEl.value });
        this.refs.loginInputGroup.refs.formError.setProps({ text: loginError });

        const passwordError = validateForm({ type: 'password', value: passwordEl.value });
        this.refs.passwordInputGroup.refs.formError.setProps({ text: passwordError });
    }

    render() {
        return template;
    }
}
