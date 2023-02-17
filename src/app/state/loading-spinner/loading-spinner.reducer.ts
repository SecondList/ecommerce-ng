import { createReducer, on } from "@ngrx/store";
import { initialState, SpinnerState } from "../loading-spinner/loading-spinner.state";
import { hideSpinner, showSpinner } from "./loading-spinner.actions";

export const spinnerReducer = createReducer(
    initialState,
    on(showSpinner, (state) => ({ ...state, show: true })),
    on(hideSpinner, (state) => ({ ...state, show: false }))
);

//export const isShowing = (state: SpinnerState) => state.show;