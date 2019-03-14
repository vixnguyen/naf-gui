import { combineReducers } from 'redux';
import { RootState } from './state';
import { alertReducer } from 'app/components/shared/alert/alert.reducers';
import { cmdReducer } from 'app/reducers/cmd.reducer';
import { commonReducer } from 'app/reducers/common.reducer';

export { RootState };

let obj: any = {
  ...{ pageData: commonReducer },
  ...{ appStatus: cmdReducer },
  ...{ notification: alertReducer }
};
export const rootReducer = combineReducers<RootState>({
  ...obj
});