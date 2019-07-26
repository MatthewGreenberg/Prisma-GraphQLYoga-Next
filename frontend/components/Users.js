import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const UsersStyled = styled.div`
  background: ghostwhite;
  .user-list {
    display: flex;
    padding: 1em 0em;
  }
  .user {
    margin-right: 5em;
    h3 {
      margin-bottom: 0px;
    }
    h6,
    h5 {
      margin-top: 5px;
      margin-bottom: 0px;
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

export default class Users extends Component {
  render() {
    return (
      <UsersStyled>
        <Query query={ALL_USERS}>
          {({ data, error, loading }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>There was an error: {error.message}</p>
            return (
              <div className="user-list">
                {data.users.map((user, i) => {
                  return (
                    <div key={i} className="user">
                      <h3 className="name">{user.name}</h3>
                      <h5 className="email">{user.email}</h5>
                      <h6>{` User has ${
                        user.songsConnection.length
                      } songs`}</h6>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Query>
      </UsersStyled>
    )
  }
}
