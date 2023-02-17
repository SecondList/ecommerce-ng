
export interface AuthState {
    token: string;
    refreshToken: string;
    error: any;
    registered: boolean;
}

export const initialState: AuthState = {
    token: "",
    refreshToken: "",
    error: null,
    registered: false
};
