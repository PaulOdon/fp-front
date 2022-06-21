import { ReducerWithoutAction } from "react";

export enum Action {
    LOGIN = "login",
    LOGOUT = "logout"
}

export default (state: any, action: any) => {
    switch (action.type) {
        case Action.LOGIN:
            return { ...state, isLogedIn: true, user: action.payload }
        case Action.LOGOUT:
            return {...state, isLogedIn: false, user: {}}
        default:
            return state;
    }
}