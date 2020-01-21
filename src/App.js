import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import VideoList from "./components/VideoList";
import Footer from "./components/Footer";
import JoinForm from "./components/JoinForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import UploadForm from "./components/UploadForm";
import auth from "./components/services/authService";

import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";

class App extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:4000/api/video/all");
      const {
        result: { videos }
      } = data;
      this.setState({ data: videos });

      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header user={this.state.user} />

        <div className="content">
          <Switch>
            <Route path="/join" component={JoinForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/upload" component={UploadForm} />
            <Route path="/" render={props => <VideoList videos={data} />} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
