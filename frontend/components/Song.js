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
`

const DELETE_SONG = gql`
  mutation DELETE_SONG($id: ID!) {
    deleteSong(id: $id) {
      id
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
        <h4>{title}</h4>
        <h5>{artist}</h5>
      </SongWrapper>
    )
  }
}
