import {createContext, useEffect, useReducer, useState} from 'react'
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {
    }
})


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    console.log('dispatched')
    console.log(action)
    const {type, payload} = action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }

}



export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch]   = useReducer(userReducer, INITIAL_STATE)
    console.log(currentUser)

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = {currentUser, setCurrentUser}

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)

        })
        return unsubscribe
    }, []);

    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}
