import React, { useState } from 'react'

function Home(props) {
  const [title, setTitle] = useState('Hello')
  return (
    <div>
      <h1 className="title">{title}</h1>
    </div>
  )
}

export default Home
