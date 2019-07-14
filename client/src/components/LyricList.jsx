import React from "react";
import { Mutation } from "react-apollo";
import { LIKE_QUERY } from "../queries/queries";

const LyricList = ({ lyrics }) => {
  return (
    <ul className="collection">
      {lyrics.map(lyric => (
        <li className="collection-item" key={lyric.id}>
          {lyric.content}
          <div className="vote-box">
            <Mutation
              mutation={LIKE_QUERY}
              variables={{ id: lyric.id }}
              optimisticResponse={{
                __typename: "Mutation",
                //the response you get form the request
                likeLyric: {
                  id: lyric.id,
                  __typename: "LyricType",
                  likes: lyric.likes + 1
                }
              }}
            >
              {likeLyric => (
                <i className="material-icons" onClick={likeLyric}>
                  thumb_up
                </i>
              )}
            </Mutation>
            {lyric.likes}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
