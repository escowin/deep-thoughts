import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";

const Profile = () => {
  // desctructes the  mutation function from add_friend so it can be used in a click function.
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  // a value in userParam from the URL bar runs QUERY_USER. no value (ie /profile) renders QUERY_ME
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // query_me returns data.me, query_user returns data.user
  const user = data?.me || data?.user || {};

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e)
    }
  }

  // navigates to personal profile page is username is the logged-in user's username
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>need to be logged in to view profile.</h4>
    )
  }
  
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ?  `${user.username}'s` : 'your'} profile.
        </h2>

        {/* button only renders on other user's profiles & utilizes a callback function */}
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>add friend</button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <ThoughtForm/>}</div>
    </div>
  );
};

export default Profile;
