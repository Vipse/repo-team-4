const initialState = {
    layout: "autorization",
    prevLayout: null,
    loading: true,
    loadingPrevLayout: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case "CHANGE_LAYOUT": {
        return {
            ...state,
            layout: action.layout,
            prevLayout: state.layout
        };
    }
    case "PREV_LAYOUT": {
        return {
            ...state,
            layout: state.prevLayout,
            prevLayout: null,
            loadingPrevLayout: true
        };
    }
    case "LOADING_START": {
        return {
            ...state,
            loading: true
        };
    }
    case "LOADING_FINISH": {
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
