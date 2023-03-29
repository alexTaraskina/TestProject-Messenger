import { Block } from 'core';
import './nav-button.css';

import arrowIcon from '../../../../icons/arrow_circle_left.svg';
import template from './template.hbs';

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
                click: () => window.history.back(),
            },
        });
    }

    render() {
        return template;
    }
}
