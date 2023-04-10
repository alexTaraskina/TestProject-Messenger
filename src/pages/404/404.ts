import { Block } from '../../core';

import template from './template.hbs';

export default class Error404 extends Block {
    static componentName: string = 'Error404';

    render() {
        return template;
    }
}
