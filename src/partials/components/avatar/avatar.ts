import { Block, Store } from "core";
import template from 'bundle-text:./template.hbs';
import { withStore } from "utils";
import { changeAvatar } from 'services/profile';

import './avatar.css';

interface AvatarProps {
    file: string,
    store: Store<AppState>,
    avatar: string,
    onAvatarChange?: (e: Event) => void,
}

class Avatar extends Block<AvatarProps> {
    static componentName: string = 'Avatar';

    constructor(props: AvatarProps) {
        super({
            ...props,
            onAvatarChange: (e) => this.onAvatarChange(e),
        });
    }

    onAvatarChange(e: Event) {
        const avatarInputEl = e.target as HTMLInputElement;
        if (avatarInputEl && avatarInputEl.files) {
            const formData = new FormData();
            formData.append('avatar', avatarInputEl.files[0]);
            window.store.dispatch(changeAvatar, formData);
        }
    }

    render() {
        return template;
    }
}

export default withStore(Avatar, (state) => ({ avatar: state.user?.avatar }));
