import { BlockClass, Store } from 'core';
import { isEqual } from './isEqual';

type WithStoreProps = { store: Store<AppState> };

type MapStateToProps<MappedProps> = (state: AppState) => MappedProps;

export function withStore<P extends WithStoreProps, MappedProps = any>(WrappedBlock: BlockClass<P>, mapStateToProps?: MapStateToProps<MappedProps>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({ ...props, ...(mapStateToProps ? mapStateToProps(window.store.getState()) : {store: window.store}) });
        }

        __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
            if (mapStateToProps && typeof mapStateToProps === 'function') {
                const prevPropsFromState = mapStateToProps(prevState);
                const nextPropsFromState = mapStateToProps(nextState);

                if (isEqual(prevPropsFromState, nextPropsFromState)) {
                    // @ts-expect-error this is not typed
                    this.setProps(nextPropsFromState);
                }
                
                return;
            }
            
            // @ts-expect-error this is not typed
            this.setProps({ ...this.props, store: window.store });
        }

        componentDidMount(props: P) {
            super.componentDidMount(props);
            window.store.on('changed', this.__onChangeStoreCallback);
        }

        componentWillUnmount() {
            super.componentWillUnmount();
            window.store.off('changed', this.__onChangeStoreCallback);
        }

    } as BlockClass<Omit<P, 'store'>>;
}
