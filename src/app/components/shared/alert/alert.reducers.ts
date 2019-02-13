import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { AlertActions } from './alert.actions';

// initial state for notification
const initialState: RootState.NotificationState = {};

export const alertReducer = handleActions<RootState.NotificationState, any>(
  {
    [AlertActions.Type.SHOW]: (state, action: any) => {
      return { ...state, ...action.payload, ...{ isOpen: true } };
    },
    [AlertActions.Type.HIDE]: (state, action: any) => {
      return { ...state, ...action.payload, ...{ isOpen: false } };
    },
    [AlertActions.Type.CLEAR]: (state, action: any) => {
      return {};
    }
  },
  initialState
);
