import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";
import { FETCH_SONG } from "../queries/queries";

const SongDetail = ({
  match: {
    params: { id }
  }
}) => {
  return (
    <div>
      <Link to="/">Back</Link>
      <Query query={FETCH_SONG} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { song } = data;

          return (
            <>
              <h3>{song.title}</h3>
              <LyricList lyrics={song.lyrics} />
              <LyricCreate id={id} />
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default SongDetail;
