import api from "../../api";

export function joinChat(userId, currentUser) {
    return (dispatch) => {
        api.getUser(userId)
            .then((user) => {

                let names = [user.name, currentUser.name];
                names.sort();
                names = names[0]+", "+names[1];
                return api.createRoom({name: names, users: [user._id]});
            })
            .then((room) => {
                api.currentUserJoinRoom(room._id)
                    .then(() => {
                        api.onMessage((mess) => {
                            dispatch({
                                type: "NEW_MESSAGE",
                                newMessage: mess
                            });
                        });
                    });

                dispatch({
                    type: "JOIN_CHAT",
                    id: room._id
                });

                dispatch({
                    type: "CHANGE_LAYOUT",
                    layout: "messagesLayout"
                });
            });

    };
}

export function joinExistingChat(roomId) {
    return (dispatch) => {
        api.getRoom(roomId)
            .then((room) => {
                api.currentUserJoinRoom(room._id)
                    .then(() => {
                        api.onMessage((mess) => {
                            dispatch({
                                type: "ON_NEW_MESSAGE",
                                newMessage: [mess]
                            });
                        });
                    });

                dispatch({
                    type: "JOIN_CHAT",
                    id: room._id
                });

                dispatch({
                    type: "CHANGE_LAYOUT",
                    layout: "messagesLayout"
                });
            });

    };
}
export function backToChat() {
    return (dispatch) => {
        dispatch({
            type: "BACK_TO_CHAT"
        });
    };
}

export function getRooms() {
    return (dispatch) => {
        dispatch({type: "GET_ROOMS"});

        api.getCurrentUserRooms()
            .then((rooms) => {
                Promise.all(rooms.items.map(setLastMessageToRoom)).then(() => {
                    rooms.items.sort(compareRooms);
                    dispatch({
                        type: "GET_ROOMS_SUCCESS",
                        rooms: rooms.items
                    });
                }).catch(() => {
                    dispatch({type: "GET_ROOMS_FAIL"});
                });

            })
            .catch((error) => console.log(error, "error from action chat"));
    };
}

export function getRoomMessages(roomId) {
    return (dispatch) => {
        dispatch({type: "GET_MESSAGES"});
        api.getRoomMessages(roomId)
            .then((messages) => {
                dispatch({
                    type: "GET_MESSAGES_SUCCESS",
                    messages: messages.items.reverse()
                });
            }).catch(() => {
                dispatch({type: "GET_MESSAGES_FAIL"});
            });
    };
}

export function getContacts(currentUser) {
    return (dispatch) => {
        dispatch({type: "GET_CONTACTS"});
        api.getUsers().then((users) => {
            let contacts = [];
            users.items.forEach((user) => {
                if(user.name!==currentUser.name){
                    contacts.push(user);
                }
            });
            dispatch({
                type: "GET_CONTACTS_SUCCESS",
                users: contacts
            });
        }).catch(() => {
            dispatch({type: "GET_CONTACTS_FAIL"});
        });
    };
}

export function getRoomUsers(roomId) {
    return (dispatch) => {
        dispatch({type: "GET_ROOM_USERS"});
        api.getRoom(roomId)
            .then((room) => {
                room.users && room.users.map((room) => (
                    api.getUser(room).then((user) => {
                        dispatch({
                            type: "GET_ROOM_USERS_SUCCESS",
                            roomUsers: user
                        });
                    }).catch(() => {
                        dispatch({type: "GET_ROOM_USERS_FAIL"});
                    })
                ));
            }).catch(() => {
                dispatch({type: "GET_ROOM_USERS_FAIL"});
            });
    };
}

export function sendMessage(roomId, message) {
    return (dispatch) => {
        api.sendMessage(roomId, message).then((message) => {
            dispatch({
                type: "ON_NEW_MESSAGE",
                newMessage: [message]
            });
        });
    };
}

export function createRoom(roomName, usersIds) {
    return (dispatch) => {
        api.createRoom({name: roomName, users: usersIds})
            .then((room) => {
                api.currentUserJoinRoom(room._id)
                    .then(() => {
                        api.onMessage((mess) => {
                            dispatch({
                                type: "NEW_MESSAGE",
                                newMessage: mess
                            });
                        });
                    });

                dispatch({
                    type: "JOIN_CHAT",
                    id: room._id
                });

                dispatch({
                    type: "CHANGE_LAYOUT",
                    layout: "messagesLayout"
                });
            });
    };
}

export function addUsers(usersIds, roomId) {
    return () => {
        usersIds && usersIds.map((usersId) => (
            api.userJoinRoom(usersId, roomId)
        ));
    };
}

export function pickUser(usersArr, userId) {
    return (dispatch) => {
        if (usersArr.indexOf(userId) < 0)
            usersArr.push(userId);
        else
            usersArr.splice(usersArr.indexOf(userId), 1);

        dispatch({
            type: "PICK_USER",
            users: usersArr
        });

    };
}

function setLastMessageToRoom(room) {
    return new Promise(function (resolve) {
        api.getRoomMessages(room._id).then((messages) => {
            room.lastMessage = messages.items[0];
            resolve(room);
        });
    });
}

function compareRooms(firstRoom, secondRoom) {
    if (firstRoom.lastMessage && secondRoom.lastMessage) {
        if (firstRoom.lastMessage.created_at < secondRoom.lastMessage.created_at) {
            return 1;
        }
        if (firstRoom.lastMessage.created_at > secondRoom.lastMessage.created_at) {
            return -1;
        }
        return 0;
    }
    else if (firstRoom.lastMessage) {
        return -1;
    }
    else if (secondRoom.lastMessage) {
        return 1;
    }
    else if (!firstRoom.lastMessage && !secondRoom.lastMessage) {
        return 0;
    }

}

export function leaveRoom(roomId) {
    return () => {
        api.currentUserLeaveRoom(roomId);
    };
}
