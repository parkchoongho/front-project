import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import auth from "./components/services/authService";

import Header from "./components/Header";
import VideoList from "./components/VideoList";
import Footer from "./components/Footer";
import JoinForm from "./components/JoinForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import UploadForm from "./components/UploadForm";
import Profile from "./components/Profile";
import VideoDetail from "./components/VideoDetail";
import UserInfo from "./components/UserInfo";
import EditVideo from "./components/EditVideo";

class App extends Component {
  state = {
    user: {},
    data: [],
    isLoading: true
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:4000/api/video/all");
      const {
        result: { videos }
      } = data;
      const user = auth.getCurrentUser();
      this.setState({ data: videos, isLoading: false, user });
    } catch (error) {}
  }

  render() {
    const { data, user, isLoading } = this.state;

    return (
      <React.Fragment>
        {isLoading ? (
          "Loading..."
        ) : (
          <React.Fragment>
            <Header user={user} />

            <div className="main">
              <Switch>
                <Route path="/join" component={JoinForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/logout" component={Logout} />
                <Route path="/upload" component={UploadForm} />
                <Route
                  path="/profile"
                  render={props => <Profile {...props} />}
                />
                <Route
                  path="/users/:id"
                  render={props => <UserInfo {...props} />}
                />
                <Route
                  path="/video/:id/edit"
                  render={props => <EditVideo {...props} />}
                />
                <Route
                  path="/video/:id"
                  render={props => <VideoDetail {...props} />}
                />
                <Route path="/" render={() => <VideoList videos={data} />} />
              </Switch>
            </div>
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
