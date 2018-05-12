import React from 'react';
import './ChatListLayout.css';
import ChatList from "../ChatList/ChatList";
import {connect} from 'react-redux'
import {changeLayout} from '../../reducers/navigation/action';
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import {getCurrentUserInfo} from "../../reducers/currentUser/action";

class ChatListLayout extends React.Component {

    componentWillMount(){
        this.props.getCurrentUserInfo();
    }
    onFooterClick() {
        this.props.changeLayout("contacts");
    }

    render() {

        return (
            <div>
                <ChatListHeader/>
                <ChatList/>
                <div className='footer' onClick={this.onFooterClick.bind(this)}>Контакты</div>
            </div>
        );
    }
}

export default connect(
    state => ({

    }), {
        changeLayout,
        getCurrentUserInfo
    }
)(ChatListLayout);
