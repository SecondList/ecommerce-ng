
export interface AuthState {
    token: string;
    error: any;
}

export const initialState: AuthState = {
    token: "",
    error: null
};
