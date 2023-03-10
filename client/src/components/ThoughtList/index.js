import React from "react";
import { Link } from "react-router-dom";

// destructured props | avoids needing to write props.<x> in jsx
const ThoughtList = ({ thoughts, title }) => {
  //  conditionally rendering jsx
  if (!thoughts.length) {
    return <h3>no thoughts yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ frontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{" "}
              thought on {thought.createdAt}
            </p>

            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{" "}
                  {thought.reactionCount ? "see" : "start"} the discussion.
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
