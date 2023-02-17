import { createSelector, createFeatureSelector } from "@ngrx/store";
//import { isShowing } from "./loading-spinner.reducer";
import { SpinnerState } from "./loading-spinner.state";

export const selectSpinnerEntity = createFeatureSelector<SpinnerState>(
    "spinnerState"
);
export const isSpinnerShowing = createSelector(
    selectSpinnerEntity,
    (state: SpinnerState) => state.show
);