export function changeLayout(layout) {
    return (dispatch) => {
        dispatch({
            type: "CHANGE_LAYOUT",
            layout
        });
    };
}

export function goPrevLayout() {
    return (dispatch) => {

        dispatch({
            type: "PREV_LAYOUT"
        });
    };
}

export function loadingStart() {
    return (dispatch) => {
        dispatch({
            type: "LOADING_START"
        });
    };
}
export function loadingFinish() {
    return (dispatch) => {
        dispatch({
            type: "LOADING_FINISH"
        });
    };
}
