import React, {createContext, useReducer } from 'react';


const initialState = {
    repos:[],
    loading:true,
    error:null
}

export const Store = createContext(initialState)

function reducer(state, action){
    switch (action.type) {
        case 'FETCH_DATA':
            return {...state,loading:true, error:null }
        case 'SET_DATA':
            return { ...state, loading:false, repos:action.payload }
        case 'FETCH_DATA_FAIL':
            return { ...state, loading:false, error:action.payload}
        default:
            return state
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}