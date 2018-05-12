import React from 'react';
import './ChatList.css';
import ListItem from "../ListItem/ListItem";
import {connect} from 'react-redux'
import {getRooms} from '../../reducers/chat/action';
import Spinner from "../Loaders/Spinner/Spinner";

class ChatList extends React.Component {

    componentDidMount() {

        this.props.getRooms();
    }

    render() {
        if (this.props.loading) {
            return (
                <Spinner/>
            );
        }

        return (
            <div className='chatList'>
                {this.props.rooms.map((room, index) => (
                    <ListItem key={index}
                              sizeAvatar={"small"}
                              name={room.name}
                              lastMessage={room.lastMessage && room.lastMessage.message}
                              newMessages={10}
                              date={room.lastMessage && room.lastMessage.created_at}
                              roomId={room._id}
                    />
                ))}
            </div>
        );
    }
}

export default connect(
    state => ({
        rooms: state.chat.rooms,
        loading: state.chat.loading,
    }), {
        getRooms
    }
)(ChatList);
