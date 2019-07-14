import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";

import { SONGS_QUERY } from "../queries/queries";
import { DELETE_SONG } from "../queries/queries";

const SongList = () => {
  return (
    <Query query={SONGS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const songsArray = data.songs;

        return (
          <>
            <ul className="collection">
              {songsArray.map(song => (
                <li className="collection-item" key={song.id}>
                  <Link to={`/songs/${song.id}`}>{song.title}</Link>
                  <Mutation
                    mutation={DELETE_SONG}
                    variables={{ id: song.id }}
                    update={(cache, { data: { deleteSong } }) => {
                      const { songs } = cache.readQuery({ query: SONGS_QUERY });
                      const newSongs = [...songs].filter(s => s.id !== song.id);
                      cache.writeQuery({
                        query: SONGS_QUERY,
                        data: { songs: [...newSongs] }
                      });
                    }}
                  >
                    {deleteSong => {
                      return (
                        <i className="material-icons" onClick={deleteSong}>
                          delete
                        </i>
                      );
                    }}
                  </Mutation>
                </li>
              ))}
            </ul>
            <Link to="/create" className="btn-floating btn-large red right">
              <i className="material-icons">add</i>
            </Link>
          </>
        );
      }}
    </Query>
  );
};

export default SongList;
