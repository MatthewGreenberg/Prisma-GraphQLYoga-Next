import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const AddSongWrapper = styled.div`
  display: flex;
  margin-top: 3em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.11), 0 10px 10px rgba(0, 0, 0, 0.09);

  input {
    margin: 0.5em auto;
    min-width: 300px;
  }

  button {
    margin-top: 1em;
  }
`

const CREATE_SONG = gql`
  mutation CreateSong($title: String!, $artist: String!, $duration: Int!) {
    createSong(title: $title, artist: $artist, duration: $duration) {
      title
      artist
      duration
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

export default class AddSong extends Component {
  state = {
    title: '',
    artist: '',
    duration: 0,
  }
  render() {
    const { title, artist, duration } = this.state
    return (
      <Mutation
        mutation={CREATE_SONG}
        update={(cache, { data: { createSong } }) => {
          const { songs } = cache.readQuery({ query: ALL_SONGS_QUERY })
          cache.writeQuery({
            query: ALL_SONGS_QUERY,
            data: { songs: songs.concat([createSong]) },
          })
        }}
      >
        {(createSong, { data }) => (
          <AddSongWrapper>
            <h3 className="title">Add New Song</h3>
            <label htmlFor="title" className="title-label">
              Title
            </label>
            <input
              type="text"
              onChange={e => this.setState({ title: e.target.value })}
              className="title"
              value={title || ''}
            />
            <label htmlFor="artist" className="artist-label">
              Artist
            </label>
            <input
              type="text"
              className="band"
              onChange={e => this.setState({ artist: e.target.value })}
              value={artist || ''}
            />
            <label htmlFor="duration" className="duration-label">
              Duration
            </label>
            <input
              type="number"
              className="band"
              onChange={e => this.setState({ duration: e.target.value })}
              value={duration}
            />
            <button
              onClick={() => {
                createSong({ variables: { title, artist, duration } })
              }}
              className="submit"
            >
              Submit
            </button>
          </AddSongWrapper>
        )}
      </Mutation>
    )
  }
}
