import React, { Component } from 'react'
import styled from 'styled-components'

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

export default class Song extends Component {
  render() {
    const { title, artist } = this.props
    return (
      <SongWrapper>
        <span className="delete">x</span>
        <h4>{title}</h4>
        <h5>{artist}</h5>
      </SongWrapper>
    )
  }
}
