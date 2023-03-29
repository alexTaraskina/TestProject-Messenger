import { Block, Store, CoreRouter } from 'core';
import { validateForm } from 'helpers/validateForm';
import { login } from 'services/auth';
import { withStore, withRouter } from 'utils';

const template = require('./template.hbs');

interface LoginFormProps {
    store: Store<AppState>,
    router: CoreRouter,
    onRegisterLinkClick?: (e: Event) => void,
    events: {
        submit: (event: MouseEvent) => void
    }
}

class LoginForm extends Block<LoginFormProps> {
    static componentName: string = 'LoginForm';

    constructor(props: LoginFormProps) {
        super({
            ...props,
            events: {
                submit: (event: MouseEvent) => this.onSubmit(event),
            },
        });

        this.setProps({
            onRegisterLinkClick: (e) => this.onRegisterLinkClick(e),
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

        const loginError = validateForm({ type: 'login', value: loginEl.value });
        this.refs.loginInputGroup.refs.formError.setProps({ text: loginError });

        const passwordError = validateForm({ type: 'password', value: passwordEl.value });
        this.refs.passwordInputGroup.refs.formError.setProps({ text: passwordError });

        if (!loginError && !passwordError) {
            this.props.store.dispatch(login, loginData);
        }
    }

    onRegisterLinkClick(e: Event) {
        e.preventDefault();
        this.props.router.go('/sign-up');
    }

    render() {
        return template;
    }
}

export default withRouter(withStore(LoginForm));
