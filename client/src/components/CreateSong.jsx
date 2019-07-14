import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { SONGS_QUERY } from "../queries/queries";
import { CREATESONG_QUERY } from "../queries/queries";

const CreateSong = ({ history }) => {
  const [formData, setFormData] = useState({
    title: ""
  });

  const { title } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e, mutation) => {
    mutation();
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      <Link to="/">Back </Link>
      <h3>Create a New Song</h3>
      <Mutation
        mutation={CREATESONG_QUERY}
        variables={{ title }}
        update={(cache, { data: { addSong } }) => {
          const { songs } = cache.readQuery({ query: SONGS_QUERY });
          cache.writeQuery({
            query: SONGS_QUERY,
            data: { songs: [...songs, addSong] }
          });
        }}
      >
        {postSong => {
          return (
            <form onSubmit={e => onSubmit(e, postSong)}>
              <label>Song Title:</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={e => onChange(e)}
              />
            </form>
          );
        }}
      </Mutation>
    </>
  );
};

export default CreateSong;
