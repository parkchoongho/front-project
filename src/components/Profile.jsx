import React from "react";
import { Link } from "react-router-dom";

const Profile = props => {
  console.log(props.user);
  const { user } = props;

  if (user) {
    return (
      <div className="user-profile__btns">
        <Link to="/profile/edit">
          <button>Edit Profile</button>
        </Link>
        <Link to="/progile/password">
          <button>Change Password</button>
        </Link>
      </div>
    );
  }
};

export default Profile;
