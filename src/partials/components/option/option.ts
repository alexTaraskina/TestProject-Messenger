import { Block } from '../../../core';
import './option.css';

const photoIcon = require('../../../../icons/photo.svg');
const videoIcon = require('../../../../icons/video.svg') ;
const addUserIcon = require('../../../../static/assets/icons/addUser.svg');
const removeUser = require('../../../../static/assets/icons/removeUser.svg') ;
const removeChat = require('../../../..//static/assets/icons/removeChat.svg');

const template = require('./template.hbs');

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
            events: { click: onClick } 
        });
    }
    
    render() {
        return template;
    }
}
