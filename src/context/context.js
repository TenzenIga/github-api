import React, {createContext, useReducer } from 'react';


const initialState = {
    repos:[],
}

export const Store = createContext(initialState)

function reducer(state, action){
    switch (action.type) {
        case 'FETCH_DATA':
            return {...state, repos:action.payload }
        default:
            return state
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}