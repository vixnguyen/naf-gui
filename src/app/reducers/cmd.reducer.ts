import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CmdActions } from 'app/actions/cmd.action';

const updateState = (state: any, action: any, key: string) => {
  if (action.payload && state[key] !== action.payload) {
    let newState: any = {};
    newState[key] = action.payload;
    return { ...state, ...newState};
  } else {
    return state;
  }
}

const initialState: RootState.AppStatus = {};

export const cmdReducer = handleActions<RootState.AppStatus, any>(
  {
    [CmdActions.Type.CHECK_NPM]: (state: any, action: any) => {
      return updateState(state, action, 'hasNpm');
    },
    [CmdActions.Type.CHECK_NAF]: (state: any, action) => {
      return updateState(state, action, 'hasNaf');
    },
    [CmdActions.Type.CHECK_MONGOD]: (state: any, action: any) => {
      return updateState(state, action, 'hasMongod');
    }
  },
  initialState
);
