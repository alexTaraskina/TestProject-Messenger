import { Block } from '../../core';

const template = require('./template.hbs');

export default class SignIn extends Block {
    static componentName: string = 'SignIn';

    render() {
        return template;
    }
}
