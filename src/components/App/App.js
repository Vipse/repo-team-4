import React, {Component} from 'react';
import './App.css';
import Contacts from "../Contacts/Contacts";
import {connect} from 'react-redux'
import {changeLayout} from '../../reducers/navigation/action';
import LoginLayout from "../LoginLayout/LoginLayout";
import ChatListLayout from "../ChatListLayout/ChatListLayout";
import MessagesLayout from "../MessagesLayout/MessagesLayout";

class App extends Component {
    render() {
        let layout;
        switch (this.props.layout) {
            case 'autorization':
                layout = <LoginLayout/>;
                break;
            case 'chatListLayout':
                layout = <ChatListLayout/>;
                break;
            case 'messagesLayout':
                layout = <MessagesLayout/>;
                break;
            case 'contacts':
                layout = <Contacts/>;
                break;
            default:
                layout = <LoginLayout/>;
                break;
        }


        return (
            <div className="App">
                {layout}
            </div>
        );

    }

    // componentDidMount() {
    //   // console.log('mount');
    //   api.onMessage((message) => {
    //     // console.log('New message: ', message);
    //   });
    // }
    //
    // render() {
    //   return (
    //     <div className="App">
    //       <MessagesLayout roomId={'5abf4fbe53f9331578c86dfa'} />,
    //       {/* <Contacts /> */}
    //     </div>
    //   );
    // }
}

export default connect(
    state => ({
        layout: state.navigation.layout
    }), {
        changeLayout
    }
)(App)

