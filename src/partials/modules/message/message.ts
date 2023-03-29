import { Block } from '../../../core';
import './message.css';

const template = require('./template.hbs');

export default class Message extends Block {
    static componentName: string = 'Message';
    
    render() {
        return template;
    }
}
