import { combineReducers } from 'redux';
import { partialReducer as entitiesPartialReducer } from 'redux-ntities';
import { createReducer } from './utils';

const entitiesReducer = createReducer({}, {
    ...entitiesPartialReducer,
});

export default combineReducers({
    entities: entitiesReducer,
});

type EntitiesMapType = { [string]: Array<*> };

export type AppStateType = {
    entities: Array<EntitiesMapType>
}
