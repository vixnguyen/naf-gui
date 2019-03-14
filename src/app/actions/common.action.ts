import { createAction } from 'redux-actions';

export namespace CommonActions {
  export enum Type {
    TOOGLE_FORM = 'TOOGLE_FORM'
  }
  export const toogleForm = createAction<any>(Type.TOOGLE_FORM);
}

export type CommonActions = Omit<typeof CommonActions, 'Type'>;
