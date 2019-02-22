import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CmdActions } from 'app/actions/cmd.action';

const initialState: RootState.PageState = [];

export const cmdReducer = handleActions<RootState.PageState, any>(
  {
    [CmdActions.Type.CHECK_NPM]: (state, action: any) => {
      return [...state, ...action.payload];
    },
    [CmdActions.Type.CHECK_NAF]: (state, action) => {
      return [...state, ...action.payload];
    },
    [CmdActions.Type.CHECK_MONGOD]: (state, action: any) => {
      return [...state, ...action.payload];
    }
  },
  initialState
);
