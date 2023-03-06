import { Block, CoreRouter } from '../../../core';
import template from 'bundle-text:./template.hbs';
import { withRouter } from 'utils';

import './error.css';

interface ErrorProps {
    router: CoreRouter,
    onBackToChatsClick?: (e: Event) => void,
}

class Error extends Block<ErrorProps> {
    static componentName: string = 'Error';

    constructor(props: ErrorProps) {
        super({
            ...props,
            onBackToChatsClick: (e: Event) => this.onBackToChatsClick(e),
        });
    }

    onBackToChatsClick(e: Event) {
        e.preventDefault();
        this.props.router.go(`/messenger`);
    }
    
    render() {
        return template;
    }
}

export default withRouter(Error);
