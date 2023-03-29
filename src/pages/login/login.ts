import { Block } from 'core';

const template = require('./template.hbs');

export default class Login extends Block {
    static componentName = 'Login';

    render() {
        return template;
    }
}
