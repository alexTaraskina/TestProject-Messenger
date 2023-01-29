import { Block, CoreRouter } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './link.css';
import { withRouter } from 'utils';

interface LinkProps {
    router: CoreRouter,
    onClick: () => void;
    events: {
        click: () => void;
    }
}

class Link extends Block<LinkProps> {
    static componentName: string = 'Link';

    constructor(props: LinkProps) {
        super({ ...props, events: { click: props.onClick } });
    }

    render() {
        return template;
    }
}

export default withRouter(Link);
