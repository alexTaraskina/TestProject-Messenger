import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';

interface ErrorProps {
    status: string,
    text: string,
}

export default class ErrorPage extends Block<ErrorProps> {
    static componentName: string = 'ErrorPage';
    

    constructor(props: ErrorProps)
    {
        super(props);
    }

    render() {
        return template;
    }
}
