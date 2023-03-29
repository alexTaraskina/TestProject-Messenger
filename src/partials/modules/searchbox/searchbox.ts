import { Block } from '../../../core';

import './searchbox.css';

const template = require('./template.hbs');

export default class Searchbox extends Block {
    static componentName: string = 'Searchbox';

    render() {
        return template;
    }
}
