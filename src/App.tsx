import React from 'react';
import './App.css';
import CharaterListPage from './pages/charaterListPage/charaterListPage';
import Header from './common/header/header';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes/routesList';
import CharaterFavouritesPage from './pages/charatherFavouritesPage/characterFafouritesPage';
import NotFoundPage from './pages/notFoundPage/notFoundPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={AppRoutes.characterListPage} element={<CharaterListPage />} />
        <Route path={AppRoutes.characterFavouritesPage} element={<CharaterFavouritesPage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
