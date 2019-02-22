import { createAction } from 'redux-actions';

export namespace CmdActions {
  export enum Type {
    CHECK_NPM = 'CHECK_NPM',
    CHECK_NAF = 'CHECK_NAF',
    CHECK_MONGOD = 'CHECK_MONGOD'
  }
  export const checkNpm = createAction<any>(Type.CHECK_NPM);
  export const checkNaf = createAction<any>(Type.CHECK_NAF);
  export const checkMongod = createAction<any>(Type.CHECK_MONGOD);
}
