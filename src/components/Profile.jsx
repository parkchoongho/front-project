import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "./services/authService";
import { Redirect } from "react-router-dom";
import { getUserInfo } from "./services/userService";
import VideoList from "./VideoList";

class Profile extends Component {
  state = { videos: [] };

  componentDidMount() {
    try {
      this.getUserVideos();
    } catch (error) {
      console.log(error);
    }
  }

  async getUserVideos() {
    try {
      const {
        data: {
          user: { videos }
        }
      } = await getUserInfo();

      this.setState({ videos });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = auth.getCurrentUser();
    const { videos } = this.state;

    if (!user) return <Redirect to="/" />;
    if (user) {
      return (
        <React.Fragment>
          <div className="user-profile">
            <div className="profile__header">
              <h4 className="profile__username">{user.name}</h4>
            </div>
          </div>
          <div className="user-profile__btns">
            <Link to="/profile/edit">
              <button>Edit Profile</button>
            </Link>
            <Link to="/profile/password">
              <button>Change Password</button>
            </Link>
          </div>
          <VideoList videos={videos} />
        </React.Fragment>
      );
    }
  }
}

export default Profile;
