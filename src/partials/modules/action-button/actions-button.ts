import { Block } from 'core';

import template from './template.hbs';

interface ActionsButtonProps {
    onClick?: () => void;
    events: {
        click?: () => void;
    }
}

export default class ActionsButton extends Block<ActionsButtonProps> {
    static componentName: string = 'ActionsButton';

    constructor({ onClick, ...props }: ActionsButtonProps) {
        super({ ...props, events: { click: onClick } });
    }

    render() {
        return template;
    }
}
