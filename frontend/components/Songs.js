import React, { Component } from 'react'
import Link from 'next/link'
import Song from './Song'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Artists from './Artists'
import AddSong from './AddSong'

const SongsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  justify-content: center;
  align-items: center;
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

export default class Songs extends Component {
  state = {
    artist: '',
    data: '',
  }

  setArtists = artist => {
    this.setState(() => {
      return { artist: artist }
    })
  }

  setData(data) {
    this.setState({ data: data })
  }

  render() {
    const { artist } = this.state
    return (
      <div>
        <h1>Songs</h1>
        <Query query={ALL_SONGS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>There was an error: {error.message}</p>
            return (
              <>
                <SongsList>
                  {data.songs
                    .filter(song =>
                      artist !== ''
                        ? song.artist === artist
                        : song.artist !== artist
                    )
                    .map((song, i) => {
                      return (
                        <Song
                          id={song.id}
                          title={song.title}
                          artist={song.artist}
                          key={i}
                        />
                      )
                    })}
                </SongsList>
                <Artists
                  songs={data.songs}
                  handleChangeArtists={this.setArtists}
                />
              </>
            )
          }}
        </Query>
        <AddSong />
      </div>
    )
  }
}
