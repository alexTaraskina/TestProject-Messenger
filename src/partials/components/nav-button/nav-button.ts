import { Block } from "core";
import template from 'bundle-text:./template.hbs';

import './nav-button.css';

interface NavButtonProps {
}

export default class NavButton extends Block<NavButtonProps> {
    static componentName: string = 'NavButton';

    constructor(props: NavButtonProps) {
        super(props);
    }

    render() {
        return template;
    }
}
