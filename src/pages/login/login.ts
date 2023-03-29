const template = require('./template.hbs');

import { Block } from 'core';

export default class Login extends Block {
    static componentName = 'Login';

    render() {
        return template;
    }
}
