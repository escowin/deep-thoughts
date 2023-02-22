import React from "react";

import { useQuery } from "@apollo/client"; // apollo client hook | allows requests to connected graphql server via <ApolloProvider>
import { QUERY_THOUGHTS } from "../utils/queries";

import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // uses hook to make query request. loading analogous to fetch(). promises en react are cumbersome. the loading property conditionally renders data to display based on its existence. the {data} is every graphql response.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // optional chaining | ?. | browser supported only.
  // - existing data is stored in const ||  undefined data is an empty array.
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {/* ternary conditional rendering | once the query is complete & loading undefined, thoughts array & title are passed as props into component  */}
          {loading ? (
            <div>loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="some feed for thought(s)" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
