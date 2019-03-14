import { combineReducers } from 'redux';
import { RootState } from './state';
import { alertReducer } from 'app/components/shared/alert/alert.reducers';
import { cmdReducer } from 'app/reducers/cmd.reducer';
import { commonReducer } from 'app/reducers/common.reducer';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  ...{ appStatus: cmdReducer },
  ...{ notification: alertReducer },
  ...{ pageData: commonReducer }
});