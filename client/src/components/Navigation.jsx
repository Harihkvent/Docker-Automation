import React from 'react'
import {NavLink} from 'react-router-dom';
import "../style/navigation.css"

export default function Navigation() {
  return (
    <nav>
        <ul>
            <li><NavLink to="/" end>HOME</NavLink></li>
            <li><NavLink to="/images">IMAGES</NavLink></li>
            <li><NavLink to="/container">CONTAINERS</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
        </ul>
    </nav>
  )
}
