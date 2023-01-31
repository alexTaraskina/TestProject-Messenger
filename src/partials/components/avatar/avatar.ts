import { Block } from "core";
import template from 'bundle-text:./template.hbs';

import './avatar.css';

interface AvatarProps {
    avatar: string,
}

export default class Avatar extends Block<AvatarProps> {
    static componentName: string = 'Avatar';

    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return template;
    }
}
