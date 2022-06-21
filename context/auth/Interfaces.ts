export interface AuthReducerState {
    isLogedIn: boolean;
    user: any;
}

export interface AuthContextValue {
    isLogedIn?: boolean;
    user?: any;
    login?: any;
    logout?: any;
}

export interface LoginData {
    acess_token: string | any;
    [key: string]: any;
}