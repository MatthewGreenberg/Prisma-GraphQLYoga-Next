import React, { useState } from 'react'
import Songs from '../components/Songs'

function Home(props) {
  const [title, setTitle] = useState('Hello')
  return (
    <div>
      <Songs />
    </div>
  )
}

export default Home
