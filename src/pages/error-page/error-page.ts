import { Block } from '../../core';

const template = require('./template.hbs');

interface ErrorProps {
    status: string,
    text: string,
}

export default class ErrorPage extends Block<ErrorProps> {
    static componentName: string = 'ErrorPage';

    render() {
        return template;
    }
}
