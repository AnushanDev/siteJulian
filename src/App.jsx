import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import { createContext, useState } from "react";
import React from 'react';
import Home from './pages/accueil';
import Projet from './pages/projet';
import Categorie from './pages/categorie';
import Test from './pages/Test';
import DetailProjet from './pages/detailProjet';
import ImageList from './pages/test2';
import Test3 from './pages/test3';
import Julian from './pages/julian';

export const firstLoginContext = createContext(null);
export const setFirstLoginContext = createContext(null);

function App() {
  const [firstLogin, setFirstLogin] = useState(true);
  return (
    <firstLoginContext.Provider value={firstLogin}>
      <setFirstLoginContext.Provider value={setFirstLogin}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<Projet />} />
            <Route path="/projets/:categoryName" element={<Categorie />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<ImageList />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/aboutMe" element={<Julian />} />
            <Route path="/projets/:categoryName/:detail" element={<DetailProjet />} />
          </Routes>
        </Router>
      </setFirstLoginContext.Provider>
    </firstLoginContext.Provider>
  );
}

export default App;
