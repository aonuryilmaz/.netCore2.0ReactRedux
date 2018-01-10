import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { CategoryReducer as Category } from './category';


const reducers = combineReducers({
    routing: routerReducer,
    home: Category
});

export default reducers;