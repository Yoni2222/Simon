
import React, { useState } from 'react';
import Menu from './Menu.jsx';
import Game from './Game.jsx';
import NotFound from './notFound.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


export default function App(){

  /*return (
    <div>
      {currentPage === 'menu' && <Menu onPlayClick={handlePlayButtonClick} />}
      {currentPage === 'game' && <Game />}
      
    </div>
  );*/

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Menu />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}
