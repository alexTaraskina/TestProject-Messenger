import { Block } from "core";
const template = require('./template.hbs');

import './backdrop.css';

interface BackdropProps {
    onClick?: (e: Event) => void,
    events: {
        click?: (e: Event) => void,
    }
};

export default class Backdrop extends Block<BackdropProps> {
    static componentName: string = 'Backdrop';

    constructor(props: BackdropProps) {
        super({ ...props, events: { click: props.onClick }});
    }

    render() {
        return template;
    }
}
