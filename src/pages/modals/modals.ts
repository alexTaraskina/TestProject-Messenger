import { Block } from '../../core';

import template from './template.hbs';

export default class Modals extends Block {
    static componentName: string = 'Modals';

    render() {
        return template;
    }
}
