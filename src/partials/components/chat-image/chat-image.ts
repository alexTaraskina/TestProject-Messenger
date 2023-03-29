import { Block, Store } from "core";
import { withStore } from "utils";
import { updateChatImage } from "services/messenger";
import { baseURL } from "api/variables";

const template = require('./template.hbs');

import './chat-image.css';

interface ChatImageProps {
    file: string,
    store: Store<AppState>,
    chatId: number,
    image: string,
    imagePath: string,
    onImageChange?: (e: Event) => void,
}

class ChatImage extends Block<ChatImageProps> {
    static componentName: string = 'ChatImage';

    constructor(props: ChatImageProps) {
        super({
            ...props,
            imagePath: `${baseURL}/resources/${props.image}`,
            onImageChange: (e) => this.onImageChange(e),
        });
    }

    onImageChange(e: Event) {
        const imageInputEl = e.target as HTMLInputElement;
        if (imageInputEl && imageInputEl.files) {
            const formData = new FormData();
            formData.append('chatId', this.props.chatId.toString());
            formData.append('avatar', imageInputEl.files[0]);
            this.props.store.dispatch(updateChatImage, formData);
        }
    }

    render() {
        return template;
    }
}

export default withStore(ChatImage);
