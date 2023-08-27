import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Game from './Game.jsx';


export default function Menu(props){

    
  return (
    <div className = "menu">
      
        <h1 className = "welcome">
          <span id="first">S</span>
          <span id="second">I</span>
          <span id="third">M</span>
          <span id="fourth">O</span>
          <span id="fifth">N</span>
        </h1>
        <h2 className = "subtitle">Can you keep up?</h2>
        
        <button className="playButton"><Link to="/game" style={{ textDecoration: 'none' } }>Play</Link></button>
        <Outlet />
      
    </div>
  );
}

