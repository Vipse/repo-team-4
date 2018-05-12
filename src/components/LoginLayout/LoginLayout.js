import React from "react";
import "./LoginLayout.css";
import {connect} from "react-redux";
import {changeLayout} from "../../reducers/navigation/action";
import {authorization} from "../../reducers/authorization/action";
import {loginButtonHandler} from "../../reducers/authorization/action";

import PropTypes from "prop-types";
import api from "../../api";
import Spinner from "../Loaders/Spinner/Spinner";

class LoginLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        this.props.authorization();
    }

    onLoginClick() {
        this.props.loginButtonHandler(document.getElementById("login").value);
    }

    render() {

        if(this.props.loading) {
            return(<Spinner/>);
        }
        return (
            <div className='loginPage'>
                <div className='loginContainer'>
                    <div className='inputContainer'>
                        <span>Логин:</span>
                        <input id='login' type='text'>

                        </input>
                    </div>
                    <div className='buttonContainer'>
                        <div className='button' onClick={this.onLoginClick.bind(this)}>Войти</div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginLayout.propTypes = {
    changeLayout: PropTypes.func,
    authorization: PropTypes.func,
    loginButtonHandler: PropTypes.func,
    loading: PropTypes.bool
};

export default connect(
    state => ({
        layout: state.navigation.layout,
        loading: state.authorization.loading
    }), {
        changeLayout,
        authorization,
        loginButtonHandler
    }
)(LoginLayout);
