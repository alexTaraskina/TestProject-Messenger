import { Block } from '../../../core';

const template = require('./template.hbs')

import './searchbox.css';

export default class Searchbox extends Block {
    static componentName: string = 'Searchbox';
    
    render() {
        return template;
    }
}
