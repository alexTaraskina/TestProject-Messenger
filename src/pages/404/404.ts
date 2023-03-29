import { Block } from '../../core';
const template = require('./template.hbs');

export default class Error404 extends Block {
    static componentName: string = 'Error404';

    render() {
        return template;
    }
}
