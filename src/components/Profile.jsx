import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
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
          <Link to="/progile/password">
            <button>Change Password</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
};

export default Profile;
