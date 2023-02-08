import { BlockClass, Store } from 'core';

type WithStoreProps = { store: Store<AppState> };

type MapStateToProps<MappedProps> = (state: AppState) => MappedProps;

export function withStore<P extends WithStoreProps, MappedProps = any>(WrappedBlock: BlockClass<P>, mapStateToProps?: MapStateToProps<MappedProps>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({ ...props, ...(mapStateToProps ? mapStateToProps(window.store.getState()) : { store: window.store }) });
        }

        __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
            if (typeof mapStateToProps === 'function') {
                const prevPropsFromState = mapStateToProps(prevState);
                const nextPropsFromState = mapStateToProps(nextState);

                // TODO: rework, use isquial
                if (JSON.stringify(prevPropsFromState) !== JSON.stringify(nextPropsFromState)) {
                    // @ts-expect-error this is not typed
                    this.setProps(nextPropsFromState);
                }
                
                return;
            }
            /**
             * TODO: проверить что стор реально обновлен
             * и прокидывать не целый стор, а необходимые поля
             * с помощью метода mapStateToProps
             */
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
