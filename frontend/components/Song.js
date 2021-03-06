import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SongWrapper = styled.div`
  height: 15em;
  width: 95%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.11), 0 10px 10px rgba(0, 0, 0, 0.09);
  margin: 1em 1em 1em 0em;
  text-align: center;
  position: relative;
  .delete {
    position: absolute;
    top: 0px;
    right: 30px;
    color: tomato;
    cursor: pointer;
  }
  .add-to-user {
    position: absolute;
    top: 0px;
    left: 30px;
    color: limegreen;
    cursor: pointer;
  }
`

const DELETE_SONG = gql`
  mutation DELETE_SONG($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`

const UPDATE_USER_SONGS = gql`
  mutation UPDATE_USER_SONGS($userId: ID!, $songId: ID!) {
    updateUser(id: $userId, songsConnection: { id: $songId }) {
      songsConnection {
        id
      }
    }
  }
`

const ALL_SONGS_QUERY = gql`
  query ALL_SONGS_QUERY {
    songs {
      id
      title
      artist
      duration
    }
  }
`
const ALL_USERS = gql`
  query ALL_USERS {
    users {
      name
      email
      id
      songsConnection {
        title
        artist
      }
    }
  }
`

export default class Song extends Component {
  render() {
    const { title, artist, id } = this.props
    return (
      <SongWrapper>
        <Mutation
          mutation={DELETE_SONG}
          update={(cache, { data: { deleteSong } }) => {
            const data = cache.readQuery({ query: ALL_SONGS_QUERY })
            data.songs = data.songs.filter(song => song.id !== deleteSong.id)
            cache.writeQuery({
              query: ALL_SONGS_QUERY,
              data,
            })
          }}
        >
          {(deleteSong, { data }) => (
            <span
              onClick={() => deleteSong({ variables: { id: id } })}
              className="delete"
            >
              x
            </span>
          )}
        </Mutation>
        <Mutation
          mutation={UPDATE_USER_SONGS}
          update={(cache, { data: { updateUser } }) => {
            const data = cache.readQuery({ query: ALL_USERS })
            const user = data.users.filter(
              user => user.id === 'cjyj8e2eh003i0743f2b9o65m'
            )
            const newData = updateUser.songsConnection
            user[0].songsConnection = newData
            cache.writeQuery({
              query: ALL_USERS,
              data,
            })
          }}
        >
          {(updateUser, { data }) => (
            <span
              onClick={() =>
                updateUser({
                  variables: {
                    userId: 'cjyj8e2eh003i0743f2b9o65m',
                    songId: id,
                  },
                })
              }
              className="add-to-user"
            >
              +
            </span>
          )}
        </Mutation>
        <h4>{title}</h4>
        <h5>{artist}</h5>
      </SongWrapper>
    )
  }
}
