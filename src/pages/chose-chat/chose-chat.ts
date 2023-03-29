import { Screens } from 'utils';
import { Block } from '../../core';

const template = require('./template.hbs');

interface ChoseChatProps {

}

export default class ChoseChat extends Block<ChoseChatProps> {
    static componentName: string = 'ChoseChat';

    componentDidUpdate(): boolean {
        return window.store.getState().screen !== Screens.Chats;
    }

    render() {
        return template;
    }
}
