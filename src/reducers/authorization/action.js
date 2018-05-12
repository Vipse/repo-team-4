import api from "../../api";

export function authorization() {
    return (dispatch) => {
        api.checkAuth().then((user) => {
            if (user !== null) {
                dispatch({
                    type: "CHANGE_LAYOUT",
                    layout: "chatListLayout"
                });
            } else {
                dispatch({
                    type: "LOADING"
                });
            }
        });
    };
}

export function loginButtonHandler(name) {

    return (dispatch) => {
        api.getUserByName(name).then((user) => {
            if (user !== null) {
                dispatch({
                    type: "CHANGE_LAYOUT",
                    layout: "chatListLayout"
                });
            }
        });
    };
}
