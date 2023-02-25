import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  // add thought represents newest created thought. using the cache object, the page no longer needs to refresh for thoughts to appear in browser.
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      
      // could potentially not yet exist, therefore try/catch wraps the code block
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user!")
      }

      // updates thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      // prepends the newst thought to the top of the array
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    }
  });

  const handleChange = (e) => {
    if (e.target.value.length <= 200) {
      setText(e.target.value);
      setCharacterCount(e.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try { 
      // adds thought to database
      await addThought({
        variables: { thoughtText }
      });

      // clears form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
        character count: {characterCount}/280
        {/* conditionally renders error message */}
        {error && <span className="ml-2">something went wrong.</span>}
      </p>

      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="here's a new thought"
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
