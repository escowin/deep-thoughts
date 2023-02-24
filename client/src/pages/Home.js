import React from "react";

import { useQuery } from "@apollo/client"; // apollo client hook | allows requests to connected graphql server via <ApolloProvider>
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from '../utils/auth';

import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";

const Home = () => {
  // uses hook to make query request. loading analogous to fetch(). promises en react are cumbersome. the loading property conditionally renders data to display based on its existence. the {data} is every graphql response.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // uses object destructing to to extrac 'data' from the useQuery hook's repsonse & renames it 'userData' to be more descriptive.
  // - logged in user w/ valid jwt will have userData to hold all returned info from query
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // optional chaining | ?. | browser supported only.
  // - existing data is stored in const ||  undefined data is an empty array.
  const thoughts = data?.thoughts || [];

  // conditional render for logged in user
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {/* ternary conditional rendering | once the query is complete & loading undefined, thoughts array & title are passed as props into component  */}
          {loading ? (
            <div>loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="some feed for thought(s)" />
          )}
        </div>
        {/* conditionally renders friendslist */}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList username={userData.me.username} friendCount={userData.me.friendCount} friends={userData.me.friends} />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
