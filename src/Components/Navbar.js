import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
  render() {
    return (
      <div style={{ display: "flex", backgroundColor: "yellow" }}>
        <Link to='/' style={{textDecoration:"none"}}><h1 style={{ margin: "0.5rem" }}>Movies App</h1></Link>
        <Link to='/favourite' style={{textDecoration:"none"}}><h2 style={{ marginTop: "1rem" }}>Favourites</h2></Link>
      </div>
    )
  }
}
