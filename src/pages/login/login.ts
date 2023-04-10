import { Block } from 'core';

import template from './template.hbs';

export default class Login extends Block {
    static componentName = 'Login';

    render() {
        return template;
    }
}
