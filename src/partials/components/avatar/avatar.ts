import { Block, Store } from "core";
import template from 'bundle-text:./template.hbs';

import './avatar.css';
import { withStore } from "utils";

interface AvatarProps {
    store: Store<AppState>,
    onAvatarChangeClick: (e: Event) => void,
}

class Avatar extends Block<AvatarProps> {
    static componentName: string = 'Avatar';

    constructor(props: AvatarProps) {
        super(props);

        this.setProps({
            onAvatarChangeClick:(e: Event) => this.onAvatarChangeClick(e),
        });
    }
    
    onAvatarChangeClick(e: Event) {
        e.preventDefault();

        interface ChangeAvatarData {
            file: Blob,
        };

        const changeAvatarData = {
        };

        this.props.store.dispatch(login, changeAvatarData);
    }

    render() {
        return template;
    }
}

export default withStore(Avatar);
