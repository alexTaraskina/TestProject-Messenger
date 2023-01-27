import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';
import { validateForm } from 'helpers/validateForm';

interface RegisterFormProps {

}

export default class RegisterForm extends Block<RegisterFormProps> {
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
            email: string,
            login: string,
            firstName: string,
            secondName: string,
            phone: string,
            password: string
        };

        const emailEl = this.element?.querySelector('#email') as HTMLInputElement;
        const loginEl = this.element?.querySelector('#login') as HTMLInputElement;
        const firstNameEl = this.element?.querySelector('#first_name') as HTMLInputElement;
        const secondNameEl = this.element?.querySelector('#second_name') as HTMLInputElement;
        const phoneEl = this.element?.querySelector('#phone') as HTMLInputElement;
        const passwordEl = this.element?.querySelector('#password') as HTMLInputElement;

        const registerData: RegisterData = {
            email: emailEl?.value,
            login: loginEl?.value,
            firstName: firstNameEl?.value,
            secondName: secondNameEl?.value,
            phone: phoneEl?.value,
            password: passwordEl?.value,
        }

        console.log(registerData);

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
    }
    
    render() {
        return template;
    }
}
