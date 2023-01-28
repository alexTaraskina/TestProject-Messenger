import template from 'bundle-text:./template.hbs';
import { CoreRouter, Store, Block } from 'core';

type LoginPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    formError?: () => string | null;
};

export default class Login extends Block<LoginPageProps> {
    static componentName = 'Login';

    constructor(props: LoginPageProps) {
        super(props);

        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
        });
    }

    render() {
        return template;
    }
}
