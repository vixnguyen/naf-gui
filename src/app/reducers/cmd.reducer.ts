import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CmdActions } from 'app/actions/cmd.action';

const initialState: RootState.AppStatus = {};

export const cmdReducer = handleActions<RootState.AppStatus, any>(
  {
    [CmdActions.Type.CHECK_NPM]: (state: any, action: any) => {
      state.hasNpm = action.payload;
      return state;
    },
    [CmdActions.Type.CHECK_NAF]: (state: any, action) => {
      state.hasNaf = action.payload;
      return state;
    },
    [CmdActions.Type.CHECK_MONGOD]: (state: any, action: any) => {
      state.hasMongod = action.payload;
      return state;
    }
  },
  initialState
);
