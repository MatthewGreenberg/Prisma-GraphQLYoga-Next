import Header from './Header'
import Meta from './Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
  }
  button {  
    font-family: 'radnika_next';
    border: 2px solid black;
    border-radius: 0px;
    padding: 0.25em 0.75em;
    margin: 0.25em;
    cursor: pointer;
    &:active, &:focus {
      outline: none;
    }
  }
  h1, h2, h3, h4, h5 {
    font-weight: normal;
    color: #333;
  }
  input {
    border: 2px solid;
  }
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

export default class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </div>
      </ThemeProvider>
    )
  }
}
