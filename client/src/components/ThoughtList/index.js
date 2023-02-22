import React from "react";

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
            <p className="card-header">{thought.username}</p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{" "}
                {thought.reactionCount ? "see" : "start"} the discussion.
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
