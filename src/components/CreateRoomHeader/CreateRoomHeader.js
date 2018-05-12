import React from "react";
import "./CreateRoomHeader.css";
import PropTypes from "prop-types";
import "../ChatTitle/ChatName/ChatName";
import {connect} from "react-redux";
import {changeLayout} from "../../reducers/navigation/action";

class CreateRoomHeader extends React.Component {

    clickLeftButtonHandler() {
        this.props.changeLayout("chatListLayout");
    }



    render() {

        return (
            <div className="CreateRoomHeader">
                <div className="button button-1" onClick={this.clickLeftButtonHandler.bind(this)}>
                    <i className='fa fa-arrow-left'></i>
                </div>
                <h2>Создать чат</h2>
                <div className="button button-2">
                    <i className='fa'></i>
                </div>
            </div>
        );
    }
}
CreateRoomHeader.propTypes = {
    changeLayout: PropTypes.func,
    pickedUsers:  PropTypes.array,
    createRoom: PropTypes.func
};
export default connect(
    () => ({}), {
        changeLayout
    }
)(CreateRoomHeader);
