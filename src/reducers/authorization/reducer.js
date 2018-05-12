const initialState = {
    user: [],
    loading: true
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case "CHECK_AUTH_NAME": {
        if (action.user !== null) {
            return {state};
        }
        break;
    }
    case "LOADING": {
        return {
            ...state,
            loading: false
        };
    }
    default: {
        return state;
    }
    }
}
