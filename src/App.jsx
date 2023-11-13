import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import React, { useState } from 'react';
import Inicio from './pages/Inicio';
import ResultadoBusqueda from './pages/ResultadoBusqueda';
import DetalleProducto from './pages/DetalleProducto.jsx';
import './App.jsx';
import './App.css';

const App = () => {
  return (
    <div className='fondo'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/resultados/:searchTerm" element={<ResultadoBusqueda />} />
          <Route path="/detalle/:id" element={<DetalleProducto/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
