import { Block } from '../../../core';
import './option.css';

import photoIcon from '../../../../icons/photo.svg';
import videoIcon from '../../../../icons/video.svg';
import addUserIcon from '../../../../static/assets/icons/addUser.svg';
import removeUser from '../../../../static/assets/icons/removeUser.svg';
import removeChat from '../../../../static/assets/icons/removeChat.svg';

import template from './template.hbs';

interface OptionProps {
    onClick?: () => void;
    iconPath: string,
    optionType: string,
    events: {
        click?: () => void;
    }
}

export default class Option extends Block<OptionProps> {
    static componentName: string = 'Option';

    constructor({ onClick, ...props }: OptionProps) {
        super({
            ...props,
            iconPath: props.optionType === 'photo'
                ? photoIcon
                : props.optionType === 'video'
                    ? videoIcon
                    : props.optionType === 'addUser'
                        ? addUserIcon
                        : props.optionType === 'removeUser'
                            ? removeUser
                            : removeChat,
            events: { click: onClick },
        });
    }

    render() {
        return template;
    }
}
