import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';

interface ChatProps {
    showAddUserModal?: () => void,
    showRemoveUserModal?: () => void,
}

export default class Chat extends Block<ChatProps> {
    static componentName: string = 'Chat';

    constructor(props: ChatProps)
    {
        super(props);
        this.setProps({
            showAddUserModal: () => this.showAddUserModal(),
            showRemoveUserModal: () => this.showRemoveUserModal(),
        });
    }

    showAddUserModal() {
        this.refs.addUserModal.setProps({ state: "active" });
    }

    showRemoveUserModal() {
        this.refs.removeUserModal.setProps({ state: "active" });
    }

    render() {
        return template;
    }
}
