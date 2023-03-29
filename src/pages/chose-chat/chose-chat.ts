import { Block } from '../../core';
import { Screens } from 'utils';

const template = require('./template.hbs');

interface ChoseChatProps {

}

export default class ChoseChat extends Block<ChoseChatProps> {
    static componentName: string = 'ChoseChat';

    componentDidUpdate(_oldProps: ChoseChatProps, _newProps: ChoseChatProps): boolean {
        return window.store.getState().screen !== Screens.Chats;
    }

    render() {
        return template;
    }
}
