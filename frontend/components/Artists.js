import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

class Artists extends Component {
  getArtists() {
    const artists = this.props.songs.map(song => song.artist)
    return Array.from(new Set(artists)).map((artist, i) => {
      return (
        <button onClick={() => this.props.handleChangeArtists(artist)} key={i}>
          {artist}
        </button>
      )
    })
  }
  render() {
    return (
      <div className="artist-list">
        {this.getArtists()}{' '}
        <button
          style={{ border: '2px solid tomato' }}
          onClick={() => this.props.handleChangeArtists('')}
        >
          Reset
        </button>{' '}
      </div>
    )
  }
}

export default withApollo(Artists)
