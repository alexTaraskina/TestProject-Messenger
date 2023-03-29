import { Block } from '../../core';

const template = require('./template.hbs');

export default class Modals extends Block {
    static componentName: string = 'Modals';

    render() {
        return template;
    }
}
