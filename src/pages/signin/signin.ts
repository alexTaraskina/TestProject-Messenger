import { Block } from '../../core';

import template from './template.hbs';

export default class SignIn extends Block {
    static componentName: string = 'SignIn';

    render() {
        return template;
    }
}
