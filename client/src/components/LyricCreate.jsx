import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { CREATE_LYRIC } from "../queries/queries";
import { FETCH_SONG } from "../queries/queries";

const LyricCreate = ({ id }) => {
  const [formData, setFormData] = useState({
    content: ""
  });

  const { content } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e, mutation) => {
    e.preventDefault();
    mutation();
    setFormData({ content: "" });
  };

  return (
    <>
      <h3>Create a lyric</h3>
      <Mutation
        mutation={CREATE_LYRIC}
        variables={{ content, songId: id }}
        refetchQueries={[{ query: FETCH_SONG, variables: { id } }]}
      >
        {postLyric => {
          return (
            <form onSubmit={e => onSubmit(e, postLyric)}>
              <label>Lyric:</label>
              <input
                type="text"
                placeholder="Content"
                name="content"
                value={content}
                onChange={e => onChange(e)}
              />
            </form>
          );
        }}
      </Mutation>
    </>
  );
};

export default LyricCreate;
