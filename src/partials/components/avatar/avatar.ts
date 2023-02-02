import { Block, Store } from "core";
import template from 'bundle-text:./template.hbs';
import { withStore } from "utils";
import { changeAvatar } from 'services/profile';

import './avatar.css';

interface AvatarProps {
    file: string,
    store: Store<AppState>,
    onAvatarChange?: (e: Event) => void,
}

class Avatar extends Block<AvatarProps> {
    static componentName: string = 'Avatar';

    constructor(props: AvatarProps) {
        super(props);

        this.setProps({
            onAvatarChange:(e) => this.onAvatarChange(e),
        });
    }
    
    onAvatarChange(e: Event) {
        alert('ks');
        const avatarInputEl = e.target as HTMLInputElement;
        if (avatarInputEl && avatarInputEl.files) {
            const formData = new FormData();
            formData.append('file', avatarInputEl.files[0]);
            this.props.store.dispatch(changeAvatar, formData);
        }
    }

    render() {
        return template;
    }
}

export default withStore(Avatar);
