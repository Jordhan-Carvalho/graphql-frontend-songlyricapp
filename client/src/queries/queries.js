import gql from "graphql-tag";

export const SONGS_QUERY = gql`
  {
    songs {
      title
      id
    }
  }
`;

export const CREATESONG_QUERY = gql`
  mutation PostSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const FETCH_SONG = gql`
  query FetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        content
        id
        likes
      }
    }
  }
`;

export const CREATE_LYRIC = gql`
  mutation CreateLyric($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      title
      id
      lyrics {
        content
      }
    }
  }
`;

export const LIKE_QUERY = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      likes
      id
      content
      song {
        title
      }
    }
  }
`;
