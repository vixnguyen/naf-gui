import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CharacterActions } from './character.actions';
import { CharacterModel } from 'app/models';

const initialState: RootState.PageState = [];

export const characterReducer = handleActions<RootState.PageState, CharacterModel>(
  {
    [CharacterActions.Type.CHARACTER_LIST]: (state, action: any) => {
      return [...state, ...action.payload];
    },
    [CharacterActions.Type.CHARACTER_NEW]: (state, action) => {
      return action.payload ? [action.payload, ...state] : state;
    },
    [CharacterActions.Type.CHARACTER_UPDATE]: (state, action: any) => {
      return state.map((item) => (item.id === action.payload.id ? action.payload : item));
    },
    [CharacterActions.Type.CHARACTER_DELETE]: (state, action) => {
      return state.filter((item: CharacterModel) => item.id !== (action.payload as any));
    }
  },
  initialState
);
