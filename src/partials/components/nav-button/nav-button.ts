import { Block } from "core";
import './nav-button.css';

const arrowIcon = require('../../../../icons/arrow_circle_left.svg');
const template = require('./template.hbs');

interface NavButtonProps {
    arrowPath: string,
    events: {
        click: () => void
    }
}

export default class NavButton extends Block<NavButtonProps> {
    static componentName: string = 'NavButton';

    constructor(props: NavButtonProps) {
        super({
            ...props,
            arrowPath: arrowIcon,
            events: {
                click: () => window.history.back()
            }
        });
    }

    render() {
        return template;
    }
}
