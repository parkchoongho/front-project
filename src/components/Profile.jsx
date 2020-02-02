import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "./services/authService";
import { Redirect } from "react-router-dom";
import { getLoggedUserInfo } from "./services/userService";
import VideoList from "./VideoList";

class Profile extends Component {
  state = { videos: [], isLoading: true };

  async componentDidMount() {
    try {
      this.getLoggedUserVideos();
    } catch (error) {
      console.log(error);
    }
  }

  async getLoggedUserVideos() {
    try {
      const {
        data: {
          user: { videos }
        }
      } = await getLoggedUserInfo();

      this.setState({ videos, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const loggedUser = auth.getCurrentUser();
    const { videos, isLoading } = this.state;

    if (!loggedUser) return <Redirect to="/" />;
    if (loggedUser) {
      return (
        <React.Fragment>
          {isLoading ? (
            "Loading..."
          ) : (
            <React.Fragment>
              <div className="user-profile">
                <div className="user-profile__header">
                  <h4 className="profile__username">{loggedUser.name}</h4>
                </div>
                <div className="user-profile__btns">
                  <Link to="/profile/edit">
                    <button>Edit Profile</button>
                  </Link>
                  <Link to="/profile/password">
                    <button>Change Password</button>
                  </Link>
                </div>
              </div>

              <VideoList videos={videos} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
}

export default Profile;
