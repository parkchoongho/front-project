import React, { Component } from "react";
import auth from "./services/authService";
import { Redirect } from "react-router-dom";
import { getUserInfo } from "./services/userService";
import VideoList from "./VideoList";

class UserInfo extends Component {
  state = { user: {}, videos: [], isLoading: true };

  async componentDidMount() {
    try {
      this.getUser();
    } catch (error) {
      console.log(error);
    }
  }

  async getUser() {
    try {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      const {
        data: { user }
      } = await getUserInfo(id);

      this.setState({ user, videos: user["videos"], isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const loggedUser = auth.getCurrentUser();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { user, videos, isLoading } = this.state;

    if (loggedUser && loggedUser.id === id) return <Redirect to="/profile" />;

    if (user) {
      return (
        <React.Fragment>
          {isLoading ? (
            "Loading..."
          ) : (
            <React.Fragment>
              <div className="user-profile">
                <div className="user-profile__header">
                  <h4 className="profile__username">{user.name}</h4>
                </div>
              </div>
              <VideoList videos={videos} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default UserInfo;
