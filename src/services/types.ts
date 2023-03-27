import type { Dispatch } from 'core';

export type DispatchStateHandler<TData> = (dispatch: Dispatch<AppState>, state: AppState, data: TData) => Promise<void>;
