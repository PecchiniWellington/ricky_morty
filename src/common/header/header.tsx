import React, { useState } from 'react'
import { AppRoutes } from '../../routes/routesList';
import './header.style.css'
import CustomLink from './headerLink/headerLink';

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const responsive = openMenu ? 'responsive' : '';

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <nav className={`topnav ${responsive}`} id="myTopnav">
      <CustomLink to={AppRoutes.characterListPage}>Home</CustomLink>
      <CustomLink to={AppRoutes.characterFavouritesPage}>Favourites</CustomLink>
      <a className="icon" onClick={() => toggleMenu()}>
        <i className="fa fa-bars"></i>
      </a>
    </nav>
  )
}

export default Header