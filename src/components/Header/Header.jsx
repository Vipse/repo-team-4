import React from "react";
import "./Header.css";
import "../ChatTitle/ChatName/ChatName";
import ChatTitle from "../ChatTitle/ChatTitle";
import {connect} from "react-redux";
import { changeLayout} from "../../reducers/navigation/action";
import PropTypes from "prop-types";
import api from "../../api";



/*TODO Components:
button1,
button2,
ChatNameTitle,
LastVisit privateChat: visitTime; GroupChat: number of members
*/
class Header extends React.Component {

    clickGoBackButtonHandler() {
        this.props.changeLayout("chatListLayout");
        api.unMessage();
    }

    clickRightButtonHandler() {
        this.props.changeLayout("chatSettings");
    }

    render() {
        let headerClass = "header";
        let chatName = this.props.chatName;
        if(this.props.chatName && this.props.chatName.split(', ').length>1){
            this.props.chatName.split(', ').forEach((name) => {
                if(name!==this.props.currentUser.name){
                    chatName = name;
                }
            })
        }
        return (
            <div className={headerClass}>
                <div className="button button-1" onClick={this.clickGoBackButtonHandler.bind(this)}>
                    <i className="fa fa-arrow-left"></i>
                </div>
                <ChatTitle chatName={chatName}/>
                <div className="button button-2">
                    <i className="fa fa-ellipsis-h" onClick={this.clickRightButtonHandler.bind(this)}></i>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    changeLayout: PropTypes.func,
    goPrevLayout: PropTypes.func,
    prevLayout: PropTypes.string,
    chatName: PropTypes.string,
    currentUser: PropTypes.object
};

export default connect(
    state => ({
        layout: state.navigation.layout,
        currentUser: state.currentUser.currentUser
    }), {
        changeLayout
    }
)(Header);
