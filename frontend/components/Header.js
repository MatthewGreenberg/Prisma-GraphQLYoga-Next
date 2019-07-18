import Nav from './Nav'

function Header(props) {
  return (
    <div>
      <div className="bar">
        <a href="">Sick Fits</a>
        <Nav />
        <div className="sub-bar">
          <p>search</p>
        </div>
        <div>Cart</div>
      </div>
    </div>
  )
}

export default Header
