import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div>
      <h2>User Profile</h2>
      {userInfo ? (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
};

export default UserProfile;
