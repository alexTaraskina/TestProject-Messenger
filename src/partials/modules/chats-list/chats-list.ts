import { Block, Store } from 'core';
import { withStore } from 'utils';
import { uploadChats } from 'services/messenger';

const template = require('./template.hbs');

interface ChatsListProps {
    store: Store<AppState>,
    events: {
        scroll?: (e: Event) => void;
    }
}

function throttle(callee: Function, timeout: any) {
    let timer: NodeJS.Timeout | undefined | null;

    return function perform(...args: unknown[]) {
        if (timer) return

        timer = setTimeout(() => {
            callee(...args)
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = null
        }, timeout)
    }
}

class ChatsList extends Block<ChatsListProps> {
    static componentName: string = 'ChatsList';

    constructor(props: ChatsListProps) {
        super({
            ...props,
            events: { scroll: throttle((e: Event) => this.handleScroll(e), 1000) }
        });
    }

    handleScroll(e: Event) {
        const scrollHeight = (e.target as HTMLElement).scrollHeight;
        const height = (e.target as HTMLElement).offsetHeight;
        const scrolled = (e.target as HTMLElement).scrollTop;
        const threshold = scrollHeight;
        const position = scrolled + height;

        interface GetChatsRequestData {
            offset: number,
            limit: number,
            title: string,
        }

        const data: GetChatsRequestData = {
            offset: this.props.store.getState().chats?.length ?? 0,
            limit: 10,
            title: "",
        }

        if (position >= threshold) {
            this.props.store.dispatch(uploadChats, data);
        }
    }

    render() {
        return template;
    }
}

export default withStore(ChatsList);
