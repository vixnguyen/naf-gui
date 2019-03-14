import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CommonActions } from 'app/actions/common.action';

const initialState: RootState.PageState = {
  isWelcome: true
};

export const commonReducer = handleActions<RootState.PageState, any>(
  {
    [CommonActions.Type.TOOGLE_FORM]: (state: any, action: any) => {
      let newState: RootState.PageState = {
        isProjectInit: action.payload
      };
      return { ...state, ...newState};
    }
  },
  initialState
);
