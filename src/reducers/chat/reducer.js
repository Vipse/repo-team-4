const initialState = {
    currentChatId: null,
    chatList: [],
    rooms: [],
    loading: true,
    users: [],
    roomUsers: [],
    messages: [],
    newMessage: null,
    pickedUsers: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case "JOIN_CHAT": {
        return {
            ...state,
            currentChatId: action.id,
            loading: true
        };
    }
    case "GET_ROOMS_SUCCESS": {

        return {
            ...state,
            rooms: action.rooms,
            loading: false
        };
    }
    case "GET_ROOMS": {
        return {
            ...state,
            loading: true
        };
    }
    case "BACK_TO_CHAT": {
        return {
            ...state,
            loading: true
        };
    }
    case "GET_ROOMS_FAIL": {
        console.log("Ошибка загрузки чатов");
        return {
            ...state
        };
    }

    case "GET_ROOM_USERS": {
        return {
            ...state,
            roomUsers: [],
            loading: true
        };
    }

    case "GET_ROOM_USERS_SUCCESS": {
        return {
            ...state,
            roomUsers: state.roomUsers.concat(action.roomUsers),
            loading: false
        };
    }

    case "GET_ROOM_USERS_FAIL": {
        console.log("Ошибка получения пользователей чата");
        return {
            ...state,
            loading: false
        };
    }

    case "GET_CONTACTS_SUCCESS": {
        return {
            ...state,
            users: action.users,
            loading: false
        };
    }
    case "GET_CONTACTS": {
        return {
            ...state,
            loading: true,
        };
    }
    case "GET_CONTACTS_FAIL": {
        console.log("Ошибка загрузки чатов");
        return {
            ...state,
            loading: false,
        };
    }
    case "GET_MESSAGES_SUCCESS": {
        return {
            ...state,
            messages: action.messages,
            loading: false
        };
    }
    case "GET_MESSAGES": {
        return {
            ...state,
        };
    }
    case "GET_MESSAGES_FAIL": {
        return {
            ...state,
        };
    }
    case "ON_NEW_MESSAGE": {
        return {
            ...state,
            messages: state.messages.concat(action.newMessage)
        };
    }
    case "PICK_USER": {
        return {
            ...state,
            pickedUsers: action.users
        };
    }



    default: {
        return state;
    }
    }
}
