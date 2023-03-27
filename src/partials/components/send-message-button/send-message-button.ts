import { Block } from "core";
import template from 'bundle-text:./template.hbs';

interface SendMessageButtonProps {
    onClick?: () => void;
    events: {
        click?: () => void;
    }
}

export default class SendMessageButton extends Block<SendMessageButtonProps> {
    static componentName: string = 'SendMessageButton';

    constructor({ onClick, ...props }: SendMessageButtonProps) {
        super({ ...props, events: { click: onClick } });
    }

    render() {
        return template;
    }
}
