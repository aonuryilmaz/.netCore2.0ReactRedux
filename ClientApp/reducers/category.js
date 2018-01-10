import { fetch } from 'domain-task';
import update from 'react-addons-update';
import { push } from 'react-router-redux';
//Constants
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const GET_CATEGORY = 'GET_CATEGORY';
//-----Actions------
export function fetchCategories() {
    return fetch('api/Category/PageCategories');
}
export const getCategories = (categories) => {
    return {
        type: GET_CATEGORIES,
        payload:categories
    }
}
export function getCategoriesAsync() {
    return (dispatch) => {
        return fetchCategories()
            .then(response => response.json())
            .then(categories => {
                dispatch(getCategories(categories));
            });        
    }
}

export function getCategory(id) {
    return (dispatch) => {
        fetch(`/api/Category/EditCategory?id=${id}`)
            .then(response => response.json())
            .then((res) => {
                dispatch({
                    type: GET_CATEGORY,
                    parent: res.parent,
                    child: res.child
                })
            });
    }
}

export function addCategory(res) {
    return (dispatch) => {
        fetch(`/api/Category/AddCategory`, res)
            .then(response => response.json())
            .then(res => {
                if (res === 'ok') {
                    dispatch({
                        type: ADD_CATEGORY,
                        payload: true
                    });
                    dispatch(push('/'));
                } else {
                    dispatch({
                        type: ADD_CATEGORY,
                        payload: false
                    })
                }
            })
    }
}
//-----Handlers------
function handleGetCategories(state,action) {
    return update(state, {
        categories: {
            $set: action.payload
        }
    })
}
function handleAddCategory(state, action) {
    return update(state, {
        isAdded: {
            $set: action.payload
        }
    })
}
function handleGetCategory(state, action) {
    return update(state, {
        parent: {
            $set: action.parent
        },
        child: {
            $set: action.child
        }
    })
}

const ACTION_HANDLERS = {
    GET_CATEGORIES: handleGetCategories,
    ADD_CATEGORY: handleAddCategory,
    GET_CATEGORY: handleGetCategory
};
const initialState = {
    categories: [],
    isAdded: false,
    parent: {},
    child:[]
}
export function CategoryReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
