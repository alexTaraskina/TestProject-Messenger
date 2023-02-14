import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';
import { Screens } from 'utils';

interface ChoseChatProps {

}

export default class ChoseChat extends Block<ChoseChatProps> {
    componentDidUpdate(oldProps: ChoseChatProps, newProps: ChoseChatProps): boolean {
        return window.store.getState().screen !== Screens.Chats;
    }

    render() {
        return template;
    }
}
