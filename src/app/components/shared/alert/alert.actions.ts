import { createAction } from 'redux-actions';

export namespace AlertActions {
  export enum Type {
    SHOW = 'SHOW',
    HIDE = 'HIDE',
    CLEAR = 'CLEAR'
  }
  export const show = createAction<any>(Type.SHOW);
  export const hide = createAction<any>(Type.HIDE);
  export const clear = createAction<any>(Type.CLEAR);
}

export type AlertActions = Omit<typeof AlertActions, 'Type'>;
