import Link from 'next/link'
function Nav(props) {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/items">
        <a>Shop</a>
      </Link>
    </div>
  )
}
export default Nav
